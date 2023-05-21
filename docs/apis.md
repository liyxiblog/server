# APIS

## 公共接口

### 基本信息

公共路径

`/api/public/`

### 登录接口

post

`/login`

需传参

```
{
	username: 用户名,
	password: 密码,
	keeplogin: 是否保持登录状态（布尔值）,
	ticket: --（验证码相关）,
	randstr: --（验证码相关）,
}
```

