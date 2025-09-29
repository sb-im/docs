import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * 安装部署文档侧边栏配置
 */
const sidebars: SidebarsConfig = {
  // 安装部署侧边栏
  installationSidebar: [
    // 安装部署概述
    {
      type: 'doc',
      id: 'index',
      label: '安装部署概述',
      className: 'sidebar-overview',
    },

    // 开箱与安装
    {
      type: 'doc',
      id: 'getting-started',
      label: '开箱与安装',
      className: 'sidebar-getting-started',
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
      label: '技术支持',
      href: 'mailto:developer@sb.im',
      className: 'sidebar-external-link',
    },
  ],
};

export default sidebars;
