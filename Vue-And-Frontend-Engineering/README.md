
# Vue.js 与前端工程化实践



本系列文章从属于 [Vue.js 与前端工程化实践](https://parg.co/bWg)一书，本书的首要目标即是以 Vue.js 为核心的技术体系为主线，为读者构建完整的前端技术知识体系，探讨前端工程化的思想，并且能使不同技术水准的读者都有所得。



建议前置阅读[现代 Web 开发基础](https://parg.co/UHU)、[现代 Web 工程化实践](https://parg.co/Ubt)、 [现代 JavaScript 开发：语法基础与工程实践](https://parg.co/bxN)等。另外可以比照阅读 [React 与前端工程化实践](https://parg.co/bIn) 等。



# 前言 
近年来，随着浏览器性能的提升与移动互联网浪潮的汹涌而来，Web 前端开发进入了高歌猛进，日新月异的时代。这是最好的时代，我们永远在前行，这也是最坏的时代，无数的前端开发框架、技术体系争妍斗艳，让开发者们陷入困惑，乃至于无所适从。Web 前端开发可以追溯于 1991 年蒂姆·伯纳斯-李公开提及 HTML 描述，而后 1999 年 W3C 发布 HTML4 标准，这个阶段主要是 B/S 架构，没有所谓的前端开发概念，网页只不过是后端工程师的顺手之作，服务端渲染是主要的数据传递方式。接下来的几年间随着互联网的发展与 REST 等架构标准的提出，前后端分离与富客户端的概念日渐为人认同，我们需要在语言与基础的 API 上进行扩充，这个阶段出现了以 jQuery 为代表的一系列前端辅助工具。


2009 年以来，智能手机开发普及，移动端大浪潮势不可挡，SPA 单页应用的设计理念也大行其道，相关联的前端模块化、组件化、响应式开发、混合式开发等等技术需求甚为迫切。这个阶段催生了 Angular 1、Ionic 等一系列优秀的框架以及 AMD、CMD、UMD 与RequireJS、SeaJS 等模块标准与加载工具，前端工程师也成为了专门的开发领域，拥有独立于后端的技术体系与架构模式。


而近两年间随着Web应用复杂度的提升、团队人员的扩充、用户对于页面交互友好与性能优化的需求，我们需要更加优秀灵活的开发框架来协助我们更好的完成前端开发。这个阶段涌现出了很多关注点相对集中、设计理念更为优秀的框架，譬如 React、Vue.js、Angular 2 等组件框架允许我们以声明式编程来替代以 DOM 操作为核心的命令式编程，加快了组件的开发速度，并且增强了组件的可复用性与可组合性。而遵循函数式编程的 Redux 与借鉴了响应式编程理念的 MobX 都是非常不错的状态管理辅助框架，辅助开发者将业务逻辑与视图渲染剥离，更为合理地划分项目结构，更好地贯彻单一职责原则与提升代码的可维护性。在项目构建工具上，以 Grunt、Gulp 为代表的任务运行管理与以 Webpack、Rollup、JSPM 为代表的项目打包工具各领风骚，帮助开发者更好的搭建前端构建流程，自动化地进行预处理、异步加载、Polyfill、压缩等操作。


总结而言，目前前端工具化已经进入到了非常繁荣的时代，而很多前端开发者也甚为苦恼，疲于学习。本书的首要目标即是以 Vue.js 为核心的技术体系为主线，介绍目前前端开发的基本概念，帮助初级前端开发者搭建前端知识体系，能够迅速进入前端开发的工作中。而蕴藏在工具化之中的是抽象而出的设计理念与编程范式，总结而言即是对于前端工程化的思考。工具的变革会非常迅速，很多优秀的工具可能都只是历史长河中的一朵浪花，而总结而出的工程化思维则会恒久长存。本书希望为读者构建完整的前端技术体系概念，并且能使不同技术水准的读者都有所得： 
（1）希望对于没有经验的开发者能够在本书选定的最短路径上快速成为一名合格的能够利用 Vue.js 快速开发 Web 应用的现代前端开发者。每一小节都会讲解最基础的语法或者使用要点，但是不会长篇大论地介绍语法细节这些应该查看文档的内容。通过简单的示例快速上手之后，笔者会介绍很多工程当中的具体实践。可能刚入门的开发者并不能理解这些实践的意义或者价值，但是首先保证能用，而后在自己的实践中慢慢回味，逐渐明了。 
（2）而对于有一定前端开发经验的开发者，本书能够帮你梳理现代纷繁复杂的前端开发状况，探寻以 Vue.js 为代表的百花齐放的工具库背后蕴藏的设计理念与编程范式，最终融会贯通，形成自己的前端工程化思想与体系。 




## 技术栈

- Vue.js 2.x
- Webpack 3+





# 目录
> *目录暂时仅做参考，笔者尚未规整完善！
> 为了方便检索目录，原书的章-节-小节三级结构以一级目录-列表键-列表项目方式呈现；另外由于本书在不断修订中，很多章节的链接可能失效，建议直接浏览文件目录以浏览对应章节。



- [Vue.js 初窥]()



- [Vue.js 组件](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E7%BB%84%E4%BB%B6/index.md)
  
- [组件化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E7%BB%84%E4%BB%B6/%E7%BB%84%E4%BB%B6%E5%8C%96.md)
  
- [组件声明](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E7%BB%84%E4%BB%B6/%E7%BB%84%E4%BB%B6%E5%A3%B0%E6%98%8E.md)
  
- [列表组件](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E7%BB%84%E4%BB%B6/%E5%88%97%E8%A1%A8%E7%BB%84%E4%BB%B6.md)



- [Vue.js 组件样式](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F/index.md)
  
- [CSS 样式](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F/CSS%20%E6%A0%B7%E5%BC%8F.md)

  
- [CSS-in-JS](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F/CSS-in-JS.md)
  
- [Flexbox](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F/Flexbox.md)



- [Vue.js 组件数据流]()
  
- [Props](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/%E7%BB%84%E4%BB%B6%E7%9A%84%E6%95%B0%E6%8D%AE%E6%B5%81/Props.md)
  
- [State](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/%E7%BB%84%E4%BB%B6%E7%9A%84%E6%95%B0%E6%8D%AE%E6%B5%81/State.md)
  
- [Context](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/%E7%BB%84%E4%BB%B6%E7%9A%84%E6%95%B0%E6%8D%AE%E6%B5%81/Context.md)
  
- [组件间通信](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/%E7%BB%84%E4%BB%B6%E7%9A%84%E6%95%B0%E6%8D%AE%E6%B5%81/%E7%BB%84%E4%BB%B6%E9%97%B4%E9%80%9A%E4%BF%A1.md)



- [Vue.js 事件系统]()
  
- [事件应用实践](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E4%BA%8B%E4%BB%B6%E7%B3%BB%E7%BB%9F/%E4%BA%8B%E4%BB%B6%E5%BA%94%E7%94%A8%E5%AE%9E%E8%B7%B5.md)
  
- [原生事件处理](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E4%BA%8B%E4%BB%B6%E7%B3%BB%E7%BB%9F/%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86.md)



- [Vue.js 动画]()
  
- [CSS 动画](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E5%8A%A8%E7%94%BB/CSS%20%E5%8A%A8%E7%94%BB.md)
  
- [Vue.js 动画](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E5%8A%A8%E7%94%BB/Vue.js%20%E5%8A%A8%E7%94%BB.md)



- [Vue.js 路由]()
 
- [单页应用路由](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E8%B7%AF%E7%94%B1/%E5%8D%95%E9%A1%B5%E5%BA%94%E7%94%A8%E8%B7%AF%E7%94%B1.md)
  
- [Vue.js Router 概念与设计](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E8%B7%AF%E7%94%B1/Vue.js%20Router%20%E6%A6%82%E5%BF%B5.md)
  
- [路由配置与匹配](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E8%B7%AF%E7%94%B1/%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE%E4%B8%8E%E5%8C%B9%E9%85%8D.md)
  
- [路由控制与切换](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E8%B7%AF%E7%94%B1/%E8%B7%AF%E7%94%B1%E6%8E%A7%E5%88%B6.md)



- [Vue.js 设计模式与样式指南](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E5%B7%A5%E7%A8%8B%E5%AE%9E%E8%B7%B5/Vue.js%20%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E4%B8%8E%E6%A0%B7%E5%BC%8F%E6%8C%87%E5%8D%97.md)
  
- [函数式 Vue.js 开发]()
  
- [Vue.js 高阶组件]()
  
- [Vue.js 组件分割与解耦]()
  
- [Vue.js 样式指南]() 





- [Vuex]()
  
- [Vuex 基本语法]()
  
- [Vuex 异步处理](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Redux/Redux%20%E5%BC%82%E6%AD%A5%E5%A4%84%E7%90%86.md)
  
- [Vuex 工程实践]()



- [Vue.js 服务端渲染]()
  
- [服务端渲染概述](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93%E6%A6%82%E8%BF%B0.md)
  
- [基于 Express 的渲染服务器](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/%E5%9F%BA%E4%BA%8E%20Express%20%E7%9A%84%E6%B8%B2%E6%9F%93%E6%9C%8D%E5%8A%A1%E5%99%A8.md)
  
- [使用 Next.js 快速搭建渲染服务器](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/%E5%9F%BA%E4%BA%8E%20Next.js%20%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA%E6%B8%B2%E6%9F%93%E6%9C%8D%E5%8A%A1%E5%99%A8.md)
  
- [服务端渲染性能浅析](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93%E6%80%A7%E8%83%BD%E6%B5%85%E6%9E%90.md)



- [Vue.js 工程实践]()
  
- [Flow 静态类型检测]()
  
- [Vue.js 性能优化]()
  
- [基于 Vue.js 的模式库]()



- [深入 Vue.js 内部原理]()
  
- [再谈 Virtual DOM]()
  
- [Vue.js Diff 算法]()
  
- [Vue.js setState]()
  
- [Vue.js Fiber]()
  
- [Preact]()





- [Weex](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/tree/master/Refer/Vue.js-And-FrontEnd-Engineering/Vue.js%20Native)
  
- [开发环境搭建与调试]()
  
- [组件基础]()
  
- [路由导航]()
  
- [列表优化]()
  
- [原生架构浅析]()



# 狗粮



如果觉得本系列对你有所帮助，欢迎给我家布丁买点狗粮（支付宝扫码）~



![](https://github.com/wxyyxc1992/OSS/blob/master/2017/8/1/Buding.jpg?raw=true)


