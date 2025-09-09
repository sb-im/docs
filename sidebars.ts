import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '快速开始',
      items: ['getting-started/installation', 'getting-started/first-steps'],
    },
    {
      type: 'category',
      label: 'API 参考',
      items: ['api/overview', 'api/authentication'],
    },
  ],
};

export default sidebars;
