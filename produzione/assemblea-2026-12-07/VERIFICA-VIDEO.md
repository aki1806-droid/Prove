# Verifica dei 12 mini video: copioni, grafiche e fonti

Assemblea CISL FP AOUP del 7 dicembre 2026. Verifica fatta il 25/11/2026 su
`video/mini/NN-*.json`: per ogni blocco, il parlato (`testo`), la grafica
(`scena`) e, per le scene `documento`, l'immagine vera in `slide/schermate/`.

Le fonti usate sono solo quelle della cartella: `slide/genera.js` (note),
`documenti/**`, le foto del tavolo e i volantini. Nessun file del progetto è
stato modificato.

**Gravità**
- **ERRORE**: falso o contraddetto da una fonte, oppure in contraddizione con
  un altro video o con la grafica sullo schermo. Va corretto prima del 7/12.
- **DA VERIFICARE**: manca la fonte, oppure la fonte lo segna ⚠ o «da
  verificare» e il video lo dice come un fatto, oppure il dato può scadere
  prima dell'assemblea.
- **REFUSO**: forma, italiano, citazione ritoccata, coerenza della grafica.

---

## Riepilogo: gli errori veri, dal più grave

| # | Video · blocco | Problema | Gravità |
|---|---|---|---|
| 1 | 12 · s02-s03 | «I progetti si pagano con la premialità, aprire un cassetto non svuota l'altro»: **falso secondo l'accordo del 15/04/2026**. L'allegato 2 finanzia la progettualità 2026 (1.040.000 €) con il **residuo del Fondo incarichi e progressioni**, il fondo dei DEP. Lo stesso video 02 (s02) dice che 1,6 milioni di quel fondo sono finiti nella premialità. | ERRORE |
| 2 | 06 · s09 | «Se il contratto va in ritardo per colpe non tue, l'Azienda arriva a tagliare fino al 100%»: **falso**. L'art. 10 della rev.5 dell'Azienda taglia solo se il ritardo è «imputabile al personale incaricato». | ERRORE |
| 3 | 08 · s11 | «OSS di notte nei **quattro** reparti individuati»: il video stesso (s05-s06) e la slide dell'Azienda ne individuano **tre** (7° piano, 6° piano, Neurochirurgia). | ERRORE |
| 4 | 08 · s03 | «Nelle chirurgie solo 5 su 12. **Sono le più scoperte**»: la stessa grafica mostra l'area pediatrica a 2 su 6 (33%), sotto le chirurgie (42%). | ERRORE |
| 5 | 01 · s09 | «Nuovi diritti: **la vestizione entra nell'orario**»: c'era già nell'art. 27 c. 13-14 del CCNL 27/10/2025, come richiama la stessa ipotesi (art. 9 c. 5 lett. l). Non è un diritto nuovo. | ERRORE |
| 6 | 07 · s04 | «Una discesa che **non si è più fermata**»: il grafico sullo schermo mostra risalite nel 2022, 2023 e 2024 e, nel 2026, una risalita da −124 a −103. | ERRORE |
| 7 | 06 · s01, s04, s06 | Soglia europea delle forniture: tutti i calcoli usano **221.000 €** (soglia 2024-25). Se dal 1/1/2026 la soglia per le aziende sanitarie è scesa a 216.000 € (dato che ricordo io, **non presente nelle fonti**), la fornitura da 220.000 € è già sopra soglia e l'esempio −44% (1.650 → 920 €) non regge. | DA VERIFICARE (priorità alta) |
| 8 | 03 · s04 | «L'aumento parte dal **1° gennaio 2027**»: nessuna fonte nella cartella riporta questa decorrenza né l'accordo dei sindacati. La slide dell'Azienda dice «nuova proposta» e la bozza Word non ha data. | DA VERIFICARE |
| 9 | 05 · s09 | «I crediti si prescrivono in **cinque anni**», detto per tutte e tre le vertenze: MATERIALE.md e le note lo segnano ⚠ per i buoni pasto (il gamma dice 10 anni). Il numero va deciso con l'avvocato. | DA VERIFICARE |
| 10 | Tutti | I **sottotitoli** bruciati nel video vengono dal `testo` fonetico: a schermo si leggono «Cisl effe pi», «o esse esse», «qu erre», «erre esse u», «pi ti a» e i numeri in lettere. In 08 s11 una frase comincia con la minuscola. | REFUSO (sistematico, visibile) |

Gli altri punti sono nelle schede dei singoli video.

### I punti aperti indicati nella richiesta

