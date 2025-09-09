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
          editUrl: 'https://github.com/gitgitgogogo/sbim-docs-content/tree/main/',
        },
        blog: false, // 禁用博客功能
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: '草莓创新',
      logo: {
        alt: 'StrawBerry Innovation Logo',
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
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
