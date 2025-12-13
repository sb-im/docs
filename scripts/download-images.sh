#!/bin/bash

# 下载外部图片到本地并更新文档链接
# 使用方法: bash scripts/download-images.sh

set -e

# 创建图片目录
IMAGES_DIR="static/img/api-reference"
mkdir -p "$IMAGES_DIR"

echo "开始下载图片..."

# 定义图片URL和本地文件名的映射
declare -A IMAGE_MAP=(
    ["https://terra-1-g.djicdn.com/71a7d383e71a4fb8887a310eb746b47f/cloudapi/草稿预览图/机场借助pilot上云入口.png"]="dock-pilot-cloud-entry.png"
    ["https://terra-1-g.djicdn.com/71a7d383e71a4fb8887a310eb746b47f/cloudapi/草稿预览图/cloudapi-app%20(1).png"]="cloudapi-app.png"
    ["https://terra-1-g.djicdn.com/84f990b0bbd145e6a3930de0c55d3b2b/admin/doc/2b7346f7-7631-404e-8bbb-0b1d99255cac.png"]="media-upload-flow.png"
    ["https://terra-1-g.djicdn.com/71a7d383e71a4fb8887a310eb746b47f/cloudapi/v1.4/DRC-link.png"]="drc-link.png"
    ["https://terra-1-g.djicdn.com/71a7d383e71a4fb8887a310eb746b47f/cloudapi/v1.4/command-flight-working-scenes%20(1).png"]="command-flight-working-scenes.png"
    ["https://terra-1-g.djicdn.com/fee90c2e03e04e8da67ea6f56365fc76/SDK%20文档/CloudAPI/dock-livestream-framework.png"]="dock-livestream-framework.png"
    ["https://terra-1-g.djicdn.com/71a7d383e71a4fb8887a310eb746b47f/cloudapi/v1.5/resume-from-breakpoint.png"]="resume-from-breakpoint.png"
    ["https://terra-1-g.djicdn.com/71a7d383e71a4fb8887a310eb746b47f/cloudapi/V1.2.0/__________.png"]="task-execution-flow.png"
)

# 下载图片
for url in "${!IMAGE_MAP[@]}"; do
    filename="${IMAGE_MAP[$url]}"
    filepath="$IMAGES_DIR/$filename"
    
    # URL解码（处理%20等）
    decoded_url=$(echo "$url" | sed 's/%20/ /g')
    
    echo "下载: $decoded_url -> $filepath"
    
    # 使用curl下载，如果失败则使用wget
    if command -v curl &> /dev/null; then
        curl -L -o "$filepath" "$url" || echo "警告: 下载失败 $url"
    elif command -v wget &> /dev/null; then
        wget -O "$filepath" "$url" || echo "警告: 下载失败 $url"
    else
        echo "错误: 未找到 curl 或 wget 命令"
        exit 1
    fi
done

echo ""
echo "图片下载完成！"
echo ""
echo "开始更新文档链接..."

# 更新文档中的图片链接
# dock-access-to-cloud.md
sed -i 's|https://terra-1-g.djicdn.com/71a7d383e71a4fb8887a310eb746b47f/cloudapi/草稿预览图/机场借助pilot上云入口.png|/img/api-reference/dock-pilot-cloud-entry.png|g' docs/api-reference/dock-feature-set/dock-access-to-cloud.md
sed -i 's|https://terra-1-g.djicdn.com/71a7d383e71a4fb8887a310eb746b47f/cloudapi/草稿预览图/cloudapi-app%20(1).png|/img/api-reference/cloudapi-app.png|g' docs/api-reference/dock-feature-set/dock-access-to-cloud.md

# dock-media-management.md
sed -i 's|https://terra-1-g.djicdn.com/84f990b0bbd145e6a3930de0c55d3b2b/admin/doc/2b7346f7-7631-404e-8bbb-0b1d99255cac.png|/img/api-reference/media-upload-flow.png|g' docs/api-reference/dock-feature-set/dock-media-management.md

# drc.md
sed -i 's|https://terra-1-g.djicdn.com/71a7d383e71a4fb8887a310eb746b47f/cloudapi/v1.4/DRC-link.png|/img/api-reference/drc-link.png|g' docs/api-reference/dock-feature-set/drc.md
sed -i 's|https://terra-1-g.djicdn.com/71a7d383e71a4fb8887a310eb746b47f/cloudapi/v1.4/command-flight-working-scenes%20(1).png|/img/api-reference/command-flight-working-scenes.png|g' docs/api-reference/dock-feature-set/drc.md

# dock-livestream.md
sed -i 's|https://terra-1-g.djicdn.com/fee90c2e03e04e8da67ea6f56365fc76/SDK%20文档/CloudAPI/dock-livestream-framework.png|/img/api-reference/dock-livestream-framework.png|g' docs/api-reference/dock-feature-set/dock-livestream.md

# dock-wayline-management.md
sed -i 's|https://terra-1-g.djicdn.com/71a7d383e71a4fb8887a310eb746b47f/cloudapi/v1.5/resume-from-breakpoint.png|/img/api-reference/resume-from-breakpoint.png|g' docs/api-reference/dock-feature-set/dock-wayline-management.md

# remote-debug.md
sed -i 's|https://terra-1-g.djicdn.com/71a7d383e71a4fb8887a310eb746b47f/cloudapi/V1.2.0/__________.png|/img/api-reference/task-execution-flow.png|g' docs/api-reference/dock-feature-set/remote-debug.md

echo "文档链接更新完成！"
echo ""
echo "总结："
echo "- 图片保存位置: $IMAGES_DIR"
echo "- 下载图片数量: ${#IMAGE_MAP[@]}"
echo "- 更新文档数量: 6"

