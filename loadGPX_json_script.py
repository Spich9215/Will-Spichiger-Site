import os
import re
import json
from itertools import cycle

# Directory containing your GPX files
rides_dir = 'rides'

# Example color palette (expand as needed)
colors = ['#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FF00FF', '#00FFFF']
color_cycle = cycle(colors)

# List to hold file info
gpx_files = []

# Regex pattern: grab text after the second underscore, up to '.gpx'
pattern = re.compile(r'[^_]*_[^_]*_(.*?)\.gpx$')

for filename in sorted(os.listdir(rides_dir)):
    if filename.endswith('.gpx'):
        match = pattern.match(filename)
        if match:
            label = match.group(1)
        else:
            label = os.path.splitext(filename)[0]  # fallback if no match

        color = next(color_cycle)

        file_info = {
            "file": os.path.join(rides_dir, filename).replace('\\', '/'),
            "color": color,
            "label": label
        }
        gpx_files.append(file_info)

# Save to JSON file
with open('gpxFiles.json', 'w', encoding='utf-8') as f:
    json.dump(gpx_files, f, indent=4)

print(f"Generated gpxFiles.json with {len(gpx_files)} entries.")
