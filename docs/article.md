# 文章

数据库表数据 article

aid - 文章唯一识别号

status - 文章状态（`2`待审核、`1`正常、`0`未知状态、`-1`被删除、`-2`审核不通过、`-3`文章违规；特殊状态：`10`隐藏文章）

title - 文章标题

created_at - 文章发布时间

updated_at - 文章最后修改时间

author - 文章作者uid

description- 文章描述

content - 文章正文

permission - 文章查看权限

password - 文章密码（可为空）