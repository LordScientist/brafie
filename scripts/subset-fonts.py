# -*- coding: utf-8 -*-
"""Subset Bitter to the Latin ranges it renders.

BITTER is the display serif. It is used for headings, stat figures and the
numerals on the Care Cards (01-12), the How-It-Works steps and the self-check
step counter. Because it now sets headings, it ships the full Latin face
(not a digit-only subset): letters and digits both need glyphs.

Google Fonts already serves Bitter pre-split into latin and latin-ext woff2
files; this script re-subsets each to exactly the ranges declared in
src/styles/fonts.css, so a stray glyph can never pull in the wrong file.

Run this when a font source changes; commit the output.
"""
import os, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, 'public', 'fonts')

# The two @font-face ranges from src/styles/fonts.css, keyed by file.
RANGES = {
    'bitter-normal-latin.woff2': (
        'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,'
        'U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,'
        'U+2212,U+2215,U+FEFF,U+FFFD'
    ),
    'bitter-normal-latin-ext.woff2': (
        'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,'
        'U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,'
        'U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF'
    ),
}

def kb(path):
    return os.path.getsize(path) / 1024.0

def main():
    print('== Bitter: subset to the Latin ranges ==')
    for name, unicodes in RANGES.items():
        src = os.path.join(FONTS, name)
        if not os.path.exists(src):
            print('  skip (missing): %s' % name)
            continue
        before = kb(src)
        out = src + '.tmp'
        subprocess.run([
            sys.executable, '-m', 'fontTools.subset', src,
            '--unicodes=' + unicodes,
            '--flavor=woff2',
            '--desubroutinize',
            '--output-file=' + out,
        ], check=True, capture_output=True)
        os.replace(out, src)
        print('  %-34s %6.1f KB -> %5.1f KB' % (name, before, kb(src)))

if __name__ == '__main__':
    main()
