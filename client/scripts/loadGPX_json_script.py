import os
import re
import json
from itertools import cycle

# --- Configuration ---
# The absolute path to your project's root (where Will-Spichiger-Site is)
# We determine this dynamically to make the script more portable.
# This assumes the script is run from Will-Spichiger-Site or a subdirectory
# and 'client/public/rides' is relative to that.
project_root = "C:\\Users\\wspic\\Will-Spichiger-Site" # Explicitly set this for clarity

# Directory containing your GPX files, relative to project_root
rides_relative_dir = 'client/public/rides'
rides_dir = os.path.join(project_root, rides_relative_dir)

# Output directory for the JSON file, relative to project_root
output_relative_dir = 'client/public'
output_filepath = os.path.join(project_root, output_relative_dir, 'gpxFiles.json')

# Example color palette (expand as needed)
colors = ["#411C6B", "#21D3C4", "#BE2A6F", "#FFD700", "#1E90FF", "#DAA520"] # Added more colors
color_cycle = cycle(colors)

# List to hold file info
gpx_files = []

# Regex pattern: grab text after the second underscore, up to '.gpx'
# This pattern is specific to filenames like "prefix_something_label.gpx"
pattern = re.compile(r'[^_]*_[^_]*_(.*?)\.gpx$')

# --- Script Logic ---
if not os.path.exists(rides_dir):
    print(f"Error: Rides directory not found at {rides_dir}")
    print("Please ensure your GPX files are located there.")
    exit()

print(f"Scanning GPX files in: {rides_dir}")

for filename in sorted(os.listdir(rides_dir)):
    if filename.endswith('.gpx'):
        match = pattern.match(filename)
        if match:
            label = match.group(1).replace('-', ' ').strip() # Often labels have hyphens, replace with space
        else:
            label = os.path.splitext(filename)[0].replace('-', ' ').strip() # fallback if no match

        color = next(color_cycle)

        # IMPORTANT: The "file" path in the JSON should be relative to the
        # web server's root for your client application to fetch it.
        # Since Vite serves 'client/public' as '/', the path needs to be '/rides/filename.gpx'.
        file_info = {
            "file": f"/rides/{filename}", # This is the URL path the browser will request
            "color": color,
            "label": label
        }
        gpx_files.append(file_info)

# Create the output directory if it doesn't exist
os.makedirs(os.path.dirname(output_filepath), exist_ok=True)

# Save to JSON file
try:
    with open(output_filepath, 'w', encoding='utf-8') as f:
        json.dump(gpx_files, f, indent=4)
    print(f"Generated {len(gpx_files)} entries into {output_filepath}")
except Exception as e:
    print(f"Error saving gpxFiles.json: {e}")