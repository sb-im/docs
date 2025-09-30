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
  ],
};

export default sidebars;
