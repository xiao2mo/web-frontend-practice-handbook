
近年来，随着浏览器性能的提升与移动互联网浪潮的汹涌而来，Web前端开发进入了高歌猛进，日新月异的时代。这是最好的时代，我们永远在前行，这也是最坏的时代，无数的前端开发框架、技术体系争妍斗艳，让开发者们陷入困惑，乃至于无所适从。Web前端开发可以追溯于1991年蒂姆·伯纳斯-李公开提及HTML描述，而后1999年W3C发布HTML4标准，这个阶段主要是BS架构，没有所谓的前端开发概念，网页只不过是后端工程师的顺手之作，服务端渲染是主要的数据传递方式。接下来的几年间随着互联网的发展与REST等架构标准的提出，前后端分离与富客户端的概念日渐为人认同，我们需要在语言与基础的API上进行扩充，这个阶段出现了以jQuery为代表的一系列前端辅助工具。2009年以来，智能手机开发普及，移动端大浪潮势不可挡，SPA单页应用的设计理念也大行其道，相关联的前端模块化、组件化、响应式开发、混合式开发等等技术需求甚为迫切。这个阶段催生了Angular 1、Ionic等一系列优秀的框架以及AMD、CMD、UMD与RequireJS、SeaJS等模块标准与加载工具，前端工程师也成为了专门的开发领域，拥有独立于后端的技术体系与架构模式。而近两年间随着Web应用复杂度的提升、团队人员的扩充、用户对于页面交互友好与性能优化的需求，我们需要更加优秀灵活的开发框架来协助我们更好的完成前端开发。这个阶段涌现出了很多关注点相对集中、设计理念更为优秀的框架，譬如React、VueJS、Angular 2等组件框架允许我们以声明式编程来替代以DOM操作为核心的命令式编程，加快了组件的开发速度，并且增强了组件的可复用性与可组合性。而遵循函数式编程的Redux与借鉴了响应式编程理念的MobX都是非常不错的状态管理辅助框架，辅助开发者将业务逻辑与视图渲染剥离，更为合理地划分项目结构，更好地贯彻单一职责原则与提升代码的可维护性。在项目构建工具上，以Grunt、Gulp为代表的任务运行管理与以Webpack、Rollup、JSPM为代表的项目打包工具各领风骚，帮助开发者更好的搭建前端构建流程，自动化地进行预处理、异步加载、Polyfill、压缩等操作。 

总结而言，目前前端工具化已经进入到了非常繁荣的时代，而很多前端开发者也甚为苦恼，疲于学习。本书的首要目标即是以React为核心的技术体系为主线，介绍目前前端开发的基本概念，帮助初级前端开发者搭建前端知识体系，能够迅速进入前端开发的工作中。而蕴藏在工具化之中的是抽象而出的设计理念与编程范式，总结而言即是对于前端工程化的思考。工具的变革会非常迅速，很多优秀的工具可能都只是历史长河中的一朵浪花，而总结而出的工程化思维则会恒久长存。本书希望为读者构建完整的前端技术体系概念，并且能使不同技术水准的读者都有所得： 

（1）希望对于没有经验的开发者能够在本书选定的最短路径上快速成为一名合格的能够利用React快速开发Web应用的现代前端开发者。每一小节都会讲解最基础的语法或者使用要点，但是不会长篇大论地介绍语法细节这些应该查看文档的内容。通过简单的示例快速上手之后，笔者会介绍很多工程当中的具体实践。可能刚入门的开发者并不能理解这些实践的意义或者价值，但是首先保证能用，而后在自己的实践中慢慢回味，逐渐明了。 

（2）而对于有一定前端开发经验的开发者，本书能够帮你梳理现代纷繁复杂的前端开发状况，探寻以React为代表的百花齐放的工具库背后蕴藏的设计理念与编程范式，最终融会贯通，形成自己的前端工程化思想与体系。

# 前言

# 序

# React 初窥

## React 思维模式

- 介绍 React 发展背景与核心理念。
- 介绍 React 的纯视图使用

### 小而美的视图层

### 数据流驱动的界面

- jQuery 基础；React jQeury 对比。
- 命令式编程、声明式编程。
- 声明式组件的作用。

### 函数式编程

- 函数式编程基本理念。
- 纯函数不可变数据结构，高阶函数。

### Virtual DOM

- 基本算法与意义。
- 介绍 React 和 Virtual DOM 的关系。

## JSX

### JSX 的前世今生

