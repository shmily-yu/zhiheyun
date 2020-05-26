## 概览

使用 `yarn` 作为项目依赖管理工具，项目预处理框架使用 `stylus`，
项目 UI 框架为 [VantUI](https://youzan.github.io/vant/#/zh-CN/)（less 预编译）。

项目主题色为 `#7851FD`，可在 `vue.config.js` 中的 `less.modifyVars` 配置相关属性。

登陆注册使用框架内的 [form 组件](https://youzan.github.io/vant/#/zh-CN/form)提供的表单验证和输入框组件，
自定义表单正则验证在 `@/assets/js/validator.js` 中。

登陆界面消息提示使用 [Notify](https://youzan.github.io/vant/#/zh-CN/notify)，
内页使用 [Toast](https://youzan.github.io/vant/#/zh-CN/toast)来提示用户操作结果。

首页使用组件内 [PullRefresh](https://youzan.github.io/vant/#/zh-CN/pull-refresh) 下拉刷新用户数据。

列表页和日志详情使用 [list](https://youzan.github.io/vant/#/zh-CN/list) 列表组件实现无限滚动加载。

通用样式变量及样式混入函数在 `@/assets/stylus` 目录下。

API 配置位于 `@/assets/api` 目录下，`config.js`为初始化及相关配置文件，`index.js`为接口地址管理。

---

### 设计稿 - 蓝湖

https://lanhuapp.com/web/#/item/project/board?pid=81d96840-3e6a-40e6-8bd9-d65fa14c6f8b

### 接口文档

https://www.showdoc.cc/689903996279250?page_id=3960428094562608

### Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```