| Punto | Esito |
|---|---|
| 01 · «duecentoquaranta euro» in media per gli infermieri | **Ha una fonte, ma non si può controllare qui.** Viene dalla guida CISL FP del 29/07/2026 (nota di genera.js r. 422), che però non è nella cartella. È plausibile: 130,20 € × 13/12 + 93,35 € di specificità fanno circa 234 €. Il dato vale a regime, dal 2027. |
| 01 · «milleduecentocinquanta» di arretrati | **Ha una fonte ed è coerente.** È la media del volantino CISL FP. Le stime per area vanno da 1.147 a 1.946 €. «Oltre 2.000 € per gli infermieri» torna: 1.399 + 1.027 = 2.426 €, e 1.027 = 93,35 × 11. La stima suppone la firma definitiva entro il 1/12: se la firma arriva a dicembre, gli arretrati sono un po' più alti. |
| 01 · «la vestizione entra nell'orario» | **Errore, non una semplificazione**: vedi il punto 5. |
| 03 · +1.000 € ai coordinatori dal 1/1/2027 | **+1.000 € a 106 coordinatori = 106.000 €: confermato** dalle foto 11 e 13 («nuova proposta», coperta da 109.500 € meno 3.500 €). **La decorrenza 1/1/2027 e l'accordo dei sindacati non risultano da nessuna fonte.** La foto 13 è del primo invio di foto, la cui data LEGGIMI.md segna «da confermare»: anche la didascalia «tavolo del 18/11/2026» va controllata. |
| 08 · «quattro reparti» | **Errore**: le chirurgie individuate sono tre. L'unica altra riga evidenziata dall'Azienda, l'8° piano di area medica (18,00), ha già l'OSS di notte. |
| 12 · 820.000 € ai DEP 2025 | **Confermato.** Lo dicono la preintesa del 10/12/2025 («destinare ai DEP anno 2025, un importo di € 820.000», è la schermata mostrata), gli allegati degli accordi 04, 09 e 14 e la decorrenza 1/1/2025. 820.000 + 620.000 = 1.440.000 €, quindi «oltre 1,4 milioni» è giusto. |

---

## 01 · CCNL (`01-ccnl.json`)

| Blocco | Problema | Fonte | Gravità | Correzione |
|---|---|---|---|---|
| s01 | Il «≈ 240 €» e i «209 € per le altre figure» non sono controllabili: la guida CISL FP del 29/07 non è nella cartella. Inoltre il 209 € medio nasconde differenze forti: un amministrativo prende solo il tabellare, circa 141 €; un OSS circa 174 €. | genera.js r. 422 | DA VERIFICARE | Tenere il 240 €, che è coerente. Valutare se togliere il «209 €», oppure scrivere «stima a regime, dal 2027». |
| s02 | **Immagine `front-ccnl.png`**: la grafica dice il vero (ipotesi del 29/7/2026, CISL FP firmato ed evidenziato). Però mostra in chiaro le altre sigle (FP CGIL, UIL FPL, FIALS, NURSIND, NURSING UP) e il nome del presidente ARAN. SCHEMA.md dice «mai nominare altri sindacati o persone». | SCHEMA.md; immagine | REFUSO (regola interna) | Ritagliare la schermata sul titolo e sulla riga CISL FP, oppure accettarlo consapevolmente, visto che è un documento ufficiale. |
| s03 | «Firma definitiva attesa a dicembre»: la nota r. 445 dice «verificare la data prima dell'assemblea». Nel video è detto come attesa, quindi va bene, ma va ricontrollato il 6/12. | genera.js r. 445 | DA VERIFICARE | Ricontrollare la data. I 30 giorni sono confermati (art. 2 c. 3). |
| s04 | 50,50 / 101,10 / 130,20 €: **confermati** (Tabella 1a). Una nota: «tecnici» qui vuol dire i tecnici **sanitari**. Il ruolo tecnico, cioè gli operatori e gli assistenti tecnici, sta in altre aree e prende meno. | c.txt Tabella 1a | REFUSO | «infermieri, ostetriche, tecnici sanitari e funzionari» |
| s05 | Confermati; vedi i punti aperti. | genera.js r. 486, 634 | — | — |
| s06 | Da 87,79 a 181,14 €: **confermati** (Tabella 3: 181,14 − 93,35). Ma «quasi raddoppiano» è sbagliato per difetto: il valore fa ×2,06 per gli infermieri e ×2,3 per tecnici e OSS. «Ora» fa pensare a soldi già in busta, mentre l'importo decorre dal 1/1/2026 ma arriverà con gli arretrati. | c.txt Tabelle 3-4 | REFUSO | «più che raddoppiano»; etichetta «Dal 2026» al posto di «Ora». |
| s07 | 121,87 / 108,80 / 102,01 €: **confermati**. L'etichetta «OSS senior» va bene (Tabella 4, nota 3: OSS senior e assistente infermiere). | c.txt Tabella 4 | — | — |
| s08 | Art. 28 c. 2, semestre precedente, dal 1/1/2027: **confermato** (c. 17). Omette che la quota spetta solo se arriva ad almeno 3 € al giorno e che conta anche l'indennità UO disagiate. Va bene come sintesi. **Immagine** giusta: art. 28 c. 2 evidenziato. | c.txt art. 28 | — | — |
| s09 | **Vestizione**: non è un diritto nuovo, era già nell'art. 27 c. 13-14 del CCNL 27/10/2025, come richiamato dall'art. 9 c. 5 lett. l) dell'ipotesi. Anche il **patrocinio legale** per le aggressioni esisteva già (l'art. 34 «sostituisce l'art. 55 del CCNL 27.10.2025»). Sono nuovi il supporto psicologico garantito e i 30 giorni di ferie solidali. L'IA (art. 12-13) è confermata. | c.txt r. 676-678, 1898, 2644 | ERRORE (vestizione) / REFUSO (avvocato) | «Nuove tutele: dopo un'aggressione supporto psicologico garantito e fino a 30 giorni di ferie solidali; vestizione e consegne restano nell'orario e in Azienda si possono alzare; nessuna decisione presa solo da un algoritmo.» |
| s10 | Va bene. | — | — | — |

