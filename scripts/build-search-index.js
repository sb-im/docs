#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const nodejieba = require('nodejieba');

// 配置
const CONFIG = {
  contentDir: '../../content/docs',
  outputDir: './build',
  staticDir: './static',
  indexFileName: 'search-index.json',
  versionFileName: 'search-version.json',
  maxContentLength: 2000, // 每个文档块的最大长度
  chunkOverlap: 200,      // 块之间的重叠字符数
};

// 初始化中文分词
nodejieba.load();

/**
 * 提取文档内容并分词
 */
function processDocument(filePath, content) {
  const { data: frontmatter, content: markdown } = matter(content);
  
  // 提取标题层级
  const headings = extractHeadings(markdown);
  
  // 清理markdown语法
  const cleanContent = cleanMarkdown(markdown);
  
  // 分块处理长文档
  const chunks = chunkContent(cleanContent, CONFIG.maxContentLength, CONFIG.chunkOverlap);
  
  // 为每个块生成索引项
  return chunks.map((chunk, index) => {
    const chineseTokens = nodejieba.cut(chunk.text, true);
    const englishTokens = extractEnglishTokens(chunk.text);
    
    return {
      id: `${getDocId(filePath)}_${index}`,
      docId: getDocId(filePath),
      title: frontmatter.title || extractFirstHeading(markdown) || path.basename(filePath, '.md'),
      url: getDocUrl(filePath),
      anchor: chunk.anchor,
      content: chunk.text,
      headings: headings,
      tokens: [...chineseTokens, ...englishTokens],
      chineseTokens,
      englishTokens,
      sidebar_position: frontmatter.sidebar_position || 999,
      tags: frontmatter.tags || [],
      lastModified: fs.statSync(filePath).mtime.getTime(),
    };
  });
}

/**
 * 提取标题结构
 */
function extractHeadings(markdown) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(markdown)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2].trim(),
      anchor: generateAnchor(match[2].trim())
    });
  }
  
  return headings;
}

/**
 * 清理Markdown语法
 */
function cleanMarkdown(markdown) {
  return markdown
    // 提取代码块内容但移除语法标记
    .replace(/```[\w]*\n?([\s\S]*?)```/g, '$1')
    // 移除行内代码标记但保留内容
    .replace(/`([^`]+)`/g, '$1')
    // 移除链接，保留文本
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // 移除图片
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    // 移除标题标记
    .replace(/^#{1,6}\s+/gm, '')
    // 移除粗体斜体
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    // 移除多余空白
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 分块处理长文档
 */
function chunkContent(content, maxLength, overlap) {
  if (content.length <= maxLength) {
    return [{ text: content, anchor: '' }];
  }
  
  const chunks = [];
  let start = 0;
  
  while (start < content.length) {
    const end = Math.min(start + maxLength, content.length);
    let chunkEnd = end;
    
    // 尝试在句号或换行处分割
    if (end < content.length) {
      const lastPeriod = content.lastIndexOf('。', end);
      const lastNewline = content.lastIndexOf('\n', end);
      const breakPoint = Math.max(lastPeriod, lastNewline);
      
      if (breakPoint > start + maxLength * 0.7) {
        chunkEnd = breakPoint + 1;
      }
    }
    
    const chunkText = content.slice(start, chunkEnd).trim();
    if (chunkText) {
      chunks.push({
        text: chunkText,
        anchor: generateAnchor(chunkText.slice(0, 30))
      });
    }
    
    start = Math.max(chunkEnd - overlap, start + 1);
  }
  
  return chunks;
}

/**
 * 提取英文词汇
 */
function extractEnglishTokens(text) {
  const englishRegex = /[a-zA-Z]+/g;
  const matches = text.match(englishRegex) || [];
  return matches.map(word => word.toLowerCase()).filter(word => word.length > 2);
}

/**
 * 生成锚点
 */
function generateAnchor(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50);
}

/**
 * 获取文档ID
 */
function getDocId(filePath) {
  // 获取绝对路径的内容目录
  const contentDir = path.resolve(__dirname, CONFIG.contentDir);
  // 获取相对于内容目录的路径
  const relativePath = path.relative(contentDir, filePath);

  return relativePath
    .replace(/\.md$/, '')
    .replace(/\\/g, '/');
}

/**
 * 获取文档URL
 */
function getDocUrl(filePath) {
  const docId = getDocId(filePath);
  return `/docs/${docId}`;
}

/**
 * 提取第一个标题
 */
function extractFirstHeading(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

/**
 * 递归读取所有Markdown文件
 */
function getAllMarkdownFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

/**
 * 主构建函数
 */
async function buildSearchIndex() {
  console.log('🔍 开始构建搜索索引...');
  
  const contentDir = path.resolve(__dirname, CONFIG.contentDir);
  const outputDir = path.resolve(__dirname, CONFIG.outputDir);
  
  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 获取所有Markdown文件
  const markdownFiles = getAllMarkdownFiles(contentDir);
  console.log(`📄 找到 ${markdownFiles.length} 个文档文件`);
  
  // 处理所有文档
  const allDocuments = [];
  let totalChunks = 0;
  
  for (const filePath of markdownFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const documents = processDocument(filePath, content);
      allDocuments.push(...documents);
      totalChunks += documents.length;
      
      console.log(`✅ 处理完成: ${path.relative(contentDir, filePath)} (${documents.length} 块)`);
    } catch (error) {
      console.error(`❌ 处理失败: ${filePath}`, error.message);
    }
  }
  
  // 生成版本信息
  const version = {
    version: Date.now(),
    timestamp: new Date().toISOString(),
    documentsCount: markdownFiles.length,
    chunksCount: totalChunks,
    buildTime: new Date().toISOString(),
  };
  
  // 生成搜索索引
  const searchIndex = {
    ...version,
    documents: allDocuments,
  };
  
  // 写入文件到build目录和static目录
  const indexPath = path.join(outputDir, CONFIG.indexFileName);
  const versionPath = path.join(outputDir, CONFIG.versionFileName);

  // 确保static目录存在
  const staticDir = path.resolve(__dirname, '..', CONFIG.staticDir);
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir, { recursive: true });
  }

  const staticIndexPath = path.join(staticDir, CONFIG.indexFileName);
  const staticVersionPath = path.join(staticDir, CONFIG.versionFileName);

  // 写入到build目录（用于开发）
  fs.writeFileSync(indexPath, JSON.stringify(searchIndex, null, 2));
  fs.writeFileSync(versionPath, JSON.stringify(version, null, 2));

  // 写入到static目录（用于生产部署）
  fs.writeFileSync(staticIndexPath, JSON.stringify(searchIndex, null, 2));
  fs.writeFileSync(staticVersionPath, JSON.stringify(version, null, 2));
  
  // 计算文件大小
  const indexSize = (fs.statSync(indexPath).size / 1024).toFixed(2);

  console.log('🎉 搜索索引构建完成!');
  console.log(`📊 统计信息:`);
  console.log(`   - 文档数量: ${markdownFiles.length}`);
  console.log(`   - 索引块数: ${totalChunks}`);
  console.log(`   - 索引大小: ${indexSize} KB`);
  console.log(`   - 版本号: ${version.version}`);
  console.log(`📁 输出文件:`);
  console.log(`   - ${indexPath}`);
  console.log(`   - ${versionPath}`);
  console.log(`   - ${staticIndexPath}`);
  console.log(`   - ${staticVersionPath}`);
}

// 执行构建
if (require.main === module) {
  buildSearchIndex().catch(console.error);
}

module.exports = { buildSearchIndex, processDocument };
