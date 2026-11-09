"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import XrayPrototype from "./components/xray-prototype";
import { ActivityFocusVisual } from "./components/activity-focus";
import type { ActivityFocusKey } from "./components/activity-focus";
import { EditableText, TextEditorProvider } from "./components/text-editor";

type Category = "运营活动" | "系统玩法" | "其他";

type InteractionHighlight = {
  title: string;
  summary: string;
  screenIndex: number;
  focusStep: number;
  videoSrc?: string;
  imageSrc?: string;
  imageSources?: string[];
  activityVisual?: ActivityFocusKey;
};

type ShowcaseVideo = {
  label: string;
  title: string;
  src: string;
};

type Project = {
  id: string;
  index: string;
  category: Category;
  title: string;
  subtitle: string;
  year: string;
  platform: string;
  role: string;
  duration: string;
  brief: string;
  challenge: string;
  decision: string;
  result: string;
  tags: string[];
  screens: string[];
  coverAsset?: string;
  coverVideoAsset?: string;
  screenAssets?: string[];
  galleryOrder?: number[];
  flow: string[];
  accent: string;
  video: boolean;
  videoSrc?: string;
  videoLabel?: string;
  mediaTitle?: string;
  mediaDescription?: string;
  showcaseVideos?: ShowcaseVideo[];
  documentAsset?: string;
  highlights?: InteractionHighlight[];
};

type PreviewMedia = {
  project: string;
  screen: string;
  accent: string;
  kind: "image" | "video";
  src?: string;
};

