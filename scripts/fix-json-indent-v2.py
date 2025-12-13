#!/usr/bin/env python3
"""
修复 Markdown 文件中 JSON 代码块的缩进问题
将 tab 和 4 个空格的缩进统一为 2 个空格
"""

import os
import sys
import glob

def fix_json_indentation(file_path):
    """修复单个文件中的 JSON 代码块缩进"""
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    in_json_block = False
    result_lines = []
    modified = False
    
    for line in lines:
        if line.strip() == '```json':
            in_json_block = True
            result_lines.append(line)
        elif line.strip() == '```' and in_json_block:
            in_json_block = False
            result_lines.append(line)
        elif in_json_block:
            # 在 JSON 代码块内，将缩进统一为 2 个空格
            original_line = line
            
            # 首先将 tab 替换为 4 个空格
            line = line.replace('\t', '    ')
            
            # 计算前导空格数量
            stripped = line.lstrip(' ')
            if stripped and stripped != '\n':  # 如果不是空行
                leading_spaces = len(line) - len(stripped)
                # 将 4 个空格的倍数转换为 2 个空格的倍数
                new_indent = (leading_spaces // 4) * 2 + ((leading_spaces % 4) // 2) * 2
                line = ' ' * new_indent + stripped
            
            if line != original_line:
                modified = True
            
            result_lines.append(line)
        else:
            result_lines.append(line)
    
    if modified:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(result_lines)
        return True
    return False

def main():
    """主函数"""
    print("开始修复 JSON 代码块缩进问题...")
    
    # 查找所有 markdown 文件
    pattern = 'docs/api-reference/**/*.md'
    files = glob.glob(pattern, recursive=True)
    
    modified_count = 0
    for file_path in files:
        if os.path.isfile(file_path):
            # 检查文件是否包含 JSON 代码块
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                if '```json' in content:
                    print(f"处理文件: {file_path}")
                    if fix_json_indentation(file_path):
                        modified_count += 1
                        print(f"  ✓ 已修复")
                    else:
                        print(f"  - 无需修改")
    
    print(f"\n完成！共修改了 {modified_count} 个文件。")

if __name__ == '__main__':
    main()

