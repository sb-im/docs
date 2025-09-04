import React, { useState } from 'react';
import OriginalNavbar from '@theme-original/Navbar';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import Header from '../../components/Header';
import MobileHeader from '../../components/MobileHeader';
import SimplifiedMobileNav from '../../components/SimplifiedMobileNav';

export default function Navbar(props: any) {
  const mobileSidebar = useNavbarMobileSidebar();

  return (
    <>
      {/* 保留原始导航栏但隐藏，供 TOC 等组件使用 */}
      <div className="original-navbar-hidden">
        <OriginalNavbar {...props} />
      </div>

      {/* 桌面端使用我们的自定义 Header */}
      <div className="navbar-desktop-wrapper">
        <Header />
      </div>

      {/* 移动端使用我们的自定义 MobileHeader */}
      <div className="navbar-mobile-wrapper">
        <MobileHeader />
      </div>

      {/* 我们的简化版移动端导航 - 无蓝色横幅 */}
      <SimplifiedMobileNav
        isOpen={mobileSidebar.shown}
        onClose={mobileSidebar.toggle}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
          /* 隐藏原始的 Docusaurus 导航栏但保持在 DOM 中 */
          .original-navbar-hidden {
            position: absolute;
            top: -9999px;
            left: -9999px;
            visibility: hidden;
            pointer-events: none;
            z-index: -1;
          }

          /* 桌面端显示规则 */
          @media (min-width: 997px) {
            .navbar-desktop-wrapper {
              display: block;
            }
            .navbar-mobile-wrapper {
              display: none;
            }
          }

          /* 移动端显示规则 - 基于 SM.md 中的 996px 断点 */
          @media (max-width: 996px) {
            .navbar-desktop-wrapper {
              display: none;
            }
            .navbar-mobile-wrapper {
              display: block;
            }

            /* 隐藏默认的 Docusaurus 移动端侧边栏 */
            .navbar-sidebar__backdrop {
              display: none !important;
            }

            .navbar-sidebar__items {
              display: none !important;
            }

            .navbar-sidebar__brand {
              display: none !important;
            }

            .navbar-sidebar {
              display: none !important;
            }

            /* 隐藏默认的导航栏切换按钮 */
            .navbar__toggle,
            .navbar-sidebar__toggle,
            button[aria-label*="Toggle navigation bar"],
            button[aria-label*="切换导航栏"] {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
            }
          }
        `
      }} />
    </>
  );
}
