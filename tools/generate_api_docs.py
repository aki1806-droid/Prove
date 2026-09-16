#!/usr/bin/env python3
"""Genera docs/api.md a partire da docs/openapi.json.

Uso:
    python3 tools/generate_api_docs.py            # rigenera docs/api.md
    python3 tools/generate_api_docs.py --check    # esce 1 se il file è disallineato

Per aggiornare la spec sorgente:
    curl -sS https://api.skillplate.com/v1/external/openapi.json -o docs/openapi.json
"""
import argparse
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SPEC = ROOT / "docs" / "openapi.json"
OUT = ROOT / "docs" / "api.md"

METHODS = ("get", "post", "put", "patch", "delete")


def load():
    return json.loads(SPEC.read_text(encoding="utf-8"))


# $ref presenti nella spec ma privi di definizione: raccolti qui e riportati in fondo
# al documento invece di far fallire la generazione.
DANGLING = []


def resolve(spec, node):
    """Segue i $ref finché non arriva a un nodo concreto.

    Un $ref che non punta a nulla non è fatale: viene annotato e sostituito da un
    segnaposto, così una spec incompleta produce comunque documentazione utile.
    """
    seen = set()
    while isinstance(node, dict) and "$ref" in node:
        ref = node["$ref"]
        if ref in seen:
            raise ValueError(f"$ref ciclico: {ref}")
        seen.add(ref)
        target = spec
        try:
            for part in ref.lstrip("#/").split("/"):
                target = target[part]
        except (KeyError, TypeError):
            if ref not in DANGLING:
                DANGLING.append(ref)
            return {"description": f"riferimento non risolto nella spec (`{ref}`)"}
        node = target
    return node


def schema_name(node):
    """Nome dello schema se il nodo è un $ref a components/schemas, altrimenti None."""
    ref = node.get("$ref") if isinstance(node, dict) else None
    if ref and ref.startswith("#/components/schemas/"):
        return ref.rsplit("/", 1)[1]
    return None


def anchor(text):
    keep = [c for c in text.lower() if c.isalnum() or c in " -_"]
    return "".join(keep).strip().replace(" ", "-")


def type_label(spec, node, link_schemas=True):
    """Descrizione compatta del tipo, con link allo schema quando c'è."""
    name = schema_name(node)
    if name:
        return f"[`{name}`](#{anchor(name)})" if link_schemas else f"`{name}`"

    node = resolve(spec, node)
    for combiner in ("oneOf", "anyOf", "allOf"):
        if combiner in node:
            parts = [type_label(spec, sub, link_schemas) for sub in node[combiner]]
            sep = " + " if combiner == "allOf" else " \\| "
            return sep.join(parts)

    t = node.get("type", "object")
    if t == "array":
        items = node.get("items", {})
        return f"array di {type_label(spec, items, link_schemas)}"
    if node.get("format"):
        return f"`{t}` ({node['format']})"
    return f"`{t}`"


def constraints(node):
    """Vincoli del campo resi leggibili: enum, default, minimi, massimi."""
    def span(lo, hi, both, only_lo, only_hi):
        if lo is not None and hi is not None:
            return both.format(lo=lo, hi=hi)
        if lo is not None:
            return only_lo.format(lo=lo)
        if hi is not None:
            return only_hi.format(hi=hi)
        return None

    bits = []
    if "default" in node:
        value = node["default"]
        bits.append(f"default `{value if isinstance(value, str) else json.dumps(value)}`")
    if node.get("enum"):
        bits.append("valori: " + ", ".join(f"`{v}`" for v in node["enum"]))
    rng = span(
        node.get("minimum"), node.get("maximum"),
        "intervallo {lo}–{hi}", "minimo {lo}", "massimo {hi}",
    )
    if rng:
        bits.append(rng)
    length = span(
        node.get("minLength"), node.get("maxLength"),
        "lunghezza {lo}–{hi} caratteri", "almeno {lo} caratteri", "max {hi} caratteri",
    )
    if length:
        bits.append(length)
    if node.get("readOnly"):
        bits.append("sola lettura")
    return "; ".join(bits)


def cell(text):
    """Rende un testo sicuro dentro una cella di tabella Markdown."""
    return " ".join((text or "").split()).replace("|", "\\|")


