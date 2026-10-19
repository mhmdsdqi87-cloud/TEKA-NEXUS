#!/bin/bash
cd /home/z/my-project/public/covers
STYLE="dark navy blue to deep purple gradient background, glowing neon cyan wireframe style, luminous nodes and edges, subtle hexagonal grid pattern overlay, minimalist abstract digital art, high quality, no text, 16:9 wide banner"
gen() {
  z-ai image -p "Abstract tech illustration: $2. $STYLE" -o "./$1.png" -s 1344x768 && echo "OK: $1" || echo "FAIL: $1"
}
gen webloom "an ancient wooden loom weaving glowing threads of light into a website page layout"
gen pitchframe "floating translucent glass presentation frames and slides arranged in perspective"
gen quantum-ledger "a lattice of interlocking translucent cubes forming a blockchain chain structure"
gen echoform "a smartphone emitting concentric radio signal rings that turn into data waves"
gen datadock "a harbor dock with glowing shipping containers made of bar charts and data blocks"
gen choreograph "a robotic arm drawing elegant glowing motion trajectory arcs in the air"
gen herald "a glowing megaphone projecting flowing document pages and changelog lines"
gen sigil-tactics "glowing magical runes on a hexagonal tactics grid battlefield seen from above"
gen guardrail "a protective shield built from glowing code brackets and padlock shapes"
gen whisperpipe "a sound waveform flowing into a curved glass pipe and becoming encrypted dots"
gen solarnest "a solar panel array shaped like a bird nest with glowing energy lines"
echo "ALL DONE"
