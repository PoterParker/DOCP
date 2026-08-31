import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shawnappy 杨潇｜游戏交互设计作品集",
  description: "Shawnappy 杨潇的游戏交互设计作品集，聚焦复杂系统、运营体验与玩法交互。",
  keywords: ["游戏交互设计", "UX 设计", "系统玩法", "运营活动", "作品集"],
  openGraph: {
    title: "Shawnappy 杨潇｜游戏交互设计作品集",
    description: "复杂系统、运营体验与玩法交互设计案例。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