def fields_table(spec, node, out):
    """Tabella dei campi di uno schema oggetto. Torna True se ha scritto qualcosa."""
    node = resolve(spec, node)
    if "allOf" in node:
        merged = {"type": "object", "properties": {}, "required": []}
        for sub in node["allOf"]:
            sub = resolve(spec, sub)
            merged["properties"].update(sub.get("properties", {}))
            merged["required"].extend(sub.get("required", []))
        node = merged
    props = node.get("properties")
    if not props:
        return False

    required = set(node.get("required", []))
    out.append("| Campo | Tipo | Obbligatorio | Descrizione |")
    out.append("| --- | --- | --- | --- |")
    for field, sub in props.items():
        resolved = resolve(spec, sub) if "$ref" not in sub else {}
        desc = cell(sub.get("description") or resolved.get("description", ""))
        extra = constraints(resolved or sub)
        if extra:
            desc = f"{desc} ({extra})" if desc else extra.capitalize()
        flag = "**sì**" if field in required else "no"
        out.append(f"| `{field}` | {type_label(spec, sub)} | {flag} | {desc or '—'} |")
    out.append("")
    return True


def json_block(value, out, title=None):
    if title:
        out.append(f"*{title}*")
        out.append("")
    out.append("```json")
    out.append(json.dumps(value, indent=2, ensure_ascii=False))
    out.append("```")
    out.append("")


def payload_examples(spec, media, out):
    """Stampa gli esempi di un media type, singoli o multipli."""
    if "examples" in media:
        for ex in media["examples"].values():
            ex = resolve(spec, ex)
            json_block(ex.get("value"), out, ex.get("summary"))
    elif "example" in media:
        json_block(media["example"], out)


def first_example(spec, media):
    if "examples" in media:
        for ex in media["examples"].values():
            return resolve(spec, ex).get("value")
    return media.get("example")


def curl_snippet(spec, method, path, base, op, out):
    """Esempio curl costruito dal primo esempio di richiesta disponibile."""
    lines = [f'curl -X {method.upper()} "{base}{path}" \\']
    lines.append('  -H "Authorization: Bearer $SKILLPLATE_TOKEN" \\')
    body = None
    media = op.get("requestBody", {}).get("content", {}).get("application/json")
    if media:
        body = first_example(spec, media)
    if body is not None:
        lines.append('  -H "Content-Type: application/json" \\')
        payload = json.dumps(body, ensure_ascii=False)
        lines.append(f"  -d '{payload}'")
    else:
        lines[-1] = lines[-1].rstrip(" \\")
    out.append("```bash")
    out.extend(lines)
    out.append("```")
    out.append("")


def render_operation(spec, path, method, op, base, out):
    title = op.get("summary") or f"{method.upper()} {path}"
    out.append(f"#### `{method.upper()} {path}` — {title}")
    out.append("")
    if op.get("description"):
        out.append(op["description"])
        out.append("")

    params = [resolve(spec, p) for p in op.get("parameters", [])]
    if params:
        out.append("**Parametri**")
        out.append("")
        out.append("| Nome | In | Tipo | Obbligatorio | Descrizione |")
        out.append("| --- | --- | --- | --- | --- |")
        for p in params:
            sub = p.get("schema", {})
            resolved = resolve(spec, sub)
            desc = cell(p.get("description", ""))
            extra = constraints(resolved)
            if extra:
                desc = f"{desc} ({extra})" if desc else extra.capitalize()
            flag = "**sì**" if p.get("required") else "no"
            out.append(
                f"| `{p['name']}` | {p.get('in', '')} | {type_label(spec, sub)} "
                f"| {flag} | {desc or '—'} |"
            )
        out.append("")

    body = op.get("requestBody")
    if body:
        media = body.get("content", {}).get("application/json", {})
        sch = media.get("schema", {})
        label = type_label(spec, sch)
        req = " (obbligatorio)" if body.get("required") else " (facoltativo)"
        out.append(f"**Corpo della richiesta**{req}: {label}")
        out.append("")
        if not schema_name(sch):
            fields_table(spec, sch, out)
        payload_examples(spec, media, out)

    out.append("**Risposte**")
    out.append("")
    out.append("| Codice | Descrizione | Corpo |")
    out.append("| --- | --- | --- |")
    bodies = []
    for code, resp in op.get("responses", {}).items():
        resolved = resolve(spec, resp)
        media = resolved.get("content", {}).get("application/json", {})
        sch = media.get("schema")
        out.append(
            f"| `{code}` | {cell(resolved.get('description', ''))} "
            f"| {type_label(spec, sch) if sch else '—'} |"
        )
        if media and code.startswith("2"):
            bodies.append((code, media))
    out.append("")
    for code, media in bodies:
        example = first_example(spec, media)
        if example is not None:
            json_block(example, out, f"Esempio di risposta `{code}`")

    curl_snippet(spec, method, path, base, op, out)
    out.append("---")
    out.append("")


