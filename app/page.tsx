"use client";

import { useEffect, useMemo, useState } from "react";

type Category = "运营活动" | "系统玩法" | "其他";

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
  flow: string[];
  accent: string;
  video: boolean;
};

const projects: Project[] = [
  {
    id: "summer-festival",
    index: "01",
    category: "运营活动",
    title: "盛夏巡游季",
    subtitle: "把高密度活动信息，整理成一场轻松的探索旅程",
    year: "2025",
    platform: "移动端",
    role: "主交互设计",
    duration: "8 周",
    brief: "围绕暑期版本构建活动主会场，串联签到、探索、任务与兑换，让玩家始终知道下一步要做什么。",
    challenge: "活动入口多、规则复杂，玩家在旧版本中频繁迷路；同时，商业目标要求多个玩法都获得稳定曝光。",
    decision: "以“旅程地图”替代功能列表，用进度节点承载目标、奖励和状态反馈，并把规则解释延后到需要它的时刻。",
    result: "主路径更清晰，关键奖励的可见性提升；方案覆盖活动预热、开启、冲刺与结算四个阶段。",
    tags: ["活动主会场", "任务体系", "信息架构"],
    screens: ["巡游地图", "任务进度", "奖励兑换"],
    flow: ["进入会场", "定位今日目标", "完成探索任务", "领取并兑换奖励"],
    accent: "violet",
    video: true,
  },
  {
    id: "anniversary",
    index: "02",
    category: "运营活动",
    title: "周年庆典计划",
    subtitle: "用连续的情绪节奏，承接回流、庆典与付费转化",
    year: "2025",
    platform: "移动端 / PC",
    role: "交互设计",
    duration: "6 周",
    brief: "一次多模块周年庆体验，将回忆、共创、挑战与福利整合为统一的庆典叙事。",
    challenge: "四个子活动视觉各异、开放时间不同，玩家容易把周年庆理解成彼此割裂的入口集合。",
    decision: "建立统一时间轴与庆典状态语言，用“回忆—参与—挑战—共庆”串起完整体验。",
    result: "跨端体验保持一致，核心活动可在三步内到达，重要时间点拥有明确预告与提醒。",
    tags: ["周年庆", "跨端体验", "时间轴"],
    screens: ["庆典首页", "回忆长卷", "共创舞台"],
    flow: ["观看周年回顾", "选择庆典章节", "参与共创挑战", "分享纪念结果"],
    accent: "orange",
    video: true,
  },
  {
    id: "returning-player",
    index: "03",
    category: "运营活动",
    title: "归航者计划",
    subtitle: "为回归玩家重新建立目标感，而不是塞满福利弹窗",
    year: "2024",
    platform: "移动端",
    role: "独立交互设计",
    duration: "5 周",
    brief: "针对不同流失时长与养成阶段，为回归玩家生成个性化的七日恢复路径。",
    challenge: "玩家回归后既不了解版本变化，也不知道资源该投向哪里；过量奖励反而增加决策负担。",
    decision: "用角色诊断生成三条优先建议，把系统变化嵌入任务过程，并允许玩家自由调整恢复目标。",
    result: "回归路径从信息灌输转为行动引导，关键系统解释与实际操作形成闭环。",
    tags: ["用户分层", "个性化任务", "回流体验"],
    screens: ["状态诊断", "七日航线", "版本速览"],
    flow: ["识别回归状态", "生成恢复目标", "完成阶段任务", "回到常规循环"],
    accent: "cyan",
    video: true,
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
    accent: "lime",
    video: false,
  },
];

