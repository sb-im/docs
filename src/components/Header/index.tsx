import React, { useState, useEffect } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import './styles.css';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const themeConfig = useThemeConfig();
  const mobileSidebar = useNavbarMobileSidebar();
  const { colorMode, setColorMode } = useColorMode();
  const navbarItems = themeConfig.navbar.items || [];
  const [isScrolled, setIsScrolled] = useState(false);

  // 分离左侧和右侧导航项
  const leftItems = navbarItems.filter((item: any) => item.position !== 'right');
  const rightItems = navbarItems.filter((item: any) => item.position === 'right');

  // 滚动检测
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleColorMode = () => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  };

  const renderNavItem = (item: any, index: number) => {
    if (item.type === 'docSidebar') {
      return (
        <Link
          key={index}
          to="/docs/"
          className="header__nav-link"
          activeClassName="header__nav-link--active"
        >
          {item.label}
        </Link>
      );
    }

    if (item.type === 'dropdown') {
      return (
        <div key={index} className="header__dropdown">
          <button className="header__dropdown-toggle">
            {item.label}
            <svg className="header__dropdown-arrow" width="12" height="12" viewBox="0 0 16 16">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="header__dropdown-menu">
            {item.items?.map((subItem: any, subIndex: number) => (
              <Link
                key={subIndex}
                to={subItem.to || subItem.href}
                className="header__dropdown-item"
                {...(subItem.href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        </div>
      );
    }

    if (item.type === 'search') {
      return (
        <div key={index} className="header__search">
          <button className="header__search-button" aria-label="搜索">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
        </div>
      );
    }

    if (item.href) {
      return (
        <Link
          key={index}
          to={item.href}
          className={`header__nav-link ${item.className || ''}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.label}
        </Link>
      );
    }

    return (
      <Link
        key={index}
        to={item.to || '#'}
        className="header__nav-link"
        activeClassName="header__nav-link--active"
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className={`header ${className || ''} ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        {/* Logo 和品牌 */}
        <div className="header__brand">
          <Link to="/" className="header__logo-link">
            {themeConfig.navbar.logo && (
              <img
                src={themeConfig.navbar.logo.src}
                alt={themeConfig.navbar.logo.alt}
                className="header__logo"
              />
            )}
            <span className="header__title">{themeConfig.navbar.title}</span>
          </Link>
        </div>

        {/* 桌面端导航 */}
        <nav className="header__nav header__nav--desktop">
          <div className="header__nav-left">
            {leftItems.map(renderNavItem)}
          </div>
          <div className="header__nav-right">
            {rightItems.map(renderNavItem)}
            <button
              className="header__color-mode-toggle"
              onClick={toggleColorMode}
              aria-label={`切换到${colorMode === 'dark' ? '浅色' : '深色'}模式`}
            >
              {colorMode === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* 移动端汉堡菜单按钮 */}
        <div className="header__mobile-toggle">
          <button
            className="header__hamburger"
            onClick={mobileSidebar.toggle}
            aria-label={mobileSidebar.shown ? '关闭导航菜单' : '打开导航菜单'}
            aria-expanded={mobileSidebar.shown}
          >
            <span className="header__hamburger-line"></span>
            <span className="header__hamburger-line"></span>
            <span className="header__hamburger-line"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
