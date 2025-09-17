import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '草莓创新开发者文档',
  tagline: '无人机自动机场系统',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://jiajiahuang.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/sbim_web/',

  // GitHub pages deployment config
  organizationName: 'JiajiaHuang',
  projectName: 'sbim_web',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Internationalization
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl: 'https://github.com/sb-im/sbim-docs-content/tree/main/',
          // 侧边栏优化配置
          sidebarCollapsible: true,
          sidebarCollapsed: true,
          // 显示最后更新时间和作者
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          // 面包屑导航
          breadcrumbs: true,
          // 文档版本控制
          includeCurrentVersion: true,
          // 自动生成侧边栏优化
          async sidebarItemsGenerator({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);

            // 可以在这里添加自定义逻辑，比如：
            // 1. 过滤草稿文档
            // 2. 添加动态生成的 API 文档
            // 3. 根据用户权限过滤内容

            return sidebarItems;
          },
        },
        blog: false, // 禁用博客功能
        theme: {
          customCss: './src/css/custom.css',
        },
        // 启用站点地图
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // 全局 UI 配置
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: '草莓创新',
      logo: {
        alt: 'StrawBerry Innovation Logo',
        src: 'img/logo.svg',
      },
      hideOnScroll: true, // 滚动时隐藏导航栏
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档',
        },
        {
          href: 'https://github.com/sb-im',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://sb.im',
          label: '官网',
          position: 'right',
        },
      ],
    },

    // 侧边栏配置
    docs: {
      sidebar: {
        hideable: true, // 允许隐藏侧边栏
        autoCollapseCategories: true, // 自动折叠分类
      },
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '快速开始',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: '产品',
          items: [
            {
              label: '官方网站',
              href: 'https://sb.im',
            },
          ],
        },
        {
          title: '支持',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/sb-im',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 草莓创新 (StrawBerry Innovation). Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