const projects: Project[] = [
  {
    id: "coin-pusher",
    index: "01",
    category: "运营活动",
    title: "推币机",
    subtitle: "用投币、炮击与点金爆发，构建持续累积的爽感循环",
    year: "2026",
    platform: "PC",
    role: "主交互设计",
    duration: "方案迭代",
    brief: "将实体推币机的堆叠、推动和掉落反馈转化为数字活动玩法，串联投币、怪物炮击、点金模式、清台奖励与宝箱兑换。",
    challenge: "保留推币的随机期待，同时让消耗、进度与奖励一眼可读。",
    decision: "围绕推币台集中操作与反馈，用点金模式和怪物刷新制造阶段爆发。",
    result: "每次投币都有即时反馈，积分与宝箱承接持续目标。",
    tags: ["推币玩法", "爽感反馈", "奖励循环"],
    screens: ["游戏开始", "投入硬币", "炮击奖励", "点金模式", "清台时刻", "怪物刷新", "高级怪列表", "宝箱掉落"],
    coverAsset: "/resources/运营活动/推币机/图片/1-主页-游戏开始.png",
    screenAssets: [
      "/resources/运营活动/推币机/图片/1-主页-游戏开始.png",
      "/resources/运营活动/推币机/图片/2-主页-投币.png",
      "/resources/运营活动/推币机/图片/3-主页-炮击奖励.png",
      "/resources/运营活动/推币机/图片/4-主页-点金模式开启.png",
      "/resources/运营活动/推币机/图片/5-主页-清台.png",
      "/resources/运营活动/推币机/图片/6-主页-怪物刷新中.png",
      "/resources/运营活动/推币机/图片/7-高级怪击杀列表.png",
      "/resources/运营活动/推币机/图片/8-宝箱掉落.png",
    ],
    flow: ["投入硬币", "推动硬币掉落", "触发炮击与点金", "开启宝箱并兑换奖励"],
    highlights: [
      {
        title: "唯一操作焦点",
        summary: "把投币台放在画面中心，消耗、动作和掉落反馈围绕同一舞台发生，玩家无需在多个入口之间切换注意力。",
        screenIndex: 0,
        focusStep: 0,
      },
      {
        "title": "基础奖励与神秘宝箱分层",
        "summary": "基础奖励放在箱子怪头顶，特殊奖励以台面掉落的神秘宝箱出现；获得神秘宝箱后，用弹窗展开本次奖励与奖池。",
        "screenIndex": 7,
        "focusStep": 3,
        "activityVisual": "coin-rewards"
},
      {
        "title": "点金模式强化阶段爆发",
        "summary": "点金入口、场景强化和倒计时共同提示特殊阶段，让玩家理解何时爆发、还剩多久。",
        "screenIndex": 3,
        "focusStep": 2,
        "activityVisual": "coin-gold"
},
      {
        "title": "短反馈接入长目标",
        "summary": "投币不断累积积分与击杀进度，高级宝箱怪的阶段奖励和兑换商店为下一轮操作提供目标。",
        "screenIndex": 6,
        "focusStep": 3,
        "activityVisual": "coin-longterm"
},
    ],
    accent: "violet",
    video: true,
    videoSrc: "/resources/运营活动/推币机/视频/推币机-网页.mp4",
    documentAsset: "/resources/运营活动/推币机/文档/推币机交互稿.jpg",
  },
  {
    id: "fishing-game",
    index: "02",
    category: "运营活动",
    title: "钓鱼游戏",
    subtitle: "用轻量操作、收集图鉴与渔市交易串起持续成长",
    year: "2025",
    platform: "PC",
    role: "交互设计",
    duration: "方案迭代",
    brief: "围绕欢乐钓鱼构建完整活动循环，把选择鱼饵、等待起竿、收获鱼类、渔市交付、图鉴收集与鱼竿成长串联成连续体验。",
    challenge: "让钓鱼简单易懂，同时避免活动沦为重复点击。",
    decision: "用钓鱼反馈建立节奏，再以订单、图鉴和成长奖励延伸目标。",
    result: "钓鱼收获自然接入收集、交易与升级循环。",
    tags: ["主玩法循环", "渔市交易", "收集成长"],
    screens: ["主页待机", "进行钓鱼", "钓鱼成功", "收获鱼类", "查看渔市订单", "选择订单鱼类", "完成订单", "鱼类图鉴", "今日目标", "鱼竿升级礼包", "道具消耗福利", "钓鱼通行证"],
    coverAsset: "/resources/运营活动/钓鱼游戏/图片/1-主页-待机中.png",
    screenAssets: [
      "/resources/运营活动/钓鱼游戏/图片/1-主页-待机中.png",
      "/resources/运营活动/钓鱼游戏/图片/2-主页-钓鱼中.png",
      "/resources/运营活动/钓鱼游戏/图片/3-主页-钓鱼成功.png",
      "/resources/运营活动/钓鱼游戏/图片/4-收获png.png",
      "/resources/运营活动/钓鱼游戏/图片/5-鱼市-查看订单.png",
      "/resources/运营活动/钓鱼游戏/图片/6-鱼市-选择鱼.png",
      "/resources/运营活动/钓鱼游戏/图片/7-鱼市-完成订单.png",
      "/resources/运营活动/钓鱼游戏/图片/8-鱼类图鉴.png",
      "/resources/运营活动/钓鱼游戏/图片/9-今日目标.png",
      "/resources/运营活动/钓鱼游戏/图片/10-鱼竿升级礼包.png",
      "/resources/运营活动/钓鱼游戏/图片/11-道具消耗福利礼包.png",
      "/resources/运营活动/钓鱼游戏/图片/12-通行证.png",
    ],
    flow: ["选择鱼饵", "完成起竿操作", "向渔市交付订单", "升级鱼竿与图鉴"],
    highlights: [
      {
        "title": "主操作钓鱼",
        "summary": "用鱼竿动作、判定区和收线按钮聚焦钓鱼时机，成功后立即给出收获反馈。",
        "screenIndex": 1,
        "focusStep": 1,
        "activityVisual": "fishing-operation"
},
      {
        "title": "直接奖励渔市交易",
        "summary": "钓到的鱼可直接交付渔市订单，完成勾选与金币反馈把收获转化为明确收益。",
        "screenIndex": 6,
        "focusStep": 2,
        "activityVisual": "fishing-market"
},
      {
        "title": "成就奖励图鉴收集",
        "summary": "钓鱼页保留目标与图鉴入口，图鉴页展示收集进度和成就奖励，让每次收获继续推进收集。",
        "screenIndex": 7,
        "focusStep": 3,
        "activityVisual": "fishing-achievement"
},
      {
        "title": "商业化鱼竿升级礼包",
        "summary": "鱼竿提升的属性收益、礼包内容与购买入口同屏呈现，商业化与钓鱼成长直接衔接。",
        "screenIndex": 9,
        "focusStep": 3,
        "activityVisual": "fishing-offer"
},
    ],
    accent: "orange",
    video: true,
    videoSrc: "/resources/运营活动/钓鱼游戏/视频/钓鱼游戏.mp4",
    documentAsset: "/resources/运营活动/钓鱼游戏/文档/钓鱼游戏交互稿.jpg",
  },
  {
    id: "team-competition",
    index: "03",
    category: "运营活动",
    title: "组队竞赛活动",
    subtitle: "把单人节日玩法改造成四人协作的舞台建设竞赛",
    year: "2026",
    platform: "PC",
    role: "系统交互设计",
    duration: "方案迭代",
    brief: "在节日大富翁活动中加入小队合作玩法，玩家邀请好友分工修建灯光、屏幕、音响与舞台，最终共同完成节日舞台。",
    challenge: "让合作不止于邀请，队员贡献也能清晰可见。",
    decision: "四项建设任务承载分工，主页汇总队员状态与整体进度。",
    result: "个人贡献推动共同舞台变化，阶段奖励强化合作感。",
    tags: ["组队竞赛", "协作建设", "活动改造"],
    screens: ["开启活动", "活动进度为空", "修建进度为零", "修建进度增加", "单个建筑完成", "查看总体进度", "完成结算奖励", "全部任务完成"],
    coverAsset: "/resources/运营活动/组队竞赛活动/图片/2-主页-活动进度为空.png",
    screenAssets: [
      "/resources/运营活动/组队竞赛活动/图片/1-开启活动.png",
      "/resources/运营活动/组队竞赛活动/图片/2-主页-活动进度为空.png",
      "/resources/运营活动/组队竞赛活动/图片/3-任务页-修建进度为零.png",
      "/resources/运营活动/组队竞赛活动/图片/4-任务页-修建进度增加.png",
      "/resources/运营活动/组队竞赛活动/图片/5-任务页-单个建筑修建完成.png",
      "/resources/运营活动/组队竞赛活动/图片/6-主页-查看总体进度.png",
      "/resources/运营活动/组队竞赛活动/图片/7-完成结算奖励.png",
      "/resources/运营活动/组队竞赛活动/图片/8-主页-所有任务完成.png",
    ],
    flow: ["邀请队友", "领取建设任务", "协作修建舞台", "结算小队奖励"],
    highlights: [
      {
        "title": "总体建筑目标与奖励",
        "summary": "先在主页展示节日舞台的总体目标与建成奖励，再用完成结算集中兑现共同建设的成果。",
        "screenIndex": 1,
        "focusStep": 3,
        "activityVisual": "team-goal"
},
      {
        "title": "组队机制与合作关系",
        "summary": "从好友列表邀请合作对象，主页同步展示成员关系与贡献进度，让组队始终围绕建筑目标。",
        "screenIndex": 5,
        "focusStep": 0,
        "activityVisual": "team-members"
},
      {
        "title": "单体建筑目标与修建操作",
        "summary": "单体页集中呈现目标、阶段奖励与修建按钮，每次使用锤子都回显贡献和建筑进度。",
        "screenIndex": 2,
        "focusStep": 2,
        "activityVisual": "team-build"
},
      {
        "title": "商业化金锤加速礼包",
        "summary": "金锤礼包集中呈现加速时长、奖励与价格，购买后在修建按钮回显倍率和倒计时。",
        "screenIndex": 3,
        "focusStep": 2,
        "activityVisual": "team-offer"
},
    ],
    accent: "cyan",
    video: true,
    videoSrc: "/resources/运营活动/组队竞赛活动/视频/组队竞赛活动-网页.mp4",
    documentAsset: "/resources/运营活动/组队竞赛活动/文档/节日大富翁活动增加小队合作.jpg",
  },
  {
    id: "quarantine-gameplay",
    index: "04",
    category: "系统玩法",
    title: "检疫玩法",
    subtitle: "把身份核验、工具检测与生存决策串成一段连续的检疫叙事",
    year: "2026",
    platform: "移动端",
    role: "系统交互设计",
    duration: "完整流程设计",
    brief: "以末日据点的检疫入口为舞台，把幸存者剧情、清洗、身份确认、透视检测、体温检测与最终去留决策组织成一段连续体验。",
    challenge: "在竖屏操作中教会检测与判断，同时带出世界观和资源用途。",
    decision: "以幸存者案例逐步教学，复用工具操作，让多项证据汇入去留决策。",
    result: "玩家从跟随引导走向独立判断，选择结果连接资源与剧情。",
    tags: ["叙事引导", "检测交互", "生存决策"],
    screens: ["冲泥前", "冲洗操作", "身份确认", "透视仪检测", "体温异常", "最终去留决策", "清洗完成", "感染伤口", "体征正常", "批准接纳"],
    galleryOrder: [0, 1, 6, 2, 3, 7, 4, 8, 5, 9],
    coverAsset: "/resources/系统玩法/检疫玩法/封面/检疫玩法封面.png",
    screenAssets: [
      "/resources/系统玩法/检疫玩法/关键界面/1-冲泥前.png",
      "/resources/系统玩法/检疫玩法/关键界面/2-冲洗操作.png",
      "/resources/系统玩法/检疫玩法/关键界面/3-身份确认.png",
      "/resources/系统玩法/检疫玩法/关键界面/4-透视仪检测.png",
      "/resources/系统玩法/检疫玩法/关键界面/5-体温异常.png",
      "/resources/系统玩法/检疫玩法/关键界面/6-最终决策.png",
      "/resources/系统玩法/检疫玩法/关键界面/8-清洗完成.png",
      "/resources/系统玩法/检疫玩法/关键界面/9-感染伤口.png",
      "/resources/系统玩法/检疫玩法/关键界面/10-体征正常.png",
      "/resources/系统玩法/检疫玩法/关键界面/11-批准接纳.png",
    ],
    flow: ["剧情演绎", "冲泥清洁", "身份确认", "透视扫描", "体温检测", "去留决策"],
    highlights: [
      {
        title: "冲泥与检测复用按住、拖动、反馈循环",
        summary: "冲泥、透视仪、温度计都用引导手势建立操作预期，再通过清洗完毕提示、检查点显色或体征数值反馈结果。三组界面分别对照引导与反馈状态，呈现同一操作循环在不同工具中的复用。",
        screenIndex: 3,
        focusStep: 4,
      },
      {
        title: "用连续幸存者建立学习曲线",
        summary: "每位幸存者只承担一个教学任务：先示范、再复习、最后让玩家独立判断；操作波峰与剧情信息交替出现，避免一次讲完所有规则。",
        screenIndex: 0,
        focusStep: 0,
      },
      {
        title: "让幸存者类型决定引导强度",
        summary: "一次性消耗型给出明确引导，资源型撤掉提示，剧情人物按叙事约束结果；同一套流程因此能同时服务教学、经营与世界观。",
        screenIndex: 5,
        focusStep: 0,
      },
      {
        title: "把检疫拆成可配置节点",
        summary: "剧情、冲泥、身份、透视、温度和决策组成可编排链路；冲泥等节点可按人物与剧情启用，后续扩展不必重做整套页面。",
        screenIndex: 2,
        focusStep: 2,
      },
      {
        title: "让去留决定影响资源与剧情",
        summary: "拒绝意味着角色离开，批准可带来资源或后续剧情；误放感染者与驱逐健康者都会扣除基础货币，结果直接校验玩家判断。",
        screenIndex: 5,
        focusStep: 5,
      },
    ],
    accent: "cyan",
    video: true,
    videoSrc: "/resources/系统玩法/检疫玩法/视频/检疫玩法-演示.mp4",
    mediaDescription: "先看完整检疫节奏，再查看各检测工具与最终决策的关键界面。",
    documentAsset: "/resources/系统玩法/检疫玩法/交互稿/检疫玩法交互稿.png",
  },
  {
    id: "gem-workshop",
    index: "05",
    category: "系统玩法",
    title: "宝石工坊",
    subtitle: "把宝石搭配、共鸣技能与加工养成组织成一条可理解的构筑链",
    year: "2026",
    platform: "PC",
    role: "系统交互设计",
    duration: "完整流程设计",
    brief: "围绕 KVK 宝石养成建立共鸣与工坊两层体验：玩家先用槽位组合形成共鸣技能，再在同一工坊中完成仓库查看、升级、合成、洗炼与分解。",
    challenge: "让玩家看懂宝石搭配、加工与战斗收益之间的关系。",
    decision: "共鸣连线解释搭配，加工统一为选取、预览、确认三步。",
    result: "选材、构筑和加工保持连续，属性变化与操作代价清楚可见。",
    tags: ["宝石构筑", "共鸣技能", "养成闭环"],
    screens: ["共鸣空槽", "共鸣组合", "宝石仓库", "宝石合成", "宝石洗炼", "宝石分解"],
    coverAsset: "/resources/系统玩法/宝石工坊/封面/宝石工坊封面.webp",
    screenAssets: [
      "/resources/系统玩法/宝石工坊/关键界面/1-共鸣空槽.png",
      "/resources/系统玩法/宝石工坊/关键界面/2-共鸣组合.png",
      "/resources/系统玩法/宝石工坊/关键界面/3-宝石仓库.png",
      "/resources/系统玩法/宝石工坊/关键界面/4-宝石合成.png",
      "/resources/系统玩法/宝石工坊/关键界面/5-宝石洗炼.png",
      "/resources/系统玩法/宝石工坊/关键界面/6-宝石分解.png",
    ],
    flow: ["选择宝石", "填充槽位", "激活共鸣", "进入工坊", "加工并预览", "确认或保留"],
    highlights: [
      {
        title: "让槽位关系直接解释共鸣",
        summary: "四个槽位围绕技能核心排布，玩家拖入宝石时即可看到位置、属性与连线关系，不必先读规则再回到搭配页验证。",
        screenIndex: 0,
        focusStep: 1,
      },
      {
        title: "让构筑结果即时回到战斗",
        summary: "达成组合后，光圈闭合、技能点亮并给出使用入口；共鸣不止是数值加成，而是一项能被立即理解和验证的战斗能力。",
        screenIndex: 1,
        focusStep: 2,
      },
      {
        title: "让多种加工共享同一上下文",
        summary: "仓库、主加工台与属性面板始终保持稳定位置，切换升级、合成、洗炼和分解时只替换任务区域，减少重复定位成本。",
        screenIndex: 2,
        focusStep: 3,
      },
      {
        title: "把高成本改造放在预览之后",
        summary: "合成先呈现消耗与可能产出，洗炼同时展示新旧属性并让玩家选择保留，重要资源操作在确认前始终可比较。",
        screenIndex: 4,
        focusStep: 4,
      },
      {
        title: "用批量与确认控制损失边界",
        summary: "分解支持单选与批量选择，并在执行前汇总数量与返还内容；效率提升的同时保留最后一道防误触判断。",
        screenIndex: 5,
        focusStep: 5,
      },
    ],
    accent: "orange",
    video: false,
    mediaDescription: "从原始交互稿逐张提取共鸣与工坊关键界面，展示完整养成链路。",
    documentAsset: "/resources/系统玩法/宝石工坊/交互稿/宝石工坊交互稿-压缩.webp",
  },
  {
    id: "extraction-gameplay",
    index: "06",
    category: "系统玩法",
    title: "搜打撤玩法",
    subtitle: "让战前投入、局内搜刮与撤离结算共同构成清晰的风险收益循环",
    year: "2026",
    platform: "PC",
    role: "系统交互设计",
    duration: "完整流程设计",
    brief: "将英雄编队、装备与 Buff 配置、保险箱、局内战斗、双背包搜刮和撤离结算串成一轮完整的搜打撤体验。",
    challenge: "让战前投入、局内取舍和撤离损失都可预判。",
    decision: "集中战前准备，双背包支持搜刮取舍，结算明确保留与损失。",
    result: "投入、搜刮与撤离形成闭环，玩家能理解每次冒险的收益和风险。",
    tags: ["风险收益", "背包拖拽", "撤离结算"],
    screens: ["战前编队", "保险箱选择", "局内主页", "个人背包", "敌人战利品", "撤离结算"],
    coverAsset: "/resources/系统玩法/搜打撤玩法/封面/搜打撤玩法封面.webp",
    screenAssets: [
      "/resources/系统玩法/搜打撤玩法/关键界面/1-战前编队.png",
      "/resources/系统玩法/搜打撤玩法/关键界面/2-保险箱选择.png",
      "/resources/系统玩法/搜打撤玩法/关键界面/3-局内主页.png",
      "/resources/系统玩法/搜打撤玩法/关键界面/4-个人背包.png",
      "/resources/系统玩法/搜打撤玩法/关键界面/5-敌人战利品.png",
      "/resources/系统玩法/搜打撤玩法/关键界面/6-撤离结算.png",
    ],
    flow: ["英雄与装备", "Buff 与保险", "进入战局", "战斗和搜刮", "整理背包", "撤离结算"],
    highlights: [
      {
        title: "战前先把风险选项摆上台面",
        summary: "英雄、装备、Buff、背包容量与入场花费集中在同一准备页，玩家在开始前就能看清本轮投入，而不是进入战局后才发现缺口。",
        screenIndex: 0,
        focusStep: 0,
      },
      {
        title: "用保险箱定义可承受损失",
        summary: "保险箱以独立容量和明确价格出现，玩家主动选择要保护的资源；风险不是隐藏规则，而是一项可以在战前管理的策略。",
        screenIndex: 1,
        focusStep: 1,
      },
      {
        title: "局内信息围绕行动优先级分层",
        summary: "地图、队伍状态、目标与技能围绕战斗画面分布，详细悬赏和背包按需展开，避免搜刮信息持续遮挡即时操作。",
        screenIndex: 2,
        focusStep: 2,
      },
      {
        title: "双背包并置完成搜刷取舍",
        summary: "自己的背包与敌方战利品同时出现，价值详情置于两者之间；拾取、替换与快速领取都围绕一次比较完成。",
        screenIndex: 4,
        focusStep: 3,
      },
      {
        title: "结算明确保住什么、失去什么",
        summary: "成功撤离区分保险箱、背包和结算奖励；失败则只保留受保护内容，用同一信息结构兑现战前的风险选择。",
        screenIndex: 5,
        imageSources: ["/resources/系统玩法/搜打撤玩法/关键界面/6-撤离结算.png", "/resources/系统玩法/搜打撤玩法/设计重点/撤离失败.png"],
        focusStep: 5,
      },
    ],
    accent: "lime",
    video: false,
    mediaDescription: "从原始交互稿提取战前、局内背包与结算关键界面，展示完整风险收益闭环。",
    documentAsset: "/resources/系统玩法/搜打撤玩法/交互稿/搜打撤玩法交互稿-压缩.webp",
  },
  {
    id: "hero-video-system",
    index: "07",
    category: "系统玩法",
    title: "英雄视频展示系统",
    subtitle: "把单支英雄视频，搭建成可分层、可批量、可复用的展示能力",
    year: "2026",
    platform: "多系统",
    role: "体验设计 / 系统搭建",
    duration: "自主提案 · 全流程搭建",
    brief: "围绕英雄稀有度、养成节点与使用场景，建立分层展示标准，并将立绘分析、分镜设计、视频产出和系统接入串成一套完整能力。",
    challenge: "用动态展示强化英雄价值，同时控制制作与接入成本。",
    decision: "按英雄品质定义展示层级，统一视频产线与接入方式。",
    result: "同一套视频素材可复用于活动、招募与子界面。",
    tags: ["品质分层", "视频自动化", "多界面接入"],
    screens: ["橙色品质展示", "紫色双通道展示", "多界面接入矩阵"],
    coverVideoAsset: "/resources/英雄视频系统/orange-compare.mp4",
    flow: ["确立分层标准", "立绘分析与分镜", "自动化批量产出", "双模接入多场景"],
    highlights: [
      {
        title: "品质层级一眼可辨",
        summary: "先按稀有度定义镜头密度、动作幅度和特效强度，让橙色英雄的核心价值不依赖额外文字说明。",
        screenIndex: 0,
        focusStep: 0,
        videoSrc: "/resources/英雄视频系统/orange-compare.mp4",
      },
      {
        title: "自动化产线保持一致",
        summary: "把立绘分析、分镜设计与视频生成组织成可重复执行的路径，批量扩展英雄时仍能维持统一体验标准。",
        screenIndex: 1,
        focusStep: 2,
        videoSrc: "/resources/英雄视频系统/purple-compare.mp4",
      },
      {
        title: "双模能力快速接入",
        summary: "橙色单通道与紫色双通道覆盖不同品质，并用同一套播放能力进入子界面、活动与招募，不再逐页重复设计。",
        screenIndex: 2,
        focusStep: 3,
        videoSrc: "/resources/英雄视频系统/招募界面.mp4",
      },
    ],
    accent: "pink",
    video: true,
    videoSrc: "/resources/英雄视频系统/orange-compare.mp4",
    videoLabel: "橙色品质展示",
    mediaTitle: "先看品质分层，再看多场景接入",
    mediaDescription: "主展示在前，紫色品质与三类接入场景紧随其后",
    showcaseVideos: [
      { label: "01 / QUALITY", title: "紫色英雄双通道", src: "/resources/英雄视频系统/purple-compare.mp4" },
      { label: "02 / SUB PAGE", title: "子界面接入", src: "/resources/英雄视频系统/子界面.mp4" },
      { label: "03 / EVENT", title: "活动界面接入", src: "/resources/英雄视频系统/活动界面.mp4" },
      { label: "04 / RECRUIT", title: "招募界面接入", src: "/resources/英雄视频系统/招募界面.mp4" },
    ],
  },
  {
    id: "guild-system",
    index: "08",
    category: "系统玩法",
    title: "共创公会系统",
    subtitle: "让协作关系可感知，让每一次贡献都有回应",
    year: "2025",
    platform: "移动端",
    role: "系统交互设计",
    duration: "10 周",
    brief: "重构公会大厅、成员协作与集体建设，使轻度与深度玩家都能找到清晰的参与方式。",
    challenge: "旧系统强调管理功能，却缺乏关系反馈；普通成员对公会目标和个人贡献的关联感知很弱。",
    decision: "将公会建设设计成共同可见的空间变化，用贡献涟漪、协作请求与里程碑强化关系反馈。",
    result: "管理与参与路径被分层表达，成员能够快速识别待办、伙伴需求与共同进度。",
    tags: ["社交系统", "协作机制", "贡献反馈"],
    screens: ["公会大厅", "协作请求", "建设进度"],
    flow: ["查看共同目标", "选择协作任务", "完成个人贡献", "见证空间成长"],
    highlights: [
      {
        title: "共同目标先于管理功能",
        summary: "大厅首先回答公会正在建设什么，再把管理入口退到次级层，让普通成员进入后立刻知道可以做什么。",
        screenIndex: 0,
        focusStep: 0,
      },
      {
        title: "伙伴需求直接变成待办",
        summary: "协作请求以对象、缺口和回报组织，不要求成员理解复杂权限，也能快速找到一次有效贡献。",
        screenIndex: 1,
        focusStep: 1,
      },
      {
        title: "贡献改变公共空间",
        summary: "个人投入最终反馈为所有成员可见的空间成长，用环境变化把抽象贡献转化为集体成就。",
        screenIndex: 2,
        focusStep: 3,
      },
    ],
    accent: "lime",
    video: false,
  },
  {
    id: "equipment-build",
    index: "09",
    category: "系统玩法",
    title: "装备构筑实验室",
    subtitle: "把数值比较转化为可理解、可尝试的构筑决策",
    year: "2024",
    platform: "PC / 主机",
    role: "主交互设计",
    duration: "12 周",
    brief: "面向中重度玩家的装备构筑系统，覆盖筛选、对比、搭配、模拟与方案保存。",
    challenge: "装备变量多、组合深，传统列表要求玩家记住大量属性，频繁切换页面才能完成一次比较。",
    decision: "通过差异高亮、影响预览与方案槽，把“阅读数值”改造成“验证假设”的连续过程。",
    result: "核心操作集中在单一工作台内，新手得到推荐解释，资深玩家仍保有精细控制能力。",
    tags: ["复杂系统", "数据可视化", "构筑体验"],
    screens: ["构筑工作台", "装备对比", "影响预览"],
    flow: ["设定构筑目标", "筛选候选装备", "比较属性影响", "保存并应用方案"],
    highlights: [
      {
        title: "先定目标，再看装备",
        summary: "用构筑目标约束候选范围，玩家先表达想达成什么，再进入筛选，减少从海量装备中盲目比较。",
        screenIndex: 0,
        focusStep: 0,
      },
      {
        title: "差异高亮取代记忆",
        summary: "对比界面只强调变化项和受影响属性，把跨页面记忆变成同一上下文内的直接判断。",
        screenIndex: 1,
        focusStep: 2,
      },
      {
        title: "先预演，再做不可逆决定",
        summary: "影响预览把一次装备替换的结果提前呈现，支持玩家验证假设后再保存方案。",
        screenIndex: 2,
        focusStep: 3,
      },
    ],
    accent: "orange",
    video: false,
  },
  {
    id: "companion",
    index: "10",
    category: "系统玩法",
    title: "伙伴羁绊网络",
    subtitle: "把线性养成，变成有选择、有回响的关系网络",
    year: "2024",
    platform: "移动端",
    role: "交互设计",
    duration: "7 周",
    brief: "整合伙伴升级、故事解锁与队伍加成，让养成行为同时承载数值目标和情感表达。",
    challenge: "系统层级过深，材料消耗与羁绊收益脱节，玩家很难判断一次培养会带来什么改变。",
    decision: "以关系网络为主界面，预览投入后的数值与故事变化，并在关键节点提供可逆选择。",
    result: "养成目标、资源缺口与情感奖励在同一上下文中呈现，减少无意义跳转。",
    tags: ["角色养成", "关系可视化", "资源决策"],
    screens: ["羁绊网络", "成长预演", "故事节点"],
    flow: ["选择关系节点", "预览成长收益", "投入养成资源", "解锁关系回响"],
    highlights: [
      {
        title: "关系网络就是导航",
        summary: "角色关系、成长方向和可解锁节点共用一张网络，玩家不必在养成页与故事页之间反复跳转。",
        screenIndex: 0,
        focusStep: 0,
      },
      {
        title: "投入之前看见回报",
        summary: "成长预演同时呈现数值变化与故事解锁，让材料消耗和情感奖励在决定前建立关联。",
        screenIndex: 1,
        focusStep: 1,
      },
      {
        title: "关键选择保留回旋空间",
        summary: "故事节点允许预览和可逆选择，把关系养成从线性升级改成有判断、有回响的过程。",
        screenIndex: 2,
        focusStep: 3,
      },
    ],
    accent: "pink",
    video: false,
  },
  {
    id: "onboarding",
    index: "11",
    category: "其他",
    title: "无字新手引导",
    subtitle: "用环境、镜头与反馈，让玩家在行动中学会规则",
    year: "2025",
    platform: "主机 / PC",
    role: "体验设计",
    duration: "4 周",
    brief: "为动作解谜原型设计低文本教学，通过关卡节奏逐步建立移动、观察与组合操作。",
    challenge: "多语言成本受限，传统弹窗教学打断节奏，也无法确认玩家是否真正理解。",
    decision: "将教学拆成“诱导—尝试—确认—变化”四拍，并用失败安全区允许玩家无压力实验。",
    result: "引导从说明转为体验，教学节点可复用到后续能力解锁与关卡难度设计。",
    tags: ["新手引导", "关卡叙事", "可用性测试"],
    screens: ["视觉诱导", "安全试错", "反馈确认"],
    flow: ["发现视觉线索", "尝试基础操作", "获得即时反馈", "迁移到真实挑战"],
    highlights: [
      {
        title: "环境线索代替说明弹窗",
        summary: "通过镜头、光线和物件位置把注意力引向正确动作，规则先被玩家看见，再被玩家亲手发现。",
        screenIndex: 0,
        focusStep: 0,
      },
      {
        title: "安全区允许无压力试错",
        summary: "第一次操作发生在没有惩罚的空间里，失败只带来可理解反馈，不会中断探索节奏。",
        screenIndex: 1,
        focusStep: 1,
      },
      {
        title: "用反馈确认真正学会",
        summary: "系统不以玩家看过提示为完成，而是通过成功反馈和后续迁移确认规则已经被理解。",
        screenIndex: 2,
        focusStep: 2,
      },
    ],
    accent: "cyan",
    video: false,
  },
  {
    id: "accessibility",
    index: "12",
    category: "其他",
    title: "战斗可访问性套件",
    subtitle: "不是降低挑战，而是让玩家选择适合自己的信息方式",
    year: "2024",
    platform: "PC / 主机",
    role: "研究与交互设计",
    duration: "6 周",
    brief: "针对色觉、听觉与操作差异，设计可组合的战斗辅助设置与首次配置流程。",
    challenge: "设置项专业术语多，玩家难以预判效果；一次性长列表也让首次配置充满负担。",
    decision: "以场景化问题替代术语列表，为每项设置提供即时演示，并支持随时重做快速诊断。",
    result: "设置从被动选项变成主动体验工具，模块化方案能够适配不同玩法与平台。",
    tags: ["无障碍设计", "用户研究", "设置体验"],
    screens: ["快速诊断", "效果预览", "战斗提示"],
    flow: ["选择困难场景", "尝试辅助预览", "组合个人方案", "战斗中快速调整"],
    highlights: [
      {
        title: "用困难场景代替专业术语",
        summary: "首次配置从“你需要什么功能”改为“你在哪种战斗场景遇到困难”，降低理解和选择门槛。",
        screenIndex: 0,
        focusStep: 0,
      },
      {
        title: "调整前即时看见效果",
        summary: "每项辅助设置都配合实时演示，玩家先体验信息方式，再决定是否加入自己的方案。",
        screenIndex: 1,
        focusStep: 1,
      },
      {
        title: "战斗中仍能快速修正",
        summary: "核心辅助项保留战斗内快速入口，设置不再是一次性承诺，而是可随场景调整的工具。",
        screenIndex: 2,
        focusStep: 3,
      },
    ],
    accent: "violet",
    video: false,
  },
  {
    id: "design-system",
    index: "13",
    category: "其他",
    title: "游戏交互规范库",
    subtitle: "让体验原则进入协作日常，而不是停在文档里",
    year: "2023—2025",
    platform: "多平台",
    role: "规范负责人",
    duration: "持续迭代",
    brief: "建立跨项目交互模式、状态规则与评审工具，帮助策划、UI 与开发快速对齐体验目标。",
    challenge: "规范散落在多个文档，团队只在出现争议时查阅，设计决策难以被继承。",
    decision: "以真实任务检索组织内容，用可运行示例、决策边界与检查清单替代静态组件目录。",
    result: "规范成为方案评审与交付的一部分，公共模式减少重复设计并提高跨团队一致性。",
    tags: ["设计系统", "团队协作", "体验治理"],
    screens: ["模式索引", "状态标注", "评审清单"],
    flow: ["从任务检索模式", "理解适用边界", "复用交互方案", "评审并沉淀新例"],
    highlights: [
      {
        title: "从真实任务查找模式",
        summary: "规范入口以“我要解决什么问题”组织，而不是按组件名称罗列，让策划和开发也能快速定位答案。",
        screenIndex: 0,
        focusStep: 0,
      },
      {
        title: "把适用边界一起交付",
        summary: "状态标注不仅展示推荐做法，也明确何时不该复用，避免公共模式被机械套用。",
        screenIndex: 1,
        focusStep: 1,
      },
      {
        title: "评审本身成为沉淀入口",
        summary: "检查清单把评审结论转成可复用案例，新问题在被解决的同时回流到规范库。",
        screenIndex: 2,
        focusStep: 3,
      },
    ],
    accent: "lime",
    video: false,
  },
];

