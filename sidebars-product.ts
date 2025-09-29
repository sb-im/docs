import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * 产品介绍文档侧边栏配置
 */
const sidebars: SidebarsConfig = {
  // 产品介绍侧边栏
  productSidebar: [
    // 产品概述
    {
      type: 'doc',
      id: 'index',
      label: 'SuperDock 产品介绍',
      className: 'sidebar-overview',
    },

    // 分隔线
    {
      type: 'html',
      value: '<hr class="sidebar-divider">',
      defaultStyle: true,
    },

    // 外部链接
    {
      type: 'link',
      label: '官方网站',
      href: 'https://sb.im',
      className: 'sidebar-external-link',
    },
    {
      type: 'link',
      label: '技术支持',
      href: 'mailto:developer@sb.im',
      className: 'sidebar-external-link',
    },
  ],
};

export default sidebars;