## 02 · Accordi decentrati (`02-accordi.json`)

| Blocco | Problema | Fonte | Gravità | Correzione |
|---|---|---|---|---|
| s01 | «Dodici intese, da dicembre 2025 a settembre 2026»: **confermato**, sono 12 documenti dal 10/12/2025 al 25/09/2026. | documenti/decentrati | — | — |
| s02 | 4.286.894,91 € e 1.600.000 € dal Fondo incarichi: **confermati**. **Immagine** giusta: l'accordo del 15/04/2026 con la cifra evidenziata. «Pagati a novembre» viene solo dalla mail del 18/11 (nota r. 741). Questo blocco smentisce il video 12, s03: vedi lì. | 04-accordo r. 98-107 | — | Va bene. Correggere il video 12. |
| s03 | 820.000 €, partecipazione d'ufficio, 10% riservato: **confermati**. Il kicker dice «ACCORDO 10/12/2025», ma il documento è una **preintesa**, come scrive giustamente s04. | 18-accordo-dep-2025 | REFUSO | «PREINTESA DEP 2025 · 10/12/2025» |
| s04 | 10 anni senza progressioni oppure 20 anni con al massimo 2: **confermato**. «Questa clausola l'abbiamo voluta noi» non ha una fonte. | 18-accordo r. 330-340 | DA VERIFICARE (lieve) | Va bene se Achille conferma. |
| s05 | Da 21,60 a 27,60 € e da 4 a 4,50 €/h: **confermati** (preintesa 14/07). Ma: (a) 4 € è l'**indennità** del CCNL e la «premialità» è solo il +0,50 €; (b) le stesse cifre c'erano già nel **2025** (CISL informa L.R. 26: «da 1,80 a 2,30 €/h», «da 4,00 a 4,50 €/h»). La preintesa le **conferma** per il 2026: «Prima / Ora» fa credere a una novità di quest'anno. | 10-risorse-LR26; welfare/accordo-LR26 | DA VERIFICARE | «Confermato anche per il 2026: la notte da 4 a 4,50 € l'ora, la pronta disponibilità da 21,60 a 27,60 € a turno.» |
| s06 | 650 / 400 / 400 €: **confermati** («stima quota massima annuale»). Qui sì che c'è un aumento: nel 2025 erano 500 / 300 / 300 €. | 10-risorse-LR26; welfare/accordo-LR26 | — | Si può aggiungere «più del 2025». |
| s07 | 15 giorni del CCNL e «3 settimane, di cui almeno 2 consecutive, anche su 6 giorni»: **confermati**. **Immagine** giusta: pag. 7 evidenziata. | 04-accordo r. 287-306 | — | — |
| s08 | 135 posti per 4 anni, bando entro fine 2026, graduatorie entro il 1° trimestre 2027: **confermati**. **Immagine** giusta. | 12-accordo-part-time | — | — |
| s09 | 20 posti, 8 giornate e da 4 a 7 € in PS: **confermati**. Però «salire di area **senza concorso**» è impreciso: la selezione interna ha prove d'esame (teorico-pratica e orale) e valutazione dei titoli. «La Radiologia» comprende tecnici, OSS e infermieri della UOC Radiologia. | 08-regolamento art. 7-9; 09-integrazione r. 76-90 | REFUSO | «con una selezione interna, senza concorso pubblico» |
| s10 | Va bene. | — | — | — |

## 03 · Incarichi (`03-incarichi.json`)