const initialPortfolioIds = new Set([
  "coin-pusher",
  "fishing-game",
  "team-competition",
  "quarantine-gameplay",
  "gem-workshop",
  "extraction-gameplay",
]);

const portfolioProjects = projects.filter((project) => initialPortfolioIds.has(project.id));
const categories: Array<"全部" | "运营活动" | "系统玩法"> = ["全部", "运营活动", "系统玩法"];

const coreExperienceHeadlines: Record<string, [string, string, string]> = {
  "基础奖励与神秘宝箱分层": ["箱子怪头顶呈现基础奖励，台面掉落的","神秘宝箱通过弹窗展开特殊奖励","。"],
  "点金模式强化阶段爆发": ["以场景强化和倒计时突出","点金模式的阶段爆发","，让特殊时刻清楚可感。"],
  "主操作钓鱼": ["围绕判定区与收线按钮，让玩家","看准时机完成钓鱼","，立即获得收获反馈。"],
  "直接奖励渔市交易": ["钓到的鱼交付渔市订单，","直接奖励即时回显","，把收获转化为明确收益。"],
  "成就奖励图鉴收集": ["从钓鱼页目标进入图鉴，让每次收获","推进收集与成就奖励","。"],
  "商业化鱼竿升级礼包": ["把鱼竿提升收益、礼包内容与价格放在一起，让","购买价值对应钓鱼成长","。"],
  "总体建筑目标与奖励": ["先展示舞台的总体建筑目标，再以","建成奖励承接共同建设","。"],
  "组队机制与合作关系": ["通过好友邀请建立合作关系，成员与贡献进度","直接回到活动主页","。"],
  "单体建筑目标与修建操作": ["目标、阶段奖励与修建操作集中呈现，让每一锤","推动可见的建筑进度","。"],
  "商业化金锤加速礼包": ["金锤礼包明确加速收益与价格，购买后","在修建操作中回显倍率与时间","。"],
  "唯一操作焦点": ["把", "操作集中在推币台", "，让消耗、掉落和奖励围绕同一画面发生。"],
  "阶段爆发可预期": ["用进度和倒计时", "提前预告爆发", "，让玩家期待炮击与点金时刻。"],
  "短反馈接入长目标": ["积分、击杀进度与兑换商店，让每次投币","继续推动长期目标","。"],
  "主操作状态零歧义": ["通过角色动作区分待机、钓鱼与收获，让玩家", "一眼看懂当前状态", "。"],
  "收获立刻转化价值": ["钓到的鱼可以", "直接交付订单", "，把收获转化为成长资源。"],
  "长线目标自然外延": ["图鉴、今日目标与通行证，让一次钓鱼", "同时推进多个目标", "。"],
  "四人分工一屏建立": ["把灯光、屏幕、音响和舞台拆成四项任务，让队员", "在同一屏完成分工", "。"],
  "个人动作回写团队进度": ["每次修建同时更新个人任务与舞台进度，让", "个人贡献变成团队变化", "。"],
  "阶段完成形成集体时刻": ["从单项完成到整体结算，用逐级奖励把四人的任务收束为", "共同完成的庆祝时刻", "。"],
  "用连续幸存者建立学习曲线": ["每位幸存者教一个操作，让玩家从跟随示范逐步走向", "独立判断", "。"],
  "让幸存者类型决定引导强度": ["教学角色给出明确提示，资源型不做引导，剧情人物则", "按故事约束去留", "。"],
  "把检疫拆成可配置节点": ["将冲泥、身份核验和检测拆成节点，按人物需要", "组合检疫流程", "。"],
  "冲泥与检测复用按住、拖动、反馈循环": ["冲泥与检测沿用", "按住、拖动、反馈", "的循环，更换工具也无需重学手势。"],
  "让去留决定影响资源与剧情": ["拒绝让角色离开，批准连接资源或剧情，", "奖惩反馈校验玩家判断", "。"],
  "让槽位关系直接解释共鸣": ["通过槽位和连线呈现搭配关系，让玩家", "放入宝石就能理解共鸣", "。"],
  "让构筑结果即时回到战斗": ["搭配成立后点亮技能并提供使用入口，让", "构筑结果直接回到战斗", "。"],
  "让多种加工共享同一上下文": ["切换加工方式时保留仓库与属性面板，让玩家", "始终在同一工作台操作", "。"],
  "把高成本改造放在预览之后": ["合成先看消耗与产出，洗炼先对比新旧属性，", "确认收益后再投入资源", "。"],
  "用批量与确认控制损失边界": ["分解支持批量选择，执行前汇总返还内容，", "提升效率也防止误删", "。"],
  "战前先把风险选项摆上台面": ["英雄、装备、增益与入场花费集中展示，让玩家", "战前看清本轮投入", "。"],
  "用保险箱定义可承受损失": ["保险箱明确容量与价格，让玩家提前选择", "失败时仍要保住的资源", "。"],
  "局内信息围绕行动优先级分层": ["战斗信息优先显示，悬赏和背包按需展开，", "避免遮挡即时操作", "。"],
  "双背包并置完成搜刷取舍": ["自己的背包与战利品并排展示，通过", "一次对比完成拾取与替换", "。"],
  "让格子规则在拖拽中被理解": ["拖动时提示可用格、叠加与冲突，让玩家", "从操作反馈理解空间规则", "。"],
  "结算明确保住什么、失去什么": ["结算分别展示保险箱、背包与损失，让玩家", "看清冒险的实际结果", "。"],
};

