#!/bin/bash

# 下载JSON配置文件到本地并更新文档链接
# 使用方法: bash scripts/download-json-files.sh

set -e

# 创建文件目录
FILES_DIR="static/files/api-reference"
mkdir -p "$FILES_DIR"

echo "开始下载JSON配置文件..."

# 1. 下载 hms.json
echo "下载 hms.json..."
curl -L -o "$FILES_DIR/hms.json" "https://terra-1-g.djicdn.com/fee90c2e03e04e8da67ea6f56365fc76/SDK%20%E6%96%87%E6%A1%A3/CloudAPI/hms.json"
echo "✓ hms.json 下载完成"

# 2. 下载 custom-flight-area-template.json
echo "下载 custom-flight-area-template.json..."
curl -L -o "$FILES_DIR/custom-flight-area-template.json" "https://terra-1-g.djicdn.com/fee90c2e03e04e8da67ea6f56365fc76/SDK%20%E6%96%87%E6%A1%A3/CloudAPI/custom-flight-area-file-template.json"
echo "✓ custom-flight-area-template.json 下载完成"

echo ""
echo "文件下载完成！"
echo ""
echo "开始更新文档链接..."

# 更新 hms.md 文件中的链接
echo "更新 hms.md 文件..."
sed -i 's|https://terra-1-g.djicdn.com/fee90c2e03e04e8da67ea6f56365fc76/SDK%20%E6%96%87%E6%A1%A3/CloudAPI/hms.json|/files/api-reference/hms.json|g' docs/api-reference/dock-feature-set/hms.md
sed -i 's|https://terra-1-g.djicdn.com/fee90c2e03e04e8da67ea6f56365fc76/SDK%20%E6%96%87%E6%A1%A3/CloudAPI/hms.json|/files/api-reference/hms.json|g' docs/api-reference/superdock-hangar/hms.md

# 更新 custom-flight-area.md 文件中的链接
echo "更新 custom-flight-area.md 文件..."
sed -i 's|https://terra-1-g.djicdn.com/fee90c2e03e04e8da67ea6f56365fc76/SDK%20%E6%96%87%E6%A1%A3/CloudAPI/custom-flight-area-file-template.json|/files/api-reference/custom-flight-area-template.json|g' docs/api-reference/dock-feature-set/custom-flight-area.md
sed -i 's|https://terra-1-g.djicdn.com/fee90c2e03e04e8da67ea6f56365fc76/SDK%20%E6%96%87%E6%A1%A3/CloudAPI/custom-flight-area-file-template.json|/files/api-reference/custom-flight-area-template.json|g' docs/api-reference/superdock-hangar/custom-flight-area.md

echo ""
echo "文档链接更新完成！"
echo ""
echo "总结："
echo "- 文件保存位置: $FILES_DIR"
echo "- 下载文件数量: 2"
echo "  1. hms.json - HMS告警文案查询文件"
echo "  2. custom-flight-area-template.json - 自定义飞行区模板文件"
echo "- 更新文档数量: 4"
echo "  1. docs/api-reference/dock-feature-set/hms.md"
echo "  2. docs/api-reference/superdock-hangar/hms.md"
echo "  3. docs/api-reference/dock-feature-set/custom-flight-area.md"
echo "  4. docs/api-reference/superdock-hangar/custom-flight-area.md"
echo ""
echo "查看下载的文件："
ls -lh "$FILES_DIR"