- What is JSX? 
- JSX转换工具。

### JSX 与 HTML 比较

- JSX 与 HTML 语法差异。
- Root Node 最大数目。

### JSX 语法

- 空格。 0.5页
- 注释。 0.5页
- 变量。 0.5页
- 条件渲染。 0.5页

### React 支持的 HTML 与 SVG 属性

- 支持的 HTML 属性列表。 1页
- 支持的 SVG 属性列表。 1页

## 搭建 React 脚手架

### create-react-app

- 介绍 React 预编译脚本使用。 0.5页
- 介绍 create-react-app 基本安装。 0.5页
- 介绍 helloworld 实例。 1页

### NPM 与 Yarn

- NPM 基本用法，部分最佳实践。 2页
- NPM 不足。 0.5页
- Yarn 介绍。 1页

### 打造基于 VSCode 的开发环境

- babel node。 1页
- 介绍常见 IDE。 0.5页
- 语法高亮、插件使用。 0.5页
- live templating。 1页

### 常用开发工具

- Chrome Tools。1页 

- React devtools。1页

- 介绍 React Storybook 的基本安装。 2页

- 介绍 React Storybook meta 等插件工具

## Webpack

### JavaScript 模块系统

- AMD，CMD，RequireJs、ES6。 1.5页

### 模块打包工具

- task runner，bundles。 0.5页
- 背景介绍。 0.5页
- 常见工具对比。 2页

### Webpack 配置

- Webpack 核心概念
- Webpack 基础使用
- Webpack 配置详解

### Webpack Dev Server 与热加载

- webpack-dev-server。 1页
- React 热加载配置；React hot loader。 1页

# React 组件

## 组件化

### 组件化的意义

- 对比介绍一下没有 React 组件的时候是如何进行界面组件化的。 2页
- 无状态组件和渲染方程 `View = f(State, Template)`。 1页

### 组件化要点

- 组件化关心的几个方面
- 优秀组件评价标准。 1页

### Web Components

## 组件声明

- 无 JSX React 组件声明。

### ES6 Class

- Plain es6 class。1页
- React.createClass。1页
- 上面两者关联。1页

### 函数式组件

- 函数式组件应用。1页
- 函数式组件优势。1页

### this绑定

## 列表组件

### 渲染与键

- JavaScript map、filter、reduce 的使用
- 基于 map 的列表渲染
- 使用 Key 的原因与优势
- 不使用 Key 的报错界面显示
- 如何设置最合适的 Key 值

### Keyed Fragment

### React Virtualized

### React Canvas

## 表单组件

### 受控组件与非受控组件

### 常用组件

- Text
- Select

### 表单验证

## React 与 DOM

### 组件渲染到 DOM

### Refs

- findDOMNode。 1页
- Refs 介绍。 1页

### 整合非 React 类库

- 以 echarts 为例介绍如何整合非 React 类库。 2页
- 侵入式插件处理。 2页

# React 组件样式

## CSS-in-JS

### 基本样式设置

- 基本行内样式设置。 1页
- 行内样式的案例：根据文件名动态设置字体颜色

### 主题样式

- 借鉴 Material UI 的全局主题传递

### CSS-in-JS的得与失

- 使用行内样式优劣。 1页

## CSS 样式

### 引入 CSS 文件

- 基本使用。 1页
- 介绍 Webpack 相关的 Plugins

### 动态样式类名

- JavaScript String Template 使用
- classnames 库。 1页

### SCSS

- 基于 SCSS 的样式模块化。 2页

## Flexbox

### Flexbox 简介

- Flexbox 的 Polyfill。 1页

### Flexbox 基本语法

- CSS 样式网格系统的理念与传统做法。 1页
- Flexbox 基本语法。 1页

### Flexbox 常用示例

- Flexbox 使用示范。 2页

# React 组件数据流

## Props

### Component Properties

- 基本概念与默认值设定。 2页

### Prop Validation

- propTypes 类型校验。 1页

### children

- children 详解
- Function As Children
- cloneElement，使用 RadioButton、RadioButtonGroup 实例

## State

### 组件状态

- 基本使用介绍。 1页

### setState 同步更新

### JavaScript Immutablitiy

- JavaScript 本身 Immutable 功能的实现
- immutablitiy-helper。 1页
- ImmutableJS。 1页

## Context

### Context 基本使用

### Context 潜在问题

### Context 强制更新策略

## 组件间通信

### 父子组件通信

### 跨级组件通信

