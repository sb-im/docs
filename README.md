# 草莓创新开发者文档网站

这是草莓创新无人机自动机场系统的开发者文档网站，基于 Docusaurus 3.8.1 构建。

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

网站将在 http://localhost:3000 启动。

### 构建生产版本

```bash
npm run build
```

构建文件将生成在 `build/` 目录中。

## 📁 项目结构

```
website/
├── docs/                    # 文档内容
│   ├── intro.md            # 首页介绍
│   ├── getting-started/    # 快速开始
│   │   ├── installation.md
│   │   └── first-steps.md
│   └── api/                # API 文档
│       ├── overview.md
│       └── authentication.md
├── src/                    # 源代码
│   ├── css/               # 自定义样式
│   │   └── custom.css
│   └── pages/             # 自定义页面
│       ├── index.tsx      # 首页
│       └── index.module.css
├── static/                # 静态资源
│   └── img/              # 图片资源
├── docusaurus.config.ts   # Docusaurus 配置
├── sidebars.ts            # 侧边栏配置
└── package.json           # 项目依赖
```

## 🎨 特性

- **现代化设计** - 基于草莓创新品牌色彩的简洁设计
- **响应式布局** - 完美适配桌面和移动设备
- **中文优化** - 针对中文内容优化的字体和排版
- **快速搜索** - 内置文档搜索功能
- **暗色模式** - 支持明暗主题切换
- **SEO 友好** - 优化的 SEO 设置

## 📝 内容管理

### 添加新文档

1. 在 `docs/` 目录下创建新的 Markdown 文件
2. 在 `sidebars.ts` 中添加对应的导航项
3. 文档会自动热重载显示

### 修改样式

- 主要样式在 `src/css/custom.css` 中
- 页面特定样式在对应的 `.module.css` 文件中

### 配置修改

- 网站配置：`docusaurus.config.ts`
- 侧边栏配置：`sidebars.ts`
- 包依赖：`package.json`

## 🛠 开发命令

| 命令 | 说明 |
|------|------|
| `npm start` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run serve` | 预览构建结果 |
| `npm run clear` | 清除缓存 |
| `npm run typecheck` | TypeScript 类型检查 |

## 🌐 部署

### GitHub Pages

```bash
npm run deploy
```

### 其他平台

构建后将 `build/` 目录部署到任何静态网站托管服务。

## 📚 相关链接

- [Docusaurus 官方文档](https://docusaurus.io/)
- [草莓创新官网](https://sb.im)
- [GitHub 仓库](https://github.com/gitgitgogogo/sbim-docs-content)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进文档！
