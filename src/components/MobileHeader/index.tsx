import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { useColorMode } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import './styles.css';

interface MobileHeaderProps {
  className?: string;
}

export default function MobileHeader({ className }: MobileHeaderProps) {
  const themeConfig = useThemeConfig();
  const mobileSidebar = useNavbarMobileSidebar();
  const { colorMode, setColorMode } = useColorMode();

  const toggleColorMode = () => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={`mobile-header ${className || ''}`}>
      <div className="mobile-header__container">
        {/* 左侧：汉堡菜单按钮 */}
        <div className="mobile-header__left">
          <button
            className={`mobile-header__hamburger ${mobileSidebar.shown ? 'mobile-header__hamburger--open' : ''}`}
            onClick={mobileSidebar.toggle}
            aria-label={mobileSidebar.shown ? '关闭导航菜单' : '打开导航菜单'}
            aria-expanded={mobileSidebar.shown}
          >
            <span className="mobile-header__hamburger-line"></span>
            <span className="mobile-header__hamburger-line"></span>
            <span className="mobile-header__hamburger-line"></span>
          </button>
        </div>

        {/* 中间：Logo 和标题 */}
        <div className="mobile-header__center">
          <Link to="/" className="mobile-header__brand">
            {themeConfig.navbar.logo && (
              <img
                src={themeConfig.navbar.logo.src}
                alt={themeConfig.navbar.logo.alt}
                className="mobile-header__logo"
              />
            )}
            <span className="mobile-header__title">{themeConfig.navbar.title}</span>
          </Link>
        </div>

        {/* 右侧：功能按钮 */}
        <div className="mobile-header__right">
          {/* 搜索按钮 */}
        <Link
            to="/search"
            className="mobile-header__search-button"
            aria-label="搜索"
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
            </svg>
        </Link>

          {/* 颜色模式切换按钮 */}
          <button
            className="mobile-header__color-mode-toggle"
            onClick={toggleColorMode}
            aria-label={`切换到${colorMode === 'dark' ? '浅色' : '深色'}模式`}
          >
            {colorMode === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 进度指示器（可选） */}
      <div className="mobile-header__progress">
        <div className="mobile-header__progress-bar"></div>
      </div>
    </header>
  );
}
