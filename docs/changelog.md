# 关键更新记录

## SuperDock API 文档 v1.2.0 发布记录

### 发布日期

2025.01.22

### 发布列表

**文档架构优化**
* 新增[设备类型参考文档](./cloud-api/device-types.md) - 完整的设备型号和类型代码参考
* 优化文档导航结构，提升开发者体验
* 修复所有断开的内部链接

**设备支持扩展**
* 新增支持 Matrice 400 系列无人机
* 新增支持 M3TA (Mavic 3 Thermal Advanced) 相机
* 新增支持 RC Plus 2 遥控器
* 新增支持大疆机场 3
* 完善 SuperDock 系列机场设备类型定义

**API 兼容性增强**
* 完全兼容 DJI 上云 API 标准
* 统一设备标识格式 (domain, type, sub_type)
* 支持云台位置参数 (gimbal_index)
* 支持机场相机位置参数 (camera_position)

### 支持产品列表

**SuperDock 系列机场**

| 机场型号 | Domain | Type | Sub Type | 说明 |
|----------|--------|------|----------|------|
| S24M350 | 3 | 88100 | 0 | M350 机场-24 |
| S24M350S | 3 | 88101 | 0 | M350 换电机场-24 |
| S24M3 | 3 | 88102 | 0 | M3 机场-24 |
| S24M4 | 3 | 88103 | 0 | M4 机场-24 |

**支持无人机型号**

| 机型 | Domain | Type | Sub Type | 说明 |
|------|--------|------|----------|------|
| M400 | 0 | 103 | 0 | Matrice 400 |
| M350 | 0 | 89 | 0 | Matrice 350 RTK |
| M300 | 0 | 60 | 0 | Matrice 300 RTK |
| M4E/M4T | 0 | 99 | 0/1 | Matrice 4 系列 |

## SuperDock API 文档 v1.1.0 发布记录

### 发布日期

2025.01.15

### 发布列表

**基础文档建设**
* 建立完整的技术文档架构
* 新增 API 概览和功能对比文档
* 新增 HMS 健康管理系统文档
* 新增错误代码参考文档

**DJI API 兼容性**
* 完全兼容 DJI 上云 API 标准
* 支持现有 DJI API 代码直接迁移
* 兼容 DJI Cloud API Demo 平台

### 支持产品列表

**SuperDock 系列机场**
* SuperDock Pro V4 - 适配 M350/M300
* SuperDock Mini 2 - 适配御3/御4系列
* SuperDock Pro - 专业级巡检作业

**兼容 DJI 设备**
* 完全兼容 DJI 上云 API 支持的所有设备
* 支持混合部署和统一管理

## SuperDock API 文档 v1.0.0 发布记录

### 发布日期

2024.12.01

### 发布列表

**初始版本发布**
* SuperDock 无人机自动机场系统开发者文档上线
* 基于 DJI 上云 API 标准的完整兼容实现
* 支持设备导向的文档架构设计

**核心功能**
* 设备入门指南
* 云端集成文档
* 系统集成指南
* 技术支持文档

### 支持产品列表

**SuperDock 系列**
* SuperDock Pro V4
* SuperDock Mini 2
* SuperDock Pro

---

## 文档更新说明

本文档记录 SuperDock API 文档的关键更新和版本变更。每次更新都会详细说明新增功能、修复问题和支持的产品列表。

### 版本命名规则

- **主版本号**: 重大架构变更或不兼容更新
- **次版本号**: 新功能添加或重要改进
- **修订版本号**: 问题修复和小幅优化

### 获取帮助

如需了解更多信息或获取技术支持：

- **技术支持**: [developer@sb.im](mailto:developer@sb.im)
- **官方网站**: [https://sb.im/](https://sb.im/)
- **GitHub**: [@sb-im](https://github.com/sb-im)
