# 现代 Web 开发--Vue.js 篇

本系列文章从属于 [Vue.js 与前端工程化实践](https://parg.co/bWg)一书，本书的首要目标即是以  Vue.js 为核心的技术体系为主线，为读者构建完整的前端技术知识体系，探讨前端工程化的思想，并且能使不同技术水准的读者都有所得。

建议前置阅读[现代 Web 开发基础](https://parg.co/UHU)、[现代 Web 工程化实践](https://github.com/wxyyxc1992/Web-Series/)、 [现代 JavaScript 开发：语法基础与工程实践](https://parg.co/bxN)等。另外可以比照阅读  [React 与前端工程化实践](https://parg.co/bIn)  等。

# 前言

近年来，随着浏览器性能的提升与移动互联网浪潮的汹涌而来，Web 前端开发进入了高歌猛进，日新月异的时代。这是最好的时代，我们永远在前行，这也是最坏的时代，无数的前端开发框架、技术体系争妍斗艳，让开发者们陷入困惑，乃至于无所适从。Web 前端开发可以追溯于 1991 年蒂姆·伯纳斯-李公开提及 HTML 描述，而后 1999 年 W3C 发布 HTML4 标准，这个阶段主要是 B/S 架构，没有所谓的前端开发概念，网页只不过是后端工程师的顺手之作，服务端渲染是主要的数据传递方式。接下来的几年间随着互联网的发展与 REST 等架构标准的提出，前后端分离与富客户端的概念日渐为人认同，我们需要在语言与基础的 API 上进行扩充，这个阶段出现了以 jQuery 为代表的一系列前端辅助工具。

2009 年以来，智能手机开发普及，移动端大浪潮势不可挡，SPA 单页应用的设计理念也大行其道，相关联的前端模块化、组件化、响应式开发、混合式开发等等技术需求甚为迫切。这个阶段催生了 Angular 1、Ionic 等一系列优秀的框架以及 AMD、CMD、UMD 与 RequireJS、SeaJS 等模块标准与加载工具，前端工程师也成为了专门的开发领域，拥有独立于后端的技术体系与架构模式。

而近两年间随着 Web 应用复杂度的提升、团队人员的扩充、用户对于页面交互友好与性能优化的需求，我们需要更加优秀灵活的开发框架来协助我们更好的完成前端开发。这个阶段涌现出了很多关注点相对集中、设计理念更为优秀的框架，譬如 React、Vue.js、Angular 2 等组件框架允许我们以声明式编程来替代以 DOM 操作为核心的命令式编程，加快了组件的开发速度，并且增强了组件的可复用性与可组合性。而遵循函数式编程的 Redux 与借鉴了响应式编程理念的 MobX 都是非常不错的状态管理辅助框架，辅助开发者将业务逻辑与视图渲染剥离，更为合理地划分项目结构，更好地贯彻单一职责原则与提升代码的可维护性。在项目构建工具上，以 Grunt、Gulp 为代表的任务运行管理与以 Webpack、Rollup、JSPM 为代表的项目打包工具各领风骚，帮助开发者更好的搭建前端构建流程，自动化地进行预处理、异步加载、Polyfill、压缩等操作。

总结而言，目前前端工具化已经进入到了非常繁荣的时代，而很多前端开发者也甚为苦恼，疲于学习。本书的首要目标即是以  Vue.js  为核心的技术体系为主线，介绍目前前端开发的基本概念，帮助初级前端开发者搭建前端知识体系，能够迅速进入前端开发的工作中。而蕴藏在工具化之中的是抽象而出的设计理念与编程范式，总结而言即是对于前端工程化的思考。工具的变革会非常迅速，很多优秀的工具可能都只是历史长河中的一朵浪花，而总结而出的工程化思维则会恒久长存。本书希望为读者构建完整的前端技术体系概念，并且能使不同技术水准的读者都有所得：(1)希望对于没有经验的开发者能够在本书选定的最短路径上快速成为一名合格的能够利用  Vue.js  快速开发 Web 应用的现代前端开发者。每一小节都会讲解最基础的语法或者使用要点，但是不会长篇大论地介绍语法细节这些应该查看文档的内容。通过简单的示例快速上手之后，笔者会介绍很多工程当中的具体实践。可能刚入门的开发者并不能理解这些实践的意义或者价值，但是首先保证能用，而后在自己的实践中慢慢回味，逐渐明了。(2)而对于有一定前端开发经验的开发者，本书能够帮你梳理现代纷繁复杂的前端开发状况，探寻以  Vue.js  为代表的百花齐放的工具库背后蕴藏的设计理念与编程范式，最终融会贯通，形成自己的前端工程化思想与体系。

## 版权

![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg) ![](https://parg.co/bDm)

笔者所有文章遵循 [知识共享 署名-非商业性使用-禁止演绎 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh)，欢迎转载，尊重版权。如果觉得本系列对你有所帮助，欢迎给我家布丁买点狗粮(支付宝扫码)~

![](https://github.com/wxyyxc1992/OSS/blob/master/2017/8/1/Buding.jpg?raw=true)

# 目录

* [Vuex](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Vue-And-Frontend-Engineering/Vuex/Index.md)
  * [基本语法](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Vue-And-Frontend-Engineering/Vuex/%E5%9F%BA%E6%9C%AC%E8%AF%AD%E6%B3%95.md): Vuex 基本语法
* [初窥](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Vue-And-Frontend-Engineering/%E5%88%9D%E7%AA%A5/Index.md)
  * [vue-cli](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Vue-And-Frontend-Engineering/%E5%88%9D%E7%AA%A5/vue-cli.md): Vue.js 概述
  * [设计理念](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Vue-And-Frontend-Engineering/%E5%88%9D%E7%AA%A5/%E8%AE%BE%E8%AE%A1%E7%90%86%E5%BF%B5.md):
* [状态管理](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Vue-And-Frontend-Engineering/%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86/Index.md)
  * [基于 MobX 的 Vue.js 状态管理](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Vue-And-Frontend-Engineering/%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86/%E5%9F%BA%E4%BA%8E%20MobX%20%E7%9A%84%20Vue.js%20%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86.md):
* [组件](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Vue-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6/Index.md)
  * [类组件](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Vue-And-Frontend-Engineering/%E7%BB%84%E4%BB%B6/%E7%B1%BB%E7%BB%84%E4%BB%B6.md): 基于 ES6/TypeScript 的 Vue.js 类组件
