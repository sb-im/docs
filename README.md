# 草莓创新 SuperDock API 开发者文档

这是草莓创新 SuperDock 系列无人机自动机场的开发者文档网站，基于 Docusaurus 3.8.1 构建。

## 🎯 项目特色

- **完全兼容 DJI 上云 API** - 零学习成本，无缝迁移
- **SuperDock 系列支持** - 支持所有 SuperDock 机场设备
- **基于标签的发布策略** - 确保官方仓库的干净性
- **AI 智能识别** - 集成目标检测和行为识别
- **多负载设备支持** - 光学成像、专业检测、应急响应

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
├── docs/                    # 文档内容
│   ├── intro.md            # 系统概览
│   ├── getting-started/    # 设备入门
│   │   └── index.md        # 开箱与安装
│   ├── cloud-api/          # 云端集成 (兼容DJI上云API)
│   │   ├── index.md        # API概览
│   │   ├── overview.md     # 功能概述
│   │   ├── feature-comparison.md  # 功能对比
│   │   ├── drc-comparison.md      # DRC功能对比
│   │   ├── device-types.md        # 设备类型参考
│   │   ├── hms.md                 # HMS健康管理
│   │   ├── error-codes.md         # 错误代码
│   │   └── wayline-interrupt-reasons.md  # 航线中断原因
│   ├── developers/         # 系统集成
│   │   └── index.md        # 适配上云API代码
│   ├── faq/               # 技术支持
│   │   └── index.md        # 常见问题
│   └── changelog.md        # 更新记录
├── src/                    # 源代码
│   ├── css/               # 自定义样式
│   ├── pages/             # 自定义页面
│   ├── components/        # React组件
│   └── theme/             # 主题定制
├── scripts/               # 构建和发布脚本
│   └── generate-search-index.js  # 搜索索引生成器
├── static/                # 静态资源
│   ├── img/              # 图片资源
│   ├── search-data.json  # 搜索数据
│   └── hms.json          # HMS告警文案
├── .github/workflows/     # GitHub Actions
│   ├── deploy-docs.yml   # 分支部署
│   └── deploy-on-tag.yml # 标签部署
├── docusaurus.config.ts   # Docusaurus 配置
├── sidebars.ts            # 侧边栏配置
└── package.json           # 项目依赖
```

## 🎨 文档特性

- **现代化设计** - 基于草莓创新品牌色彩的简洁设计
- **响应式布局** - 完美适配桌面和移动设备
- **中文优化** - 针对中文内容优化的字体和排版
- **智能搜索** - 支持中英文关键词的本地搜索功能
- **暗色模式** - 支持明暗主题切换
- **SEO 友好** - 优化的 SEO 设置
- **自定义域名** - 支持 docs.sb.im 域名访问

## 📝 开发工作流

### 分支策略

- **main 分支** - 干净的生产发布分支
    - 包含文档内容和必需的生产工具
    - 用于创建发布标签
    - 推送到官方仓库的基础

- **develop 分支** - 完整的开发环境
    - 包含所有开发工具和配置
    - 日常开发和测试
    - 完整的项目历史

### 发布流程

1. **开发阶段** - 在 `develop` 分支进行开发
2. **合并到 main** - 将稳定功能合并到 `main` 分支
3. **创建标签** - 使用 `./scripts/create-release.sh 1.0.x` 创建版本标签
4. **官方发布** - 标签版本自动触发 CI/CD 部署到官方仓库

### 内容管理

- **添加文档** - 在 `docs/` 目录下创建 Markdown 文件
- **更新导航** - 在 `sidebars.ts` 中添加导航项
- **搜索索引** - 运行 `./scripts/generate-search-index.js` 更新搜索数据

## 🛠 开发命令

| 命令 | 说明 |
|------|------|
| `npm start` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run serve` | 预览构建结果 |
| `npm run clear` | 清除缓存 |
| `npm run typecheck` | TypeScript 类型检查 |

## 🚀 发布和部署

### 自动部署

- **标签部署** - 推送标签自动触发 GitHub Pages 部署
- **分支部署** - 推送到 main 分支自动更新文档网站
- **官方发布** - 标签版本自动同步到 `sb-im/docs` 官方仓库

## 🌐 访问地址

- **开发环境**: <http://localhost:3000>
- **生产环境**: <https://docs.sb.im>
- **GitHub Pages**: <https://sb-im.github.io/docs>

## 📚 相关资源

### 官方文档
- [DJI 上云 API 文档](https://developer.dji.com/doc/cloud-api-tutorial/cn/)
- [Docusaurus 官方文档](https://docusaurus.io/)

### 草莓创新
- [官方网站](https://sb.im)
- [GitHub 组织](https://github.com/sb-im)
- [技术支持](mailto:developer@sb.im)

### 项目仓库
- [主开发仓库](https://github.com/JiajiaHuang/sbim_web) (当前)
- [文档专用仓库](https://github.com/JiajiaHuang/sbim_docs)
- [官方发布仓库](https://github.com/sb-im/docs)

## 🤝 贡献指南

### 开发贡献
1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 文档贡献
- 报告文档错误或不准确之处
- 建议新功能或改进现有功能
- 分享使用经验和最佳实践
- 提交代码示例和教程

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 技术支持

如需技术支持或商务合作：


- **官方网站**: <https://sb.im>

---

**深圳草莓创新技术有限公司**
地址：深圳市龙岗区大运软件小镇70栋