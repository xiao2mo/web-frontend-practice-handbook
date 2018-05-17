![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/6/1/think-react.jpg)

# [现代 Web 开发--React 篇](https://parg.co/UaY)

本篇的首要目标即是以 React 为核心的技术体系为主线，为读者构建完整的前端技术知识体系，探讨前端工程化的思想，并且能使不同技术水准的读者都有所得。

# 前言

近年来，随着浏览器性能的提升与移动互联网浪潮的汹涌而来，Web 前端开发进入了高歌猛进，日新月异的时代。这是最好的时代，我们永远在前行，这也是最坏的时代，无数的前端开发框架、技术体系争妍斗艳，让开发者们陷入困惑，乃至于无所适从。Web 前端开发可以追溯于 1991 年蒂姆·伯纳斯-李公开提及 HTML 描述，而后 1999 年 W3C 发布 HTML4 标准，这个阶段主要是 B/S 架构，没有所谓的前端开发概念，网页只不过是后端工程师的顺手之作，服务端渲染是主要的数据传递方式。接下来的几年间随着互联网的发展与 REST 等架构标准的提出，前后端分离与富客户端的概念日渐为人认同，我们需要在语言与基础的 API 上进行扩充，这个阶段出现了以 jQuery 为代表的一系列前端辅助工具。

2009 年以来，智能手机开发普及，移动端大浪潮势不可挡，SPA 单页应用的设计理念也大行其道，相关联的前端模块化、组件化、响应式开发、混合式开发等等技术需求甚为迫切。这个阶段催生了 Angular 1、Ionic 等一系列优秀的框架以及 AMD、CMD、UMD 与 RequireJS、SeaJS 等模块标准与加载工具，前端工程师也成为了专门的开发领域，拥有独立于后端的技术体系与架构模式。

而近两年间随着 Web 应用复杂度的提升、团队人员的扩充、用户对于页面交互友好与性能优化的需求，我们需要更加优秀灵活的开发框架来协助我们更好的完成前端开发。这个阶段涌现出了很多关注点相对集中、设计理念更为优秀的框架，譬如 React、Vue.js、Angular 2 等组件框架允许我们以声明式编程来替代以 DOM 操作为核心的命令式编程，加快了组件的开发速度，并且增强了组件的可复用性与可组合性。而遵循函数式编程的 Redux 与借鉴了响应式编程理念的 MobX 都是非常不错的状态管理辅助框架，辅助开发者将业务逻辑与视图渲染剥离，更为合理地划分项目结构，更好地贯彻单一职责原则与提升代码的可维护性。在项目构建工具上，以 Grunt、Gulp 为代表的任务运行管理与以 Webpack、Rollup、JSPM 为代表的项目打包工具各领风骚，帮助开发者更好的搭建前端构建流程，自动化地进行预处理、异步加载、Polyfill、压缩等操作。

总结而言，目前前端工具化已经进入到了非常繁荣的时代，而很多前端开发者也甚为苦恼，疲于学习。本书的首要目标即是以 React 为核心的技术体系为主线，介绍目前前端开发的基本概念，帮助初级前端开发者搭建前端知识体系，能够迅速进入前端开发的工作中。而蕴藏在工具化之中的是抽象而出的设计理念与编程范式，总结而言即是对于前端工程化的思考。工具的变革会非常迅速，很多优秀的工具可能都只是历史长河中的一朵浪花，而总结而出的工程化思维则会恒久长存。本书希望为读者构建完整的前端技术体系概念，并且能使不同技术水准的读者都有所得：

(1)希望对于没有经验的开发者能够在本书选定的最短路径上快速成为一名合格的能够利用 React 快速开发 Web 应用的现代前端开发者。每一小节都会讲解最基础的语法或者使用要点，但是不会长篇大论地介绍语法细节这些应该查看文档的内容。通过简单的示例快速上手之后，笔者会介绍很多工程当中的具体实践。可能刚入门的开发者并不能理解这些实践的意义或者价值，但是首先保证能用，而后在自己的实践中慢慢回味，逐渐明了。

