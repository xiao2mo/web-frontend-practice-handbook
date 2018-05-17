# 现代 Web 开发--架构优化篇

# 前言

这是一个最好的时代，也是最坏的时代，我们亲身经历着激动人心的变革，也往往会陷入选择的迷茫。随着浏览器版本的革新与硬件性能的提升，Web 前端开发进入了高歌猛进，日新月异的时代，无数的前端开发框架、技术体系争妍斗艳，让开发者们陷入困惑，乃至于无所适从。特别是随着现代 Web 前端框架(Angular、React、Vue.js)的出现，JavaScript、CSS、HTML 等语言特性的提升，工程化、跨平台、大前端等理论概念的提出，Web 前端开发的技术栈、社区也是不断丰富完善。

任何一个编程生态都会经历三个阶段，首先是原始时期，由于需要在语言与基础的 API 上进行扩充，这个阶段会催生大量的辅助工具。第二个阶段，随着做的东西的复杂化，需要更多的组织，会引入大量的设计模式啊，架构模式的概念，这个阶段会催生大量的框架。第三个阶段，随着需求的进一步复杂与团队的扩充，就进入了工程化的阶段，各类分层 MVC，MVP，MVVM 之类，可视化开发，自动化测试，团队协同系统；这个阶段会出现大量的小而美的库。

Web 前端开发可以追溯于 1991 年蒂姆·伯纳斯-李公开提及 HTML 描述，而后 1999 年 W3C 发布 HTML4 标准，这个阶段主要是 B/S 架构，没有所谓的前端开发概念，网页只不过是后端工程师的顺手之作，服务端渲染是主要的数据传递方式。接下来的几年间随着互联网的发展与 REST 等架构标准的提出，前后端分离与富客户端的概念日渐为人认同，我们需要在语言与基础的 API 上进行扩充，这个阶段出现了以 jQuery 为代表的一系列前端辅助工具。

2009 年以来，智能手机开发普及，移动端大浪潮势不可挡，SPA 单页应用的设计理念也大行其道，相关联的前端模块化、组件化、响应式开发、混合式开发等等技术需求甚为迫切。这个阶段催生了 Angular 1、Ionic 等一系列优秀的框架以及 AMD、CMD、UMD 与 RequireJS、SeaJS 等模块标准与加载工具，前端工程师也成为了专门的开发领域，拥有独立于后端的技术体系与架构模式。而近两年间随着 Web 应用复杂度的提升、团队人员的扩充、用户对于页面交互友好与性能优化的需求，我们需要更加优秀灵活的开发框架来协助我们更好的完成前端开发。这个阶段涌现出了很多关注点相对集中、设计理念更为优秀的框架，譬如 React、Vue.js、Angular 2 等组件框架允许我们以声明式编程来替代以 DOM 操作为核心的命令式编程，加快了组件的开发速度，并且增强了组件的可复用性与可组合性。而遵循函数式编程的 Redux 与借鉴了响应式编程理念的 MobX 都是非常不错的状态管理辅助框架，辅助开发者将业务逻辑与视图渲染剥离，更为合理地划分项目结构，更好地贯彻单一职责原则与提升代码的可维护性。在项目构建工具上，以 Grunt、Gulp 为代表的任务运行管理与以 Webpack、Rollup、JSPM 为代表的项目打包工具各领风骚，帮助开发者更好的搭建前端构建流程，自动化地进行预处理、异步加载、Polyfill、压缩等操作。

## 参考

## 版权

![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg) ![](https://parg.co/bDm)

笔者所有文章遵循 [知识共享 署名-非商业性使用-禁止演绎 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh)，欢迎转载，尊重版权。如果觉得本系列对你有所帮助，欢迎给我家布丁买点狗粮(支付宝扫码)~

![](https://github.com/wxyyxc1992/OSS/blob/master/2017/8/1/Buding.jpg?raw=true)

# 目录

* [MVVM](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/MVVM/Index.md)
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/MVVM/Index.md):
  * [VirtualDOM](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/MVVM/VirtualDOM.md): Virtual DOM Insights
  * [高性能 DOM 变化监听与响应](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/MVVM/%E9%AB%98%E6%80%A7%E8%83%BD%20DOM%20%E5%8F%98%E5%8C%96%E7%9B%91%E5%90%AC%E4%B8%8E%E5%93%8D%E5%BA%94.md):
* [MobX](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/MobX/Index.md)
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/MobX/Index.md):
  * [MobX 响应式监听](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/MobX/MobX%20%E5%93%8D%E5%BA%94%E5%BC%8F%E7%9B%91%E5%90%AC.md): MobX
  * [MobX 底层原理与透明响应](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/MobX/MobX%20%E5%BA%95%E5%B1%82%E5%8E%9F%E7%90%86%E4%B8%8E%E9%80%8F%E6%98%8E%E5%93%8D%E5%BA%94.md): MobX 底层原理与透明响应式实现
  * [框架集成](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/MobX/%E6%A1%86%E6%9E%B6%E9%9B%86%E6%88%90.md):
