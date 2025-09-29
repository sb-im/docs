import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '草莓创新开发者文档',
  tagline: '无人机自动机场系统',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.sb.im',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: 'sb-im',
  projectName: 'docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

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
          sidebarPath: './sidebars-api.ts',
          routeBasePath: 'api-integration',
          editUrl: 'https://github.com/sb-im/docs/tree/main/',
          // 侧边栏优化配置
          sidebarCollapsible: true,
          sidebarCollapsed: true,
          // 显示最后更新时间和作者 - 初始版本暂时禁用
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
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

  plugins: [
    // 产品介绍文档实例
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'product-intro',
        path: 'product-intro-docs',
        routeBasePath: 'product-intro',
        sidebarPath: './sidebars-product.ts',
        editUrl: 'https://github.com/sb-im/docs/tree/main/',
        sidebarCollapsible: true,
        sidebarCollapsed: true,
        showLastUpdateTime: false,
        showLastUpdateAuthor: false,
        breadcrumbs: true,
      },
    ],
    // 安装部署文档实例
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'installation',
        path: 'installation-docs',
        routeBasePath: 'installation',
        sidebarPath: './sidebars-installation.ts',
        editUrl: 'https://github.com/sb-im/docs/tree/main/',
        sidebarCollapsible: true,
        sidebarCollapsed: true,
        showLastUpdateTime: false,
        showLastUpdateAuthor: false,
        breadcrumbs: true,
      },
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
          label: 'API对接',
        },
        {
          to: '/product-intro/',
          position: 'left',
          label: '产品介绍',
        },
        {
          to: '/installation/',
          position: 'left',
          label: '安装部署',
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
          title: '文档导航',
          items: [
            {
              label: '产品介绍',
              to: '/product-intro/',
            },
            {
              label: '安装部署',
              to: '/installation/',
            },
            {
              label: 'API 对接',
              to: '/api-integration/',
            },
            {
              label: '常见问题',
              to: '/api-integration/faq/',
            },
          ],
        },
        {
          title: '产品与服务',
          items: [
            {
              label: '官方网站',
              href: 'https://sb.im',
            },
            {
              label: 'SuperDock 系列',
              href: 'https://sb.im',
            },
            {
              label: '技术支持',
              href: 'mailto:developer@sb.im',
            },
            {
              label: '商务合作',
              href: 'mailto:business@sb.im',
            },
          ],
        },
        {
          title: '开发者社区',
          items: [
            {
              label: 'GitHub 组织',
              href: 'https://github.com/sb-im',
            },
            {
              label: '问题反馈',
              href: 'https://github.com/sb-im',
            },
            {
              label: '贡献指南',
              href: 'https://github.com/sb-im',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 深圳草莓创新技术有限公司. 保留所有权利.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
