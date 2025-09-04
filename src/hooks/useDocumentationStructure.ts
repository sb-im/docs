export interface DocumentationItem {
  title: string;
  path?: string;
  items: DocumentationItem[];
}

/**
 * 获取文档结构的hook
 * 目前使用静态配置，未来可以改为动态获取
 */
export function useDocumentationStructure(): DocumentationItem[] {
  // 静态文档结构，与 sidebars.ts 保持一致
  // 未来可以改为动态从 Docusaurus 配置中获取
  return [
    {
      title: '产品计费',
      items: [
        { title: '计费模式', path: '/docs/faq/billing/pricing-model', items: [] },
        { title: '计费常见问题', path: '/docs/faq/billing', items: [] },
      ]
    },
    {
      title: '快速入门',
      items: [
        { title: '安装指南', path: '/docs/faq/getting-started/installation-guide', items: [] },
        { title: '入门常见问题', path: '/docs/faq/getting-started', items: [] },
      ]
    },
    {
      title: '操作指南',
      items: [
        { title: '数据存储', path: '/docs/guides/data-storage', items: [] },
        { title: '账号管理', path: '/docs/guides/account-management', items: [] },
        { title: '群组管理', path: '/docs/guides/group-management', items: [] },
      ]
    },
    {
      title: '文件管理',
      items: [
        { title: '文件上传', path: '/docs/guides/file-upload', items: [] },
        { title: '文件下载', path: '/docs/guides/file-download', items: [] },
        { title: '文件共享', path: '/docs/guides/file-sharing', items: [] },
      ]
    },
    {
      title: '技术问题',
      items: [
        { title: '登录问题', path: '/docs/faq/technical/login-issues', items: [] },
        { title: '密码重置', path: '/docs/faq/technical/password-reset', items: [] },
        { title: '技术常见问题', path: '/docs/faq/technical', items: [] },
      ]
    },
    {
      title: '故障排除',
      items: [
        { title: '系统无响应', path: '/docs/faq/troubleshooting/system-unresponsive', items: [] },
        { title: '故障排除指南', path: '/docs/faq/troubleshooting', items: [] },
      ]
    },
    {
      title: 'API参考',
      items: [
        { title: '认证', path: '/docs/api-reference/authentication', items: [] },
        { title: 'Dock API', path: '/docs/api-reference/dock-api', items: [] },
      ]
    }
  ];
}
