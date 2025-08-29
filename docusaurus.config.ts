import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'SBIM 开发者文档',
  tagline: '智能建筑管理系统',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.sbim.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: 'gitgitgogogo',
  projectName: 'sbim-docs-website',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Internationalization
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          path: '../content/docs',
          routeBasePath: 'docs',
          editUrl: 'https://github.com/gitgitgogogo/sbim-docs-content/tree/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false, // 禁用博客功能
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // 暂时注释掉redocusaurus插件，稍后配置
    // [
    //   'redocusaurus',
    //   {
    //     specs: [
    //       {
    //         id: 'api-v2',
    //         spec: '../content/api/v2/openapi.yaml',
    //         route: '/api/v2/',
    //       },
    //     ],
    //     theme: {
    //       primaryColor: '#1890ff',
    //       redocOptions: {
    //         hideDownloadButton: false,
    //         disableSearch: false,
    //         nativeScrollbars: true,
    //       },
    //     },
    //   },
    // ],
  ],

  themeConfig: {
    image: 'img/sbim-social-card.jpg',
    navbar: {
      title: 'SBIM',
      logo: {
        alt: 'SBIM Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档',
        },
        {
          to: '/api/v2/',
          label: 'API',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/gitgitgogogo/sbim-docs-content',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '快速开始',
              to: '/docs/',
            },
            {
              label: 'API参考',
              to: '/api/v2/',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/gitgitgogogo/sbim',
            },
            {
              label: '问题反馈',
              href: 'https://github.com/gitgitgogogo/sbim-docs-content/issues',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: '官方网站',
              href: 'https://sbim.com',
            },
            {
              label: '技术支持',
              href: 'mailto:support@sbim.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SBIM. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml'],
    },
    // 搜索配置 - 稍后配置Algolia
    // algolia: {
    //   appId: 'YOUR_APP_ID',
    //   apiKey: 'YOUR_SEARCH_API_KEY',
    //   indexName: 'sbim-docs',
    //   contextualSearch: true,
    // },
  } satisfies Preset.ThemeConfig,
};

export default config;
