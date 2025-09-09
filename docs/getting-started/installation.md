# 安装指南

本指南将帮助您安装和配置草莓创新无人机自动机场系统。

## 系统要求

### 硬件要求

- **处理器**: Intel i5 或 AMD Ryzen 5 以上
- **内存**: 8GB RAM 最低，推荐 16GB
- **存储**: 100GB 可用空间
- **网络**: 稳定的互联网连接

### 软件要求

- **操作系统**: 
  - Ubuntu 20.04 LTS 或更高版本
  - Windows 10/11 (64位)
  - macOS 10.15 或更高版本
- **Python**: 3.8 或更高版本
- **Node.js**: 16.0 或更高版本

## 安装步骤

### 1. 下载软件包

从官方网站下载最新版本的软件包：

```bash
wget https://releases.sb.im/latest/sbim-dock-system.tar.gz
```

### 2. 解压安装包

```bash
tar -xzf sbim-dock-system.tar.gz
cd sbim-dock-system
```

### 3. 安装依赖

#### Ubuntu/Debian

```bash
sudo apt update
sudo apt install python3 python3-pip nodejs npm
```

#### macOS

```bash
brew install python3 node npm
```

#### Windows

请从官方网站下载并安装 Python 和 Node.js。

### 4. 安装 Python 依赖

```bash
pip3 install -r requirements.txt
```

### 5. 配置系统

复制配置文件模板：

```bash
cp config/config.example.json config/config.json
```

编辑配置文件：

```json
{
  "api_endpoint": "https://api.sb.im",
  "api_key": "your_api_key_here",
  "dock_id": "your_dock_id",
  "location": {
    "latitude": 0.0,
    "longitude": 0.0
  }
}
```

## 验证安装

运行系统检查命令：

```bash
python3 sbim_dock.py --check
```

如果看到以下输出，说明安装成功：

```
✅ 系统检查通过
✅ API 连接正常
✅ 硬件设备就绪
```

## 下一步

安装完成后，请继续阅读[快速上手指南](./first-steps)了解如何开始使用系统。
