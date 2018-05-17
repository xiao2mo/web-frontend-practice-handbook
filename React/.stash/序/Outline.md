[![返回目录](https://parg.co/UY3)](https://parg.co/U0I)

# 前言

# 序

# React 初窥

## React 思维模式

* 介绍 React 发展背景与核心理念。
* 介绍 React 的纯视图使用

### 小而美的视图层

### 数据流驱动的界面

* jQuery 基础；React jQeury 对比。
* 命令式编程、声明式编程。
* 声明式组件的作用。

### 函数式编程

* 函数式编程基本理念。
* 纯函数不可变数据结构，高阶函数。

### Virtual DOM

* 基本算法与意义。
* 介绍 React 和 Virtual DOM 的关系。

## 组件化

### 组件化的意义

* 对比介绍一下没有 React 组件的时候是如何进行界面组件化的。 2 页
* 无状态组件和渲染方程 `View = f(State, Template)`。 1 页

### 组件化要点

* 组件化关心的几个方面
* 优秀组件评价标准。 1 页

### Web Components

## JSX

### JSX 的前世今生

* What is JSX?
* JSX 转换工具。

### JSX 与 HTML 比较

* JSX 与 HTML 语法差异。
* Root Node 最大数目。

### JSX 语法

* 空格。 0.5 页
* 注释。 0.5 页
* 变量。 0.5 页
* 条件渲染。 0.5 页

### React 支持的 HTML 与 SVG 属性

* 支持的 HTML 属性列表。 1 页
* 支持的 SVG 属性列表。 1 页

# 搭建开发脚手架

## create-react-app

### NPM 与 Yarn

* NPM 基本用法，部分最佳实践。 2 页
* NPM 不足。 0.5 页
* Yarn 介绍。 1 页

### 创建简单项目

* 介绍 create-react-app 基本安装。 0.5 页
* 介绍 helloworld 实例。 1 页

## 基于 Webpack 2 自定义开发环境

### JavaScript 模块系统与打包工具

* AMD，CMD，RequireJs、ES6。 1.5 页
* task runner，bundles。 0.5 页
* 背景介绍。 0.5 页
* 常见工具对比。 2 页

### Webpack 配置

* Webpack 核心概念
* Webpack 基础使用
* Webpack 配置详解

### Webpack Dev Server 与热加载

* webpack-dev-server。 1 页
* React 热加载配置；React hot loader。 1 页
* 介绍 React 预编译脚本使用。 0.5 页

## 辅助开发工具

### DevTools

* Chrome Tools。1 页

* React devtools。1 页

### React Storybook

* 介绍 React Storybook 的基本安装。 2 页

* 介绍 React Storybook meta 等插件工具

### VSCode

* babel node。 1 页
* 介绍常见 IDE。 0.5 页
* 语法高亮、插件使用。 0.5 页
* live templating。 1 页

# React 组件基础

## 组件声明

* 无 JSX React 组件声明。

### ES6 Class

* Plain es6 class。1 页
* React.createClass。1 页
* 上面两者关联。1 页

### 函数式组件

* 函数式组件应用。1 页
* 函数式组件优势。1 页

### this 绑定

## React 与 DOM

### 组件渲染到 DOM

### Refs

* findDOMNode。 1 页
* Refs 介绍。 1 页

### 整合非 React 类库

* 以 echarts 为例介绍如何整合非 React 类库。 2 页
* 侵入式插件处理。 2 页

## 列表组件

### 渲染与键

* JavaScript map、filter、reduce 的使用
* 基于 map 的列表渲染
* 使用 Key 的原因与优势
* 不使用 Key 的报错界面显示
* 如何设置最合适的 Key 值

### Keyed Fragment

### 仅渲染必要组件

### 下拉刷新与上滑加载

## 表单组件

### 受控组件与非受控组件

### 常用元素

* Text
* Select

### 表单验证

# React 组件样式

## CSS-in-JS

### 基本样式设置

* 基本行内样式设置。 1 页
* 行内样式的案例：根据文件名动态设置字体颜色

### 主题样式

* 借鉴 Material UI 的全局主题传递

### CSS-in-JS 的得与失

* 使用行内样式优劣。 1 页

## CSS 样式

### 引入 CSS 文件

* 基本使用。 1 页
* 介绍 Webpack 相关的 Plugins

### 动态样式类名

* JavaScript String Template 使用
* classnames 库。 1 页

### SCSS

* 基于 SCSS 的样式模块化。 2 页

## Flexbox

### Flexbox 简介

* Flexbox 的 Polyfill。 1 页

### Flexbox 基本语法

* CSS 样式网格系统的理念与传统做法。 1 页
* Flexbox 基本语法。 1 页

### Flexbox 常用示例

* Flexbox 使用示范。 2 页

# React 组件数据流

## Props

### Component Properties

* 基本概念与默认值设定。 2 页

### Prop Validation

* propTypes 类型校验。 1 页

### children

* children 详解
* Function As Children
* cloneElement，使用 RadioButton、RadioButtonGroup 实例

## State

### 组件内部状态

* 基本使用介绍。 1 页

### setState 同步更新

### JavaScript Immutablitiy

* JavaScript 本身 Immutable 功能的实现
* immutablitiy-helper。 1 页
* ImmutableJS。 1 页

## Context

### Context 基本使用

### Context 潜在问题

### Context 强制更新策略

## 组件间通信

### 父子组件通信

### 跨级组件通信

### 无嵌套关系组件通信

# 组件的生命周期

## 生命周期回调

### 实例化

### 存在期

### 销毁期

* 反模式(组件销毁后赋值)—— 实例说明

### 函数式组件生命周期

## 异步数据抓取

# React 事件系统 24 页

## 原生事件处理 【S】 6 页

### DOM 事件绑定与处理 3 页

* DOM 事件绑定与解绑。 1 页
* 参数传递。 1 页
* Event 对象。 1 页

### 事件分发与委托 3 页

* 事件冒泡与事件捕获。 2 页
* 事件委托。 1 页

## React 事件系统

### 事件绑定与响应

### 合成事件详解 3 页

* 合成事件的实现机制。 1 页
* 合成事件中引用原生事件。 1 页
* 合成事件与原生事件的混用。 1 页

### Event pooling 2 页

* Event pooling 原理。 1 页
* 实例介绍 Debounce 的实现。 1 页

## React 事件应用实践

### 点击事件与外部触发关闭

### 表单事件与输入校验

### 鼠标事件与悬浮反馈

### 触摸事件与 onTouchTap

* 介绍移动点击事件；Touch Events 原理。 1 页
* Tap 事件与 300ms 延迟。 1 页
* 介绍 onTouchTap 库的使用。 1 页

### 加载事件与图片懒加载

# React 动画

## CSS 动画

* CSS3 动画概述。 1 页

### Transition 与 Transform

* Transition 基本语法。 1 页
* Transform 基本语法。 1 页

### Animation 动画

* KeyFrame 详解。 1 页
* 常见动画库。 1 页

### 基于 Scale 的自适应容器

## React 动画

### React Transition

* React Transition 的设计及用法。

### React CSS Transition

* React CSS Transition 的设计及用法。

### React 动画库

* react-motion。2 页

## React 微交互动画

# React 路由

## 单页应用路由

### History API

### hash

## React Router 概述

### 声明式路由

* 介绍 React Router 的思想与声明式路由

* React Router 简单示例

### 非 React Router 路由方案

### History

* 介绍 hashHistory,2 页
* 介绍 browserHistory，2 页

## 路由配置与匹配

### 路由配置

* 添加默认路由，1 页
* 将 UI 与 URL 解耦，1 页
* 重定向路由，1 页
* NamedComponent:命名组件，1 页

### 动态路由

### 路由匹配

* Nesting，1 页
* Path Syntax:路径表达式，1 页
* Precedence:优先级，1 页
* Params:参数，1 页
* Route Parameters，1 页
* Query String Parameters:查询参数，1 页

## 路由控制

### 命令式跳转

* 组件内利用 HOC 方式命令跳转，1 页
* 组件化路由，1 页

### 权限控制

### 跳转确认

* 跳转前确认，1 页

### 转场动画

# Webpack 工程实战

## 资源处理

### html

### CSS

### 图片与字体

## 代码分割与异步加载

### 公共代码提取

### 异步加载

## 发布到生产环境

### 编译压缩

* 全局环境配置。 1 页
* 代码压缩。 1 页
* gzip 压缩。 1 页

### 版本控制

* hash 处理。 1 页
* 版本控制。 1 页

# NodeJS

## NodeJS 初窥

### 认识 NodeJS

### 回调与事件

### 模块化驱动开发

## 简单 HTTP 服务器

### 再谈 NPM

* 介绍 npm link
* 介绍 NPM 中 dependencies、devDependencies 以及 peerDependencies 区别

### createServer

### 在 Chrome 中调试 NodeJS 应用

### 基于 WebSocket 的实时通信

* 介绍 Socket.io 的基本使用

## Express

## NodeJS 工程实践

### 项目结构

### 吞吐量优化

# GUI 应用程序架构变迁

## MV\* 5 页

* 介绍 MV\* 模式的共有特征 1 页

### MVC:巨石型控制器

* MVC 基础。 1 页
* Observer Pattern。 1 页

### MVP:视图与模型的解耦

* MVP 基础概念。 1 页
* Supervising Controller MVP。 1 页

### MVVM:数据绑定与无状态视图

* MVVM 基本概念介绍。 1 页

## Flux

### 双向绑定的缺陷

### Flux 基本概念

### Flux 组成部分

* Dispatcher
* Action
* Store
* 控制视图

# MobX:响应式状态管理

## MobX 初探

### 创建与监听

* observable 函数与注解。
* computed 详解。
* autorun。

### Observable Types

* objects。
* arrays。
* maps。
* boxed values。

# Redux

## Redux 设计理念

## 使用 Redux 管理应用状态

### Action 与 ActionCreator

### Store

### Reducer

### 连接 React 组件与 Redux Store

## Redux 异步处理

### Thunk

### Promise Middleware

### Saga

## Redux 工程实践

### 文件组织与目录划分

### 表单处理

# React 服务端渲染

## 服务端渲染概述

## 基于 Express 的渲染服务器

### renderToString

### 状态传递

### 路由权限控制

### 使用 pm2 部署

### 避免 XSS 漏洞

## 基于 Next.js 快速搭建渲染服务器

## 服务端渲染性能浅析

### 过度抽象

### 使用 Rapscallion 加速渲染性能

# Flow 静态类型检测

## JavaScript 静态类型校验

* JavaScript 静态类型校验优势 1 页

* TypeScript 概述与 Flow 对比 1 页

* 静态类型校验的考量 1 页

## 基础语法

## 组件校验

# React 工程实践

## React 设计模式

### 组件驱动开发

### High-Order Component

## React 样式指南

### 组件代码风格

## 基于 React 的模式库

### antd.desgin

### Material UI

# React 性能优化

## Preact

# Web 测试

## 自动化测试概述

## Mocha

## Jest

## 组件测试

## 端到端测试

# React 调和机制

## 再谈 Virtual DOM

### DOM 树的表示

### Diff 算法

### Props

### 事件处理

## React 源码概览

### 断点调试 React 应用

### 目录结构

### 组件声明

### DOM 渲染

## React setState

## React Fiber

# 前端工程化

## 前后端分离与全栈

## 工具化与工程化

## 状态管理

### 渐进的状态管理

* 局部状态
* 外部状态
* 多组件状态交互

### 构建合理的状态存储格式

## 微服务与微前端

## 渐进式的工程架构

# Progressive Web Apps

## PWA 概述

## 离线存储

## Service Worker

## 基于 React 开发 PWA 应用

# React Native

## React Native 初探

## 语法基础

## 结合 MobX 构建图片应用

## 原生架构浅析
