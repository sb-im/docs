#!/bin/bash

# SuperDock 文档发布脚本
# 用于创建版本标签并触发 CI/CD 部署

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 显示帮助信息
show_help() {
    echo -e "${BLUE}SuperDock 文档发布脚本${NC}"
    echo ""
    echo "用法: $0 [选项] <版本号>"
    echo ""
    echo "选项:"
    echo "  -h, --help     显示此帮助信息"
    echo "  -d, --dry-run  预览模式，不实际创建标签"
    echo "  -f, --force    强制创建标签（覆盖已存在的标签）"
    echo ""
    echo "示例:"
    echo "  $0 1.2.0                    # 创建 v1.2.0 标签"
    echo "  $0 --dry-run 1.2.0          # 预览创建 v1.2.0 标签"
    echo "  $0 --force 1.2.0            # 强制创建 v1.2.0 标签"
    echo ""
    echo "版本号格式: X.Y.Z (如: 1.2.0, 2.1.3)"
}

# 验证版本号格式
validate_version() {
    local version=$1
    if [[ ! $version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo -e "${RED}错误: 版本号格式无效。请使用 X.Y.Z 格式 (如: 1.2.0)${NC}"
        exit 1
    fi
}

# 检查 Git 状态
check_git_status() {
    if ! git diff-index --quiet HEAD --; then
        echo -e "${YELLOW}警告: 工作目录有未提交的更改${NC}"
        echo "请先提交所有更改后再创建发布标签"
        exit 1
    fi
}

# 检查是否在 main 分支
check_main_branch() {
    local current_branch=$(git branch --show-current)
    if [ "$current_branch" != "main" ]; then
        echo -e "${YELLOW}警告: 当前不在 main 分支 (当前: $current_branch)${NC}"
        read -p "是否继续? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# 创建标签
create_tag() {
    local version=$1
    local tag_name="v$version"
    local dry_run=$2
    local force=$3
    
    # 检查标签是否已存在
    if git tag -l | grep -q "^$tag_name$"; then
        if [ "$force" = false ]; then
            echo -e "${RED}错误: 标签 $tag_name 已存在${NC}"
            echo "使用 --force 选项强制覆盖"
            exit 1
        else
            echo -e "${YELLOW}警告: 将覆盖已存在的标签 $tag_name${NC}"
        fi
    fi
    
    # 生成标签消息
    local tag_message="SuperDock API 文档 $version

发布日期: $(date '+%Y.%m.%d')

主要更新:
- 文档内容更新和优化
- 修复已知问题
- 改进用户体验

详细更新记录请查看: docs/changelog.md"
    
    if [ "$dry_run" = true ]; then
        echo -e "${BLUE}预览模式 - 将要执行的操作:${NC}"
        echo "1. 创建标签: $tag_name"
        echo "2. 标签消息:"
        echo "$tag_message"
        echo "3. 推送标签到远程仓库"
        echo ""
        echo -e "${GREEN}预览完成。使用不带 --dry-run 的命令来实际创建标签。${NC}"
        return
    fi
    
    echo -e "${BLUE}创建发布标签 $tag_name...${NC}"
    
    # 创建标签
    if [ "$force" = true ]; then
        git tag -f -a "$tag_name" -m "$tag_message"
    else
        git tag -a "$tag_name" -m "$tag_message"
    fi
    
    echo -e "${GREEN}✅ 标签 $tag_name 创建成功${NC}"
    
    # 推送标签
    echo -e "${BLUE}推送标签到远程仓库...${NC}"
    if [ "$force" = true ]; then
        git push origin "$tag_name" --force
    else
        git push origin "$tag_name"
    fi
    
    echo -e "${GREEN}✅ 标签已推送到远程仓库${NC}"
    echo ""
    echo -e "${BLUE}🚀 CI/CD 部署已触发${NC}"
    echo "请访问 GitHub Actions 查看部署进度:"
    echo "https://github.com/JiajiaHuang/sbim_web/actions"
}

# 主函数
main() {
    local version=""
    local dry_run=false
    local force=false
    
    # 解析命令行参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -d|--dry-run)
                dry_run=true
                shift
                ;;
            -f|--force)
                force=true
                shift
                ;;
            -*)
                echo -e "${RED}错误: 未知选项 $1${NC}"
                show_help
                exit 1
                ;;
            *)
                if [ -z "$version" ]; then
                    version=$1
                else
                    echo -e "${RED}错误: 多余的参数 $1${NC}"
                    show_help
                    exit 1
                fi
                shift
                ;;
        esac
    done
    
    # 检查版本号参数
    if [ -z "$version" ]; then
        echo -e "${RED}错误: 请提供版本号${NC}"
        show_help
        exit 1
    fi
    
    # 验证版本号格式
    validate_version "$version"
    
    # 检查 Git 状态
    check_git_status
    check_main_branch
    
    # 创建标签
    create_tag "$version" "$dry_run" "$force"
}

# 运行主函数
main "$@"
