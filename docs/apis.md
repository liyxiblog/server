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

成功服务器返回

```
{
	status: 2001 | 2002,
    msg: '登录成功',
    token: ''
}
```

失败服务器返回

```
{
	status:4013,
    msg:'账号或密码错误'
}
```

```
{
	status:5010,
    msg:'接口已失效'
}
```

```
{
	status:4093,
    msg:'验证码不通过'
}
```



### 获取项目接口

get

`/getProject`

需传参

```
{
	re: true（可选，默认为false）
}
```

re - 若为true，则返回的数据由新到旧排序；若为false，则返回的数据由旧到新排序

成功服务器返回

```
{
	status: 2011 | 2012,
    msg: '项目列表请求成功！',
    data: []
}
```

