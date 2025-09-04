import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import { useColorMode } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import { useDocumentationStructure, DocumentationItem } from '../../hooks/useDocumentationStructure';
import './styles.css';

interface SimpleMobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SimpleMobileNav({ isOpen, onClose }: SimpleMobileNavProps) {
  const location = useLocation();
  const { colorMode } = useColorMode();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  
  // 自动获取文档结构
  const documentationStructure = useDocumentationStructure();

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
  const renderNavigationItem = (item: DocumentationItem, level: number = 0) => {
    const isExpanded = expandedSections.has(item.title);
    const hasItems = item.items && item.items.length > 0;

    return (
      <div key={item.title} className={`simple-nav__item simple-nav__item--level-${level}`}>
        {hasItems ? (
          // 有子项的分类，可展开
          <>
            <div
              className="simple-nav__item-header simple-nav__item-header--expandable"
              onClick={() => toggleSection(item.title)}
            >
              <span className="simple-nav__item-title">{item.title}</span>
              <span className={`simple-nav__item-arrow ${isExpanded ? 'simple-nav__item-arrow--expanded' : ''}`}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
            {isExpanded && (
              <div className="simple-nav__item-children">
                {item.items.map((childItem) => renderNavigationItem(childItem, level + 1))}
              </div>
            )}
          </>
        ) : (
          // 没有子项的直接链接
          <Link
            to={item.path || '#'}
            className="simple-nav__item-header simple-nav__item-header--link"
            onClick={onClose}
          >
            <span className="simple-nav__item-title">{item.title}</span>
          </Link>
        )}
      </div>
    );
  };

  // 过滤搜索结果
  const filterItems = (items: DocumentationItem[], query: string): DocumentationItem[] => {
    if (!query) return items;
    
    return items.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(query.toLowerCase());
      const hasMatchingChildren = item.items && item.items.some(child => 
        child.title.toLowerCase().includes(query.toLowerCase())
      );
      return titleMatch || hasMatchingChildren;
    });
  };

  const filteredStructure = filterItems(documentationStructure, searchQuery);

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className={`simple-nav__backdrop ${isOpen ? 'simple-nav__backdrop--open' : ''}`}
        onClick={handleBackdropClick}
      />

      {/* 侧边栏 */}
      <div className={`simple-nav__sidebar ${isOpen ? 'simple-nav__sidebar--open' : ''}`}>
        {/* 头部区域 */}
        <div className="simple-nav__header">
          <div className="simple-nav__brand">
            <span className="simple-nav__brand-text">文档导航</span>
          </div>

          {/* 搜索框 */}
          <div className="simple-nav__search">
            <div className="simple-nav__search-wrapper">
              <svg className="simple-nav__search-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              <input
                type="text"
                className="simple-nav__search-input"
                placeholder="搜索文档..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="simple-nav__search-clear"
                  onClick={() => setSearchQuery('')}
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 导航内容 */}
        <div className="simple-nav__content">
          {filteredStructure.length > 0 ? (
            <div className="simple-nav__list">
              {filteredStructure.map((item) => renderNavigationItem(item))}
            </div>
          ) : (
            <div className="simple-nav__empty">
              {searchQuery ? '未找到匹配的文档' : '暂无文档'}
            </div>
          )}
        </div>

        {/* 关闭按钮 */}
        <button
          className="simple-nav__close"
          onClick={onClose}
          aria-label="关闭导航"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </>
  );
}
