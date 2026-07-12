import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "游戏交互设计师作品集｜复杂玩法，直觉体验",
  description: "游戏交互设计作品集，聚焦运营活动、系统玩法与体验创新。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
