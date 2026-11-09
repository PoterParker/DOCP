"use client";

import { useId } from "react";
import type { CSSProperties } from "react";
import styles from "./activity-focus.module.css";
import { EditableText } from "./text-editor";

type Mark = { label: string; x: number; y: number; w: number; h: number; color?: string };
type Frame = { title: string; src: string; marks?: Mark[] };
type Visual = { frames: Frame[] };
const path = (project: string, file: string) => `/resources/运营活动/${project}/图片/${file}`;

const visuals = {
  "coin-rewards": {
    frames: [
      { title: "奖励位置：头顶常规奖励，台面掉落特殊宝箱", src: path("推币机", "核心体验/神秘宝箱掉落.png"), marks: [
        { label: "基础奖励", x: 41, y: 4, w: 17, h: 15, color: "#ffd66b" },
        { label: "特殊奖励 · 神秘宝箱", x: 38, y: 31, w: 25, h: 35, color: "#78dce8" },
      ] },
      { title: "神秘宝箱：弹窗展开奖励与奖池", src: path("推币机", "8-宝箱掉落.png"), marks: [{ label: "弹窗展示奖励", x: 30, y: 14, w: 44, h: 78, color: "#78dce8" }] },
    ],
  },
  "coin-gold": {
    frames: [{ title: "点金模式：入口、场景变化和倒计时集中反馈", src: path("推币机", "4-主页-点金模式开启.png"), marks: [{ label: "点金模式与剩余时间", x: 77, y: 31, w: 20, h: 46 }] }],
  },
  "coin-longterm": {
    frames: [
      { title: "高级宝箱怪：击杀进度与阶段奖励", src: path("推币机", "7-高级怪击杀列表.png"), marks: [{ label: "累计击杀目标", x: 15, y: 48, w: 68, h: 17 }] },
      { title: "兑换商店：累计资源形成下一轮目标", src: path("推币机", "核心体验/积分兑换商店.png"), marks: [{ label: "可持续兑换的奖励", x: 16, y: 24, w: 66, h: 63 }] },
    ],
  },
  "fishing-operation": {
    frames: [{ title: "主操作钓鱼：把注意力集中到收线时机", src: path("钓鱼游戏", "2-主页-钓鱼中.png"), marks: [{ label: "判定区与收线按钮", x: 35, y: 58, w: 64, h: 41 }] }],
  },
  "fishing-market": {
    frames: [
      { title: "渔市订单：明确本次交付目标", src: path("钓鱼游戏", "5-鱼市-查看订单.png"), marks: [{ label: "订单与交付入口", x: 41, y: 19, w: 38, h: 65 }] },
      { title: "交付完成：订单勾选、金币与角色反馈", src: path("钓鱼游戏", "7-鱼市-完成订单.png"), marks: [{ label: "完成与直接奖励", x: 43, y: 7, w: 55, h: 44 }] },
    ],
  },
  "fishing-achievement": {
    frames: [
      { title: "钓鱼页面：目标与图鉴入口留在主场景", src: path("钓鱼游戏", "核心体验/钓鱼页图鉴目标-高清.png"), marks: [{ label: "主场景目标", x: 22, y: 65, w: 41, h: 33 }, { label: "图鉴入口", x: 79, y: 2, w: 10, h: 15 }] },
      { title: "图鉴页面：收集进度与成就奖励", src: path("钓鱼游戏", "8-鱼类图鉴.png"), marks: [{ label: "收集与阶段奖励", x: 18, y: 77, w: 78, h: 20 }] },
    ],
  },
  "fishing-offer": {
    frames: [{ title: "鱼竿升级礼包：成长收益和购买价格同屏呈现", src: path("钓鱼游戏", "10-鱼竿升级礼包.png"), marks: [{ label: "鱼竿成长收益", x: 19, y: 32, w: 45, h: 35 }, { label: "购买入口", x: 72, y: 74, w: 25, h: 16 }] }],
  },
  "team-goal": {
    frames: [
      { title: "总体目标：完成节日舞台建设", src: path("组队竞赛活动", "2-主页-活动进度为空.png"), marks: [{ label: "总体建筑目标", x: 51, y: 24, w: 43, h: 68 }, { label: "建成奖励", x: 54, y: 4, w: 32, h: 15 }] },
      { title: "建成结算：集中展示完成结果与奖励", src: path("组队竞赛活动", "7-完成结算奖励.png") },
    ],
  },
  "team-members": {
    frames: [
      { title: "组队管理：从好友列表发出邀请", src: path("组队竞赛活动", "核心体验/邀请好友.png"), marks: [{ label: "邀请合作对象", x: 81, y: 24, w: 15, h: 62 }] },
      { title: "活动主页：合作关系与成员进度一起展示", src: path("组队竞赛活动", "6-主页-查看总体进度.png"), marks: [{ label: "成员与贡献进度", x: 20, y: 23, w: 28, h: 64 }] },
    ],
  },
  "team-build": {
    frames: [
      { title: "单体建筑：目标进度与主要修建操作", src: path("组队竞赛活动", "3-任务页-修建进度为零.png"), marks: [{ label: "单体目标与阶段奖励", x: 20, y: 9, w: 52, h: 16 }, { label: "主要修建操作", x: 22, y: 62, w: 56, h: 37 }] },
      { title: "修建反馈：贡献增加，建筑与进度同步变化", src: path("组队竞赛活动", "4-任务页-修建进度增加.png") },
    ],
  },
  "team-offer": {
    frames: [
      { title: "金锤礼包：加速时长、奖励和价格集中呈现", src: path("组队竞赛活动", "核心体验/金锤礼包-高清.png"), marks: [{ label: "金锤加速收益", x: 16, y: 38, w: 69, h: 32 }, { label: "购买入口", x: 40, y: 78, w: 20, h: 13 }] },
      { title: "购买后：在修建按钮显示倍率与倒计时", src: path("组队竞赛活动", "核心体验/金锤修建效果-高清.png"), marks: [{ label: "倍率与剩余时间", x: 43, y: 76, w: 16, h: 20 }] },
    ],
  },
} satisfies Record<string, Visual>;

