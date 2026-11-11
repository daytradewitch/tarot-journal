"""Shrink big phone photos in /photos and remove hidden data such as GPS location."""
import pathlib
from PIL import Image, ImageOps

MAX_SIDE = 1600
changed = 0
for path in pathlib.Path("photos").iterdir():
    if path.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
        continue
    with Image.open(path) as im:
        has_meta = bool(im.info.get("exif")) or bool(im.getexif())
        if max(im.size) <= MAX_SIDE and not has_meta:
            continue  # already small and clean
        im = ImageOps.exif_transpose(im)  # keep the photo the right way up
        im.thumbnail((MAX_SIDE, MAX_SIDE))
        if path.suffix.lower() in {".jpg", ".jpeg"}:
            im.convert("RGB").save(path, quality=82, optimize=True, progressive=True)
        else:
            im.save(path, optimize=True)
        changed += 1
        print("shrunk", path)
print(f"{changed} photo(s) updated")
