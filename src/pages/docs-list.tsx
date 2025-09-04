import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import './docs-list.css';

interface DocCategory {
  title: string;
  description: string;
  icon: string;
  items: DocItem[];
}

interface DocItem {
  title: string;
  description: string;
  path: string;
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

const docCategories: DocCategory[] = [
  {
    title: '快速开始',
    description: '了解SBIM基础概念，快速上手使用',
    icon: '',
    items: [
      {
        title: '产品介绍',
        description: '了解SBIM的核心功能和优势',
        path: '/docs/intro',
        tags: ['基础', '概述'],
        difficulty: 'beginner'
      },
      {
        title: '快速入门',
        description: '5分钟快速体验SBIM核心功能',
        path: '/docs/quick-start',
        tags: ['入门', '教程'],
        difficulty: 'beginner'
      }
    ]
  },
  {
    title: '安装配置',
    description: '系统安装、配置和环境搭建指南',
    icon: '',
    items: [
      {
        title: '系统要求',
        description: '查看运行SBIM所需的系统配置',
        path: '/docs/getting-started/requirements',
        tags: ['安装', '系统'],
        difficulty: 'beginner'
      },
      {
        title: '安装指南',
        description: '详细的安装步骤和注意事项',
        path: '/docs/getting-started/installation',
        tags: ['安装', '配置'],
        difficulty: 'beginner'
      },
      {
        title: '环境配置',
        description: '配置开发和生产环境',
        path: '/docs/getting-started/configuration',
        tags: ['配置', '环境'],
        difficulty: 'intermediate'
      }
    ]
  },
  {
    title: '用户指南',
    description: '详细的功能使用说明和最佳实践',
    icon: '',
    items: [
      {
        title: '搜索优化',
        description: '提高搜索效率的技巧和方法',
        path: '/docs/guides/search-optimization',
        tags: ['搜索', '优化'],
        difficulty: 'intermediate'
      },
      {
        title: '数据管理',
        description: '数据导入、导出和管理策略',
        path: '/docs/guides/data-management',
        tags: ['数据', '管理'],
        difficulty: 'intermediate'
      },
      {
        title: '用户权限',
        description: '用户角色和权限管理',
        path: '/docs/guides/permissions',
        tags: ['权限', '安全'],
        difficulty: 'advanced'
      },
      {
        title: '报表生成',
        description: '创建和定制各种报表',
        path: '/docs/guides/reports',
        tags: ['报表', '分析'],
        difficulty: 'intermediate'
      }
    ]
  },
  {
    title: 'API 参考',
    description: '完整的API接口文档和示例',
    icon: '',
    items: [
      {
        title: 'API 概述',
        description: 'API的基本概念和使用方法',
        path: '/docs/api-reference',
        tags: ['API', '概述'],
        difficulty: 'intermediate'
      },
      {
        title: '认证接口',
        description: '用户认证和授权相关接口',
        path: '/docs/api-reference/auth',
        tags: ['API', '认证'],
        difficulty: 'intermediate'
      },
      {
        title: '数据接口',
        description: '数据查询和操作相关接口',
        path: '/docs/api-reference/data',
        tags: ['API', '数据'],
        difficulty: 'advanced'
      },
      {
        title: '文件接口',
        description: '文件上传、下载和管理接口',
        path: '/docs/api-reference/files',
        tags: ['API', '文件'],
        difficulty: 'intermediate'
      }
    ]
  },
  {
    title: '常见问题',
    description: '问题解答和故障排除指南',
    icon: '',
    items: [
      {
        title: '入门问题',
        description: '新用户常见问题解答',
        path: '/docs/faq/getting-started',
        tags: ['FAQ', '入门'],
        difficulty: 'beginner'
      },
      {
        title: '技术问题',
        description: '技术相关问题和解决方案',
        path: '/docs/faq/technical',
        tags: ['FAQ', '技术'],
        difficulty: 'intermediate'
      },
      {
        title: '账单问题',
        description: '计费和账单相关问题',
        path: '/docs/faq/billing',
        tags: ['FAQ', '账单'],
        difficulty: 'beginner'
      },
      {
        title: '故障排除',
        description: '常见故障的诊断和解决',
        path: '/docs/faq/troubleshooting',
        tags: ['FAQ', '故障'],
        difficulty: 'advanced'
      }
    ]
  }
];

export default function DocsList(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 过滤文档
  const filteredCategories = docCategories.map(category => ({
    ...category,
    items: category.items.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      
      const matchesDifficulty = selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;
      const matchesCategory = selectedCategory === 'all' || category.title === selectedCategory;
      
      return matchesSearch && matchesDifficulty && matchesCategory;
    })
  })).filter(category => category.items.length > 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '入门';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return '';
    }
  };

  return (
    <Layout
      title="文档列表"
      description="浏览SBIM的完整文档列表，包括快速开始、用户指南、API参考等"
    >
      <div className="docs-list-container">
        <div className="docs-list-header">
          <h1 className="docs-list-title">文档中心</h1>
          <p className="docs-list-subtitle">
            浏览完整的SBIM文档，快速找到您需要的信息
          </p>
        </div>

        {/* 搜索和筛选 */}
        <div className="docs-list-filters">
          <div className="docs-list-search">
            <input
              type="text"
              placeholder="搜索文档..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="docs-list-search-input"
            />
          </div>
          
          <div className="docs-list-filter-group">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="docs-list-filter-select"
            >
              <option value="all">所有分类</option>
              {docCategories.map(category => (
                <option key={category.title} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
            
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="docs-list-filter-select"
            >
              <option value="all">所有难度</option>
              <option value="beginner">入门</option>
              <option value="intermediate">中级</option>
              <option value="advanced">高级</option>
            </select>
          </div>
        </div>

        {/* 文档列表 */}
        <div className="docs-list-content">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="docs-category">
                <div className="docs-category-header">
                  <div className="docs-category-info">
                    <h2 className="docs-category-title">{category.title}</h2>
                    <p className="docs-category-description">{category.description}</p>
                  </div>
                </div>
                
                <div className="docs-category-items">
                  {category.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.path}
                      className="docs-item"
                    >
                      <div className="docs-item-content">
                        <h3 className="docs-item-title">{item.title}</h3>
                        <p className="docs-item-description">{item.description}</p>
                        
                        <div className="docs-item-meta">
                          {item.difficulty && (
                            <span 
                              className="docs-item-difficulty"
                              style={{ backgroundColor: getDifficultyColor(item.difficulty) }}
                            >
                              {getDifficultyText(item.difficulty)}
                            </span>
                          )}
                          {item.tags && (
                            <div className="docs-item-tags">
                              {item.tags.map((tag, tagIndex) => (
                                <span key={tagIndex} className="docs-item-tag">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="docs-item-arrow">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="docs-list-empty">
              <h3 className="docs-list-empty-title">未找到相关文档</h3>
              <p className="docs-list-empty-description">
                请尝试调整搜索条件或筛选选项
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
