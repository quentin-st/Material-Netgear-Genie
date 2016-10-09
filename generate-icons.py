#!/usr/bin/python3
# -*- coding: utf-8 -*-

import os
import json
from PIL import Image

manifest = 'manifest.json'
destination = 'data/img'

# Open manifest & read required icons dimensions
with open(manifest) as manifest_file:
    manifest_json = json.load(manifest_file)

icons_dicts = [
    manifest_json['icons'],
    # manifest_json['browser_action']['default_icon']
]

dimensions = []
for icons_dict in icons_dicts:
    for key in icons_dict.keys():
        if key not in dimensions:
            dimensions.append(int(key))

# Generate!
os.chdir(destination)
for dimension in dimensions:
    if dimension == 256:
        continue

    icon_name = 'icon-{}x{}.png'.format(dimension, dimension)
    print('\tGenerating {}'.format(icon_name))

    im = Image.open('icon-256x256.png')
    im.thumbnail((dimension, dimension), Image.ANTIALIAS)
    im.save(icon_name, 'png')