def render(spec):
    DANGLING.clear()
    info = spec["info"]
    server = spec["servers"][0]
    base = server["url"]
    for name, var in server.get("variables", {}).items():
        base = base.replace("{" + name + "}", var["default"])

    out = []
    out.append(f"# {info['title']}")
    out.append("")
    out.append(
        f"> Generato da `docs/openapi.json` con `tools/generate_api_docs.py`. "
        f"Non modificare a mano: rigenera."
    )
    out.append("")
    out.append(f"- **Versione spec:** {info.get('version', 'n/d')} (OpenAPI {spec['openapi']})")
    out.append(f"- **Base URL:** `{base}`")
    out.append(f"- **Spec sorgente:** <https://api.skillplate.com/v1/external/openapi.json>")
    out.append("")
    out.append(info.get("description", ""))
    out.append("")

    tags = {t["name"]: t for t in spec.get("tags", [])}
    groups = spec.get("x-tagGroups") or [{"name": None, "tags": list(tags)}]

    # Raccoglie le operazioni per tag, preservando l'ordine dei path nella spec.
    by_tag = {}
    for path, item in spec["paths"].items():
        for method in METHODS:
            if method in item:
                op = item[method]
                for tag in op.get("tags", ["Senza tag"]):
                    by_tag.setdefault(tag, []).append((path, method, op))

    out.append("## Indice")
    out.append("")
    for group in groups:
        if group.get("name"):
            out.append(f"- **{group['name']}**")
        for tag in group["tags"]:
            indent = "  " if group.get("name") else ""
            count = len(by_tag.get(tag, []))
            out.append(f"{indent}- [{tag}](#{anchor(tag)}) — {count} endpoint")
    out.append("- [Schemi](#schemi)")
    out.append("- [Errori](#errori)")
    out.append("")

    out.append("## Endpoint")
    out.append("")
    for group in groups:
        for tag in group["tags"]:
            ops = by_tag.get(tag)
            if not ops:
                continue
            out.append(f"### {tag}")
            out.append("")
            meta = tags.get(tag, {})
            if meta.get("description"):
                out.append(meta["description"])
                out.append("")
            for path, method, op in ops:
                render_operation(spec, path, method, op, base, out)

    out.append("## Schemi")
    out.append("")
    for name, sch in spec["components"]["schemas"].items():
        out.append(f"### {name}")
        out.append("")
        if sch.get("description"):
            out.append(sch["description"])
            out.append("")
        if not fields_table(spec, sch, out):
            out.append(f"Tipo: {type_label(spec, sch)}")
            out.append("")

    out.append("## Errori")
    out.append("")
    out.append(
        "Gli errori seguono lo schema [`Error`](#error). "
        "Riporta sempre `message` e `request_id` quando una chiamata fallisce."
    )
    out.append("")
    out.append("| Risposta | Codice HTTP | Descrizione |")
    out.append("| --- | --- | --- |")
    for name, resp in spec["components"].get("responses", {}).items():
        code = {
            "Unauthorized": "401",
            "Forbidden": "403",
            "NotFound": "404",
            "ValidationError": "422",
            "RateLimited": "429",
        }.get(name, "—")
        out.append(f"| `{name}` | {code} | {cell(resp.get('description', ''))} |")
    out.append("")

    if DANGLING:
        out.append("## Problemi noti della spec")
        out.append("")
        out.append(
            "Questi riferimenti compaiono in `docs/openapi.json` ma non hanno una "
            "definizione corrispondente. La spec è conservata come viene servita "
            "da Skillplate, senza correzioni locali: vanno risolti a monte."
        )
        out.append("")
        for ref in DANGLING:
            out.append(f"- `{ref}`")
        out.append("")

    text = "\n".join(out)
    while "\n\n\n" in text:
        text = text.replace("\n\n\n", "\n\n")
    return text.rstrip() + "\n"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check",
        action="store_true",
        help="verifica che docs/api.md sia allineato alla spec, senza riscriverlo",
    )
    args = parser.parse_args()

    generated = render(load())
    if args.check:
        current = OUT.read_text(encoding="utf-8") if OUT.exists() else ""
        if current != generated:
            print(f"{OUT.relative_to(ROOT)} è disallineato: rigeneralo.", file=sys.stderr)
            return 1
        print(f"{OUT.relative_to(ROOT)} è allineato.")
        return 0

    OUT.write_text(generated, encoding="utf-8")
    print(f"Scritto {OUT.relative_to(ROOT)} ({len(generated.splitlines())} righe).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
