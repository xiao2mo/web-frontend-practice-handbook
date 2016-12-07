> 本文从属于笔者的[Web 前端入门与最佳实践](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices)。

前几日偶然接到某出版社编辑大大的私信，邀约看看能否整理出版一本前端方面的书籍，笔者再三确定即使一本卖不出去（虽然自己肯定会买至少一本，或者多买些屯着代替那啥）也不会被打死之后着手准备大纲具体的章节。笔者还是很惶恐的，毕竟自己的水自己知道。本文是为书准备的大纲，不过也是笔者心目中的现代前端开发者学习路线图，即使最终无法出版笔者也会默默整理出来，希望能帮助到些许童鞋。

不过既然有那么些概率出版，也很欢迎所有大大给予指教，对于章节内容的选择，章节目录的顺序，大家觉得还想聊聊的内容都可以欢迎留言或者邮箱：384924552@qq.com。本文的永久地址为:[]()。另外笔者前几日收到某个跨年演讲邀请，虽然这几天为了毕业论文和项目被虐出翔没准备，还是欢迎有兴趣的搬个板凳瞅瞅，我给大家讲段子。



# 前言

本书囊括了笔者五年来在前端工程领域的实践总结，笔者希望对于不同等级的开发者都能有所收获。本书最核心的目标:
- 希望对于没有经验的开发者能够在本书选定的最短路径上快速成为一名合格的现代前端开发者。每一小节都会讲解最基础的语法或者使用要点，但是不会长篇大论地介绍语法细节这些应该查看文档的内容。通过简单的示例快速上手之后，笔者会介绍很多工程当中的具体实践。可能刚入门的开发者并不能理解这些实践的意义或者价值，但是首先保证能用，而后在自己的实践中慢慢回味，逐渐明了。

- 而对于有一定前端开发经验的开发者，本书能够帮你梳理现代纷繁复杂的前端开发状况，探寻百花齐放的工具库背后蕴藏的设计理念与编程范式，最终融会贯通，形成自己的前端工程化思想与体系。

本书最大的优势在于形成了完整的知识体系结构，让你合理归纳自己学到的知识，将知识放在它该在的地方。另外笔者想强调的是，无论React还是Vue或者Angular2都是非常优秀的前端框架，使用哪个框架还是属于术的范畴。本书虽然立足于React，但是其中蕴含的设计模式与工程架构可以通用于任何框架。笔者也着力于不希望受到某个具体框架的太多的束缚，毕竟在这个日新月异的前端世界，说不准哪天就落于人后了。

# 序

# 第一部分 初窥门径，看山是山

# 前端基础

## Hyper Text Markup Language

### HTML语法基础

### Semantic HTML

### H5

## CSS

### CSS 语法基础

### 盒模型

### 基于Flexbox的网格布局

### SCSS

### CSS 工程实践

## JavaScript

### JavaScript 语法基础

本章节对于JavaScript语法基础进行简单介绍，涉及JavaScript/ECMAScript语言的衍化过程，基本的变量定义，变量赋值，变量作用域，常见类型与格式的判断以及转换。

### JavaScript 数据结构

本章节包含对于基本数值类型、字符串类型、时间与日期类型、数组类型的操作与解释。

### JavaScript 控制流

### JavaScript 函数

### JavaScript 类与对象

本部分包含对于JavaScript 中Class的使用以及常见的单例模式的编写介绍。

## DOM

### 元素选择与操作

### 事件响应

### Ajax

### 客户端存储

## 简单的网页设计规范

本部分会以一步一步来美化网站为例将上述学到的HTML、CSS与JavaScript的知识加以应用。

# 常用的前端工具库

## jQuery

### jQuery 基础

### jQuery 小窍门

### jQuery Plugins

### 你并不需要jQuery

## Lodash

### Lodash 基础

### 你并不需要Lodash

## Pattern Library

### jQuery UI

### BootStrap

# Webpack

## Webpack语法基础

## 常用的Webpack插件

## Webpack 代码分割

## Webpack

# 第三章 React 初探

## 数据流驱动的页面

本部分主要介绍React设计思想，从命令式编程到声明式编程的变化，及以jQuery与React实现相同功能的例子对比。

##   搭建你的脚手架

### create-react-app

### 基于Webpack2的完整脚手架介绍

##   React组件

### 组件声明

### 组件生命周期

### 组件样式

##   React 事件交互

### React 事件绑定与处理

### React 拖拽

## 第五节 React Router

## 第六节 React 动画

# 第三章 React 技术栈

## Redux

### Flux

### Redux设计思想

### 简单的Redux实例

## MobX

### MobX 设计思想

### Observable 

### 简单的MobX实例

# 第二部分 登堂入室，看山不是山

# 第五章 深入JavaScript工程实践

## 基于Flow 的 JavaScript 类型检查

## JavaScript 函数式编程

## JavaScript 异步编程

### Promise

### Generator

### Async/Await

## JavaScript 面向对象

### 琢磨不透的this

### 原型链与继承

### JavaScript 类的几种实现方式

## JavaScript 数据绑定

### 脏检测

### ES6 Proxy

## JavaScript 性能优化与样式规范

### 变量

### 数据类型

### 函数

# React工程实践

## React 设计模式与样式指南

### High-Order Component

### Stateless Functional Component

### Pretty Component

## React 性能优化

## React 组件测试

### Jest

### Enzyme

## 第五节 React 打包发布

### 包体压缩

### 避免XSS漏洞

## 基于React的Pattern Library

### Material UI

### antd

# 第五章 深入React内部原理

## 简单的Virtual DOM实现

## React Diff算法

## React setState

## React Fiber

## Virtual DOM Alternatives

# 前端状态管理

## Redux的得与失

## 渐进的前端状态管理

## 常见的状态管理模式

## 合理的状态设置

# 第七章 前端性能优化

## 浏览器渲染原理

## 前端性能评测

## 资源加载

## 首页与关键路径

## 渲染策略

# 第八章 前端质量保障

# NodeJS

## NodeJS 初窥

## 常用NodeJS框架

### Express

### Koa

## 服务端渲染

## Electron

# 移动开发

##  Mobile First

##   React Native

##   微信小程序

# 第三部分 融会贯通，看山还是山

# GUI应用程序架构变迁

## MVC

## MVP&MVVM

## Flux Unidirectional Data Flow

# REST 表现层状态转化

##   HTTP

### HTTP 协议基础

### HTTP 请求与响应

### HTTP 缓存

##   RESTful API

##   RESTful API 最佳实践

##   REST的不足与GraphQL

# 第三章 前端工程化

##   前后端分离与全栈

##   合理的使用工具

##   渐进式的工程架构

##  组件化与Web Components

##  模块系统

## 微服务与微前端

#   数据可视化

##   数据可视化范式

##   常见的数据可视化库

### ECharts

### D3.js

# Web 安全基础

# 第七章 Web的未来

##   WebAssembly
##   WebVR
