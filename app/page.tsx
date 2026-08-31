"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Category = "运营活动" | "系统玩法" | "其他";

type InteractionHighlight = {
  title: string;
  summary: string;
  screenIndex: number;
  focusStep: number;
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
  screenAssets?: string[];
  flow: string[];
  accent: string;
  video: boolean;
  videoSrc?: string;
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
    challenge: "数字界面既要保留推币过程的期待与随机性，也要让硬币消耗、积分、怪物血量、宝箱进度和限时增益在高密度场景中保持清晰。",
    decision: "围绕推币台建立唯一视觉焦点，用硬币堆积、掉落、炮击和宝箱进度形成连续反馈，并通过点金模式、怪物刷新和高级怪列表制造阶段爆发。",
    result: "玩家从每次投币都能获得即时反馈，同时持续追踪积分、宝箱和限时目标，短期爽感与长期奖励形成完整闭环。",
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
        title: "阶段爆发可预期",
        summary: "炮击与点金不是随机插入的特效，而是由进度、倒计时和场景变化共同预告的节奏峰值。",
        screenIndex: 3,
        focusStep: 2,
      },
      {
        title: "短反馈接入长目标",
        summary: "每次掉币给即时爽感，积分、怪物与宝箱进度继续承接行动，让单次点击自然进入长期奖励循环。",
        screenIndex: 6,
        focusStep: 3,
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
    challenge: "主玩法操作需要足够直观，同时鱼饵消耗、鱼类稀有度、订单交易、图鉴和配套付费模块又要形成长期目标，避免活动只剩重复点击。",
    decision: "用清晰的待机、钓鱼与成功反馈建立主操作节奏，再通过渔市订单把收获转化为成长资源，并用图鉴、今日目标和通行证承接短中长期追求。",
    result: "玩家能从一次钓鱼自然进入收集、交易与升级循环，主玩法与鱼竿礼包、消耗福利及通行证形成可理解的内容层级。",
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
        title: "主操作状态零歧义",
        summary: "待机、钓鱼与成功状态用角色动作和场景反馈直接区分，玩家不用阅读说明也能判断下一步。",
        screenIndex: 1,
        focusStep: 1,
      },
      {
        title: "收获立刻转化价值",
        summary: "钓到的鱼不滞留在背包里，而是直接进入渔市订单，收获反馈随即转化为明确的成长资源。",
        screenIndex: 6,
        focusStep: 2,
      },
      {
        title: "长线目标自然外延",
        summary: "图鉴、今日目标与通行证承接主玩法结果，让一次钓鱼同时推进收集、成长与阶段奖励。",
        screenIndex: 11,
        focusStep: 3,
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
    challenge: "原活动以个人循环为主，社交关系只停留在邀请入口；新增合作机制既要让每位成员的贡献清晰可见，也不能打断原有活动节奏。",
    decision: "用四个可独立推进的建设任务承载分工，以队员状态、修建进度和阶段奖励持续反馈合作成果，并在主页汇总舞台整体完成度。",
    result: "个人任务、队友贡献与共同目标被放进同一条进度链路，玩家能从邀请、修建到结算完整感知小队合作带来的变化。",
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
        title: "四人分工一屏建立",
        summary: "灯光、屏幕、音响和舞台被拆成四条并行任务，队员位置、建设对象和当前缺口在同一屏完成认领。",
        screenIndex: 2,
        focusStep: 1,
      },
      {
        title: "个人动作回写团队进度",
        summary: "每次修建都同时更新个人任务与舞台总进度，让贡献不只是一串数值，而是可见的共同变化。",
        screenIndex: 3,
        focusStep: 2,
      },
      {
        title: "阶段完成形成集体时刻",
        summary: "单项完成、总体完成与结算奖励层层升级反馈，把四条个人路径最终收束到同一个庆祝节点。",
        screenIndex: 7,
        focusStep: 3,
      },
    ],
    accent: "cyan",
    video: true,
    videoSrc: "/resources/运营活动/组队竞赛活动/视频/组队竞赛活动-网页.mp4",
    documentAsset: "/resources/运营活动/组队竞赛活动/文档/节日大富翁活动增加小队合作.jpg",
  },
  {
    id: "guild-system",
    index: "04",
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
    index: "05",
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
    index: "06",
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
    index: "07",
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
    index: "08",
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
    index: "09",
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

const categories: Array<"全部" | Category> = ["全部", "运营活动", "系统玩法", "其他"];

function InteractionFlowViz({ project, highlight }: { project: Project; highlight: InteractionHighlight }) {
  return (
    <div
      className={`focus-viz focus-${project.accent}`}
      key={`${project.id}-${highlight.title}`}
      role="img"
      aria-label={`${project.title}交互流程，当前设计重心是${highlight.title}，落在${project.flow[highlight.focusStep]}阶段`}
    >
      <div className="focus-viz-heading">
        <b>核心路径：{project.flow[highlight.focusStep]}</b>
      </div>
      <ol>
        {project.flow.map((step, index) => (
          <li className={`${index <= highlight.focusStep ? "reached" : ""} ${index < highlight.focusStep ? "connected" : ""} ${index === highlight.focusStep ? "current" : ""}`} key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{step}</b>
          </li>
        ))}
      </ol>
      <p>{highlight.summary}</p>
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
    () => projects.filter((project) => activeCategory === "全部" || project.category === activeCategory),
    [activeCategory],
  );

  const categoryCounts = useMemo(
    () => ({
      全部: projects.length,
      运营活动: projects.filter((project) => project.category === "运营活动").length,
      系统玩法: projects.filter((project) => project.category === "系统玩法").length,
      其他: projects.filter((project) => project.category === "其他").length,
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

  const selectCategory = (category: (typeof categories)[number]) => {
    setActiveCategory(category);
    setExpandedId(null);
    setActiveHighlightIndex(0);
  };

  return (
    <main>
      <a className="skip-link" href="#works">跳到精选作品</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="返回首页">
          <span>JO</span>
          <small>交互设计作品集</small>
        </a>
        <nav aria-label="主要导航">
          <a href="#works">作品</a>
          <a href="#about">关于</a>
          <a href="#contact">联系</a>
        </nav>
        <span className="availability"><i /> 可接受新机会</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="hero-copy">
          <p className="kicker"><span>PORTFOLIO / 2026</span><span>GAME UX · INTERACTION DESIGN</span></p>
          <h1 className="identity-title"><strong>Shawnappy</strong><span><b>杨潇</b><i>作品集</i></span></h1>
          <dl className="hero-contact-row" aria-label="联系方式与求职意向">
            <div><dt>PHONE / 电话</dt><dd><a href="tel:15700675264">15700675264</a></dd></div>
            <div><dt>EMAIL / 邮箱</dt><dd><a href="mailto:shawnappi6@foxmail.com">shawnappi6@foxmail.com</a></dd></div>
            <div><dt>POSITION / 求职意向</dt><dd>交互设计师</dd></div>
          </dl>
        </div>
        <div className="hero-resume" aria-label="杨潇的工作与实习经历">
          <figure className="hero-portrait">
            <img src="/resources/profile/yangxiao-portrait-cutout.png" alt="杨潇个人照片" />
          </figure>
          <div className="career-stack">
            <p className="career-heading">EXPERIENCE</p>
            <article className="career-current">
              <div className="career-label"><span>01 / 当前工作</span></div>
              <div className="career-job-title"><b>Tap4Fun</b><span>交互策划 / 设计</span></div>
              <ul>
                <li>线上 <b>SLG 长线运营</b>与节日商业化设计</li>
                <li>主导 <b>Last Check</b> 系统构建与体验设计</li>
                <li>独立完成<b>体验验证</b>与交互框架落地</li>
              </ul>
            </article>
            <section className="career-internships" aria-label="实习经历">
              <header><span>02 / 实习经历</span></header>
              <div><b>腾讯互娱</b><span>王者荣耀国际版</span></div>
              <div><b>网易互娱</b><span>阴阳师妖怪屋</span></div>
            </section>
          </div>
        </div>
        <div className="hero-index"><span>SCROLL TO EXPLORE</span><b>01</b></div>
      </section>

      <section className="works" id="works">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SELECTED WORKS / 精选作品</p>
            <h2>三个深度案例，<br />六个系统命题。</h2>
          </div>
          <p>前三个案例包含真实界面、交互稿与演示，<br />其余项目展示我对不同体验问题的拆解方式。</p>
        </div>

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
              <article className={`project project-${project.accent} ${expanded ? "expanded" : ""}`} key={project.id}>
                <button
                  className="project-summary"
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`details-${project.id}`}
                  onClick={() => {
                    setExpandedId(expanded ? null : project.id);
                    if (!expanded) setActiveHighlightIndex(0);
                  }}
                >
                  <div className={`project-art art-${project.accent} ${project.coverAsset ? "has-cover" : ""}`}>
                    {project.coverAsset && <img className="project-cover" src={project.coverAsset} alt="" loading="lazy" />}
                    <span className="art-number">{project.index}</span>
                    {!project.coverAsset && <><div className="art-window window-back"><i /><i /><i /></div><div className="art-window window-front"><b /><span /><span /><em /></div></>}
                    <small>{project.category} / {project.year}</small>
                  </div>
                  <div className="project-copy">
                    <div className="project-meta"><span>{project.index}</span><span>{project.category}</span><span>{project.year}</span><b className={project.coverAsset ? "" : "structure-case"}>{project.coverAsset ? "完整案例" : "结构案例"}</b></div>
                    <h3>{project.title}</h3>
                    <p>{project.subtitle}</p>
                    <div className="project-quick-meta"><span>{project.role}</span><span>{project.platform}</span></div>
                    <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                  <span className="expand-control"><i>{expanded ? "−" : "+"}</i><b>{expanded ? "收起案例" : "展开案例"}</b></span>
                </button>

                {expanded && (
                  <div className="project-detail" id={`details-${project.id}`}>
                    {project.highlights && activeHighlight && (
                      <section className={`interaction-focus focus-${project.accent}`} aria-labelledby={`focus-title-${project.id}`}>
                        <div className="focus-heading">
                          <h4 id={`focus-title-${project.id}`}>一眼看懂设计重心</h4>
                          <p>选择亮点，大图与动态路径会同步切换。</p>
                        </div>
                        <div className="focus-tabs" aria-label={`${project.title}交互亮点`}>
                          {project.highlights.map((highlight, highlightIndex) => (
                            <button
                              type="button"
                              key={highlight.title}
                              aria-pressed={activeHighlightIndex === highlightIndex}
                              onClick={() => setActiveHighlightIndex(highlightIndex)}
                            >
                              <span>{String(highlightIndex + 1).padStart(2, "0")}</span>
                              <b>{highlight.title}</b>
                            </button>
                          ))}
                        </div>
                        <dl className="focus-context" aria-label={`${project.title}设计依据`}>
                          <div><dt>01 / 问题</dt><dd>{project.challenge}</dd></div>
                          <div><dt>02 / 决策</dt><dd>{project.decision}</dd></div>
                          <div><dt>03 / 结果</dt><dd>{project.result}</dd></div>
                        </dl>
                        <div className="focus-stage" aria-live="polite">
                          <button
                            className={`focus-screen focus-${project.accent} ${project.screenAssets?.[activeHighlight.screenIndex] ? "has-real-screen" : "has-blueprint"}`}
                            type="button"
                            onClick={() => openPreview({
                              project: project.title,
                              screen: project.screens[activeHighlight.screenIndex],
                              accent: project.accent,
                              kind: "image",
                              src: project.screenAssets?.[activeHighlight.screenIndex],
                            })}
                            aria-label={`放大查看${project.title}的${project.screens[activeHighlight.screenIndex]}界面`}
                          >
                            {project.screenAssets?.[activeHighlight.screenIndex] ? (
                              <img
                                key={`${project.id}-${activeHighlight.screenIndex}`}
                                src={project.screenAssets[activeHighlight.screenIndex]}
                                alt={`${project.title} · ${project.screens[activeHighlight.screenIndex]}`}
                                loading="lazy"
                              />
                            ) : (
                              <div className={`focus-blueprint layout-${activeHighlight.screenIndex % 3}`} aria-hidden="true">
                                <div className="blueprint-nav"><i /><b>{project.title}</b><i /></div>
                                <div className="blueprint-stage"><span /><span /><strong>{project.screens[activeHighlight.screenIndex]}</strong><em /></div>
                                <div className="blueprint-side"><i /><i /><i /></div>
                                <div className="blueprint-action">核心操作 <b>→</b></div>
                              </div>
                            )}
                            <span>
                              <b>{project.screens[activeHighlight.screenIndex]}</b>
                              <i>{project.screenAssets?.[activeHighlight.screenIndex] ? "点击查看大图 ↗" : "待替换真实界面"}</i>
                            </span>
                          </button>
                          <InteractionFlowViz project={project} highlight={activeHighlight} />
                        </div>
                      </section>
                    )}

                    <section className={`media-showcase video-${project.accent} ${project.video ? "has-video" : "screens-only"}`} aria-labelledby={`media-title-${project.id}`}>
                      <div className="media-heading">
                        <h4 id={`media-title-${project.id}`}>{project.video ? "先看操作节奏，再看关键状态" : "关键界面与状态"}</h4>
                        <p>{project.screenAssets ? "视频在前，界面在后；点击均可放大查看" : "结构示意用于说明信息层级"}</p>
                      </div>

                      {project.video && (
                        <div className="media-banner">
                        {project.videoSrc ? (
                          <div className="video-preview-wrap">
                            <span className="media-banner-label"><strong>01</strong><b>完整操作演示</b></span>
                            <video className="video-player" controls preload="metadata" poster={project.coverAsset}>
                              <source src={project.videoSrc} type="video/mp4" />
                              您的浏览器不支持该视频格式。
                            </video>
                            <button className="video-expand" type="button" onClick={() => openPreview({ project: project.title, screen: "完整演示视频", accent: project.accent, kind: "video", src: project.videoSrc })}>放大播放 ↗</button>
                          </div>
                        ) : (
                          <div className="video-stage" role="img" aria-label={`${project.title}演示视频占位画面`}><div className="play-mark">▶</div><span>00:00 / 01:24</span><b>{project.title}<small>交互演示 · 素材待接入</small></b></div>
                        )}
                      </div>
                      )}

                      <div className="media-gallery-heading">
                        <span>{project.video ? "02" : "01"}</span>
                        <b>关键界面</b>
                        <small>{String(project.screens.length).padStart(2, "0")} SCREENS</small>
                      </div>
                      <div className={`screen-grid ${project.screenAssets ? "has-assets" : ""}`}>
                        {project.screens.map((screen, screenIndex) => {
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
                              <strong>{screen}</strong>
                              <small>{screenAsset ? "点击放大 ↗" : "结构示意 ↗"}</small>
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    {project.documentAsset && (
                      <div className="document-section">
                        <div className="document-heading">
                          <h4>从需求、流程到细节设计</h4>
                          <p>点击打开大图，使用滚轮缩放，按住鼠标拖动查看细节。</p>
                        </div>
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
                    )}

                    <button className="close-case" type="button" onClick={() => setExpandedId(null)}><b>收起这个案例</b><span>↑</span></button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-number">08<span>+</span></div>
        <div className="about-copy">
          <p className="eyebrow">ABOUT / 关于我</p>
          <h2>设计不是装饰界面，<br />而是组织玩家的<span>理解、选择与情绪。</span></h2>
          <p>我是一名游戏交互设计师，擅长在复杂规则中建立清晰路径。我关心每一个状态如何被理解、每一次操作如何得到回应，也关心方案怎样被团队高效实现。</p>
          <div className="skills-grid">
            <div><span>01</span><b>体验策略</b><small>目标拆解 · 玩家旅程 · 体验原则</small></div>
            <div><span>02</span><b>系统交互</b><small>信息架构 · 状态设计 · 复杂流程</small></div>
            <div><span>03</span><b>原型验证</b><small>动效原型 · 可用性测试 · 迭代</small></div>
            <div><span>04</span><b>团队协作</b><small>设计规范 · 方案评审 · 落地跟进</small></div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="eyebrow">LET’S CREATE / 与我联系</p>
        <h2>复杂玩法，值得被<br />设计成<span>直觉体验。</span></h2>
        <p>如果你也在解决系统复杂度、活动节奏或玩家理解成本，我们应该聊聊。联系方式可通过我的简历获取。</p>
        <div className="contact-actions">
          <a href="#works">再次浏览案例 <span>↑</span></a>
          <div className="contact-status"><i /> 开放全职与项目合作机会</div>
        </div>
        <footer><span>游戏交互设计作品集 · 2026</span><a href="#top">回到顶部 ↑</a><span>为清晰、惊喜与玩家而设计</span></footer>
      </section>

      {preview && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${preview.project} ${preview.screen}大图预览`} onClick={() => setPreview(null)}>
          <button className="lightbox-close" type="button" aria-label="关闭预览" onClick={() => setPreview(null)} autoFocus><span>关闭查看</span><b>×</b></button>
          {preview.kind === "video" && preview.src ? (
            <div className="video-modal" onClick={(event) => event.stopPropagation()}>
              <video controls autoPlay preload="auto"><source src={preview.src} type="video/mp4" />您的浏览器不支持该视频格式。</video>
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
                  <div className={`lightbox-screen screen-${preview.accent}`}><div className="lightbox-ui"><span>LIVE INTERFACE / 01</span><b>{preview.screen}</b><i /></div><div className="lightbox-panel"><span /><span /><span /><b /></div></div>
                )}
              </div>
              <p className="viewer-caption">{preview.project} · {preview.screen}</p>
              <p className="viewer-hint">滚轮缩放 · 按住鼠标拖动 · ESC 关闭</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
