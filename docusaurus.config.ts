import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '草莓创新开发者文档',
  tagline: '无人机自动机场系统',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.sb.im',
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
    // image: 'img/sbim-social-card.jpg', // 简化：移除社交卡片图片
    navbar: {
      title: '草莓创新',
      logo: {
        alt: 'StrawBerry Innovation Logo',
        src: '/img/logo.svg',
      },
      items: [
        // 主要文档导航
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档',
        },
        // 搜索功能
        {
          type: 'search',
          position: 'right',
        },
        // GitHub链接
        {
          href: 'https://github.com/gitgitgogogo/sbim-docs-content',
          label: 'GitHub',
          position: 'right',
          className: 'navbar-github-link',
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
              to: '/docs/intro',
            },
            {
              label: 'API参考',
              to: '/api/v2/',
            },
          ],
        },
        {
          title: '产品',
          items: [
            {
              label: 'SuperDock Pro V4',
              href: 'https://sb.im/products/superdock-pro-v4',
            },
            {
              label: 'SuperDock Mini 2',
              href: 'https://sb.im/products/superdock-mini-2',
            },
            {
              label: 'SuperDock CS',
              href: 'https://sb.im/products/superdock-cs',
            },
          ],
        },
        {
          title: '支持',
          items: [
            {
              label: '官方网站',
              href: 'https://sb.im',
            },
            {
              label: '技术支持',
              href: 'mailto:support@sb.im',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/strawberry-innovation',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 草莓创新 (StrawBerry Innovation). Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml'],
    },
    // Algolia搜索配置 - 优化搜索体验
    algolia: {
      appId: '46G35IKDFQ',
      apiKey: '1b3babf88ea7b79973211ad78ef8a931',
      indexName: 'sbim-docs',
      contextualSearch: true,
      searchParameters: {
        facetFilters: [],
        hitsPerPage: 10,
        attributesToRetrieve: [
          'hierarchy',
          'content',
          'anchor',
          'url',
          'url_without_anchor',
          'type',
        ],
        attributesToHighlight: [
          'hierarchy',
          'content',
        ],
        attributesToSnippet: [
          'content:10',
        ],
        highlightPreTag: '<mark class="search-highlight">',
        highlightPostTag: '</mark>',
        snippetEllipsisText: '…',
        responseFields: [
          'hits',
          'query',
          'nbHits',
          'page',
          'nbPages',
        ],
      },
      searchPagePath: 'search',
      // 自定义搜索建议
      placeholder: '搜索文档内容...',
      // 自定义翻译
      translations: {
        button: {
          buttonText: '搜索',
          buttonAriaLabel: '搜索文档',
        },
        modal: {
          searchBox: {
            resetButtonTitle: '清除查询条件',
            resetButtonAriaLabel: '清除查询条件',
            cancelButtonText: '取消',
            cancelButtonAriaLabel: '取消',
            searchInputLabel: '搜索',
          },
          startScreen: {
            recentSearchesTitle: '搜索历史',
            noRecentSearchesText: '没有搜索历史',
            saveRecentSearchButtonTitle: '保存至搜索历史',
            removeRecentSearchButtonTitle: '从搜索历史中移除',
            favoriteSearchesTitle: '收藏',
            removeFavoriteSearchButtonTitle: '从收藏中移除',
          },
          errorScreen: {
            titleText: '无法获取结果',
            helpText: '你可能需要检查你的网络连接',
          },
          footer: {
            selectText: '选择',
            selectKeyAriaLabel: 'Enter键',
            navigateText: '切换',
            navigateUpKeyAriaLabel: '向上键',
            navigateDownKeyAriaLabel: '向下键',
            closeText: '关闭',
            closeKeyAriaLabel: 'Escape键',
            searchByText: '搜索提供',
          },
          noResultsScreen: {
            noResultsText: '无法找到相关结果',
            suggestedQueryText: '你可以尝试查询',
            reportMissingResultsText: '你认为这个查询应该有结果？',
            reportMissingResultsLinkText: '点击反馈',
          },
        },
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
