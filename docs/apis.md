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
    expiredTime: 过期时间,
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



### 获取文章

get

`/getArticleList`

成功服务器返回

```
{
	status: 2020,
    msg: '获取文章信息成功！',
	data: [
		{
			"aid": 1,
			"status": 1,
			"title": "测试文章",
			"created_at": "2023-03-03T03:45:14.000Z",
			"updated_at": "2023-05-22T13:46:05.000Z",
			"author": {
				"uid": 1,
				"nick": "超级管理员"
			},
			"description": "测试简介",
			"permission": 0
		},
		{
			"aid": 3,
			"status": 2,
			"title": "这是一篇有密码的文章",
			"created_at": "2023-03-03T03:45:14.000Z",
			"updated_at": "2023-03-03T03:45:14.000Z",
			"author": {
				"uid": 1,
				"nick": "超级管理员"
			},
			"description": "这是一篇受密码保护的文章",
			"permission": 0
		}
	]
}
```

失败服务器返回

```
{
	status: 5020,
    msg: '获取文章信息失败'
}
```



### 获取文章详细信息

get

`/getArticle`

需传参

```
{
	aid: 文章唯一识别aid,
	password: 文章密码（可选）
}
```

成功服务器返回

```
{
	status:200,
    msg:'获取文章数据成功！',
    data: {}
}
```

失败服务器返回

```
{
	status: 4020,
    msg: '未提供AID'
}
```

```
{
	status: 5030,
    msg: '错误，未找到'
}
```

```
{
	status: 4032,
    msg: '鉴权失败，您无权请求此文章'
}
```

```
{
	status: 4031,
    msg: '限权不足'
}
```



## 需携带身份验证接口

### 基本信息

需携带token

路径`/api`

### 获取文章列表

post

`/getArticleList`

成功服务器返回

```
{
	status: 2020,
    msg: '获取文章信息成功！',
    permission: 权限,
	data: []

}
```

失败服务器返回

```
{
	status: 5020,
    msg: '获取文章信息失败'
}
```

### 获取文章详细信息

post

`/getArticle`

需传参

```
{
	aid: 文章唯一识别aid,
	password: 文章密码（可选）
}
```

成功服务器返回

```
{
	status:200,
    msg:'获取文章数据成功！',
    data: {}
}
```

失败服务器返回

```
{
	status: 4020,
    msg: '未提供AID'
}
```

```
{
	status: 5030,
    msg: '错误，未找到'
}
```

```
{
	status: 4032,
    msg: '鉴权失败，您无权请求此文章'
}
```

```
{
	status: 4031,
    msg: '限权不足'
}
```

### 获取个人页信息

post

`/userMain`

成功服务器返回

```
{
	status: 200,
    msg: '获取个人页信息成功！',
    data: {
    	articleList: []
    }
}
```

### 获取编辑文章 / 新建文章信息

post

`/getActicleInfo`

需传参

```
{
	aid: 文章唯一标识符（若新建文章可不传参）
}
```

成功服务器返回

```
{
	status: 200,
    msg: '获取文章信息成功',
    data: []
}
```

失败服务器返回

```
{
	status: 5030,
    msg: '获取文章信息失败'
}
```

```
{
	status: 4035,
    msg: '拒绝访问'
}
```

### 删除文章

post

`/delActicle`

需传参

```
{
	aid: 文章唯一标识
}
```

成功服务器返回

```
{
	status: 200,
    msg: '删除成功'
}
```

失败服务器返回

```
{
	status: 500,
    msg: '删除失败'
}
```

### 修改文章

post

`/editActicle`

需传参

```
{
	aid: 文章唯一标识,
	title: 文章标题,
	description: 文章摘要,
	content: 文章正文,
	permission: 文章查看权限,
	password: 文章密码
}
```

成功服务器返回

```
{
	"status": 200,
	"msg": "修改文章成功"
}
```

失败服务器返回

```
{
	status: 400,
    msg: '非法的参数'
}
```

```
{
	status: 500,
    msg: '修改文章数据失败'
}
```

```
{
	status: 500,
    msg: '未知错误'
}
```

### 新建文章

post

`/addActicle`

需传参

```
{
	title: 文章标题,
	description: 文章摘要,
	content: 文章正文,
	permission: 文章查看权限,
	password: 文章密码
}
```

成功服务器返回

```
{
	"status": 200,
	"msg": "添加文章成功"
}
```

失败服务器返回

```
{
	status: 400,
    msg: '非法的参数'
}
```

```
{
	status: 500,
    msg: '添加文章失败'
}
```

```
{
	status: 500,
    msg: '未知错误'
}
```

