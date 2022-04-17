# Script for linearly sampling points of a svg file with a single path & saving the points to json.
# Requirements: have `svgpathtools` installed.

filename = "amy"

from svgpathtools import svg2paths
paths, attributes = svg2paths(f'{filename}.svg')
import json

if len(paths) == 1:
    path = paths[0]

NUM_SAMPLES = 2000

myPath = []
for i in range(NUM_SAMPLES):
    pt = path.point(i/(NUM_SAMPLES-1))
    myPath.append({"x": pt.real, "y": pt.imag})

with open(f"{filename}.json", "w") as f:
    json.dump(myPath, f)