| Blocco | Problema | Fonte | Gravità | Correzione |
|---|---|---|---|---|
| s01 | +500 € a 45 (22.500 €) contro +1.000 € a 106: **confermati** dalle foto 16 e 13. «Oggi sul tavolo» è detto bene, come proposta. | foto 13, 16 | — | — |
| s02 | 22.500 €: confermato. **Immagine** giusta: «La proposta di incremento a 500 € per coordinatori impegna € 22.500», slide del 14/4. | foto 16 | — | — |
| s03 | 106.000 € e una nuova fascia: confermati. «Pagata con 109.500 €»: l'impegno netto è 109.500 − 3.500 di residuo negativo = 106.000 €, va bene. **Immagine** giusta, è la «nuova proposta». La didascalia «tavolo del 18/11/2026» non è certa: la foto 13 appartiene al primo invio, la cui data è segnata «da confermare» (LEGGIMI.md). | foto 11, 13; LEGGIMI.md | DA VERIFICARE (lieve) | Confermare la data con Achille, oppure scrivere «Slide dell'Azienda al tavolo». |
| s04 | «L'aumento parte dal 1° gennaio 2027», detto come un fatto: **nessuna fonte**. La quota premiale 2026 di 500 € ai coordinatori è **confermata** dall'accordo del 14/07. | 09-integrazione r. 219-227 | DA VERIFICARE | Se la decorrenza non è scritta in un documento: «La proposta è sul tavolo, nella bozza di accordo. Intanto per il 2026…». Grafica: «+1.000 € l'anno · proposta». |
| s05 | 86 incarichi = 31 + 19 + 30 + 6: **confermati** (foto 21 e 22 e note). | foto 21, 22 | — | — |
| s06 | 19 tipi, 4.000 € e i nomi dell'elenco: **confermati** (specialistici 7 tipi, esperti 6, professionali 6). | foto 21, 22, 24 | — | — |
| s07 | Bandi per i tutor entro novembre 2026 e quota premiale fino all'affidamento: **confermati**. Al 7/12 novembre sarà passato: la nota dice «verificare se i bandi sono usciti». | 09-integrazione r. 170-182 | DA VERIFICARE | Ricontrollare prima dell'assemblea e aggiornare la frase («sono usciti» oppure «sono in ritardo»). |
| s08 | Mappa → Informativa → DDG → Fondo → Regolamento: confermato. **Immagine** giusta. | foto 19 | — | — |
| s09 | 1.000 € di incarico base, fino a 3.500 €: confermati (art. 17 c. 7; art. 15 tabella). Però l'1/1/2027 riguarda «**tra il 10 e il 40%** dei DEP del personale **cessato**» (non solo dei pensionati), e solo «**previa contrattazione integrativa**»: non arriva da solo. | c.txt art. 39 c. 2 | REFUSO | «Dal 2027, se lo decide la contrattazione in Azienda, ci va una parte dei DEP di chi lascia il servizio.» |
| s10 | Sono richieste: la nota r. 1233 dice «da confermare con Achille». | genera.js r. 1233 | DA VERIFICARE (lieve) | — |

## 04 · Welfare (`04-welfare.json`)

| Blocco | Problema | Fonte | Gravità | Correzione |
|---|---|---|---|---|
| s01 | 350 €, L.R. 26/2024, triennio 2025-2027: **confermati**. | 10-risorse-LR26 | — | — |
| s02 | 3.148.566 €, 1.548.750 € e 1.599.816 €: **confermati**. **Immagine**: la schermata `lr26-welfare-350` mostra solo la frase dei 350 € ai sanitari, non i 3,1 milioni del titolo. | 10-risorse-LR26 r. 136-144 | REFUSO | Usare il ritaglio della tabella degli importi, oppure cambiare il titolo in «350 € a testa». |
| s03 | Nota del 2/4/2026: **confermata**. **Immagine** giusta: il ritaglio non mostra nomi. | nota-cisl-02-04-2026 | — | — |
| s04 | 350 € ai PTA in servizio al 1/9/2026 e 230.000 € dal fondo premialità: **confermati**. Ma la schermata mostrata comincia con «**Analogamente a quanto previsto per l'anno 2025**»: i PTA l'avevano già avuto nel 2025 (lo dice anche il nostro volantino L.R. 26). «Risultato:» presentato come conquista nuova è debole. | 10-risorse-LR26 r. 168-177 | DA VERIFICARE | «Risultato: anche per il 2026 i 350 € vanno ai ruoli PTA, come nel 2025.» |
| s05 | 185.000 € è il dato dell'Azienda al **18/11**, cioè prima della scadenza del 30/11: il residuo finale potrebbe essere più basso. | genera.js r. 1326 | DA VERIFICARE (lieve) | «circa 185.000 € a metà novembre». |
| s06-s07 | 157.008,98 + 27.408 = **184.416,98 €**, non 185.000,03 €: mancano 583 €, quindi «nemmeno un euro torna indietro» è da controllare. | genera.js r. 1326 | DA VERIFICARE (lieve) | Chiedere all'Azienda il dettaglio, oppure dire «quasi tutto» invece di «nemmeno un euro». |
| s08 | Delibera Azienda Zero n. 713 dell'11/11/2026 e DoubleYou: **confermati** dal volantino. | volantini/welfare-2026-doubleyou.jpg | — | — |
| s09 | «Entro il 15 dicembre» è **confermato** dal volantino, ma l'Azienda al tavolo ha detto «**dal 1° dicembre**» (nota r. 1345). Al 7/12 il buono potrebbe essere già attivo, e allora «deve ancora essere comunicato» sarebbe superato. Grammatica: «Come si accede, come si usa e quali negozi aderiscono **devono** ancora essere comunicati». | genera.js r. 1337, 1345 | DA VERIFICARE + REFUSO | Aggiornare il 6/12 e correggere l'accordo del verbo. |
| s10 | Va bene. | — | — | — |

