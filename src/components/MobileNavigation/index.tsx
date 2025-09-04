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
}

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const location = useLocation();
  const themeConfig = useThemeConfig();
  const { colorMode, setColorMode } = useColorMode();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [docSections, setDocSections] = useState<DocSection[]>([]);

  // 动态生成文档结构
  useEffect(() => {
    const sections = generateClientDocStructure();
    setDocSections(sections);
  }, []);

  // 控制body滚动
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('mobile-nav-open');
    } else {
      document.body.classList.remove('mobile-nav-open');
    }

    // 清理函数
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

  const toggleSection = (title: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedSections(newExpanded);
  };



  const toggleColorMode = () => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  };





  return (
    <>
      {/* 背景遮罩 */}
      <div
        className={`mobile-nav__backdrop ${isOpen ? 'mobile-nav__backdrop--open' : ''}`}
        onClick={handleBackdropClick}
      />

      {/* 侧边栏 */}
      <div className={`mobile-nav__sidebar ${isOpen ? 'mobile-nav__sidebar--open' : ''} ${colorMode}`}>
        {/* Header */}
        <div className="mobile-nav__header">
          <div className="mobile-nav__header-content">
            <div className="mobile-nav__header-left">
              <button
                className="mobile-nav__menu-button"
                onClick={onClose}
                aria-label="关闭菜单"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M3 12h18M3 18h18"/>
                </svg>
              </button>
            </div>
            <div className="mobile-nav__header-center">
              <h1 className="mobile-nav__title">全部产品文档</h1>
            </div>
            <div className="mobile-nav__header-right">
              <button
                className="mobile-nav__close-button"
                onClick={onClose}
                aria-label="关闭"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 搜索框 */}
        <div className="mobile-nav__search">
          <div className="mobile-nav__search-wrapper">
            <svg className="mobile-nav__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              className="mobile-nav__search-input"
              placeholder="搜索相关文档"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="mobile-nav__search-clear"
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
        <div className="mobile-nav__content">
          {/* 文档导航列表 */}
          <div className="mobile-nav__docs-list">
            {docSections
              .filter(section =>
                searchQuery === '' ||
                section.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((section, index) => {
                const isExpanded = expandedSections.has(section.title);
                const hasItems = section.items && section.items.length > 0;

                return (
                  <div key={index} className="mobile-nav__list-item">
                    <div
                      className={`mobile-nav__list-item-content ${hasItems ? 'mobile-nav__list-item--expandable' : ''}`}
                      onClick={() => hasItems && toggleSection(section.title)}
                    >
                      <div className="mobile-nav__list-item-left">
                        <span className="mobile-nav__list-item-title">{section.title}</span>
                        {section.count && (
                          <span className="mobile-nav__list-item-count">({section.count})</span>
                        )}
                      </div>
                      <div className="mobile-nav__list-item-right">
                        <svg
                          className="mobile-nav__list-item-arrow"
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
                    </div>

                    {hasItems && isExpanded && (
                      <div className="mobile-nav__list-subitems">
                        {section.items!.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            to={item.path || '#'}
                            className="mobile-nav__list-subitem"
                            onClick={onClose}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            }
          </div>

          {/* 搜索无结果提示 */}
          {searchQuery && docSections.filter(section =>
            section.title.toLowerCase().includes(searchQuery.toLowerCase())
          ).length === 0 && (
            <div className="mobile-nav__no-results">
              <div className="mobile-nav__no-results-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              <span className="mobile-nav__no-results-text">未找到相关内容</span>
              <span className="mobile-nav__no-results-hint">请尝试其他关键词</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}


