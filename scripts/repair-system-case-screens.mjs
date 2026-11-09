import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
const cases={
 '宝石工坊':[
 ['1-共鸣空槽.png',200,1470,1270,735],['2-共鸣组合.png',1610,1470,1270,735],
 ['3-宝石仓库.png',240,5590,1270,735],['4-宝石合成.png',1590,6490,1270,735],
 ['5-宝石洗炼.png',4290,8390,1280,735],['6-宝石分解.png',1590,9480,1270,735]],
 '搜打撤玩法':[
 ['1-战前编队.png',3605,2015,1560,900],['2-保险箱选择.png',1895,5290,1570,900],
 ['3-局内主页.png',195,6550,1570,900],['4-个人背包.png',195,7980,1570,900],
 ['5-敌人战利品.png',1945,7980,1570,900],['6-撤离结算.png',195,9730,1570,900]]};
const previews=[];for(const [name,crops]of Object.entries(cases)){const source='C:/Users/yangxiao/Desktop/'+name+'交互稿.jpg';const dest='public/resources/系统玩法/'+name+'/关键界面/';for(const [file,left,top,width,height]of crops){await sharp(source).extract({left,top,width,height}).png({compressionLevel:9}).toFile(dest+file);previews.push({input:await sharp(dest+file).resize(380,220,{fit:'contain',background:'#34383d'}).png().toBuffer(),left:((previews.length)%3)*380,top:Math.floor(previews.length/3)*220});}
 if(name==='搜打撤玩法'){const success=await sharp(source).extract({left:195,top:9730,width:1570,height:900}).png().toBuffer();const fail=await sharp(source).extract({left:2640,top:9730,width:1570,height:900}).png().toBuffer();const folder='public/resources/系统玩法/'+name+'/设计重点';await mkdir(folder,{recursive:true});await sharp({create:{width:3160,height:900,channels:3,background:'#242735'}}).composite([{input:success,left:0,top:0},{input:fail,left:1590,top:0}]).png({compressionLevel:9}).toFile(folder+'/撤离成功与失败.png');}}
await sharp({create:{width:1140,height:880,channels:3,background:'#34383d'}}).composite(previews).png().toFile('.codex_tmp/system-screens-complete.png');
await writeFile('.codex_tmp/system-crop-regions.json',JSON.stringify(cases,null,2));
