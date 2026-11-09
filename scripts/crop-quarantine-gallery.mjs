import sharp from 'sharp';
const source='public/resources/系统玩法/检疫玩法/交互稿/检疫玩法交互稿.png';
const output='public/resources/系统玩法/检疫玩法/关键界面/';
for(const [name,left,top,width,height] of [
 ['8-清洗完成.png',1315,3990,447,750],
 ['9-感染伤口.png',994,5205,334,594],
 ['10-体征正常.png',2253,5158,342,611],
 ['11-批准接纳.png',1655,6234,402,715],
]) await sharp(source).extract({left,top,width,height}).png({compressionLevel:9}).toFile(output+name);