(2)而对于有一定前端开发经验的开发者，本书能够帮你梳理现代纷繁复杂的前端开发状况，探寻以 React 为代表的百花齐放的工具库背后蕴藏的设计理念与编程范式，最终融会贯通，形成自己的前端工程化思想与体系。

# 目录

* [React Native](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/React%20Native/Index.md)
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/React%20Native/Index.md): React Native
  * [列表优化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/React%20Native/%E5%88%97%E8%A1%A8%E4%BC%98%E5%8C%96.md): 列表优化
  * [原生架构浅析](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/React%20Native/%E5%8E%9F%E7%94%9F%E6%9E%B6%E6%9E%84%E6%B5%85%E6%9E%90.md):
  * [开发环境搭建与调试](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/React%20Native/%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E4%B8%8E%E8%B0%83%E8%AF%95.md):
  * [组件基础](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/React%20Native/%E7%BB%84%E4%BB%B6%E5%9F%BA%E7%A1%80.md): 组件基础
  * [路由导航](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/React%20Native/%E8%B7%AF%E7%94%B1%E5%AF%BC%E8%88%AA.md): 路由导航
* [React Router](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/React%20Router/Index.md)
  * [概念与设计](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/React%20Router/%E6%A6%82%E5%BF%B5%E4%B8%8E%E8%AE%BE%E8%AE%A1.md): React Router
  * [路由控制与切换](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/React%20Router/%E8%B7%AF%E7%94%B1%E6%8E%A7%E5%88%B6%E4%B8%8E%E5%88%87%E6%8D%A2.md): 路由控制与切换
  * [路由配置与匹配](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/React%20Router/%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE%E4%B8%8E%E5%8C%B9%E9%85%8D.md): 路由配置与匹配
* [Ueact](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/Ueact/Index.md)
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/Ueact/Index.md):
  * [VirtualDOM 算法详解与实现](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/Ueact/VirtualDOM%20%E7%AE%97%E6%B3%95%E8%AF%A6%E8%A7%A3%E4%B8%8E%E5%AE%9E%E7%8E%B0.md): VirtualDOM 算法详解与实现
  * [基于 JSX 的动态数据绑定](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/Ueact/%E5%9F%BA%E4%BA%8E%20JSX%20%E7%9A%84%E5%8A%A8%E6%80%81%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A.md): 基于 JSX 的动态数据绑定
  * [组件系统设计](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/Ueact/%E7%BB%84%E4%BB%B6%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1.md):
* [事件系统](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/%E4%BA%8B%E4%BB%B6%E7%B3%BB%E7%BB%9F/Index.md)
  * [事件应用实践](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E4%BA%8B%E4%BB%B6%E7%B3%BB%E7%BB%9F/%E4%BA%8B%E4%BB%B6%E5%BA%94%E7%94%A8%E5%AE%9E%E8%B7%B5.md): 浏览器监听
  * [合成事件绑定](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E4%BA%8B%E4%BB%B6%E7%B3%BB%E7%BB%9F/%E5%90%88%E6%88%90%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A.md): 事件绑定与参数传递
  * [拖拽效果实现](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E4%BA%8B%E4%BB%B6%E7%B3%BB%E7%BB%9F/%E6%8B%96%E6%8B%BD%E6%95%88%E6%9E%9C%E5%AE%9E%E7%8E%B0.md): 拖拽事件
* [内部原理](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86/Index.md)
  * [Fiber 解析](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86/Fiber%20%E8%A7%A3%E6%9E%90.md):
  * [setState](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86/setState.md): React setState
  * [事务机制](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86/%E4%BA%8B%E5%8A%A1%E6%9C%BA%E5%88%B6.md):
  * [源码概览](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86/%E6%BA%90%E7%A0%81%E6%A6%82%E8%A7%88.md): React 源码概览
