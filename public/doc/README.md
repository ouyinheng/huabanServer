# 花瓣API

花瓣 NodeJS 版 API

> API文件在==src/routes/huaban.js==中
### 1. 首页--推荐

**type :**  get

**必选参数 :**  page:页数

**接口地址 :**  /huabanhome

**调用例子 :** /huabanhome
### 2. 首页--推荐详情

**type :**  post

**必选参数 :**  
```
      type：类型（'explores','boards','users'）
      urlname:id或用户名
```

**接口地址 :**  /author

**调用例子 :** /author


// 花瓣详情
.post '/borads'

// 探索详情
.post '/explore'

// 图片详情
.post '/showInfo'

// search

// 搜索自动补全
.get'/searchAuto'

// 查询
.get '/search'


