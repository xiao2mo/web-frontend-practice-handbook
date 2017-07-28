
# React And FrontEnd Engineering
Copyright © 2017 王下邀月熊
![](https://camo.githubusercontent.com/322fefce6b2264d9ff2ad35ea5dcd4622e437b04/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d434325323042592d2d4e432d2d5341253230342e302d626c75652e737667)
![](https://camo.githubusercontent.com/d4e0f63e9613ee474a7dfdc23c240b9795712c96/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d627269676874677265656e2e737667)

本系列文章从属于[ React 与前端工程化实践](https://parg.co/bIn)一书，本书的首要目标即是以 React 为核心的技术体系为主线，为读者构建完整的前端技术知识体系，探讨前端工程化的思想，并且能使不同技术水准的读者都有所得；更多 React 技术栈相关学习资料参考[ React 学习与实践资料索引](https://parg.co/bM1)以及[ Webpack 学习与资料索引](https://parg.co/bVs)。 

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/6/1/think-react.jpg)

# 前言 
近年来，随着浏览器性能的提升与移动互联网浪潮的汹涌而来，Web 前端开发进入了高歌猛进，日新月异的时代。这是最好的时代，我们永远在前行，这也是最坏的时代，无数的前端开发框架、技术体系争妍斗艳，让开发者们陷入困惑，乃至于无所适从。Web 前端开发可以追溯于 1991 年蒂姆·伯纳斯-李公开提及 HTML 描述，而后 1999 年 W3C 发布 HTML4 标准，这个阶段主要是 B/S 架构，没有所谓的前端开发概念，网页只不过是后端工程师的顺手之作，服务端渲染是主要的数据传递方式。接下来的几年间随着互联网的发展与 REST 等架构标准的提出，前后端分离与富客户端的概念日渐为人认同，我们需要在语言与基础的 API 上进行扩充，这个阶段出现了以 jQuery 为代表的一系列前端辅助工具。2009 年以来，智能手机开发普及，移动端大浪潮势不可挡，SPA 单页应用的设计理念也大行其道，相关联的前端模块化、组件化、响应式开发、混合式开发等等技术需求甚为迫切。这个阶段催生了 Angular 1、Ionic 等一系列优秀的框架以及 AMD、CMD、UMD 与RequireJS、SeaJS 等模块标准与加载工具，前端工程师也成为了专门的开发领域，拥有独立于后端的技术体系与架构模式。而近两年间随着 Web 应用复杂度的提升、团队人员的扩充、用户对于页面交互友好与性能优化的需求，我们需要更加优秀灵活的开发框架来协助我们更好的完成前端开发。这个阶段涌现出了很多关注点相对集中、设计理念更为优秀的框架，譬如 React、Vue.js、Angular 2 等组件框架允许我们以声明式编程来替代以 DOM 操作为核心的命令式编程，加快了组件的开发速度，并且增强了组件的可复用性与可组合性。而遵循函数式编程的Redux 与借鉴了响应式编程理念的MobX都是非常不错的状态管理辅助框架，辅助开发者将业务逻辑与视图渲染剥离，更为合理地划分项目结构，更好地贯彻单一职责原则与提升代码的可维护性。在项目构建工具上，以 Grunt、Gulp 为代表的任务运行管理与以 Webpack、Rollup、JSPM 为代表的项目打包工具各领风骚，帮助开发者更好的搭建前端构建流程，自动化地进行预处理、异步加载、Polyfill、压缩等操作。
总结而言，目前前端工具化已经进入到了非常繁荣的时代，而很多前端开发者也甚为苦恼，疲于学习。本书的首要目标即是以 React 为核心的技术体系为主线，介绍目前前端开发的基本概念，帮助初级前端开发者搭建前端知识体系，能够迅速进入前端开发的工作中。而蕴藏在工具化之中的是抽象而出的设计理念与编程范式，总结而言即是对于前端工程化的思考。工具的变革会非常迅速，很多优秀的工具可能都只是历史长河中的一朵浪花，而总结而出的工程化思维则会恒久长存。本书希望为读者构建完整的前端技术体系概念，并且能使不同技术水准的读者都有所得： 
（1）希望对于没有经验的开发者能够在本书选定的最短路径上快速成为一名合格的能够利用 React 快速开发 Web 应用的现代前端开发者。每一小节都会讲解最基础的语法或者使用要点，但是不会长篇大论地介绍语法细节这些应该查看文档的内容。通过简单的示例快速上手之后，笔者会介绍很多工程当中的具体实践。可能刚入门的开发者并不能理解这些实践的意义或者价值，但是首先保证能用，而后在自己的实践中慢慢回味，逐渐明了。 
（2）而对于有一定前端开发经验的开发者，本书能够帮你梳理现代纷繁复杂的前端开发状况，探寻以 React 为代表的百花齐放的工具库背后蕴藏的设计理念与编程范式，最终融会贯通，形成自己的前端工程化思想与体系。 


## 技术栈版本说明
- React 16.0.0+
- React Router v4+
- Webpack 3+


# 目录
> 为了方便检索目录，原书的章-节-小节三级结构以一级目录-列表键-列表项目方式呈现；另外由于本书在不断修订中，很多章节的链接可能失效，建议直接浏览文件目录以浏览对应章节。

- [React 初窥](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E5%88%9D%E7%AA%A5/index.md)
  - [React 思维模式](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E5%88%9D%E7%AA%A5/React%20%E6%80%9D%E7%BB%B4%E6%A8%A1%E5%BC%8F.md)
  - [JSX](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E5%88%9D%E7%AA%A5/JSX.md)
  - [搭建 React 脚手架](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E5%88%9D%E7%AA%A5/%E6%90%AD%E5%BB%BA%20React%20%E8%84%9A%E6%89%8B%E6%9E%B6.md)
  - [Webpack](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E5%88%9D%E7%AA%A5/Webpack.md)

- [React 组件](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E7%BB%84%E4%BB%B6/index.md)
  - [组件化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E7%BB%84%E4%BB%B6/%E7%BB%84%E4%BB%B6%E5%8C%96.md)
  - [组件声明](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E7%BB%84%E4%BB%B6/%E7%BB%84%E4%BB%B6%E5%A3%B0%E6%98%8E.md)
  - [列表组件](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E7%BB%84%E4%BB%B6/%E5%88%97%E8%A1%A8%E7%BB%84%E4%BB%B6.md)

- [React 组件样式](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F/index.md)
  - [CSS 样式](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F/CSS%20%E6%A0%B7%E5%BC%8F.md)
  - [CSS-in-JS](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F/CSS-in-JS.md)
  - [Flexbox](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F/Flexbox.md)

- [React 组件数据流]()
  - [Props](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/%E7%BB%84%E4%BB%B6%E7%9A%84%E6%95%B0%E6%8D%AE%E6%B5%81/Props.md)
  - [State](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/%E7%BB%84%E4%BB%B6%E7%9A%84%E6%95%B0%E6%8D%AE%E6%B5%81/State.md)
  - [Context](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/%E7%BB%84%E4%BB%B6%E7%9A%84%E6%95%B0%E6%8D%AE%E6%B5%81/Context.md)
  - [组件间通信](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/%E7%BB%84%E4%BB%B6%E7%9A%84%E6%95%B0%E6%8D%AE%E6%B5%81/%E7%BB%84%E4%BB%B6%E9%97%B4%E9%80%9A%E4%BF%A1.md)

- [React 事件系统]()
  - [事件应用实践](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E4%BA%8B%E4%BB%B6%E7%B3%BB%E7%BB%9F/%E4%BA%8B%E4%BB%B6%E5%BA%94%E7%94%A8%E5%AE%9E%E8%B7%B5.md)
  - [原生事件处理](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E4%BA%8B%E4%BB%B6%E7%B3%BB%E7%BB%9F/%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86.md)

- [React 动画]()
  - [CSS 动画](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E5%8A%A8%E7%94%BB/CSS%20%E5%8A%A8%E7%94%BB.md)
  - [React 动画](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E5%8A%A8%E7%94%BB/React%20%E5%8A%A8%E7%94%BB.md)

- [React 路由]()
 - [单页应用路由](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E8%B7%AF%E7%94%B1/%E5%8D%95%E9%A1%B5%E5%BA%94%E7%94%A8%E8%B7%AF%E7%94%B1.md)
  - [React Router 概念与设计](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E8%B7%AF%E7%94%B1/React%20Router%20%E6%A6%82%E5%BF%B5.md)
  - [路由配置与匹配](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E8%B7%AF%E7%94%B1/%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE%E4%B8%8E%E5%8C%B9%E9%85%8D.md)
  - [路由控制与切换](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E8%B7%AF%E7%94%B1/%E8%B7%AF%E7%94%B1%E6%8E%A7%E5%88%B6.md)

- [Webpack 工程实战]()
  - [资源处理]()
  - [代码分割与异步加载](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/Webpack%20%E5%B7%A5%E7%A8%8B%E5%AE%9E%E6%88%98/%E4%BB%A3%E7%A0%81%E5%88%86%E5%89%B2%E4%B8%8E%E5%BC%82%E6%AD%A5%E5%8A%A0%E8%BD%BD.md)
  - [发布到生产环境]()

- [NodeJS]()
  - [HTTP 协议与简单 HTTP 服务器](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/NodeJS/HTTP%20%E5%8D%8F%E8%AE%AE%E4%B8%8E%E7%AE%80%E5%8D%95%20HTTP%20%E6%9C%8D%E5%8A%A1%E5%99%A8.md)
  - [NodeJS 初窥](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/NodeJS/NodeJS%20%E5%88%9D%E7%AA%A5.md)
  - [NodeJS 工程实践](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/NodeJS/NodeJS%20%E5%B7%A5%E7%A8%8B%E5%AE%9E%E8%B7%B5.md)
  - [使用 Express 框架进行服务端开发](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/NodeJS/%E4%BD%BF%E7%94%A8%20Express%20%E6%A1%86%E6%9E%B6%E8%BF%9B%E8%A1%8C%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%BC%80%E5%8F%91.md)

- [GUI 应用程序架构变迁]()
  - [MV*](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/GUI%20%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E6%9E%B6%E6%9E%84%E5%8F%98%E8%BF%81/MV*.md)
  - [Flux](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/GUI%20%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E6%9E%B6%E6%9E%84%E5%8F%98%E8%BF%81/Flux.md)

- [React 设计模式与样式指南](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E5%B7%A5%E7%A8%8B%E5%AE%9E%E8%B7%B5/React%20%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E4%B8%8E%E6%A0%B7%E5%BC%8F%E6%8C%87%E5%8D%97.md)
  - [函数式 React 开发]()
  - [React 高阶组件]()
  - [React 组件分割与解耦]()
  - [React 样式指南]() 

- [MobX 响应式状态管理]()
  - [MobX 与 React 的完美结合](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/MobX%20%E5%93%8D%E5%BA%94%E5%BC%8F%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86/MobX%20%E4%B8%8E%20React%20%E7%9A%84%E5%AE%8C%E7%BE%8E%E7%BB%93%E5%90%88.md)
  - [MobX 中的 observable](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/MobX%20%E5%93%8D%E5%BA%94%E5%BC%8F%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86/MobX%20%E4%B8%AD%E7%9A%84%20observable.md)
  - [响应式编程与 MobX](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/MobX%20%E5%93%8D%E5%BA%94%E5%BC%8F%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86/%E5%93%8D%E5%BA%94%E5%BC%8F%E7%BC%96%E7%A8%8B%E4%B8%8E%20MobX.md)
  - [神奇的 autorun](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/MobX%20%E5%93%8D%E5%BA%94%E5%BC%8F%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86/%E7%A5%9E%E5%A5%87%E7%9A%84%20autorun.md)

- [Redux]()
  - [Flux 的不足与 Redux 三大原则]()
  - [Redux 基本语法]()
  - [Redux 异步处理](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/Redux/Redux%20%E5%BC%82%E6%AD%A5%E5%A4%84%E7%90%86.md)
  - [Redux 工程实践]()

- [React 服务端渲染]()
  - [服务端渲染概述](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93%E6%A6%82%E8%BF%B0.md)
  - [基于 Express 的渲染服务器](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/%E5%9F%BA%E4%BA%8E%20Express%20%E7%9A%84%E6%B8%B2%E6%9F%93%E6%9C%8D%E5%8A%A1%E5%99%A8.md)
  - [使用 Next.js 快速搭建渲染服务器](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/%E5%9F%BA%E4%BA%8E%20Next.js%20%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA%E6%B8%B2%E6%9F%93%E6%9C%8D%E5%8A%A1%E5%99%A8.md)
  - [服务端渲染性能浅析](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/React%20%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93%E6%80%A7%E8%83%BD%E6%B5%85%E6%9E%90.md)

- [React 工程实践]()
  - [Flow 静态类型检测]()
  - [React 性能优化]()
  - [基于 React 的模式库]()

- [前端质量保障](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/%E5%89%8D%E7%AB%AF%E8%B4%A8%E9%87%8F%E4%BF%9D%E9%9A%9C/index.md)
  - [调试与错误追踪]()
  - [单元测试](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/%E5%89%8D%E7%AB%AF%E8%B4%A8%E9%87%8F%E4%BF%9D%E9%9A%9C/%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95.md)
  - [组件测试]()
  - [自动化端到端测试]()

- [深入 React 内部原理]()
  - [再谈 Virtual DOM]()
  - [React Diff 算法]()
  - [React setState]()
  - [React Fiber]()
  - [Preact]()

- [前端工程化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/React-And-FrontEnd-Engineering/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/index.md)
  - [前后端分离与全栈]()
  - [工具化与工程化]()
  - [状态管理]()
  - [微服务与微前端]()
  - [渐进式的工程架构]()

- [React Native](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/tree/master/Refer/React-And-FrontEnd-Engineering/React%20Native)
  - [开发环境搭建与调试]()
  - [组件基础]()
  - [路由导航]()
  - [列表优化]()
  - [原生架构浅析]()