const quarantineVisualScreens = [
  "/resources/系统玩法/检疫玩法/关键界面/1-冲泥前.png",
  "/resources/系统玩法/检疫玩法/关键界面/2-冲洗操作.png",
  "/resources/系统玩法/检疫玩法/关键界面/3-身份确认.png",
  "/resources/系统玩法/检疫玩法/关键界面/4-透视仪检测.png",
  "/resources/系统玩法/检疫玩法/关键界面/5-体温异常.png",
  "/resources/系统玩法/检疫玩法/关键界面/6-最终决策.png",
];

const quarantineOriginalFocus: Record<number, string> = {
  1: "/resources/系统玩法/检疫玩法/设计重点/体验曲线-原图.png",
  2: "/resources/系统玩法/检疫玩法/设计重点/幸存者分类-原图.png",
  3: "/resources/系统玩法/检疫玩法/设计重点/检疫流程-原图.png",
  4: "/resources/系统玩法/检疫玩法/设计重点/去留决策-原图.png",
};

function QuarantineFocusVisual({ activeIndex }: { activeIndex: number }) {

  const visualMeta = [
    ["LEARNING CURVE", "从示范到独立判断"],
    ["SURVIVOR TYPES", "角色类型决定引导强度"],
    ["MODULAR FLOW", "可配置的检疫流水线"],
    ["TOOL GRAMMAR", "同一入口与启动手势，不同检测方式"],
    ["DECISION LOOP", "去留结果回写资源与剧情"],
  ][activeIndex] || ["SYSTEM FOCUS", "检疫系统设计"];

  let body;
  if (activeIndex === 0) {
    const stages = [
      ["剧情演绎", "建立悬念"], ["透视教学", "明确拒绝"], ["冲泥教学", "重复手势"],
      ["温度教学", "补充证据"], ["自主检疫", "撤掉提示"], ["完成玩法", "接入世界观"],
    ];
    body = (
      <div className="qfv-curve">
        <div className="qfv-curve-wave" aria-hidden="true"><i /><i /><i /></div>
        {stages.map(([title, note], index) => (
          <div className={`qfv-curve-node node-${index + 1}`} key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span><b>{title}</b><small>{note}</small>
          </div>
        ))}
        <div className="qfv-curve-caption"><b><EditableText id="static.001">小游戏教学</EditableText></b><span><EditableText id="static.002">操作波峰与剧情信息交替出现</EditableText></span><strong><EditableText id="static.003">世界观建立</EditableText></strong></div>
      </div>
    );
  } else if (activeIndex === 1) {
    const types = [
      { label: "一次性消耗型", action: "给出明确引导", result: "接受或拒绝", image: quarantineVisualScreens[0] },
      { label: "资源型", action: "撤掉操作提示", result: "玩家独立判断", image: quarantineVisualScreens[4] },
      { label: "剧情人物", action: "由剧情约束结果", result: "承接主线世界观", image: quarantineVisualScreens[5] },
    ];
    body = (
      <div className="qfv-archetypes">
        {types.map((type, index) => (
          <article key={type.label}><span>0{index + 1}</span><img src={type.image} alt="" /><div><b>{type.label}</b><small>{type.action}</small><strong>{type.result}</strong></div></article>
        ))}
      </div>
    );
  } else if (activeIndex === 2) {
    const modules = [
      ["剧情演绎", "固定入口"], ["冲泥", "可选节点"], ["身份确认", "基础核验"],
      ["透视仪", "伤口证据"], ["温度计", "体征证据"], ["决策", "统一出口"],
    ];
    body = (
      <div className="qfv-pipeline">
        <div className="qfv-pipeline-group"><span><EditableText id="static.004">叙事</EditableText></span><b><EditableText id="static.005">建立人物动机</EditableText></b></div>
        <div className="qfv-pipeline-track">
          {modules.map(([title, note], index) => <div className={`qfv-module ${index === 1 ? "optional" : ""}`} key={title}><span>0{index + 1}</span><b>{title}</b><small>{note}</small></div>)}
        </div>
        <div className="qfv-pipeline-group evidence"><span><EditableText id="static.006">检测</EditableText></span><b><EditableText id="static.007">节点可增删、顺序可编排</EditableText></b></div>
      </div>
    );
  } else if (activeIndex === 3) {
    body = (
      <div className="qfv-tool-experience"><XrayPrototype /></div>
    );
  } else {
    body = (
      <div className="qfv-decision">
        <div className="qfv-decision-side reject">
          <span><EditableText id="static.008">拒绝 / REJECT</EditableText></span><b><EditableText id="static.009">幸存者离开且不再返回</EditableText></b>
          <div><small><EditableText id="static.010">感染者 · 正确阻断</EditableText></small><strong className="positive"><EditableText id="static.011">+50</EditableText></strong></div>
          <div><small><EditableText id="static.012">健康者 · 错误驱逐</EditableText></small><strong className="negative"><EditableText id="static.013">−50</EditableText></strong></div>
        </div>
        <figure><img src={quarantineVisualScreens[5]} alt="" /><figcaption><EditableText id="static.014">证据汇总后的最终选择</EditableText></figcaption></figure>
        <div className="qfv-decision-side approve">
          <span><EditableText id="static.015">批准 / APPROVE</EditableText></span><b><EditableText id="static.016">接纳者进入资源或剧情链</EditableText></b>
          <div><small><EditableText id="static.017">健康者 · 正确接纳</EditableText></small><strong className="positive"><EditableText id="static.018">+50</EditableText></strong></div>
          <div><small><EditableText id="static.019">感染者 · 错误放行</EditableText></small><strong className="negative"><EditableText id="static.020">−50</EditableText></strong></div>
        </div>
        <p><EditableText id="static.021">同一个动作不预设对错，玩家必须先完成证据判断；结果再同时回写经营资源与世界观。</EditableText></p>
      </div>
    );
  }

  return (
    <div className={`quarantine-focus-visual qfv-view-${activeIndex}`} key={activeIndex}>
      <header><span>{visualMeta[0]}</span><b>{visualMeta[1]}</b><small>0{activeIndex + 1}<EditableText id="static.022">/ 05</EditableText></small></header>
      {body}
    </div>
  );
}