const categories: Array<"全部" | Category> = ["全部", "运营活动", "系统玩法", "其他"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("全部");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ project: string; screen: string; accent: string } | null>(null);

  const visibleProjects = useMemo(
    () => projects.filter((project) => activeCategory === "全部" || project.category === activeCategory),
    [activeCategory],
  );

  useEffect(() => {
    if (!preview) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(null);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [preview]);

  const selectCategory = (category: (typeof categories)[number]) => {
    setActiveCategory(category);
    setExpandedId(null);
  };

  return (
    <main>
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
          <p className="kicker"><span>游戏交互设计师</span><span>作品集 · 2026</span></p>
          <h1>让复杂玩法<br />成为<span>直觉体验。</span></h1>
          <p className="hero-intro">我专注于复杂系统、运营体验与玩法交互设计，<br />在商业目标、玩家感受与落地效率之间寻找清晰答案。</p>
          <div className="hero-actions">
            <a className="primary-action" href="#works">浏览精选作品 <span>↘</span></a>
            <a className="text-action" href="#about">了解我的方法</a>
          </div>
        </div>
        <div className="hero-exhibit" aria-hidden="true">
          <div className="orbit orbit-a" />
          <div className="orbit orbit-b" />
          <div className="exhibit-card card-main">
            <div className="mini-status"><span>任务进度</span><b>04 / 07</b></div>
            <div className="mini-map"><i /><i /><i /><i /><i /></div>
            <div className="mini-cta">继续探索 <span>→</span></div>
          </div>
          <div className="exhibit-card card-note"><small>PLAYER FLOW</small><b>目标 · 行动 · 反馈</b></div>
          <div className="exhibit-card card-chip">UX / 09</div>
          <div className="cursor-mark">+</div>
        </div>
        <div className="hero-index"><span>SCROLL TO EXPLORE</span><b>01</b></div>
      </section>

      <section className="works" id="works">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SELECTED WORKS / 精选作品</p>
            <h2>九个项目，<br />九种体验命题。</h2>
          </div>
          <p>从短期运营节奏到长期系统循环，<br />展示我如何拆解问题、组织信息并验证体验。</p>
        </div>

        <div className="category-bar" aria-label="作品分类">
          {categories.map((category) => (
            <button
              className={activeCategory === category ? "active" : ""}
              key={category}
              onClick={() => selectCategory(category)}
              type="button"
            >
              {category}<sup>{category === "全部" ? "09" : "03"}</sup>
            </button>
          ))}
        </div>

        <div className="project-list">
          {visibleProjects.map((project) => {
            const expanded = expandedId === project.id;
            return (
              <article className={`project ${expanded ? "expanded" : ""}`} key={project.id}>
                <button
                  className="project-summary"
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`details-${project.id}`}
                  onClick={() => setExpandedId(expanded ? null : project.id)}
                >
                  <div className={`project-art art-${project.accent}`}>
                    <span className="art-number">{project.index}</span>
                    <div className="art-window window-back"><i /><i /><i /></div>
                    <div className="art-window window-front"><b /><span /><span /><em /></div>
                    <small>{project.category} / {project.year}</small>
                  </div>
                  <div className="project-copy">
                    <div className="project-meta"><span>{project.index}</span><span>{project.category}</span><span>{project.year}</span></div>
                    <h3>{project.title}</h3>
                    <p>{project.subtitle}</p>
                    <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                  <span className="expand-control"><i>{expanded ? "−" : "+"}</i>{expanded ? "收起案例" : "展开案例"}</span>
                </button>

                {expanded && (
                  <div className="project-detail" id={`details-${project.id}`}>
                    <div className="detail-intro">
                      <p className="detail-lead">{project.brief}</p>
                      <dl>
                        <div><dt>平台</dt><dd>{project.platform}</dd></div>
                        <div><dt>角色</dt><dd>{project.role}</dd></div>
                        <div><dt>周期</dt><dd>{project.duration}</dd></div>
                      </dl>
                    </div>

                    <div className="case-columns">
                      <div><span>01 / 问题</span><h4>把真正的阻力<br />从表象里找出来</h4><p>{project.challenge}</p></div>
                      <div><span>02 / 决策</span><h4>用结构与反馈<br />建立行动信心</h4><p>{project.decision}</p></div>
                      <div><span>03 / 结果</span><h4>让方案形成<br />可持续的闭环</h4><p>{project.result}</p></div>
                    </div>

                    <div className="showcase-heading">
                      <div><p className="eyebrow">UI SHOWCASE / 界面陈列</p><h4>关键界面与状态</h4></div>
                      <p>点击界面可放大查看</p>
                    </div>
                    <div className="screen-grid">
                      {project.screens.map((screen, screenIndex) => (
                        <button
                          className={`screen-mock screen-${project.accent}`}
                          type="button"
                          key={screen}
                          onClick={() => setPreview({ project: project.title, screen, accent: project.accent })}
                          aria-label={`放大查看${project.title}的${screen}界面`}
                        >
                          <div className="screen-top"><i /><span>{String(screenIndex + 1).padStart(2, "0")}</span></div>
                          <div className="screen-scene"><span /><span /><b /></div>
                          <div className="screen-lines"><i /><i /><i /></div>
                          <strong>{screen}</strong>
                          <small>点击放大 ↗</small>
                        </button>
                      ))}
                    </div>

                    <div className="flow-section">
                      <div><p className="eyebrow">INTERACTION FLOW / 交互稿</p><h4>让每一步都自然导向下一步</h4></div>
                      <ol>
                        {project.flow.map((step, stepIndex) => (
                          <li key={step}><span>{String(stepIndex + 1).padStart(2, "0")}</span><b>{step}</b>{stepIndex < project.flow.length - 1 && <i>→</i>}</li>
                        ))}
                      </ol>
                    </div>

                    {project.video && (
                      <div className={`video-section video-${project.accent}`}>
                        <div className="video-copy"><p className="eyebrow">MOTION PROTOTYPE / 演示视频</p><h4>从静态方案到<br />完整操作节奏</h4><p>视频区域已预留，接入你的 MP4 或公开视频链接后即可直接播放。</p></div>
                        <div className="video-stage" role="img" aria-label={`${project.title}演示视频占位画面`}>
                          <div className="play-mark">▶</div>
                          <span>00:00 / 01:24</span>
                          <b>{project.title}<small>交互演示 · 素材待接入</small></b>
                        </div>
                      </div>
                    )}

                    <button className="close-case" type="button" onClick={() => setExpandedId(null)}>收起这个案例 <span>↑</span></button>
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
        <h2>有一个值得<br />认真解决的<span>体验问题？</span></h2>
        <p>我愿意听听你的项目与挑战。个人邮箱、微信或其他联系方式可在下一版补充到这里。</p>
        <div className="contact-status"><i /> 联系方式待补充</div>
        <footer><span>游戏交互设计作品集 · 2026</span><a href="#top">回到顶部 ↑</a><span>为清晰、惊喜与玩家而设计</span></footer>
      </section>

      {preview && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${preview.project} ${preview.screen}大图预览`} onClick={() => setPreview(null)}>
          <button className="lightbox-close" type="button" aria-label="关闭预览" onClick={() => setPreview(null)}>关闭 ×</button>
          <div className={`lightbox-screen screen-${preview.accent}`} onClick={(event) => event.stopPropagation()}>
            <div className="lightbox-ui"><span>LIVE INTERFACE / 01</span><b>{preview.screen}</b><i /></div>
            <div className="lightbox-panel"><span /><span /><span /><b /></div>
            <p>{preview.project} · 关键界面预览</p>
          </div>
        </div>
      )}
    </main>
  );
}
