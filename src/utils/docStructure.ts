// 注意：这些Node.js模块只能在服务器端使用
// 在客户端，我们将使用模拟数据

export interface DocItem {
  title: string;
  path?: string;
  items?: DocItem[];
  count?: number;
}

export interface DocSection {
  title: string;
  count: number;
  items: DocItem[];
}

/**
 * 从文件夹名称生成显示标题
 */
function formatFolderName(folderName: string): string {
  // 移除数字前缀（如 "01-getting-started" -> "getting-started"）
  const withoutPrefix = folderName.replace(/^\d+-/, '');
  
  // 将连字符替换为空格并首字母大写
  return withoutPrefix
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * 从Markdown文件中提取标题（服务器端版本）
 */
function extractTitleFromMarkdown(filePath: string): string {
  // 这个函数只在服务器端可用
  // 在客户端，我们将使用模拟数据
  return formatFolderName(filePath.replace('.md', ''));
}

/**
 * 递归读取文档结构（服务器端版本）
 */
function readDocStructure(dirPath: string, basePath: string = ''): DocItem[] {
  // 这个函数只在服务器端可用
  // 在客户端，我们将使用模拟数据
  return [];
}

/**
 * 生成文档结构数据（服务器端版本）
 */
export function generateDocStructure(): DocSection[] {
  // 这个函数只在服务器端可用
  // 在客户端，我们将使用模拟数据
  return getMockDocStructure();
}

/**
 * 获取基于实际文档结构的数据
 */
function getRealDocStructure(): DocSection[] {
  return [
    {
      title: '快速入门',
      count: 3,
      items: [
        { title: '安装指南', path: '/docs/getting-started/installation' },
        { title: '快速开始', path: '/docs/getting-started/quick-start' },
        { title: '基础概念', path: '/docs/getting-started/basic-concepts' }
      ]
    },
    {
      title: '使用指南',
      count: 1,
      items: [
        { title: '搜索优化', path: '/docs/guides/search-optimization' }
      ]
    },
    {
      title: 'API 参考',
      count: 2,
      items: [
        { title: '身份认证', path: '/docs/api-reference/authentication' },
        { title: 'Dock API', path: '/docs/api-reference/dock-api' }
      ]
    },
    {
      title: '常见问题',
      count: 4,
      items: [
        {
          title: '快速入门问题',
          path: '/docs/faq/getting-started/',
          items: [
            { title: '如何安装SBIM系统', path: '/docs/faq/getting-started/installation-guide' }
          ]
        },
        {
          title: '技术支持问题',
          path: '/docs/faq/technical/',
          items: [
            { title: '登录问题排查', path: '/docs/faq/technical/login-issues' },
            { title: '如何重置用户密码', path: '/docs/faq/technical/password-reset' }
          ]
        },
        {
          title: '计费相关问题',
          path: '/docs/faq/billing/',
          items: [
            { title: 'SBIM系统如何计费', path: '/docs/faq/billing/pricing-model' }
          ]
        },
        {
          title: '故障排除问题',
          path: '/docs/faq/troubleshooting/',
          items: [
            { title: '系统无响应处理', path: '/docs/faq/troubleshooting/system-unresponsive' }
          ]
        }
      ]
    }
  ];
}

/**
 * 获取模拟的文档结构（用于开发和fallback）
 */
function getMockDocStructure(): DocSection[] {
  // 返回实际的文档结构而不是模拟数据
  return getRealDocStructure();
}

/**
 * 客户端版本的文档结构生成器（基于实际的侧边栏数据）
 */
export function generateClientDocStructure(sidebarItems?: any[]): DocSection[] {
  // 直接返回基于实际文档结构的数据
  return getRealDocStructure();
}
