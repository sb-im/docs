#!/bin/bash

# 修复 JSON 代码块中的缩进问题
# 将 tab 字符和 4 个空格替换为 2 个空格

echo "开始修复 JSON 代码块缩进问题..."

# 查找所有包含 JSON 代码块的 markdown 文件
find docs/api-reference -name "*.md" -type f | while read file; do
    if grep -q '```json' "$file"; then
        echo "处理文件: $file"

        # 创建临时文件
        temp_file="${file}.tmp"

        # 使用 Python 来更精确地处理缩进
        python3 << 'PYTHON_SCRIPT' "$file" "$temp_file"
import sys
import re

input_file = sys.argv[1]
output_file = sys.argv[2]

with open(input_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

in_json_block = False
result_lines = []

for line in lines:
    if line.strip() == '```json':
        in_json_block = True
        result_lines.append(line)
    elif line.strip() == '```' and in_json_block:
        in_json_block = False
        result_lines.append(line)
    elif in_json_block:
        # 在 JSON 代码块内，将缩进统一为 2 个空格
        # 首先将 tab 替换为 4 个空格
        line = line.replace('\t', '    ')

        # 计算前导空格数量
        stripped = line.lstrip(' ')
        if stripped:  # 如果不是空行
            leading_spaces = len(line) - len(stripped)
            # 将 4 个空格的倍数转换为 2 个空格的倍数
            new_indent = (leading_spaces // 4) * 2 + (leading_spaces % 4) // 2 * 2
            line = ' ' * new_indent + stripped

        result_lines.append(line)
    else:
        result_lines.append(line)

with open(output_file, 'w', encoding='utf-8') as f:
    f.writelines(result_lines)
PYTHON_SCRIPT

        # 替换原文件
        mv "$temp_file" "$file"
    fi
done

echo "完成！所有 JSON 代码块的缩进已修复。"

