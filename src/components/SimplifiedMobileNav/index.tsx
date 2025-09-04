import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useColorMode } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import { generateClientDocStructure, type DocSection, type DocItem } from '../../utils/docStructure';
import './styles.css';

interface SimplifiedMobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SimplifiedMobileNav({ isOpen, onClose }: SimplifiedMobileNavProps) {
  const location = useLocation();
  const themeConfig = useThemeConfig();
  const { colorMode } = useColorMode();
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

  // 递归渲染导航项
  const renderNavItem = (item: DocItem, level: number = 0) => {
    const isExpanded = expandedSections.has(item.title);
    const hasSubItems = item.items && item.items.length > 0;
    const indentClass = level > 0 ? `simplified-nav__list-item--level-${level}` : '';

    return (
      <div key={item.title} className={`simplified-nav__list-item ${indentClass}`}>
        <div
          className={`simplified-nav__list-item-content ${hasSubItems ? 'simplified-nav__list-item--expandable' : ''}`}
          onClick={() => {
            if (hasSubItems) {
              toggleSection(item.title);
            } else if (item.path) {
              // 如果有路径且没有子项，直接跳转
              onClose();
            }
          }}
        >
          <div className="simplified-nav__list-item-left">
            {item.path && !hasSubItems ? (
              <Link to={item.path} className="simplified-nav__list-item-link">
                <span className="simplified-nav__list-item-title">{item.title}</span>
              </Link>
            ) : (
              <span className="simplified-nav__list-item-title">{item.title}</span>
            )}
            {item.count && (
              <span className="simplified-nav__list-item-count">({item.count})</span>
            )}
          </div>
          {hasSubItems && (
            <div className="simplified-nav__list-item-right">
              <svg
                className={`simplified-nav__list-item-arrow ${isExpanded ? 'simplified-nav__list-item-arrow--expanded' : ''}`}
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

        {hasSubItems && isExpanded && (
          <div className="simplified-nav__list-subitems">
            {item.items!.map((subItem) => renderNavItem(subItem, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const filteredSections = docSections.filter(section =>
    searchQuery === '' ||
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className={`simplified-nav__backdrop ${isOpen ? 'simplified-nav__backdrop--open' : ''}`}
        onClick={handleBackdropClick}
      />

      {/* 侧边栏 */}
      <div className={`simplified-nav__sidebar ${isOpen ? 'simplified-nav__sidebar--open' : ''} ${colorMode}`}>
        {/* Header */}
        <div className="simplified-nav__header">
          <div className="simplified-nav__header-content">
            <div className="simplified-nav__header-left">
              <button
                className="simplified-nav__menu-button"
                onClick={onClose}
                aria-label="关闭菜单"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M3 12h18M3 18h18"/>
                </svg>
              </button>
            </div>
            <div className="simplified-nav__header-center">
              <h1 className="simplified-nav__title">全部产品文档</h1>
            </div>
            <div className="simplified-nav__header-right">
              <button
                className="simplified-nav__close-button"
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
        <div className="simplified-nav__search">
          <div className="simplified-nav__search-wrapper">
            <svg className="simplified-nav__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              className="simplified-nav__search-input"
              placeholder="搜索相关文档"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="simplified-nav__search-clear"
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
        <div className="simplified-nav__content">
          <div className="simplified-nav__docs-list">
            {filteredSections.map((section, index) => (
              <div key={index} className="simplified-nav__section">
                <div className="simplified-nav__section-header">
                  <span className="simplified-nav__section-title">{section.title}</span>
                  <span className="simplified-nav__section-count">({section.count})</span>
                </div>
                <div className="simplified-nav__section-items">
                  {section.items.map((item) => renderNavItem(item))}
                </div>
              </div>
            ))}
          </div>

          {/* 搜索无结果提示 */}
          {searchQuery && filteredSections.length === 0 && (
            <div className="simplified-nav__no-results">
              <div className="simplified-nav__no-results-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              <span className="simplified-nav__no-results-text">未找到相关内容</span>
              <span className="simplified-nav__no-results-hint">请尝试其他关键词</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
