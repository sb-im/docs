const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 搜索索引生成器
class SearchIndexGenerator {
  constructor(config) {
    this.searchData = [];
    this.label = config.label;
    this.outputPath = config.outputPath;
    // 定义多个文档实例的配置
    this.docInstances = config.docInstances;
  }

  // 递归读取所有 markdown 文件
  readMarkdownFiles(dir, baseUrl, category, rootPath = null) {
    if (!fs.existsSync(dir)) {
      console.warn(`目录不存在: ${dir}`);
      return;
    }

    // 如果是第一次调用，设置根路径
    if (rootPath === null) {
      rootPath = dir;
    }

    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // 递归处理子目录
        this.readMarkdownFiles(filePath, baseUrl, category, rootPath);
      } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
        // 计算相对于根目录的路径
        const relativePath = path.relative(rootPath, path.dirname(filePath));

        // 生成正确的URL
        let currentUrl = baseUrl;
        if (relativePath && relativePath !== '.') {
          // 将Windows路径分隔符转换为URL分隔符
          const urlPath = relativePath.replace(/\\/g, '/');
          currentUrl = `${baseUrl}/${urlPath}`;
        }

        this.processMarkdownFile(filePath, currentUrl, file, category);
      }
    });
  }

  // 处理单个 markdown 文件
  processMarkdownFile(filePath, baseUrl, fileName, category) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data: frontMatter, content: markdownContent } = matter(content);

      // 生成 URL，包含 baseUrl
      let url = baseUrl;
      if (fileName === 'index.md' || fileName === 'index.mdx') {
        // index 文件使用目录路径
        url = `${baseUrl}`;
      } else {
        // 其他文件使用文件名（去掉扩展名）
        const fileNameWithoutExt = fileName.replace(/\.(md|mdx)$/, '');
        url = `${baseUrl}/${fileNameWithoutExt}`;
      }

      // 清理内容
      const cleanContent = this.cleanMarkdownContent(markdownContent);

      // 提取关键词（使用原始 markdown 内容来提取错误码，使用清理后的内容提取其他关键词）
      const keywords = this.extractKeywords(frontMatter, cleanContent, markdownContent);

      // 生成搜索条目
      const searchItem = {
        id: this.generateId(url),
        title: frontMatter.title || this.extractTitleFromContent(markdownContent) || fileName,
        content: cleanContent.substring(0, 5000), // 增加内容长度限制到 5000 字符
        url: url,
        keywords: keywords,
        category: category,
        description: frontMatter.description || ''
      };

      this.searchData.push(searchItem);

    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
    }
  }

  // 清理 markdown 内容
  cleanMarkdownContent(content) {
    return content
      // 移除 markdown 语法
      .replace(/#{1,6}\s+/g, '') // 标题
      .replace(/\*\*(.*?)\*\*/g, '$1') // 粗体
      .replace(/\*(.*?)\*/g, '$1') // 斜体
      .replace(/`(.*?)`/g, '$1') // 行内代码
      .replace(/```[\s\S]*?```/g, '') // 代码块
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 链接
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1') // 图片
      // 处理表格：保留内容但移除表格语法
      .replace(/\|/g, ' ') // 将表格分隔符替换为空格
      .replace(/^\s*[-:|\s]+$/gm, '') // 移除表格分隔行
      .replace(/^\s*[-*+]\s+/gm, '') // 列表
      .replace(/^\s*\d+\.\s+/gm, '') // 有序列表
      .replace(/^\s*>\s+/gm, '') // 引用
      // 移除特殊符号（如表格层级标记 »）
      .replace(/[»«]/g, '') // 移除层级标记符号
      .replace(/\n{2,}/g, '\n') // 多个换行
      .replace(/\s+/g, ' ') // 多个空格
      .trim();
  }

  // 从内容中提取标题
  extractTitleFromContent(content) {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    return titleMatch ? titleMatch[1].trim() : null;
  }

  // 提取错误码（专门处理表格中的错误码）
  extractErrorCodes(content) {
    const errorCodes = [];

    // 匹配 Markdown 表格中的错误码模式：| 数字 |
    const tableRowRegex = /^\|\s*(\d{6})\s*\|/gm;
    let match;

    while ((match = tableRowRegex.exec(content)) !== null) {
      errorCodes.push(match[1]);
    }

    return errorCodes;
  }

  // 提取关键词
  extractKeywords(frontMatter, content, rawMarkdown = '') {
    const keywords = [];

    // 从 frontMatter 获取关键词
    if (frontMatter.keywords) {
      keywords.push(...frontMatter.keywords);
    }

    if (frontMatter.tags) {
      keywords.push(...frontMatter.tags);
    }

    // 专门提取错误码（6位数字）- 从原始 markdown 内容中提取
    if (rawMarkdown) {
      const errorCodes = this.extractErrorCodes(rawMarkdown);
      keywords.push(...errorCodes);
    }

    // 从内容中提取关键词（改进版：支持数字、错误码、型号、API属性名等）
    const contentKeywords = content
      .toLowerCase()
      .split(/\s+/)
      .filter(word => {
        // 长度限制（增加到 50 以支持长 API 属性名如 battery_percent_reserve_home）
        if (word.length < 2 || word.length > 50) return false;

        // 保留以下类型的词：
        // 1. 纯中文词
        // 2. 纯英文词
        // 3. 纯数字（如错误码 620006）
        // 4. 字母+数字+下划线组合（如 API 属性名 battery_percent_reserve_home）
        return /^[一-龥]+$/.test(word) ||    // 纯中文
               /^[a-zA-Z]+$/.test(word) ||                  // 纯英文
               /^[0-9]+$/.test(word) ||                     // 纯数字
               /^[a-zA-Z0-9_]+$/.test(word);                // 字母数字下划线组合（API属性名）
      });

    keywords.push(...contentKeywords);

    // 去重后再限制数量，避免丢失重要关键词
    const uniqueKeywords = [...new Set(keywords)];

    // 对于大文档，保留更多关键词（最多 1000 个，支持错误码文档的 869 个错误码）
    return uniqueKeywords.slice(0, 1000);
  }



  // 生成唯一 ID
  generateId(url) {
    return url.replace(/[^a-zA-Z0-9]/g, '_');
  }

  // 生成搜索索引
  generate() {
    console.log(`开始生成搜索索引 [${this.label}] ...`);

    // 处理所有文档实例
    this.docInstances.forEach(instance => {
      console.log(`处理文档实例: ${instance.category} (${instance.path})`);
      this.readMarkdownFiles(instance.path, instance.routeBasePath, instance.category);
    });

    // 确保输出目录存在
    const outputDir = path.dirname(this.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 写入搜索数据
    fs.writeFileSync(this.outputPath, JSON.stringify(this.searchData, null, 2));

    console.log(`搜索索引生成完成！共 ${this.searchData.length} 个条目`);
    console.log(`输出文件：${this.outputPath}`);

    // 显示各分类的条目数量
    const categoryStats = {};
    this.searchData.forEach(item => {
      categoryStats[item.category] = (categoryStats[item.category] || 0) + 1;
    });
    console.log('各分类条目数量:', categoryStats);
  }
}

// 各语言的搜索索引配置
// 注意：英文条目的 URL 需带 /en 前缀，category 使用英文，保证英文站搜索结果跳转正确。
const LOCALE_CONFIGS = [
  {
    label: 'zh-Hans',
    outputPath: path.join(__dirname, '../static/search-data.json'),
    docInstances: [
      {
        path: path.join(__dirname, '../docs'),
        routeBasePath: '/api-integration',
        category: 'API对接'
      },
      {
        path: path.join(__dirname, '../product-intro-docs'),
        routeBasePath: '/product-intro',
        category: '产品介绍'
      },
      {
        path: path.join(__dirname, '../installation-docs'),
        routeBasePath: '/installation',
        category: '安装部署'
      }
    ]
  },
  {
    label: 'en',
    outputPath: path.join(__dirname, '../static/search-data.en.json'),
    docInstances: [
      {
        path: path.join(__dirname, '../i18n/en/docusaurus-plugin-content-docs/current'),
        routeBasePath: '/en/api-integration',
        category: 'API Integration'
      },
      {
        path: path.join(__dirname, '../i18n/en/docusaurus-plugin-content-docs-product-intro/current'),
        routeBasePath: '/en/product-intro',
        category: 'Product Introduction'
      },
      {
        path: path.join(__dirname, '../i18n/en/docusaurus-plugin-content-docs-installation/current'),
        routeBasePath: '/en/installation',
        category: 'Installation'
      }
    ]
  }
];

// 如果直接运行此脚本
if (require.main === module) {
  LOCALE_CONFIGS.forEach(config => {
    const generator = new SearchIndexGenerator(config);
    generator.generate();
  });
}

module.exports = SearchIndexGenerator;