### 无嵌套关系组件通信

## 构建列表详情页

### 纯组件

### 数据接口类

### 状态组件

## 组件的生命周期

### 实例化  2页

### 存在期  2页

### 销毁期  2页

- 反模式（组件销毁后赋值）—— 实例说明

### 函数式组件生命周期  2页

# React 事件系统  24页

## 原生事件处理 【S】  6页

### DOM 事件绑定与处理  3页

- DOM 事件绑定与解绑。 1页
- 参数传递。 1页
- Event 对象。 1页

### 事件分发与委托  3页

- 事件冒泡与事件捕获。 2页
- 事件委托。 1页

## React 事件系统

### 事件绑定与响应

### 合成事件详解  3页

- 合成事件的实现机制。 1页
- 合成事件中引用原生事件。 1页
- 合成事件与原生事件的混用。 1页

### Event pooling  2页

- Event pooling 原理。 1页
- 实例介绍 Debounce 的实现。 1页

## React 事件应用实践

### 点击事件与外部触发关闭

### 表单事件与输入校验

### 鼠标事件与悬浮反馈

### 触摸事件与 onTouchTap

- 介绍移动点击事件；Touch Events 原理。 1页
- Tap 事件与 300ms 延迟。 1页
- 介绍 onTouchTap 库的使用。 1页

### 加载事件与图片懒加载

# React 动画

## CSS 动画

- CSS3动画概述。 1页

### Transition 与 Transform

- Transition 基本语法。 1页
- Transform 基本语法。 1页

### Animation 动画

- KeyFrame 详解。 1页
- 常见动画库。 1页

### 基于 Scale 的自适应容器

## React 动画

### React Transition

- React Transition 的设计及用法。

### React CSS Transition

- React CSS Transition 的设计及用法。

### React 动画库

- react-motion。2页

### 图片轮播组件

# React 路由

## 单页应用路由

### History API

### hash

## React Router 概述

### 声明式路由

- 介绍 React Router 的思想与声明式路由

- React Router 简单示例

### 非 React Router 路由方案

### History

- 介绍 hashHistory,2页
- 介绍 browserHistory，2页

## 路由配置与匹配

### 路由配置

- 添加默认路由，1页
- 将 UI 与 URL 解耦，1页
- 重定向路由，1页
- NamedComponent:命名组件，1页

### 动态路由

### 路由匹配

- Nesting，1页
- Path Syntax:路径表达式，1页
- Precedence:优先级，1页
- Params:参数，1页
- Route Parameters，1页
- Query String Parameters:查询参数，1页

## 路由控制

### 命令式跳转

- 组件内利用 HOC 方式命令跳转，1页
- 组件化路由，1页

### 权限控制

### 跳转确认

- 跳转前确认，1页

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

- 全局环境配置。 1页
- 代码压缩。 1页
- gzip 压缩。 1页

### 版本控制

- hash 处理。 1页
- 版本控制。 1页

# NodeJS

## NodeJS 初窥

### 认识 NodeJS 

### 回调与事件

### 模块化驱动开发

## 简单 HTTP 服务器

### 再谈 NPM
- 介绍 npm link
- 介绍 NPM 中 dependencies、devDependencies 以及 peerDependencies 区别

### createServer

### 在 Chrome 中调试 NodeJS 应用

### 基于 WebSocket 的实时通信
- 介绍 Socket.io 的基本使用

## Express

## NodeJS 工程实践

### 项目结构

### 吞吐量优化

# GUI 应用程序架构变迁

## MV* 5页

- 介绍 MV* 模式的共有特征 1页

### MVC:巨石型控制器

- MVC 基础。 1页
- Observer Pattern。 1页 

### MVP:视图与模型的解耦

- MVP 基础概念。 1页
- Supervising Controller MVP。 1页

### MVVM:数据绑定与无状态视图

- MVVM 基本概念介绍。 1页

## Flux

### 双向绑定的缺陷

### Flux 基本概念

### Flux 组成部分

- Dispatcher
- Action
- Store
- 控制视图

# MobX:响应式状态管理

## MobX 初探

### 创建与监听

- observable 函数与注解。
- computed 详解。
- autorun。

### Observable Types

- objects。
- arrays。
- maps。
- boxed values。

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

- JavaScript 静态类型校验优势 1页

- TypeScript 概述与 Flow 对比 1页

- 静态类型校验的考量 1页

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
- 局部状态
- 外部状态
- 多组件状态交互

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
