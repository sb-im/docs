#!/usr/bin/env python3
"""
格式化 Markdown 文件中的 JSON 代码块
使用标准的 JSON 格式化，2 个空格缩进
"""

import os
import json
import glob
import re

def format_json_block(json_str):
    """格式化 JSON 字符串"""
    try:
        # 尝试解析 JSON
        # 移除注释行（以 // 开头的行）
        lines = json_str.split('\n')
        json_lines = []
        comment_lines = []
        
        for i, line in enumerate(lines):
            stripped = line.strip()
            if stripped.startswith('//'):
                # 保存注释及其位置
                comment_lines.append((i, line))
            else:
                json_lines.append(line)
        
        # 合并非注释行
        clean_json = '\n'.join(json_lines)
        
        # 解析并格式化 JSON
        parsed = json.loads(clean_json)
        formatted = json.dumps(parsed, indent=2, ensure_ascii=False)
        
        # 如果有注释，尝试重新插入
        if comment_lines:
            formatted_lines = formatted.split('\n')
            # 简单处理：将注释放在 JSON 块的开头
            result_lines = []
            for _, comment in comment_lines:
                result_lines.append(comment)
            result_lines.extend(formatted_lines)
            return '\n'.join(result_lines)
        
        return formatted
    except json.JSONDecodeError as e:
        # 如果 JSON 无效，返回原始字符串
        print(f"    ⚠ JSON 解析失败: {e}")
        return json_str
    except Exception as e:
        print(f"    ⚠ 格式化失败: {e}")
        return json_str

def format_json_in_file(file_path):
    """格式化文件中的所有 JSON 代码块"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 使用正则表达式找到所有 JSON 代码块
    pattern = r'```json\n(.*?)\n```'
    
    modified = False
    
    def replace_json(match):
        nonlocal modified
        json_content = match.group(1)
        formatted_json = format_json_block(json_content)
        
        if formatted_json != json_content:
            modified = True
        
        return f'```json\n{formatted_json}\n```'
    
    new_content = re.sub(pattern, replace_json, content, flags=re.DOTALL)
    
    if modified:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    """主函数"""
    print("开始格式化 JSON 代码块...")
    
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
                    if format_json_in_file(file_path):
                        modified_count += 1
                        print(f"  ✓ 已格式化")
                    else:
                        print(f"  - 无需修改")
    
    print(f"\n完成！共格式化了 {modified_count} 个文件。")

if __name__ == '__main__':
    main()

