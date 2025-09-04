#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { buildSearchIndex } = require('./build-search-index.js');

// 配置
const CONFIG = {
  contentDir: path.resolve(__dirname, '../../content/docs'),
  debounceDelay: 2000, // 防抖延迟（毫秒）
};

let rebuildTimer = null;
let isRebuilding = false;

/**
 * 防抖重建索引
 */
function debouncedRebuild() {
  if (rebuildTimer) {
    clearTimeout(rebuildTimer);
  }
  
  rebuildTimer = setTimeout(async () => {
    if (isRebuilding) {
      console.log('⏳ 索引重建中，跳过此次更新...');
      return;
    }
    
    try {
      isRebuilding = true;
      console.log('\n🔄 检测到文档变更，重建搜索索引...');
      await buildSearchIndex();
      console.log('✅ 搜索索引已更新\n');
    } catch (error) {
      console.error('❌ 索引重建失败:', error.message);
    } finally {
      isRebuilding = false;
    }
  }, CONFIG.debounceDelay);
}

/**
 * 启动文件监听
 */
function startWatching() {
  console.log('👀 启动文档文件监听...');
  console.log(`📁 监听目录: ${CONFIG.contentDir}`);
  
  // 监听所有markdown文件
  const watcher = chokidar.watch('**/*.md', {
    cwd: CONFIG.contentDir,
    ignored: /(^|[\/\\])\../, // 忽略隐藏文件
    persistent: true,
    ignoreInitial: true, // 忽略初始扫描
  });

  // 监听文件变更事件
  watcher
    .on('add', (filePath) => {
      console.log(`📄 新增文档: ${filePath}`);
      debouncedRebuild();
    })
    .on('change', (filePath) => {
      console.log(`📝 修改文档: ${filePath}`);
      debouncedRebuild();
    })
    .on('unlink', (filePath) => {
      console.log(`🗑️  删除文档: ${filePath}`);
      debouncedRebuild();
    })
    .on('error', (error) => {
      console.error('❌ 文件监听错误:', error);
    });

  console.log('✅ 文件监听已启动');
  console.log('💡 提示: 修改文档后，搜索索引将在2秒后自动更新');
  console.log('🛑 按 Ctrl+C 停止监听\n');

  // 优雅退出
  process.on('SIGINT', () => {
    console.log('\n🛑 停止文件监听...');
    watcher.close();
    process.exit(0);
  });
}

// 主函数
async function main() {
  console.log('🚀 启动文档索引监听服务');
  
  // 检查内容目录是否存在
  if (!fs.existsSync(CONFIG.contentDir)) {
    console.error(`❌ 内容目录不存在: ${CONFIG.contentDir}`);
    process.exit(1);
  }

  // 首次构建索引
  try {
    console.log('🔧 初始化搜索索引...');
    await buildSearchIndex();
    console.log('✅ 初始索引构建完成\n');
  } catch (error) {
    console.error('❌ 初始索引构建失败:', error.message);
    process.exit(1);
  }

  // 启动监听
  startWatching();
}

// 执行主函数
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ 启动失败:', error);
    process.exit(1);
  });
}

module.exports = { startWatching, debouncedRebuild };