function CaseArrow({ up = false }: { up?: boolean }) {
  return <svg className={`case-arrow ${up ? "points-up" : ""}`} viewBox="0 0 34 34" aria-hidden="true">
    <path d="M11 4H23V16H30L17 29L4 16H11Z" fill="currentColor" />
  </svg>;
}

function InteractionFlowViz({ project, activeIndex, onSelect }: { project: Project; activeIndex: number; onSelect: (index: number) => void }) {
  return (
    <div
      className={`focus-viz focus-${project.accent}`}
      aria-label={`${project.title}核心体验导航`}
    >
      <div className="focus-viz-heading">
        <b><EditableText id="static.023">核心体验</EditableText></b>
      </div>
      <ol>
        {project.highlights?.map((item, index) => (
          <li className={index === activeIndex ? "current" : ""} key={item.title}>
            <button type="button" className="focus-side-tab" aria-pressed={index === activeIndex} onClick={() => onSelect(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b><EditableText id={project.id + '.focus.' + index + '.label'}>{item.title}</EditableText></b>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("全部");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewMedia | null>(null);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);
  const [viewerTransform, setViewerTransform] = useState({ scale: 1, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ pointerId: number; startX: number; startY: number; originX: number; originY: number } | null>(null);
  const initialViewerScale = 1;

  const openPreview = (media: PreviewMedia) => {
    setViewerTransform({ scale: initialViewerScale, x: 0, y: 0 });
    setIsDragging(false);
    setPreview(media);
  };

  const visibleProjects = useMemo(
    () => portfolioProjects.filter((project) => activeCategory === "全部" || project.category === activeCategory),
    [activeCategory],
  );

  const categoryCounts = useMemo(
    () => ({
      全部: portfolioProjects.length,
      运营活动: portfolioProjects.filter((project) => project.category === "运营活动").length,
      系统玩法: portfolioProjects.filter((project) => project.category === "系统玩法").length,
    }),
    [],
  );

  useEffect(() => {
    if (!preview) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(null);
    };
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = previousOverflow;
    };
  }, [preview]);

  const changeZoom = (amount: number) => {
    setViewerTransform((current) => {
      const scale = Math.min(5, Math.max(1, Number((current.scale + amount).toFixed(2))));
      return scale === 1 ? { scale, x: 0, y: 0 } : { ...current, scale };
    });
  };

  const resetViewer = () => setViewerTransform({ scale: initialViewerScale, x: 0, y: 0 });

  const handleViewerWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    changeZoom(event.deltaY < 0 ? 0.25 : -0.25);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture is optional; dragging still works while the pointer remains over the viewer.
    }
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, originX: viewerTransform.x, originY: viewerTransform.y };
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    setViewerTransform((current) => ({ ...current, x: drag.originX + event.clientX - drag.startX, y: drag.originY + event.clientY - drag.startY }));
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
      try {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // Some browsers release capture automatically.
      }
    }
    setIsDragging(false);
  };

  const collapseProject = (projectId: string) => {
    flushSync(() => setExpandedId(null));
    const card = document.getElementById(`project-${projectId}`);
    if (!card) return;
    const categoryBar = document.querySelector(".category-bar");
    const header = document.querySelector(".site-header");
    const topInset = Math.max(
      categoryBar?.getBoundingClientRect().bottom ?? 0,
      header?.getBoundingClientRect().bottom ?? 0,
    ) + 20;
    card.querySelector<HTMLButtonElement>(".project-summary")?.focus({ preventScroll: true });
    window.scrollTo({
      top: Math.max(0, window.scrollY + card.getBoundingClientRect().top - topInset),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  const selectCategory = (category: (typeof categories)[number]) => {
    flushSync(() => {
      setActiveCategory(category);
      setExpandedId(null);
      setActiveHighlightIndex(0);
    });
    const firstProject = document.querySelector<HTMLElement>(".project-list > .project");
    const categoryBar = document.querySelector<HTMLElement>(".category-bar");
    if (!firstProject || !categoryBar) return;
    const stickyTop = parseFloat(getComputedStyle(categoryBar).top) || 0;
    const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
    const inset = Math.max(stickyTop, headerBottom) + categoryBar.getBoundingClientRect().height + 20;
    window.scrollTo({
      top: Math.max(0, window.scrollY + firstProject.getBoundingClientRect().top - inset),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <TextEditorProvider><main>
      <a className="skip-link" href="#works">跳到精选作品</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="返回首页">
          <span>JO</span>
          <small>交互设计作品集</small>
        </a>
        <nav aria-label="主要导航">
          <a href="#works">作品</a>
          <a href="#contact">联系</a>
        </nav>
        <span className="availability"><i /><EditableText id="static.024">可接受新机会</EditableText></span>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="hero-copy">
          <p className="kicker"><span><EditableText id="static.025">PORTFOLIO / 2026</EditableText></span><span><EditableText id="static.026">GAME UX · INTERACTION DESIGN</EditableText></span></p>
          <h1 className="identity-title"><strong><EditableText id="static.027">Shawnappy</EditableText></strong><span><b><EditableText id="static.028">杨潇</EditableText></b><i><EditableText id="static.029">作品集</EditableText></i></span></h1>
          <dl className="hero-contact-row" aria-label="联系方式与求职意向">
            <div><dt><EditableText id="static.030">PHONE / 电话</EditableText></dt><dd><a href="tel:15700675264"><EditableText id="static.031">15700675264</EditableText></a></dd></div>
            <div><dt><EditableText id="static.032">EMAIL / 邮箱</EditableText></dt><dd><a href="mailto:shawnappi6@foxmail.com"><EditableText id="static.033">shawnappi6@foxmail.com</EditableText></a></dd></div>
            <div><dt><EditableText id="static.034">POSITION / 求职意向</EditableText></dt><dd><EditableText id="static.035">交互设计师</EditableText></dd></div>
          </dl>
        </div>
        <div className="hero-resume" aria-label="杨潇的工作与实习经历">
          <figure className="hero-portrait">
            <img src="/resources/profile/yangxiao-portrait-cutout.png" alt="杨潇个人照片" />
          </figure>
          <div className="career-stack">
            <h2 className="career-heading"><EditableText id="static.036">工作经历</EditableText></h2>
            <section className="career-history" aria-label="工作与实习经历">
              <article className="career-entry career-entry-current">
                <header><h3><EditableText id="static.037">Tap4Fun</EditableText></h3><span><EditableText id="static.038">交互设计师</EditableText></span></header>
                <time><EditableText id="static.039">2025.07 — 至今</EditableText></time>
                <div className="career-project-info">
                  <b><EditableText id="static.040">猿族时代</EditableText></b>
                  <p><strong><EditableText id="static.041">长线运营</EditableText></strong><EditableText id="static.042">· 节日商业化 · 活动体验设计</EditableText></p>
                </div>
                <div className="career-project-info">
                  <b><EditableText id="static.043">Last Check</EditableText></b>
                  <p><strong><EditableText id="static.044">系统构建</EditableText></strong><EditableText id="static.045">· 体验验证 · 交互框架落地</EditableText></p>
                </div>
              </article>
              <article className="career-entry career-entry-intern">
                <header><h3><EditableText id="static.046">腾讯互娱</EditableText></h3><span><EditableText id="static.047">交互实习</EditableText></span></header>
                <div className="career-entry-meta"><p className="career-project-name"><EditableText id="static.048">王者荣耀国际版</EditableText></p><time><EditableText id="static.049">2024.04 — 2024.10</EditableText></time></div>
              </article>
              <article className="career-entry career-entry-intern">
                <header><h3><EditableText id="static.050">网易互娱</EditableText></h3><span><EditableText id="static.051">交互实习</EditableText></span></header>
                <div className="career-entry-meta"><p className="career-project-name"><EditableText id="static.052">阴阳师妖怪屋</EditableText></p><time><EditableText id="static.053">2023.11 — 2024.04</EditableText></time></div>
              </article>
            </section>
          </div>
        </div>
        <div className="hero-index"><span><EditableText id="static.054">SCROLL TO EXPLORE</EditableText></span><b><EditableText id="static.055">01</EditableText></b></div>
      </section>

      <section className="works" id="works" aria-label="作品案例">
        <div className="category-bar" aria-label="作品分类">
          {categories.map((category) => (
            <button
              className={activeCategory === category ? "active" : ""}
              key={category}
              onClick={() => selectCategory(category)}
              type="button"
              aria-pressed={activeCategory === category}
            >
              {category}<sup>{String(categoryCounts[category]).padStart(2, "0")}</sup>
            </button>
          ))}
        </div>

        <div className="project-list">
          {visibleProjects.map((project) => {
            const expanded = expandedId === project.id;
            const activeHighlight = project.highlights?.[activeHighlightIndex];
            return (
              <article id={`project-${project.id}`} className={`project project-${project.accent} ${expanded ? "expanded" : ""}`} key={project.id}>
                <button
                  className="project-summary"
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`details-${project.id}`}
                  onClick={() => {
                    if (expanded) {
                      collapseProject(project.id);
                    } else {
                      setExpandedId(project.id);
                      setActiveHighlightIndex(0);
                    }
                  }}
                >
                  <div className={`project-art art-${project.accent} ${project.coverAsset || project.coverVideoAsset ? "has-cover" : ""}`}>
                    {project.coverAsset && <img className="project-cover" src={project.coverAsset} alt="" loading="lazy" />}
                    {project.coverVideoAsset && (
                      <video className="project-cover project-cover-video" autoPlay muted loop playsInline preload="metadata" aria-label={`${project.title}动态封面`}>
                        <source src={project.coverVideoAsset} type="video/mp4" />
                      </video>
                    )}
                    <span className="art-number">{project.index}</span>
                    {!project.coverAsset && !project.coverVideoAsset && <><div className="art-window window-back"><i /><i /><i /></div><div className="art-window window-front"><b /><span /><span /><em /></div></>}
                    <small>{project.category} / {project.year}</small>
                  </div>
                  <div className="project-copy">
                    <h3>{<EditableText id={project.id + '.title'}>{project.title}</EditableText>}</h3>
                    <p>{<EditableText id={project.id + '.subtitle'}>{project.subtitle}</EditableText>}</p>
                    <div className="tag-row">{project.tags.map((tag) => <span key={tag}><EditableText id={project.id + '.tag.' + project.tags.indexOf(tag)}>{tag}</EditableText></span>)}</div>
                  </div>
                  <span className="expand-control"><i><CaseArrow up={expanded} /></i><b>{expanded ? "收起案例" : "展开案例"}</b></span>
                </button>

                {expanded && (
                  <div className="project-detail" id={`details-${project.id}`}>
                    {project.highlights && activeHighlight && (
                      <section className={`case-module interaction-focus focus-${project.accent}`} aria-labelledby={`focus-title-${project.id}`}>
                        <div className="case-section-heading focus-heading">
                          <h4 id={`focus-title-${project.id}`}><EditableText id="static.056">核心体验</EditableText></h4>
                        </div>
                        <dl className="focus-context" aria-label={`${project.title}设计依据`}>
                          <div><dt><EditableText id="static.057">问题</EditableText></dt><dd>{<EditableText id={project.id + '.challenge'}>{project.challenge}</EditableText>}</dd></div>
                          <div><dt><EditableText id="static.058">决策</EditableText></dt><dd>{<EditableText id={project.id + '.decision'}>{project.decision}</EditableText>}</dd></div>
                          <div><dt><EditableText id="static.059">结果</EditableText></dt><dd>{<EditableText id={project.id + '.result'}>{project.result}</EditableText>}</dd></div>
                        </dl>
                        <div className={`focus-stage focus-stage-${project.id}`} aria-live="polite">
                          <div className={`focus-presentation presentation-${project.id} highlight-${activeHighlightIndex + 1} ${project.id === "quarantine-gameplay" && activeHighlightIndex === 0 ? "is-tool-prototype" : ""}`}>
                            <header className="focus-presentation-heading">
                              <span>{String(activeHighlightIndex + 1).padStart(2, "0")}</span>
                              <h5>{(() => {
                                const [before, keyword, after] = coreExperienceHeadlines[activeHighlight.title] || ["", activeHighlight.title, ""];
                                return <EditableText id={project.id + '.focus.' + activeHighlightIndex + '.description'}>{before}<mark>{keyword}</mark>{after}</EditableText>;
                              })()}</h5>
                            </header>
                          <div
                            className={`focus-screen focus-${project.accent} screen-${project.id} ${activeHighlight.imageSrc || activeHighlight.videoSrc || project.screenAssets?.[activeHighlight.screenIndex] ? "has-real-screen" : "has-blueprint"}`}
                            aria-label={`${project.title}核心体验：${activeHighlight.title}`}
                          >
                            {activeHighlight.imageSources ? (
                              <div className="core-image-stack">{activeHighlight.imageSources.map((src) => <img key={src} src={src} alt={activeHighlight.title} loading="lazy" />)}</div>
                            ) : activeHighlight.activityVisual ? (
                              <ActivityFocusVisual visual={activeHighlight.activityVisual} />
                            ) : activeHighlight.imageSrc ? (
                              <img src={activeHighlight.imageSrc} alt={activeHighlight.title} />
                            ) : project.id === "quarantine-gameplay" && quarantineOriginalFocus[activeHighlightIndex] ? (
                              <img className="focus-original-diagram" src={quarantineOriginalFocus[activeHighlightIndex]} alt={activeHighlight.title} />
                            ) : project.id === "quarantine-gameplay" && !activeHighlight.videoSrc ? (
                              <QuarantineFocusVisual activeIndex={[3, 0, 1, 2, 4][activeHighlightIndex]} />
                            ) : activeHighlight.videoSrc ? (
                              <video key={`${project.id}-${activeHighlight.screenIndex}`} autoPlay muted loop playsInline preload="metadata">
                                <source src={activeHighlight.videoSrc} type="video/mp4" />
                              </video>
                            ) : project.screenAssets?.[activeHighlight.screenIndex] ? (
                              <img
                                key={`${project.id}-${activeHighlight.screenIndex}`}
                                src={project.screenAssets[activeHighlight.screenIndex]}
                                alt={`${project.title} · ${project.screens[activeHighlight.screenIndex]}`}
                                loading="lazy"
                              />
                            ) : (
                              <div className={`focus-blueprint layout-${activeHighlight.screenIndex % 3}`} aria-hidden="true">
                                <div className="blueprint-nav"><i /><b>{<EditableText id={project.id + '.title'}>{project.title}</EditableText>}</b><i /></div>
                                <div className="blueprint-stage"><span /><span /><strong>{project.screens[activeHighlight.screenIndex]}</strong><em /></div>
                                <div className="blueprint-side"><i /><i /><i /></div>
                                <div className="blueprint-action"><EditableText id="static.060">核心操作 </EditableText><b>→</b></div>
                              </div>
                            )}
                          </div>
                          </div>
                          <InteractionFlowViz project={project} activeIndex={activeHighlightIndex} onSelect={setActiveHighlightIndex} />
                        </div>
                      </section>
                    )}

                    {project.documentAsset && (
                      <section className="case-module document-showcase" aria-labelledby={`document-title-${project.id}`}>
                        <div className="case-section-heading document-heading">
                          <h4 id={`document-title-${project.id}`}><EditableText id="static.061">交互稿</EditableText></h4>
                          <p><EditableText id="static.062">完整流程与页面逻辑。点击打开大图，使用滚轮缩放并拖动查看细节。</EditableText></p>
                        </div>
                        <div className="document-section">
                          <button
                            className="document-preview"
                            type="button"
                            onClick={() => openPreview({ project: project.title, screen: "完整交互稿", accent: project.accent, kind: "image", src: project.documentAsset })}
                            aria-label={`放大查看${project.title}完整交互稿`}
                          >
                            <img src={project.documentAsset} alt="" loading="lazy" />
                            <span><b>完整交互稿</b><small>点击放大 · 滚轮缩放 · 拖动查看 ↗</small></span>
                          </button>
                        </div>
                      </section>
                    )}

                    <section className={`case-module media-showcase video-${project.accent} ${project.video ? "has-video" : "screens-only"}`} aria-labelledby={`media-title-${project.id}`}>
                      <div className="case-section-heading media-heading">
                        <h4 id={`media-title-${project.id}`}><EditableText id="static.063">设计展示</EditableText></h4>
                        <p><EditableText id={project.id + '.mediaDescription'}>{project.mediaDescription || (project.screenAssets ? "视频在前，界面在后；点击均可放大查看" : "结构示意用于说明信息层级")}</EditableText></p>
                      </div>

                      {project.video && (
                        <>
                        <div className="media-gallery-heading media-banner-heading">
                          <span><EditableText id="static.064">01</EditableText></span>
                          <b><EditableText id={project.id + '.videoLabel'}>{project.videoLabel || "完整操作演示"}</EditableText></b>
                          <small><EditableText id="static.065">01 VIDEO</EditableText></small>
                        </div>
                        <div className="media-banner">
                        {project.videoSrc ? (
                          <div className="video-preview-wrap">
                            <video className="video-player" controls preload="metadata" poster={project.coverAsset}>
                              <source src={project.videoSrc} type="video/mp4" /><EditableText id="static.066">您的浏览器不支持该视频格式。
                            </EditableText></video>
                            <button className="video-expand" type="button" onClick={() => openPreview({ project: project.title, screen: "完整演示视频", accent: project.accent, kind: "video", src: project.videoSrc })}>放大播放 ↗</button>
                          </div>
                        ) : (
                          <div className="video-stage" role="img" aria-label={`${project.title}演示视频占位画面`}><div className="play-mark">▶</div><span><EditableText id="static.067">00:00 / 01:24</EditableText></span><b>{<EditableText id={project.id + '.title'}>{project.title}</EditableText>}<small><EditableText id="static.068">交互演示 · 素材待接入</EditableText></small></b></div>
                        )}
                        </div>
                        </>
                      )}

                      <div className="media-gallery-heading">
                        <span>{project.video ? "02" : "01"}</span>
                        <b>{project.showcaseVideos ? "动态界面矩阵" : "关键界面"}</b>
                        <small>{String(project.showcaseVideos?.length || project.screens.length).padStart(2, "0")} {project.showcaseVideos ? "VIDEOS" : "SCREENS"}</small>
                      </div>
                      {project.showcaseVideos ? (
                        <div className="dynamic-video-grid">
                          {project.showcaseVideos.map((item) => (
                            <article className="dynamic-video-card" key={item.src}>
                              <video autoPlay muted loop playsInline preload="metadata" aria-label={`${project.title} · ${item.title}`}>
                                <source src={item.src} type="video/mp4" />
                              </video>
                              <div><span>{item.label}</span><b>{item.title}</b></div>
                              <button type="button" onClick={() => openPreview({ project: project.title, screen: item.title, accent: project.accent, kind: "video", src: item.src })}>放大播放 ↗</button>
                            </article>
                          ))}
                        </div>
                      ) : (
                        <div className={`screen-grid screens-${project.id} ${project.screenAssets ? "has-assets" : ""}`}>
                          {(project.galleryOrder || project.screens.map((_, index) => index)).map((screenIndex) => {
                            const screen = project.screens[screenIndex];
                            const screenAsset = project.screenAssets?.[screenIndex];
                            return (
                              <button
                                className={`screen-mock screen-${project.accent} ${screenAsset ? "has-image" : ""}`}
                                type="button"
                                key={screen}
                                onClick={() => openPreview({ project: project.title, screen, accent: project.accent, kind: "image", src: screenAsset })}
                                aria-label={`放大查看${project.title}的${screen}界面`}
                              >
                                {screenAsset ? (
                                  <img src={screenAsset} alt="" loading="lazy" />
                                ) : (
                                  <><div className="screen-top"><i /><span>{String(screenIndex + 1).padStart(2, "0")}</span></div><div className="screen-scene"><span /><span /><b /></div><div className="screen-lines"><i /><i /><i /></div></>
                                )}
                                <strong><EditableText id={project.id + '.screen.' + screenIndex}>{screen}</EditableText></strong>
                                <small>{screenAsset ? "点击放大 ↗" : "结构示意 ↗"}</small>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </section>

                    <button className="close-case floating-case-close" type="button" onClick={() => collapseProject(project.id)}>
                      <b>收起这个案例</b><span><CaseArrow up /></span>
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="eyebrow"><EditableText id="static.088">LET’S CREATE / 与我联系</EditableText></p>
        <h2><EditableText id="static.089">复杂玩法，值得被</EditableText><br /><EditableText id="static.090">设计成</EditableText><span><EditableText id="static.091">直觉体验。</EditableText></span></h2>
        <div className="contact-actions">
          <a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); }}>回到顶部 <span>↑</span></a>
          <div className="contact-status"><i /><EditableText id="static.093">开放全职与项目合作机会</EditableText></div>
        </div>
        <footer><span><EditableText id="static.094">游戏交互设计作品集 · 2026</EditableText></span><a href="#top">回到顶部 ↑</a><span><EditableText id="static.095">为清晰、惊喜与玩家而设计</EditableText></span></footer>
      </section>

      {preview && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${preview.project} ${preview.screen}大图预览`} onClick={() => setPreview(null)}>
          <button className="lightbox-close" type="button" aria-label="关闭预览" onClick={() => setPreview(null)} autoFocus><span>关闭查看</span><b>×</b></button>
          {preview.kind === "video" && preview.src ? (
            <div className="video-modal" onClick={(event) => event.stopPropagation()}>
              <video controls autoPlay preload="auto"><source src={preview.src} type="video/mp4" /><EditableText id="static.096">您的浏览器不支持该视频格式。</EditableText></video>
              <p>{preview.project} · {preview.screen}</p>
            </div>
          ) : (
            <div className="viewer-stage" onClick={(event) => event.stopPropagation()}>
              <div className="viewer-controls">
                <button type="button" onClick={() => changeZoom(-0.25)} aria-label="缩小">−</button>
                <span>{Math.round(viewerTransform.scale * 100)}%</span>
                <button type="button" onClick={() => changeZoom(0.25)} aria-label="放大">＋</button>
                <button type="button" onClick={resetViewer}>复位</button>
              </div>
              <div
                className={`viewer-canvas ${viewerTransform.scale > 1 ? "can-drag" : ""} ${isDragging ? "dragging" : ""}`}
                onWheel={handleViewerWheel}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={stopDragging}
                onPointerCancel={stopDragging}
                onDoubleClick={() => changeZoom(0.5)}
              >
                {preview.src ? (
                  <img
                    className="viewer-image"
                    src={preview.src}
                    alt={`${preview.project} · ${preview.screen}`}
                    draggable={false}
                    style={{ transform: `translate(${viewerTransform.x}px, ${viewerTransform.y}px) scale(${viewerTransform.scale})` }}
                  />
                ) : (
                  <div className={`lightbox-screen screen-${preview.accent}`}><div className="lightbox-ui"><span><EditableText id="static.097">LIVE INTERFACE / 01</EditableText></span><b>{preview.screen}</b><i /></div><div className="lightbox-panel"><span /><span /><span /><b /></div></div>
                )}
              </div>
              <p className="viewer-caption">{preview.project} · {preview.screen}</p>
              <p className="viewer-hint"><EditableText id="static.098">滚轮缩放 · 按住鼠标拖动 · ESC 关闭</EditableText></p>
            </div>
          )}
        </div>
      )}
    </main></TextEditorProvider>
  );
}
