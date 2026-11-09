from collections import deque
from pathlib import Path
import sys

from PIL import Image, ImageFilter


def is_checker_background(pixel: tuple[int, int, int]) -> bool:
    red, green, blue = pixel
    return min(pixel) >= 222 and max(pixel) - min(pixel) <= 9


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: process-profile-cutout.py INPUT OUTPUT")

    source = Path(sys.argv[1])
    destination = Path(sys.argv[2])
    image = Image.open(source).convert("RGB")
    width, height = image.size
    pixels = image.load()

    background = bytearray(width * height)
    queue: deque[tuple[int, int]] = deque()

    def enqueue(x: int, y: int) -> None:
        index = y * width + x
        if not background[index] and is_checker_background(pixels[x, y]):
            background[index] = 255
            queue.append((x, y))

    for x in range(width):
        enqueue(x, 0)
        enqueue(x, height - 1)
    for y in range(height):
        enqueue(0, y)
        enqueue(width - 1, y)

    while queue:
        x, y = queue.popleft()
        if x > 0:
            enqueue(x - 1, y)
        if x + 1 < width:
            enqueue(x + 1, y)
        if y > 0:
            enqueue(x, y - 1)
        if y + 1 < height:
            enqueue(x, y + 1)

    background_mask = Image.frombytes("L", image.size, bytes(background))
    background_mask = background_mask.filter(ImageFilter.GaussianBlur(0.55))
    alpha = background_mask.point(lambda value: 255 - value)

    result = image.convert("RGBA")
    result.putalpha(alpha)
    destination.parent.mkdir(parents=True, exist_ok=True)
    result.save(destination, optimize=True)


if __name__ == "__main__":
    main()
