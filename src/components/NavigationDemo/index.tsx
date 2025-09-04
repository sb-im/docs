import React, { useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import SimplifiedMobileNav from '../SimplifiedMobileNav';
import NestedMobileNav from '../NestedMobileNav';
import MobileNavigation from '../MobileNavigation';
import './styles.css';

export default function NavigationDemo() {
  const { colorMode } = useColorMode();
  const [activeDemo, setActiveDemo] = useState<'simplified' | 'nested' | 'original' | null>(null);

  const demos = [
    {
      id: 'simplified' as const,
      title: '简化版导航',
      description: '去掉蓝色横幅，支持日间/夜间模式，传统展开/收起式导航',
      features: [
        '✅ 无蓝色横幅',
        '✅ 完整的日间/夜间模式支持',
        '✅ 传统的展开/收起式导航',
        '✅ 搜索功能',
        '✅ 响应式设计'
      ]
    },
    {
      id: 'nested' as const,
      title: '嵌套层级导航',
      description: '适合多层文件夹结构，支持面包屑导航和层级浏览',
      features: [
        '✅ 无蓝色横幅',
        '✅ 完整的日间/夜间模式支持',
        '✅ 多层级导航支持',
        '✅ 面包屑导航',
        '✅ 层级间快速切换',
        '✅ 搜索功能'
      ]
    },
    {
      id: 'original' as const,
      title: '原始版本（带蓝色横幅）',
      description: '包含蓝色横幅的原始设计，仅作对比参考',
      features: [
        '❌ 包含蓝色横幅',
        '⚠️ 部分日间/夜间模式支持',
        '✅ 传统的展开/收起式导航',
        '✅ 搜索功能'
      ]
    }
  ];

  const closeDemo = () => {
    setActiveDemo(null);
  };

  return (
    <div className={`navigation-demo ${colorMode}`}>
      <div className="navigation-demo__container">
        <h1 className="navigation-demo__title">移动端导航方案演示</h1>
        <p className="navigation-demo__subtitle">
          点击下方按钮体验不同的移动端导航方案
        </p>

        <div className="navigation-demo__grid">
          {demos.map((demo) => (
            <div key={demo.id} className="navigation-demo__card">
              <div className="navigation-demo__card-header">
                <h3 className="navigation-demo__card-title">{demo.title}</h3>
                <p className="navigation-demo__card-description">{demo.description}</p>
              </div>
              
              <div className="navigation-demo__card-features">
                {demo.features.map((feature, index) => (
                  <div key={index} className="navigation-demo__feature">
                    {feature}
                  </div>
                ))}
              </div>

              <button
                className="navigation-demo__card-button"
                onClick={() => setActiveDemo(demo.id)}
              >
                体验 {demo.title}
              </button>
            </div>
          ))}
        </div>

        <div className="navigation-demo__info">
          <h2>推荐方案</h2>
          <div className="navigation-demo__recommendation">
            <div className="navigation-demo__rec-item">
              <h4>🏆 简化版导航</h4>
              <p>适合大多数文档网站，简洁明了，完美支持日间/夜间模式</p>
            </div>
            <div className="navigation-demo__rec-item">
              <h4>🚀 嵌套层级导航</h4>
              <p>适合复杂的多层文件夹结构，提供更好的层级浏览体验</p>
            </div>
          </div>
        </div>
      </div>

      {/* 演示导航组件 */}
      {activeDemo === 'simplified' && (
        <SimplifiedMobileNav
          isOpen={true}
          onClose={closeDemo}
        />
      )}

      {activeDemo === 'nested' && (
        <NestedMobileNav
          isOpen={true}
          onClose={closeDemo}
        />
      )}

      {activeDemo === 'original' && (
        <MobileNavigation
          isOpen={true}
          onClose={closeDemo}
        />
      )}
    </div>
  );
}
