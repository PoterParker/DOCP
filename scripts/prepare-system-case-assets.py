from pathlib import Path
from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None

ROOT = Path(__file__).resolve().parents[1]

CASES = {
    "宝石工坊": {
        "source": Path(r"C:\Users\yangxiao\Desktop\宝石工坊交互稿.jpg"),
        "crops": [
            ("1-共鸣空槽.png", (200, 1470, 1470, 2205)),
            ("2-共鸣组合.png", (1610, 1470, 2880, 2205)),
            ("3-宝石仓库.png", (240, 5590, 1510, 6325)),
            ("4-宝石合成.png", (1590, 6490, 2860, 7225)),
            ("5-宝石洗炼.png", (4290, 8390, 5570, 9125)),
            ("6-宝石分解.png", (1590, 9480, 2860, 10215)),
        ],
        "cover": "2-共鸣组合.png",
    },
    "搜打撤玩法": {
        "source": Path(r"C:\Users\yangxiao\Desktop\搜打撤玩法交互稿.jpg"),
        "crops": [
            ("1-战前编队.png", (3605, 2015, 5165, 2915)),
            ("2-保险箱选择.png", (1895, 5290, 3465, 6190)),
            ("3-局内主页.png", (195, 6550, 1765, 7450)),
            ("4-个人背包.png", (195, 7980, 1765, 8880)),
            ("5-敌人战利品.png", (1945, 7980, 3515, 8880)),
            ("6-撤离结算.png", (195, 9730, 1765, 10630)),
        ],
        "cover": "3-局内主页.png",
    },
}


def save_screen(source: Image.Image, box: tuple[int, int, int, int], target: Path) -> None:
    crop = source.crop(box).convert("RGB")
    crop.save(target, format="PNG", optimize=True)


def save_cover(screen_path: Path, target: Path) -> None:
    with Image.open(screen_path) as source:
        cover = ImageOps.fit(source.convert("RGB"), (1600, 900), method=Image.Resampling.LANCZOS)
        cover.save(target, format="WEBP", quality=88, method=6)


def save_document(source: Image.Image, target: Path) -> None:
    preview = source.convert("RGB")
    preview.thumbnail((2400, 5000), Image.Resampling.LANCZOS)
    preview.save(target, format="WEBP", quality=76, method=6)


for case_name, config in CASES.items():
    case_dir = ROOT / "public" / "resources" / "系统玩法" / case_name
    screens_dir = case_dir / "关键界面"
    cover_dir = case_dir / "封面"
    document_dir = case_dir / "交互稿"
    screens_dir.mkdir(parents=True, exist_ok=True)
    cover_dir.mkdir(parents=True, exist_ok=True)
    document_dir.mkdir(parents=True, exist_ok=True)

    with Image.open(config["source"]) as source:
        for filename, box in config["crops"]:
            save_screen(source, box, screens_dir / filename)
        save_document(source, document_dir / f"{case_name}交互稿-压缩.webp")

    save_cover(screens_dir / config["cover"], cover_dir / f"{case_name}封面.webp")

    original_bytes = config["source"].stat().st_size
    compressed_bytes = (document_dir / f"{case_name}交互稿-压缩.webp").stat().st_size
    print(f"{case_name}: {original_bytes / 1024 / 1024:.1f} MB -> {compressed_bytes / 1024 / 1024:.1f} MB")
