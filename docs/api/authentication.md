# 身份验证

草莓创新 API 使用多层安全机制来保护您的数据和设备安全。

## 认证流程

### 1. API 密钥认证

首先需要获取 API 密钥对：

```bash
curl -X POST https://api.sb.im/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your@email.com",
    "password": "your_password",
    "organization": "your_company"
  }'
```

响应示例：

```json
{
  "success": true,
  "data": {
    "api_key": "sbim_ak_1234567890abcdef",
    "api_secret": "sbim_sk_abcdef1234567890",
    "user_id": "user_001"
  }
}
```

### 2. JWT Token 获取

使用 API 密钥对获取访问令牌：

```bash
curl -X POST https://api.sb.im/v1/auth/token \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "sbim_ak_1234567890abcdef",
    "api_secret": "sbim_sk_abcdef1234567890"
  }'
```

响应示例：

```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "refresh_token": "refresh_token_here"
  }
}
```

### 3. 使用 Token 访问 API

在所有 API 请求中包含 Authorization 头：

```bash
curl -X GET https://api.sb.im/v1/docks \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

## 权限级别

### 用户权限

| 权限级别 | 说明 | 可访问资源 |
|----------|------|------------|
| **Viewer** | 只读权限 | 查看机场状态、无人机信息 |
| **Operator** | 操作权限 | 执行任务、控制无人机 |
| **Admin** | 管理权限 | 配置机场、管理用户 |
| **Owner** | 所有者权限 | 完全控制权限 |

### 资源权限

```json
{
  "permissions": {
    "docks": ["read", "write", "delete"],
    "drones": ["read", "control"],
    "missions": ["read", "write", "execute"],
    "users": ["read"]
  }
}
```

## Token 刷新

访问令牌有效期为 1 小时，使用刷新令牌获取新的访问令牌：

```bash
curl -X POST https://api.sb.im/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "refresh_token_here"
  }'
```

## 安全最佳实践

### 1. 密钥管理

```bash
# 使用环境变量存储密钥
export SBIM_API_KEY="sbim_ak_1234567890abcdef"
export SBIM_API_SECRET="sbim_sk_abcdef1234567890"

# 在代码中读取
import os
api_key = os.getenv('SBIM_API_KEY')
api_secret = os.getenv('SBIM_API_SECRET')
```

### 2. Token 缓存

```python
import time
import requests

class SBIMAuth:
    def __init__(self, api_key, api_secret):
        self.api_key = api_key
        self.api_secret = api_secret
        self.token = None
        self.expires_at = 0
    
    def get_token(self):
        if self.token and time.time() < self.expires_at:
            return self.token
        
        # 获取新 token
        response = requests.post('https://api.sb.im/v1/auth/token', json={
            'api_key': self.api_key,
            'api_secret': self.api_secret
        })
        
        data = response.json()['data']
        self.token = data['access_token']
        self.expires_at = time.time() + data['expires_in'] - 60  # 提前1分钟刷新
        
        return self.token
```

### 3. 请求签名

对于高安全性要求的操作，支持请求签名：

```python
import hmac
import hashlib
import time

def sign_request(method, path, body, api_secret):
    timestamp = str(int(time.time()))
    message = f"{method}\n{path}\n{body}\n{timestamp}"
    signature = hmac.new(
        api_secret.encode(),
        message.encode(),
        hashlib.sha256
    ).hexdigest()
    
    return {
        'X-SBIM-Timestamp': timestamp,
        'X-SBIM-Signature': signature
    }
```

## 错误处理

### 认证错误

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "API 密钥或密码错误"
  }
}
```

### Token 过期

```json
{
  "success": false,
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "访问令牌已过期，请刷新"
  }
}
```

### 权限不足

```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "权限不足，无法执行此操作"
  }
}
```

## SDK 示例

### Python SDK

```python
from sbim_sdk import SBIMClient

# 初始化客户端
client = SBIMClient(
    api_key="your_api_key",
    api_secret="your_api_secret"
)

# SDK 会自动处理认证
docks = client.docks.list()
```

### JavaScript SDK

```javascript
import { SBIMClient } from '@sbim/sdk';

const client = new SBIMClient({
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret'
});

// 自动处理 token 刷新
const docks = await client.docks.list();
```

## 安全注意事项

⚠️ **重要提醒**

- 永远不要在客户端代码中暴露 API 密钥
- 定期轮换 API 密钥
- 使用 HTTPS 进行所有 API 调用
- 监控 API 使用情况，及时发现异常
- 为不同环境使用不同的密钥对

## 下一步

- 查看完整的 [API 参考文档](./reference)
- 了解 [错误处理](./errors) 最佳实践
- 下载 [SDK](../sdk/overview) 开始开发
