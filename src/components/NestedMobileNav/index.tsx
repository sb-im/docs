import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useColorMode } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import { generateClientDocStructure, type DocSection } from '../../utils/docStructure';
import './styles.css';

interface NavItem {
  label: string;
  to?: string;
  href?: string;
  type?: string;
  items?: NavItem[];
  icon?: string;
  description?: string;
  level?: number;
}

interface NestedMobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NestedMobileNav({ isOpen, onClose }: NestedMobileNavProps) {
  const location = useLocation();
  const themeConfig = useThemeConfig();
  const { colorMode } = useColorMode();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [docSections, setDocSections] = useState<DocSection[]>([]);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [currentLevel, setCurrentLevel] = useState<DocSection[]>([]);

  // 动态生成文档结构
  useEffect(() => {
    const sections = generateClientDocStructure();
    setDocSections(sections);
    setCurrentLevel(sections);
  }, []);

  // 控制body滚动
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('mobile-nav-open');
    } else {
      document.body.classList.remove('mobile-nav-open');
    }

    return () => {
      document.body.classList.remove('mobile-nav-open');
    };
  }, [isOpen]);

  // 关闭侧边栏当路由改变时
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // 阻止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const navigateToSection = (section: DocSection) => {
    if (section.items && section.items.length > 0) {
      setBreadcrumb([...breadcrumb, section.title]);
      setCurrentLevel(section.items as DocSection[]);
    }
  };

  const navigateBack = () => {
    if (breadcrumb.length === 0) return;
    
    const newBreadcrumb = [...breadcrumb];
    newBreadcrumb.pop();
    setBreadcrumb(newBreadcrumb);
    
    // 重新构建当前层级
    let level = docSections;
    for (const crumb of newBreadcrumb) {
      const section = level.find(s => s.title === crumb);
      if (section && section.items) {
        level = section.items as DocSection[];
      }
    }
    setCurrentLevel(level);
  };

  const resetToRoot = () => {
    setBreadcrumb([]);
    setCurrentLevel(docSections);
    setSearchQuery('');
  };

  const filteredSections = currentLevel.filter(section =>
    searchQuery === '' ||
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className={`nested-nav__backdrop ${isOpen ? 'nested-nav__backdrop--open' : ''}`}
        onClick={handleBackdropClick}
      />

      {/* 侧边栏 */}
      <div className={`nested-nav__sidebar ${isOpen ? 'nested-nav__sidebar--open' : ''} ${colorMode}`}>
        {/* Header */}
        <div className="nested-nav__header">
          <div className="nested-nav__header-content">
            <div className="nested-nav__header-left">
              {breadcrumb.length > 0 ? (
                <button
                  className="nested-nav__back-button"
                  onClick={navigateBack}
                  aria-label="返回上级"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
              ) : (
                <button
                  className="nested-nav__menu-button"
                  onClick={onClose}
                  aria-label="关闭菜单"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M3 12h18M3 18h18"/>
                  </svg>
                </button>
              )}
            </div>
            <div className="nested-nav__header-center">
              <h1 className="nested-nav__title">
                {breadcrumb.length > 0 ? breadcrumb[breadcrumb.length - 1] : '全部产品文档'}
              </h1>
            </div>
            <div className="nested-nav__header-right">
              <button
                className="nested-nav__close-button"
                onClick={onClose}
                aria-label="关闭"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* 面包屑导航 */}
          {breadcrumb.length > 0 && (
            <div className="nested-nav__breadcrumb">
              <button 
                className="nested-nav__breadcrumb-item nested-nav__breadcrumb-item--root"
                onClick={resetToRoot}
              >
                首页
              </button>
              {breadcrumb.map((crumb, index) => (
                <React.Fragment key={index}>
                  <span className="nested-nav__breadcrumb-separator">/</span>
                  <span className="nested-nav__breadcrumb-item">
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* 搜索框 */}
        <div className="nested-nav__search">
          <div className="nested-nav__search-wrapper">
            <svg className="nested-nav__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              className="nested-nav__search-input"
              placeholder="搜索相关文档"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="nested-nav__search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="清除搜索"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* 导航内容 */}
        <div className="nested-nav__content">
          <div className="nested-nav__docs-list">
            {filteredSections.map((section, index) => {
              const hasSubItems = section.items && section.items.length > 0;
              const hasDirectLink = section.path;

              return (
                <div key={index} className="nested-nav__list-item">
                  <div className="nested-nav__list-item-content">
                    <div 
                      className="nested-nav__list-item-main"
                      onClick={() => hasSubItems ? navigateToSection(section) : undefined}
                    >
                      <div className="nested-nav__list-item-left">
                        <span className="nested-nav__list-item-title">{section.title}</span>
                        {section.count && (
                          <span className="nested-nav__list-item-count">({section.count})</span>
                        )}
                      </div>
                      {hasSubItems && (
                        <div className="nested-nav__list-item-right">
                          <svg
                            className="nested-nav__list-item-arrow"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M9 18l6-6-6-6"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {hasDirectLink && (
                      <Link
                        to={section.path}
                        className="nested-nav__list-item-link"
                        onClick={onClose}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M17 7H7M17 7V17"/>
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 搜索无结果提示 */}
          {searchQuery && filteredSections.length === 0 && (
            <div className="nested-nav__no-results">
              <div className="nested-nav__no-results-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              <span className="nested-nav__no-results-text">未找到相关内容</span>
              <span className="nested-nav__no-results-hint">请尝试其他关键词</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