* [初窥](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/%E5%88%9D%E7%AA%A5/Index.md)
  * [JSX](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E5%88%9D%E7%AA%A5/JSX.md): JSX 语法
  * [create-react-app](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E5%88%9D%E7%AA%A5/create-react-app.md): 基于 create-react-app 的快速开发与应用调试
  * [思维模式](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E5%88%9D%E7%AA%A5/%E6%80%9D%E7%BB%B4%E6%A8%A1%E5%BC%8F.md): React 思维模式：函数式编程
  * [设计理念](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E5%88%9D%E7%AA%A5/%E8%AE%BE%E8%AE%A1%E7%90%86%E5%BF%B5.md): React 设计理念：专注于视图层的组件库
* [动画](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/%E5%8A%A8%E7%94%BB/Index.md)
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E5%8A%A8%E7%94%BB/Index.md):
  * [TransitionGroup](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E5%8A%A8%E7%94%BB/TransitionGroup.md):
* [序](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/%E5%BA%8F/Index.md)
  * [Outline](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E5%BA%8F/Outline.md): 前言
  * [申请表](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E5%BA%8F/%E7%94%B3%E8%AF%B7%E8%A1%A8.md): 作者简介
* [性能优化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/Index.md)
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/Index.md):
  * [代码分割与异步加载](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/%E4%BB%A3%E7%A0%81%E5%88%86%E5%89%B2%E4%B8%8E%E5%BC%82%E6%AD%A5%E5%8A%A0%E8%BD%BD.md): 代码分割与异步加载
  * [异步碎片化状态更新](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/%E5%BC%82%E6%AD%A5%E7%A2%8E%E7%89%87%E5%8C%96%E7%8A%B6%E6%80%81%E6%9B%B4%E6%96%B0.md): 异步碎片化状态更新
  * [组件优化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/%E7%BB%84%E4%BB%B6%E4%BC%98%E5%8C%96.md): React 组件性能优化
* [服务端渲染](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/Index.md)
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/Index.md): 服务端渲染
  * [基于 Express 的渲染服务器](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/%E5%9F%BA%E4%BA%8E%20Express%20%E7%9A%84%E6%B8%B2%E6%9F%93%E6%9C%8D%E5%8A%A1%E5%99%A8.md): renderToString
  * [基于 Next.js 快速搭建渲染服务器](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/%E5%9F%BA%E4%BA%8E%20Next.js%20%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA%E6%B8%B2%E6%9F%93%E6%9C%8D%E5%8A%A1%E5%99%A8.md):
  * [服务端渲染性能浅析](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93%E6%80%A7%E8%83%BD%E6%B5%85%E6%9E%90.md): 服务端渲染性能浅析
* [测试](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/%E6%B5%8B%E8%AF%95/Index.md)
  * [单元测试](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E6%B5%8B%E8%AF%95/%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95.md):
  * [组件测试](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E6%B5%8B%E8%AF%95/%E7%BB%84%E4%BB%B6%E6%B5%8B%E8%AF%95.md):
  * [自动化端到端测试](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E6%B5%8B%E8%AF%95/%E8%87%AA%E5%8A%A8%E5%8C%96%E7%AB%AF%E5%88%B0%E7%AB%AF%E6%B5%8B%E8%AF%95.md):
* [状态管理](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86/Index.md)
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86/Index.md):
  * [基于 MobX 的 React 状态管理](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86/%E5%9F%BA%E4%BA%8E%20MobX%20%E7%9A%84%20React%20%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86.md): 使用 MobX 存储应用状态
  * [基于 Vue.js 的 React 状态管理](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86/%E5%9F%BA%E4%BA%8E%20Vue.js%20%E7%9A%84%20React%20%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86.md): Introduction
* [类 React 库](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/%E7%B1%BB%20React%20%E5%BA%93/Index.md)
  * [Inferno](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%B1%BB%20React%20%E5%BA%93/Inferno.md):
  * [Preact](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%B1%BB%20React%20%E5%BA%93/Preact.md): Preact
