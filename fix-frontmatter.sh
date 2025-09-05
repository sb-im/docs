#!/bin/bash

# 修复文档 frontmatter，添加缺失的 id 字段

files=(
    "content/docs/intro.md"
    "content/docs/faq/index.md"
    "content/docs/faq/troubleshooting/index.md"
    "content/docs/faq/troubleshooting/system-unresponsive.md"
    "content/docs/faq/getting-started/index.md"
    "content/docs/faq/getting-started/installation-guide.md"
    "content/docs/faq/billing/index.md"
    "content/docs/faq/billing/pricing-model.md"
    "content/docs/faq/technical/index.md"
    "content/docs/faq/technical/password-reset.md"
    "content/docs/faq/technical/login-issues.md"
    "content/docs/api-reference/dock-api.md"
    "content/docs/getting-started/installation.md"
    "content/docs/getting-started/basic-concepts.md"
    "content/docs/getting-started/quick-start.md"
    "content/docs/guides/search-optimization.md"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        
        # 提取文件名作为 id（去掉路径和扩展名）
        filename=$(basename "$file" .md)
        
        # 如果是 index.md，使用父目录名
        if [ "$filename" = "index" ]; then
            filename=$(basename $(dirname "$file"))
        fi
        
        # 检查是否已有 frontmatter
        if head -1 "$file" | grep -q "^---"; then
            # 已有 frontmatter，在第二行添加 id
            sed -i "2i id: $filename" "$file"
        else
            # 没有 frontmatter，添加完整的 frontmatter
            temp_file=$(mktemp)
            echo "---" > "$temp_file"
            echo "id: $filename" >> "$temp_file"
            echo "---" >> "$temp_file"
            echo "" >> "$temp_file"
            cat "$file" >> "$temp_file"
            mv "$temp_file" "$file"
        fi
        
        echo "Added id: $filename to $file"
    else
        echo "File not found: $file"
    fi
done

echo "Frontmatter fix completed!"
