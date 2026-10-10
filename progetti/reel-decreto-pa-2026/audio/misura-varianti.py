"""Misure oggettive delle varianti di voce: pause, loudness, picchi."""
import re, subprocess, sys
for f in sys.argv[1:]:
    e = subprocess.run(["ffmpeg","-hide_banner","-nostats","-i",f,"-af",
        "silencedetect=n=-40dB:d=0.3,ebur128=framelog=quiet,astats=metadata=0",
        "-f","null","-"],capture_output=True,text=True).stderr
    st=[float(x) for x in re.findall(r"silence_start: ([\d.]+)",e)]
    du=[float(x) for x in re.findall(r"silence_duration: ([\d.]+)",e)]
    I=re.findall(r"I:\s+(-?[\d.]+) LUFS",e)[-1]; L=re.findall(r"LRA:\s+([\d.]+) LU",e)[-1]
    pk=re.findall(r"Peak level dB: (-?[\d.]+)",e)[-1]
    lunghe=[(round(s,1),round(d,2)) for s,d in zip(st,du) if d>1.0]
    print(f"{f}: pause={len(du)} max={max(du):.2f}s >1s={lunghe} I={I} LRA={L} picco={pk}dB parlato={sum(1 for _ in du)}")