* [类型系统](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/%E7%B1%BB%E5%9E%8B%E7%B3%BB%E7%BB%9F/Index.md)
  * [Flow 静态类型检测](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%B1%BB%E5%9E%8B%E7%B3%BB%E7%BB%9F/Flow%20%E9%9D%99%E6%80%81%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%B5%8B.md):
* [组件基础](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6%E5%9F%BA%E7%A1%80/Index.md)
  * [DOM 操作](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6%E5%9F%BA%E7%A1%80/DOM%20%E6%93%8D%E4%BD%9C.md): React 组件中 DOM 操作
  * [生命周期与异常边界](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6%E5%9F%BA%E7%A1%80/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%B8%8E%E5%BC%82%E5%B8%B8%E8%BE%B9%E7%95%8C.md): React 组件的生命周期与异常边界
  * [组件声明](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6%E5%9F%BA%E7%A1%80/%E7%BB%84%E4%BB%B6%E5%A3%B0%E6%98%8E.md): React 组件声明与作用域绑定
* [组件数据流](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6%E6%95%B0%E6%8D%AE%E6%B5%81/Index.md)
  * [Context](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6%E6%95%B0%E6%8D%AE%E6%B5%81/Context.md): Context
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6%E6%95%B0%E6%8D%AE%E6%B5%81/Index.md): 组件数据流
  * [Props](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6%E6%95%B0%E6%8D%AE%E6%B5%81/Props.md): React Props
  * [State](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6%E6%95%B0%E6%8D%AE%E6%B5%81/State.md):
  * [内部状态管理与组件间通信](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6%E6%95%B0%E6%8D%AE%E6%B5%81/%E5%86%85%E9%83%A8%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E4%B8%8E%E7%BB%84%E4%BB%B6%E9%97%B4%E9%80%9A%E4%BF%A1.md): 内部状态管理与组件间通信
* [组件样式](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F/Index.md)
  * [CSS-in-JS](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F/CSS-in-JS.md):
  * [样式定义与引入](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F/%E6%A0%B7%E5%BC%8F%E5%AE%9A%E4%B9%89%E4%B8%8E%E5%BC%95%E5%85%A5.md): 样式定义与引入
* [组件范式](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6%E8%8C%83%E5%BC%8F/Index.md)
  * [列表组件](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6%E8%8C%83%E5%BC%8F/%E5%88%97%E8%A1%A8%E7%BB%84%E4%BB%B6.md): 列表组件
  * [表单组件](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6%E8%8C%83%E5%BC%8F/%E8%A1%A8%E5%8D%95%E7%BB%84%E4%BB%B6.md): 表单组件
* [设计模式与样式指南](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/React-And-Frontend-Engineering/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E4%B8%8E%E6%A0%B7%E5%BC%8F%E6%8C%87%E5%8D%97/Index.md)
  * [函数式 React 开发](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E4%B8%8E%E6%A0%B7%E5%BC%8F%E6%8C%87%E5%8D%97/%E5%87%BD%E6%95%B0%E5%BC%8F%20React%20%E5%BC%80%E5%8F%91.md): 函数式 React 开发
  * [组件分割与解耦](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E4%B8%8E%E6%A0%B7%E5%BC%8F%E6%8C%87%E5%8D%97/%E7%BB%84%E4%BB%B6%E5%88%86%E5%89%B2%E4%B8%8E%E8%A7%A3%E8%80%A6.md): React 组件分割与解耦
  * [组件驱动开发](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E4%B8%8E%E6%A0%B7%E5%BC%8F%E6%8C%87%E5%8D%97/%E7%BB%84%E4%BB%B6%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91.md): 组件驱动开发
  * [高阶组件](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/React-And-Frontend-Engineering/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E4%B8%8E%E6%A0%B7%E5%BC%8F%E6%8C%87%E5%8D%97/%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6.md):
