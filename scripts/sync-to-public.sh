#!/bin/bash

# SuperDock 文档同步脚本
# 将私有仓库的重要更新同步到开源仓库

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置信息
PRIVATE_REPO="git@github.com:JiajiaHuang/sbim_web_private.git"  # 私有仓库地址
PUBLIC_REPO="git@github.com:JiajiaHuang/sbim_web.git"          # 开源仓库地址
TEMP_DIR="/tmp/sbim_sync_$(date +%s)"

# 显示帮助信息
show_help() {
    echo -e "${BLUE}SuperDock 文档同步脚本${NC}"
    echo ""
    echo "用法: $0 [选项] <版本号>"
    echo ""
    echo "选项:"
    echo "  -h, --help        显示此帮助信息"
    echo "  -d, --dry-run     预览模式，不实际同步"
    echo "  -f, --force       强制同步（覆盖目标分支）"
    echo "  -m, --message     自定义合并提交消息"
    echo ""
    echo "示例:"
    echo "  $0 1.3.0                           # 同步到开源仓库并创建 v1.3.0 标签"
    echo "  $0 --dry-run 1.3.0                 # 预览同步操作"
    echo "  $0 --message \"重大功能更新\" 1.3.0   # 自定义提交消息"
    echo ""
    echo "版本号格式: X.Y.Z (如: 1.3.0, 2.0.0)"
}

# 验证版本号格式
validate_version() {
    local version=$1
    if [[ ! $version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo -e "${RED}错误: 版本号格式无效。请使用 X.Y.Z 格式 (如: 1.3.0)${NC}"
        exit 1
    fi
}

# 检查必要的工具
check_dependencies() {
    if ! command -v git &> /dev/null; then
        echo -e "${RED}错误: 未找到 git 命令${NC}"
        exit 1
    fi
}

# 清理临时目录
cleanup() {
    if [ -d "$TEMP_DIR" ]; then
        echo -e "${YELLOW}清理临时目录: $TEMP_DIR${NC}"
        rm -rf "$TEMP_DIR"
    fi
}

# 设置清理陷阱
trap cleanup EXIT

# 克隆仓库
clone_repositories() {
    local dry_run=$1
    
    if [ "$dry_run" = true ]; then
        echo -e "${BLUE}预览模式 - 将要执行的克隆操作:${NC}"
        echo "1. 克隆私有仓库: $PRIVATE_REPO"
        echo "2. 添加开源仓库远程: $PUBLIC_REPO"
        return
    fi
    
    echo -e "${BLUE}创建临时工作目录: $TEMP_DIR${NC}"
    mkdir -p "$TEMP_DIR"
    cd "$TEMP_DIR"
    
    echo -e "${BLUE}克隆私有仓库...${NC}"
    git clone "$PRIVATE_REPO" private
    cd private
    
    echo -e "${BLUE}添加开源仓库远程...${NC}"
    git remote add public "$PUBLIC_REPO"
    git fetch public
}

# 生成变更摘要
generate_changelog() {
    local version=$1
    local last_public_commit
    
    # 获取开源仓库的最新提交
    last_public_commit=$(git rev-parse public/main)
    
    echo -e "${BLUE}生成变更摘要...${NC}"
    echo "从 $last_public_commit 到当前的主要变更:"
    echo ""
    
    # 生成简化的变更日志
    git log --oneline --no-merges "$last_public_commit..HEAD" | head -20
    echo ""
}

# 创建清理后的提交
create_clean_commit() {
    local version=$1
    local custom_message=$2
    local dry_run=$3
    
    if [ "$dry_run" = true ]; then
        echo -e "${BLUE}预览模式 - 将要创建的提交:${NC}"
        echo "标题: SuperDock API 文档 v$version"
        echo "消息: ${custom_message:-"版本更新和功能优化"}"
        return
    fi
    
    # 检出开源仓库的 main 分支
    git checkout public/main -b "sync-v$version"
    
    # 将私有仓库的更改应用到开源分支
    git checkout main -- .
    
    # 创建合并提交
    local commit_message="SuperDock API 文档 v$version

${custom_message:-"版本更新和功能优化"}

主要更新:
- 文档内容优化和完善
- 修复已知问题
- 改进用户体验
- 新增功能和特性

详细更新记录请查看: docs/changelog.md"
    
    git add .
    git commit -m "$commit_message" || {
        echo -e "${YELLOW}没有检测到更改，跳过提交创建${NC}"
        return 1
    }
    
    echo -e "${GREEN}✅ 创建清理后的提交成功${NC}"
}

# 推送到开源仓库
push_to_public() {
    local version=$1
    local force=$2
    local dry_run=$3
    
    if [ "$dry_run" = true ]; then
        echo -e "${BLUE}预览模式 - 将要执行的推送操作:${NC}"
        echo "1. 推送分支到开源仓库"
        echo "2. 创建 Pull Request (需要手动操作)"
        echo "3. 合并后创建 v$version 标签"
        return
    fi
    
    echo -e "${BLUE}推送到开源仓库...${NC}"
    
    if [ "$force" = true ]; then
        git push public "sync-v$version" --force
    else
        git push public "sync-v$version"
    fi
    
    echo -e "${GREEN}✅ 推送成功${NC}"
    echo ""
    echo -e "${YELLOW}下一步操作:${NC}"
    echo "1. 访问 GitHub 创建 Pull Request"
    echo "2. 审查更改并合并到 main 分支"
    echo "3. 在开源仓库中运行发布脚本:"
    echo "   ./scripts/create-release.sh $version"
}

# 主函数
main() {
    local version=""
    local dry_run=false
    local force=false
    local custom_message=""
    
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
            -m|--message)
                custom_message="$2"
                shift 2
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
    
    # 检查依赖
    check_dependencies
    
    echo -e "${BLUE}开始同步 SuperDock 文档 v$version 到开源仓库${NC}"
    echo ""
    
    # 执行同步流程
    clone_repositories "$dry_run"
    
    if [ "$dry_run" = false ]; then
        generate_changelog "$version"
        
        if create_clean_commit "$version" "$custom_message" "$dry_run"; then
            push_to_public "$version" "$force" "$dry_run"
        else
            echo -e "${YELLOW}没有需要同步的更改${NC}"
            exit 0
        fi
    else
        echo -e "${GREEN}预览完成。使用不带 --dry-run 的命令来实际执行同步。${NC}"
    fi
}

# 运行主函数
main "$@"