## 05 · Vertenze (`05-vertenze.json`)

| Blocco | Problema | Fonte | Gravità | Correzione |
|---|---|---|---|---|
| s01-s03 | Tribunale di Padova 14/05/2026, 34 giornate più interessi, straordinario, riposo entro 30 giorni o banca ore: **confermati**. Il video evita correttamente i «3.000 €» segnati ⚠. | MATERIALE.md §1 | — | — |
| s04 | Va bene. | MATERIALE.md | — | — |
| s05 | Cass. 25528/2025: confermata. La **citazione tra «» è ritoccata**: il testo vero è «qualsiasi importo **pecuniario che si pone in rapporto di collegamento** all'esecuzione delle mansioni **e che sia correlato allo status personale e professionale del lavoratore**». | MATERIALE.md §2 | REFUSO | Togliere le «» (è una parafrasi), oppure usare il testo vero con i puntini «[…]». |
| s06 | Art. 28 dal 2027: **confermato**, e risolve il ⚠ della nota r. 1447 su decorrenza e calcolo, che sono nel c. 2 e nel c. 17. **Immagine** giusta. | c.txt art. 28 | — | — |
| s07 | Sentenza 3448/2025 di Roma: confermata. La citazione taglia «e incondizionato» senza segnalarlo, una cosa lieve. ⚠ La sentenza AOUP era attesa per fine novembre: al 7/12 potrebbe essere già arrivata (nota r. 1405, 1468). | MATERIALE.md §3 | DA VERIFICARE | Aggiornare il 6/12 con l'esito. |
| s08 | La grafica dice «Turni **da** 6 ore» mentre il parlato dice «almeno sei ore». | — | REFUSO | «Turni di almeno 6 ore senza mensa né buono». |
| s09 | «Si prescrivono in cinque anni» detto per tutto: ⚠ per i buoni pasto il gamma dice 10 anni. La nota dice di decidere con l'avvocato un numero solo. | MATERIALE.md §3 ⚠; genera.js r. 1468 | DA VERIFICARE | Confermare con l'avvocato, oppure «in cinque anni, e a volte anche di più: non rischiare». |
| s10 | Va bene. | — | — | — |

## 06 · Incentivi funzioni tecniche (`06-incentivi.json`)

