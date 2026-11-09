import sharp from 'sharp';import{mkdir,writeFile}from'node:fs/promises';
const tasks=[
 ['推币机','推币机交互稿.jpg','神秘宝箱掉落.png',{left:25,top:2385,width:690,height:400}],
 ['推币机','推币机交互稿.jpg','积分兑换商店.png',{left:1440,top:3420,width:700,height:410}],
 ['钓鱼游戏','钓鱼游戏交互稿.jpg','钓鱼页图鉴目标.png',{left:166,top:4261,width:482,height:272}],
 ['组队竞赛活动','节日大富翁活动增加小队合作.jpg','邀请好友.png',{left:1225,top:2355,width:975,height:550}],
 ['组队竞赛活动','节日大富翁活动增加小队合作.jpg','金锤礼包.png',{left:1190,top:4008,width:965,height:550}],
 ['组队竞赛活动','节日大富翁活动增加小队合作.jpg','金锤队员状态.png',{left:2195,top:4008,width:970,height:550}],
 ['组队竞赛活动','节日大富翁活动增加小队合作.jpg','金锤修建效果.png',{left:3195,top:4008,width:975,height:550}]
];const parts=[];for(let i=0;i<tasks.length;i++){const[name,doc,file,region]=tasks[i];const folder='public/resources/运营活动/'+name+'/图片/核心体验';await mkdir(folder,{recursive:true});await sharp('public/resources/运营活动/'+name+'/文档/'+doc).extract(region).png({compressionLevel:9}).toFile(folder+'/'+file);parts.push({input:await sharp(folder+'/'+file).resize(440,255,{fit:'contain',background:'#303643'}).png().toBuffer(),left:i%2*440,top:Math.floor(i/2)*255});}
await sharp({create:{width:880,height:1020,channels:3,background:'#303643'}}).composite(parts).png().toFile('.codex_tmp/activity-extra-screens.png');await writeFile('.codex_tmp/activity-focus-crops.json',JSON.stringify(tasks,null,2));