export type ActivityFocusKey = keyof typeof visuals;

export function ActivityFocusVisual({ visual }: { visual: ActivityFocusKey }) {
  const maskPrefix = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const definition: Visual = visuals[visual];
  return <div className={styles.visual} data-activity-visual={visual}>
    <div className={styles.frames}>
      {definition.frames.map((frame, i) => <figure className={styles.frame} key={frame.src}>
        <div className={styles.picture}>
          <img src={frame.src} alt={frame.title} loading="lazy" />
          {frame.marks?.length ? <svg className={styles.focusShade} viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
            <defs><mask id={`${maskPrefix}-${i}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
              <rect width="1000" height="1000" fill="white" />
              {frame.marks.map(mark => <rect key={mark.label} x={mark.x * 10} y={mark.y * 10} width={mark.w * 10} height={mark.h * 10} rx="12" ry="20" fill="black" />)}
            </mask></defs>
            <rect width="1000" height="1000" fill="#07101c" fillOpacity=".12" mask={`url(#${maskPrefix}-${i})`} />
          </svg> : null}
          {frame.marks?.map((mark, n) => <div key={mark.label} className={styles.mark} data-label-position={mark.y < 12 ? "below" : "above"} style={{ left: `${mark.x}%`, top: `${mark.y}%`, width: `${mark.w}%`, height: `${mark.h}%`, "--mark-color": mark.color || "var(--case-accent)" } as CSSProperties} aria-label={mark.label}><span className={`${styles.label} ${mark.x >= 70 ? styles.labelRight : ""}`}><EditableText id={`activity.${visual}.frame.${i}.mark.${n}`}>{mark.label}</EditableText></span></div>)}
        </div>
      </figure>)}
    </div>
  </div>;
}