| Blocco | Problema | Fonte | Gravità | Correzione |
|---|---|---|---|---|
| s01 | −44% (1.650 → 920 €): giusto con la soglia di 221.000 €. **Ma la soglia 2026 va controllata**: la rev.5 rimanda alla soglia «come aggiornata periodicamente dalla Commissione europea». Se per il 2026 è 216.000 € (dato che ricordo io, non presente nelle fonti), 220.000 € è già sopra soglia e l'esempio crolla. | rev5 r. 442-444; ANALISI-COMPARATIVA | DA VERIFICARE (alta) | Controllare la soglia 2026. In ogni caso usare un esempio lontano dalla soglia, per esempio 200.000 € (1.500 €) contro 230.000 € (920 €), cioè −39%. Anche il 2,1 milioni resta valido. |
| s02-s03 | Vanno bene. **Immagine** giusta: Tabella C della rev.5 con le due righe evidenziate. Sulla grafica «**Una aliquota** sola» va scritto «**Un'aliquota** sola». | rev5 Tabella C | REFUSO | «Un'aliquota sola su tutto l'importo» |
| s04 | 1.650 / 920 / 1.050 €: **confermati** con la soglia di 221.000 €. Vale il punto sulla soglia di s01. | rev5 Tabella C | DA VERIFICARE | come s01 |
| s05 | **Immagine** giusta: Tabella C della V22 a scaglioni. | V22 | — | — |
| s06 | 11.200 €, CISL grado 1: **confermato** con il calcolo (2.500 + 3.500 + 5.000 + 200). | V22 Tabella C | — | — |
| s07 | «Quel livello lo sceglie il RUP o il Direttore» va bene per servizi e forniture, dove i criteri sono generici. Ma per i **lavori**, che sono proprio il caso citato («su alcuni lavori l'Azienda dà di più»), la rev.5 ha criteri quasi oggettivi: numero di categorie SOA e progettazione esterna. Al tavolo è un punto facile da contestare. | rev5 r. 410-418 | DA VERIFICARE | «…un livello che per servizi e forniture dipende da criteri generici, decisi caso per caso». |
| s08 | 31 luglio e debito orario: **confermati** (rev.5 art. 9). 30 giorni dal certificato e silenzio-assenso: **confermati** (V22: «entro 30 giorni dall'emissione del certificato»; autorizzazione entro 10 giorni, «decorso tale termine senza motivato diniego… provvede alla liquidazione»). | rev5 r. 821-828; V22 r. 1225-1230, 1376-1380 | — | — |
| s09 | **«Se il contratto va in ritardo per colpe non tue, l'Azienda arriva a tagliare fino al 100%»: falso.** L'art. 10 della rev.5 taglia «purché il ritardo sia **imputabile al personale incaricato**». La differenza vera sta nel tetto (100% contro 50%), nell'**onere della prova** (la rev.5 non lo regola, la V22 lo mette a carico dell'Azienda) e nel contraddittorio. Anche il titolo «Chi paga i ritardi che non dipendono da te» va cambiato. | rev5 art. 10 r. 892-925; V22 art. 10 | ERRORE | «Se il contratto va in ritardo, l'Azienda può tagliare fino al 100%, e non dice chi deve provare di chi è la colpa. Noi diciamo al massimo il 50%, e la prova tocca all'Azienda.» Titolo: «Chi deve provare di chi è il ritardo». |
| s10 | Relazione a RSU e sindacati, nessuna economia di bilancio, arretrati dal 1/7/2023: **confermati**. **Immagine**: mostra solo la trasmissione a RSU e sindacati, mentre il titolo parla di soldi che «restano dei lavoratori». È accettabile. | V22 r. 1086, 1287, 1631-1644 | — | — |
| s11 | Va bene. | — | — | — |

## 07 · Occupazione (`07-occupazione.json`)

| Blocco | Problema | Fonte | Gravità | Correzione |
|---|---|---|---|---|
| s01 | «C'è un solo profilo che ha perso persone»: il grafico dell'Azienda confronta solo **tre** profili (infermieri, dirigenti medici, OSS). Per tecnici e amministrativi dal 2020 non ci sono dati. | foto 35 | DA VERIFICARE | «Dei tre profili che l'Azienda ha mostrato, uno solo ha perso persone.» Correggere anche la barra «unici in calo». |
| s02-s03 | −103, +219, +117: **confermati** dal grafico. | foto 35 | — | — |
| s04 | +220 a fine 2021: confermato. **«Una discesa che non si è più fermata» è smentito dal grafico mostrato**: ci sono risalite nel 2022, nel 2023 e a metà 2024, e il minimo di −124 è risalito a −103. | foto 35; genera.js r. 1724 | ERRORE | «Da lì, tra alti e bassi, è scesa fino a −124, e oggi siamo a −103.» **Immagine** giusta. |
| s05 | 182 / 197 / −15: **confermati** (foto 27 e 36). Ma la tabella dell'Azienda avverte che «**non sono considerati i cambi di profilo e i passaggi da TD a TI**». Infatti le teste degli infermieri al 30/09/2026 (2.757) sono **più** di quelle al 31/12/2025 (2.746). | foto 33, 36 | DA VERIFICARE | Aggiungere «senza contare i passaggi da tempo determinato a indeterminato», oppure togliere «non basta nemmeno a pareggiare». |
| s06-s07 | +141, −26, 38 contro 75: **confermati** (foto 33). | foto 33 | — | — |
| s08 | Giudizio, va bene. | — | — | — |
| s09-s10 | Il tavolo bimestrale è **confermato** dalla dichiarazione del 23/12/2025. Le richieste sono «da confermare con Achille» (nota r. 1796). | 19-dichiarazione | — | — |
| s11 | Va bene. | — | — | — |

## 08 · OSS di notte (`08-oss-notte.json`)

| Blocco | Problema | Fonte | Gravità | Correzione |
|---|---|---|---|---|
| s02 | 31 su 49, 63%, 16 dopo il 2020: **confermati** (foto 9; 20+12+6+2+9 = 49). | foto 9 | — | — |
| s03 | 17/20 e 5/12: confermati. **«Sono le più scoperte» e il titolo «Le chirurgie sono le più scoperte» sono smentiti dalla barra sotto**: l'area pediatrica è a 2 su 6 (33%). | foto 9 | ERRORE | «Tra gli adulti, le chirurgie sono le più scoperte: solo 5 su 12.» |
| s04 | La slide dice «Degenza ordinaria 1:12-15 sulle 24 H», senza la parola «**regionale**». | foto 3, 6 | DA VERIFICARE (lieve) | «Lo standard di riferimento…», a meno che non ci sia la delibera regionale. |
| s05-s06 | 7° piano 19,00 (PS H24), 6° piano 13,50 (ricoveri urgenti), Neurochirurgia 12,50 (trasporti notturni), nessuno con OSS di notte: **confermati** leggendo la tabella. **Immagine** giusta. | foto 6 | — | — |
| s07 | Confermato. **Immagine** giusta. Si può aggiungere che la dichiarazione del 23/12/2025 aveva già fissato **12-18 mesi** per gli OSS nelle chirurgie: è un appiglio più forte di «una promessa». | 19-dichiarazione (fine) | — | Spunto: «Ce lo siamo già scritto a dicembre 2025: OSS nelle chirurgie in 12-18 mesi.» |
| s08-s10 | Graduatorie AOUP, ULSS 6 e 3, Azienda Zero, turni M-P-N: **confermati** (foto 2). | foto 2 | — | — |
| s11 | **«Nei quattro reparti individuati»: sono tre** (s05-s06). La quarta riga evidenziata dall'Azienda, l'8° piano medica, ha già l'OSS di notte. | foto 3, 6; video stesso | ERRORE | «nelle tre chirurgie individuate, entro un anno». Correggere anche la grafica della chiusura. Sottotitolo: la frase comincia con «o esse esse» minuscolo. |

## 09 · Notte di 12 ore (`09-notte-12-ore.json`)

| Blocco | Problema | Fonte | Gravità | Correzione |
|---|---|---|---|---|
| s02-s04 | 6h22'/7h15'/11h15' contro 6h15'/6h15'/12h, somme 24h52' e 24h30', −22', da 15 a 41 ore, da 2 a 7 rientri: **confermati** dal dossier. | dossier r. 33-121, 489-491 | — | — |
| s05 | «Mattina più pomeriggio fa dodici ore e venti»: 6h15' + 6h15' fa 12h30'. Il 12h20' è la **durata da inizio a fine** con la sovrapposizione delle consegne (come nel dossier). Chi ascolta fa il conto e non gli torna. | dossier r. 415-417 | REFUSO | «mattina e pomeriggio di fila coprono dodici ore e venti». |
| s06 | Dossier di ottobre 2026: confermato. | dossier r. 22 | — | — |
| s07 | 15 minuti, art. 24 innalzabili, 20-22 minuti il 3/11: **confermati**. **Immagine** giusta (c. 13-14). | c.txt art. 24; genera.js r. 2013 | — | — |
| s08-s10 | Confermati dal dossier: prova di 6 mesi, pausa di 30 minuti, doppi turni volontari. | dossier r. 852-898 | — | — |

## 10 · Ferie (`10-ferie.json`)

| Blocco | Problema | Fonte | Gravità | Correzione |
|---|---|---|---|---|
| s01-s06, s08-s10 | D.L. 144/2026 art. 1, L. 174/2026, contenuti, posizione CISL, ULSS 6: tutti **confermati** dal volantino. | volantini/ferie-dl-144-2026.jpg | — | — |
| s07 | Va bene. **Immagine** giusta (pag. 7). | 04-accordo | — | — |

Nessun errore.

## 11 · Perseo Sirio (`11-perseo-sirio.json`)

| Blocco | Problema | Fonte | Gravità | Correzione |
|---|---|---|---|---|
| s02-s03 | 6,91%, 1% + 1%, contributo del datore solo agli iscritti: **confermati**. | ricerca §1-2 | — | — |
| s04 | 97.500 / 141.600 / 195.400 €: **confermati** (esempio A). Il confronto però non dice che chi aderisce versa anche **12.170 € suoi** (l'1% del lavoratore), e s05 attribuisce la differenza solo all'Azienda, ai rendimenti e alle tasse. | ricerca r. 486-498 | DA VERIFICARE (onestà del confronto) | In s05: «Dai soldi dell'Azienda e dal tuo 1%, più i rendimenti…» |
| s05 | 15→9% confermato. ≈ 25% su TFR/TFS è una stima dichiarata come tale: va bene. | ricerca r. 234-249 | — | — |
| s06 | 33% → 670 € e 5.300 €: confermati. | ricerca r. 206 | — | — |
| s07 | La grafica dice «**Non si torna indietro**» come un fatto. La ricerca lo segna **[NON VERIFICATO]** e la nota r. 2189 dice «da confermare su fonte primaria». | ricerca r. 166 | DA VERIFICARE | «Di solito non si torna indietro: chiedi prima». Oppure togliere la riga. |
| s08 | 8 anni, tre motivi, almeno 50% in rendita: confermati. | ricerca r. 403-412 | — | — |
| s09 | Garantito 1,12% contro TFR 2,50% a 10 anni: **confermati** dalla Nota informativa al 31/12/2025, fonte primaria. La nota r. 2224, che parla di Sky TG24, è superata dalla ricerca. | ricerca r. 321-327 | — | — |
| — | Il parlato è di 2.151 caratteri, sopra il tetto di 1.950 di SCHEMA.md. | SCHEMA.md | REFUSO (produzione) | — |

## 12 · Dati alla mano (`12-dati-alla-mano.json`)

| Blocco | Problema | Fonte | Gravità | Correzione |
|---|---|---|---|---|
| s02-s03 | **«I progetti pagati con la premialità tolgono soldi a progressioni e DEP: FALSO. I progetti si pagano con la premialità. Aprire un cassetto non svuota l'altro.»** L'accordo del 15/04/2026, **allegato 2**, destina 1.040.000 € del «**Residuo Fondo Incarichi, Progr. Econ. e Ind. Prof. 2025**» alla «Progettualità 2026». Il testo dice: «le parti concordano di destinarne quota parte a progettualità anno 2026». Lo stesso accordo porta 1,6 milioni di quel fondo nel conguaglio della premialità, come dice il video 02, s02. Anche l'integrazione di luglio usa i residui di **entrambi** i fondi (artt. 63 e 64). Chi ha messo in giro la voce può mostrare l'allegato in sala. La tesi si può difendere solo così: i residui sono soldi di un anno solo, mentre un DEP è una spesa fissa per sempre (da verificare con l'Azienda o con la norma). | 04-accordo r. 85-90 e allegato 2; 09-integrazione r. 71-75; video 02 s02 | ERRORE (grave) | Riscrivere s02-s03, per esempio: «I DEP sono un aumento per sempre: si pagano solo con le risorse stabili del fondo. I progetti usano residui che valgono un anno solo e che sui DEP non si possono mettere.» Prima va verificato il vincolo. Oppure togliere la prima affermazione. |
| s04 | «Abbiamo sempre e solo parlato di attesa»: il video 01 (s02) e la slide del punto 1 dicono «**abbiamo firmato** all'ARAN» (l'ipotesi). È corretto, ma qualcuno potrebbe tagliare la frase e usarla contro di noi. | video 01 s02; genera.js r. 416 | DA VERIFICARE (lieve) | Va bene, perché il video 01 dice «ipotesi». Basta saperlo. |
| s05-s06 | Va bene, è coerente con il video 01. | MATERIALE.md (Bugiardino) | — | — |
| s07 | 620.000 €, «somma massima»: **confermato**. Il residuo disponibile del Fondo incarichi è 618.004,12 € (accordo DEP 2026, allegato). | 14-accordo-dep-2026 r. 100, 552-590 | — | — |
| s08 | 820.000 € e oltre 1,4 milioni: **confermati**. **Immagine** giusta: la preintesa con la cifra evidenziata. | 18-accordo-dep-2025 r. 106 | — | — |
| s09 | «**Una legge regionale** calcola alcune risorse variabili sul numero di dipendenti»: nell'accordo DEP 2026 la voce tolta dal fondo è «risorse variabili **art. 11 D.L. 35/2019**», che è una legge dello Stato. Il limite regionale del 2026 è una **delibera** (DGRV 186/2026), non una legge. La formula viene dalla bozza del Bugiardino. | 14-accordo-dep-2026 r. 413-421, 580-585; 04-accordo r. 78-84 | DA VERIFICARE | «Una norma calcola alcune risorse variabili sul numero di dipendenti…», oppure citare correttamente il D.L. 35/2019. |
| s10-s11 | Va bene. | — | — | — |

---

## Note trasversali

1. **Sottotitoli** (`monta.py` costruisce `sottotitoli.ass` dal `testo`): a
   schermo compaiono la grafia fonetica e i numeri in lettere. Esempi da
   `lavoro/*/sottotitoli.ass`: «Cisl effe pi», «gli o esse esse», «tre codici
   qu erre», «a erre esse u», «personale pi ti / a.» (spezzato su due righe),
   «duecentodiciannove». Serve un campo di testo per i sottotitoli, oppure una
   tabella di sostituzione (OSS, CISL FP, QR, RSU, PTA, cifre) prima di
   scrivere il file `.ass`.
2. **Altre sigle e persone**: nessun parlato nomina altri sindacati o
   persone. Le compare a schermo **solo** la schermata `front-ccnl.png`
   (video 01, s02). I ritagli delle foto del tavolo usati nei video non
   mostrano nomi. La foto 10, con il nome dell'utente Word, non è usata.
3. **Dati da riaggiornare il 6 dicembre**: firma definitiva del CCNL
   (01 s03, 12 s06), bandi dei tutor (03 s07), buono 2026 attivo dal 1/12 o
   no (04 s09), sentenza dei buoni pasto AOUP (05 s07), bando part time
   uscito (02 s08).
4. **Le schermate dei documenti**: tutte le 19 immagini usate esistono e
   mostrano quello che dice la didascalia, tranne `lr26-welfare-350.png`, che
   non contiene i 3,1 milioni del titolo (04 s02). Per `front-ccnl.png` vale
   la nota 2.