* [PWA](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/PWA/Index.md)
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/PWA/Index.md):
  * [PWA 概述](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/PWA/PWA%20%E6%A6%82%E8%BF%B0.md): Progressive Web Apps
  * [ServiceWorker](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/PWA/ServiceWorker.md): ServiceWorker
  * [离线存储](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/PWA/%E7%A6%BB%E7%BA%BF%E5%AD%98%E5%82%A8.md): 离线存储
* [Redux](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/Redux/Index.md)
  * [10 Tips for Better Redux Architecture](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/Redux/10%20Tips%20for%20Better%20Redux%20Architecture.md): Understand the Benefits of Redux:认识 Redux
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/Redux/Index.md):
  * [Store 与 Reducer](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/Redux/Store%20%E4%B8%8E%20Reducer.md): Reducer
  * [工程实践](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/Redux/%E5%B7%A5%E7%A8%8B%E5%AE%9E%E8%B7%B5.md): Redux 性能优化
  * [异步 Action 处理](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/Redux/%E5%BC%82%E6%AD%A5%20Action%20%E5%A4%84%E7%90%86.md): Redux 异步处理
  * [设计理念与基本使用](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/Redux/%E8%AE%BE%E8%AE%A1%E7%90%86%E5%BF%B5%E4%B8%8E%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8.md): Redux
* [SPA](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/SPA/Index.md)
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/SPA/Index.md):
  * [前端路由](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/SPA/%E5%89%8D%E7%AB%AF%E8%B7%AF%E7%94%B1.md): 前端路由
* [WebComponents](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/WebComponents/Index.md)
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/WebComponents/Index.md):
* [单向数据流](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81/Index.md)
  * [Flux](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81/Flux.md): Flux
* [性能优化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/Index.md)
  * [1.Web 应用运行机制](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/1.Web%20%E5%BA%94%E7%94%A8%E8%BF%90%E8%A1%8C%E6%9C%BA%E5%88%B6.md): Web 应用运行机制
  * [1A.性能评测](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/1A.%E6%80%A7%E8%83%BD%E8%AF%84%E6%B5%8B.md): Web 应用性能评测
  * [2.资源请求与缓存](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/2.%E8%B5%84%E6%BA%90%E8%AF%B7%E6%B1%82%E4%B8%8E%E7%BC%93%E5%AD%98.md): 资源请求与缓存
  * [3.关键渲染路径](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/3.%E5%85%B3%E9%94%AE%E6%B8%B2%E6%9F%93%E8%B7%AF%E5%BE%84.md): 关键路径渲染
  * [4.图片优化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/4.%E5%9B%BE%E7%89%87%E4%BC%98%E5%8C%96.md): 图片优化
  * [5.脚本解析与执行](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/5.%E8%84%9A%E6%9C%AC%E8%A7%A3%E6%9E%90%E4%B8%8E%E6%89%A7%E8%A1%8C.md): 脚本解析与执行
  * [6.页面布局与渲染策略](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/6.%E9%A1%B5%E9%9D%A2%E5%B8%83%E5%B1%80%E4%B8%8E%E6%B8%B2%E6%9F%93%E7%AD%96%E7%95%A5.md): 页面布局与渲染策略
  * [7.交互与动画](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/7.%E4%BA%A4%E4%BA%92%E4%B8%8E%E5%8A%A8%E7%94%BB.md): 交互与动画
  * [8.移动端优化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/8.%E7%A7%BB%E5%8A%A8%E7%AB%AF%E4%BC%98%E5%8C%96.md):
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/Index.md): Web 应用性能优化
* [框架演化与对比](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%A1%86%E6%9E%B6%E6%BC%94%E5%8C%96%E4%B8%8E%E5%AF%B9%E6%AF%94/Index.md)
  * [前端框架浅议](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%A1%86%E6%9E%B6%E6%BC%94%E5%8C%96%E4%B8%8E%E5%AF%B9%E6%AF%94/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6%E6%B5%85%E8%AE%AE.md): 前端框架对比浅议
  * [前端演化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%A1%86%E6%9E%B6%E6%BC%94%E5%8C%96%E4%B8%8E%E5%AF%B9%E6%AF%94/%E5%89%8D%E7%AB%AF%E6%BC%94%E5%8C%96.md):
* [状态管理](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86/Index.md)
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86/Index.md):
  * [状态管理概述](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86/%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E6%A6%82%E8%BF%B0.md): 状态管理概述与技术选型
  * [状态类型划分](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86/%E7%8A%B6%E6%80%81%E7%B1%BB%E5%9E%8B%E5%88%92%E5%88%86.md): 状态类型划分
* [组件化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/%E7%BB%84%E4%BB%B6%E5%8C%96/Index.md)
  * [基于组件的设计工作流](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E7%BB%84%E4%BB%B6%E5%8C%96/%E5%9F%BA%E4%BA%8E%E7%BB%84%E4%BB%B6%E7%9A%84%E8%AE%BE%E8%AE%A1%E5%B7%A5%E4%BD%9C%E6%B5%81.md): 何谓 Component Based Design？
  * [组件化概述](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E7%BB%84%E4%BB%B6%E5%8C%96/%E7%BB%84%E4%BB%B6%E5%8C%96%E6%A6%82%E8%BF%B0.md): 组件化
