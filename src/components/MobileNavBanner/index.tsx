import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useColorMode } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import './styles.css';

interface MobileNavBannerProps {
  className?: string;
}

export default function MobileNavBanner({ className }: MobileNavBannerProps) {
  const themeConfig = useThemeConfig();
  const { colorMode } = useColorMode();

  return (
    <div className={`mobile-nav-banner ${className || ''}`}>
      <div className="mobile-nav-banner__container">
        {/* 品牌信息 */}
        <div className="mobile-nav-banner__brand">
          {themeConfig.navbar.logo && (
            <img
              src={themeConfig.navbar.logo.src}
              alt={themeConfig.navbar.logo.alt}
              className="mobile-nav-banner__logo"
            />
          )}
          <div className="mobile-nav-banner__text">
            <h2 className="mobile-nav-banner__title">{themeConfig.navbar.title}</h2>
            <p className="mobile-nav-banner__subtitle">无人机自动机场系统开发者文档</p>
          </div>
        </div>

        {/* 快速链接 */}
        <div className="mobile-nav-banner__actions">
          <Link
            to="/docs/"
            className="mobile-nav-banner__button mobile-nav-banner__button--primary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <line x1="10" y1="9" x2="8" y2="9"/>
            </svg>
            快速开始
          </Link>
          <Link
            to="/api/v2/"
            className="mobile-nav-banner__button mobile-nav-banner__button--secondary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
            </svg>
            API 文档
          </Link>
        </div>

        {/* 状态指示器 */}
        <div className="mobile-nav-banner__status">
          <div className="mobile-nav-banner__status-item">
            <div className="mobile-nav-banner__status-dot mobile-nav-banner__status-dot--online"></div>
            <span className="mobile-nav-banner__status-text">服务正常</span>
          </div>
          <div className="mobile-nav-banner__status-item">
            <div className="mobile-nav-banner__status-dot mobile-nav-banner__status-dot--updated"></div>
            <span className="mobile-nav-banner__status-text">文档已更新</span>
          </div>
        </div>
      </div>

      {/* 装饰性背景 */}
      <div className="mobile-nav-banner__background">
        <div className="mobile-nav-banner__pattern"></div>
      </div>
    </div>
  );
}
