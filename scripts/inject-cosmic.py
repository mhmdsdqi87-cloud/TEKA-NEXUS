#!/usr/bin/env python3
"""Inject cosmic animated SVG assets into all 7 TEKA NEXUS READMEs."""
import io

ALTS = {
    "README.md":    {"galaxy": "A rotating golden galaxy — the TEKA NEXUS core",
                     "orbit":  "Eight systems orbiting the TEKA NEXUS core",
                     "dna":    "An animated golden DNA helix",
                     "star":   "A living starfield with a pulsing star"},
    "README.fa.md": {"galaxy": "کهکشان طلاییِ در حال چرخش — هسته‌ی TEKA NEXUS",
                     "orbit":  "هشت سیستم در مدارِ هسته‌ی TEKA NEXUS",
                     "dna":    "مارپیچ دوگانه‌ی طلایی متحرک",
                     "star":   "زمین ستاره‌ای زنده با ستاره‌ی تپنده"},
    "README.ar.md": {"galaxy": "مجرة ذهبية دوّارة — نواة TEKA NEXUS",
                     "orbit":  "ثمانية أنظمة تدور حول نواة TEKA NEXUS",
                     "dna":    "لولب DNA ذهبي متحرك",
                     "star":   "حقل نجمي حي مع نجم نابض"},
    "README.es.md": {"galaxy": "Una galaxia dorada giratoria — el núcleo de TEKA NEXUS",
                     "orbit":  "Ocho sistemas orbitando el núcleo de TEKA NEXUS",
                     "dna":    "Una doble hélice de ADN dorada animada",
                     "star":   "Un cielo estrellado vivo con una estrella palpitante"},
    "README.fr.md": {"galaxy": "Une galaxie dorée en rotation — le cœur de TEKA NEXUS",
                     "orbit":  "Huit systèmes en orbite autour du cœur de TEKA NEXUS",
                     "dna":    "Une double hélice d'ADN dorée animée",
                     "star":   "Un ciel étoilé vivant avec une étoile pulsante"},
    "README.ru.md": {"galaxy": "Вращающаяся золотая галактика — ядро TEKA NEXUS",
                     "orbit":  "Восемь систем на орбите ядра TEKA NEXUS",
                     "dna":    "Анимированная золотая двойная спираль ДНК",
                     "star":   "Живое звёздное небо с пульсирующей звездой"},
    "README.zh.md": {"galaxy": "旋转的金色星系 —— TEKA NEXUS 的核心",
                     "orbit":  "八大系统环绕 TEKA NEXUS 核心运行",
                     "dna":    "动画金色 DNA 双螺旋",
                     "star":   "跃动的星空与脉冲星"},
}

FILES = list(ALTS.keys())


def inject(path, alts):
    with io.open(path, encoding="utf-8") as fh:
        lines = fh.read().split("\n")

    assert sum(1 for l in lines if l.startswith("## 🌍")) == 1, path
    assert sum(1 for l in lines if l.startswith("## 🧬")) == 1, path
    assert sum(1 for l in lines if l.startswith("> ⚠️")) == 1, path
    assert sum(1 for l in lines if l.startswith("⭐ **")) == 1, path

    out = []
    for line in lines:
        if line.startswith("## 🌍"):
            out += [line, "",
                    '<div align="center">', "",
                    f'<img src=".github/assets/galaxy-core.svg" alt="{alts["galaxy"]}" width="700">', "",
                    "</div>"]
            continue
        if line.startswith("## 🧬"):
            out += [line, "",
                    '<div align="center">', "",
                    f'<img src=".github/assets/orbit-systems.svg" alt="{alts["orbit"]}" width="100%">', "",
                    "</div>"]
            continue
        if line.startswith("> ⚠️"):
            out += ['<div align="center">', "",
                    f'<img src=".github/assets/dna-helix.svg" alt="{alts["dna"]}" width="680">', "",
                    "</div>", ""]
            out.append(line)
            continue
        if line.startswith("⭐ **"):
            out += [f'<img src=".github/assets/starfield-cta.svg" alt="{alts["star"]}" width="100%">', ""]
            out.append(line)
            continue
        out.append(line)

    with io.open(path, "w", encoding="utf-8") as fh:
        fh.write("\n".join(out))
    print(f"OK {path}: injected 4 cosmic assets")


for f in FILES:
    inject(f, ALTS[f])
print("done")
