# 草莓创新 SuperDock 开发者文档

> 🚁 **SuperDock系列无人机自动机场开发者文档** - 完全兼容DJI上云API，零学习成本集成

这是草莓创新 SuperDock 系列无人机自动机场的官方开发者文档网站，基于 Docusaurus 3.8.1 构建，采用设备导向的文档架构，提供完整的产品介绍、安装部署、API对接指南和技术支持。

## ✨ 核心特色

- 🔌 **完全兼容 DJI 上云 API** - 零学习成本，现有系统无缝迁移
- ⚡ **100秒极速换电** - 支持24/7无人值守自动化作业
- 🚀 **无限跳飞技术** - 单架次巡检半径扩展至10公里
- 🤖 **AI 智能识别** - 集成目标检测、行为识别、场景分析
- 📱 **多环境部署** - 支持云端部署和私有化部署双模式
- 🔧 **开发者友好** - 完整的API文档、SDK和技术支持

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

网站将在 <http://localhost:3000> 启动。

### 构建生产版本

```bash
npm run build
```

构建文件将生成在 `build/` 目录中。

## 📁 项目结构

```text
sbim_web/
├── docs/                    # API对接文档 (兼容DJI上云API)
│   ├── index.md            # API对接概览
│   ├── cloud-api/          # 云端集成API
│   │   ├── device-types.md        # 设备类型参考
│   │   ├── error-codes.md         # 错误代码
│   │   ├── hms.md                 # HMS健康管理
│   │   ├── wayline-interrupt-reasons.md  # 航线中断原因
│   │   └── compatibility-comparison.md   # 兼容性对比
│   └── developers/         # 开发者集成
│       ├── index.md        # 开发者指南
│       ├── superdock.md    # SuperDock设备支持扩展
│       └── compatibility-comparison.md  # 兼容性对比分析
├── product-intro-docs/      # 产品介绍模块
│   └── index.md            # 设备选型和产品概述
├── installation-docs/       # 安装部署模块
│   ├── index.md            # 安装部署概览
│   └── getting-started.md  # 开箱安装和首次连接
├── docs/faq.md             # 常见问题和技术支持
├── src/                    # 源代码
│   ├── css/               # 自定义样式
│   ├── pages/             # 自定义页面
│   ├── components/        # React组件 (包含搜索组件)
│   └── theme/             # 主题定制
├── scripts/               # 构建和发布脚本
│   ├── generate-search-index.js  # 搜索索引生成器
│   ├── create-release.sh         # 版本发布脚本
│   └── sync-to-public.sh         # 仓库同步工具
├── static/                # 静态资源
│   ├── img/              # 图片资源
│   ├── search-data.json  # 搜索数据
│   └── hms.json          # HMS告警文案
├── .github/workflows/     # GitHub Actions
│   ├── deploy-docs.yml   # 分支部署
│   └── deploy-on-tag.yml # 标签部署
├── docusaurus.config.ts   # Docusaurus 配置
├── sidebars-api.ts        # API文档侧边栏
├── sidebars-product.ts    # 产品介绍侧边栏
├── sidebars-installation.ts # 安装部署侧边栏
└── package.json           # 项目依赖
```

## 🎨 文档特性

- **设备导向架构** - 产品介绍 → 安装部署 → API对接 → 技术支持的完整流程
- **多模块设计** - 独立的产品介绍、安装部署、API对接文档模块
- **现代化设计** - 基于草莓创新品牌色彩的简洁设计
- **响应式布局** - 完美适配桌面和移动设备
- **中文优化** - 针对中文内容优化的字体和排版
- **智能搜索** - 支持中英文关键词的本地搜索功能，包含12个文档条目
- **暗色模式** - 支持明暗主题切换
- **SEO 友好** - 优化的 SEO 设置
- **自定义域名** - 支持 docs.sb.im 域名访问

## 🛠 开发命令

| 命令 | 说明 |
|------|------|
| `npm start` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run serve` | 预览构建结果 |
| `npm run clear` | 清除缓存 |
| `npm run typecheck` | TypeScript 类型检查 |
| `npm run generate-search` | 生成搜索索引 |

## 📚 文档模块

### 🎯 产品介绍
- 设备选型指南
- 技术规格对比
- 产品特色介绍

### 🔧 安装部署
- 开箱安装指南
- 首次连接配置
- 环境要求说明

### 🔌 API对接
- DJI上云API兼容接口
- 设备类型和错误码
- HMS健康管理系统
- 开发者集成指南

### ❓ 技术支持
- 常见问题解答
- 兼容性说明
- 联系技术支持

## 📞 技术支持

如需技术支持或商务合作：

- **技术支持**: developer@sb.im
- **商务合作**: business@sb.im
- **官方网站**: <https://sb.im>

---

**深圳草莓创新技术有限公司**
地址：深圳市龙岗区大运软件小镇70栋