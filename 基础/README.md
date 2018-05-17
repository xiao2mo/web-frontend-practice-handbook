![封面](https://parg.co/UdD)

# [现代 Web 开发--基础篇](https://parg.co/UHU)

`Copyright © 2017 王下邀月熊`

现代 Web 开发基础是笔者对于 HTML、CSS、DOM 等 Web 开发中涉及的基础知识与理念的总结介绍。

Next Milestone: 0.1

# 前言

这是一个最好的时代，也是最坏的时代，我们亲身经历着激动人心的变革，也往往会陷入选择的迷茫。随着浏览器版本的革新与硬件性能的提升，Web 前端开发进入了高歌猛进，日新月异的时代，无数的前端开发框架、技术体系争妍斗艳，让开发者们陷入困惑，乃至于无所适从。特别是随着现代 Web 前端框架(Angular、React、Vue.js)的出现，JavaScript、CSS、HTML 等语言特性的提升，工程化、跨平台、大前端等理论概念的提出，Web 前端开发的技术栈、社区也是不断丰富完善。

任何一个编程生态都会经历三个阶段，首先是原始时期，由于需要在语言与基础的 API 上进行扩充，这个阶段会催生大量的辅助工具。第二个阶段，随着做的东西的复杂化，需要更多的组织，会引入大量的设计模式啊，架构模式的概念，这个阶段会催生大量的框架。第三个阶段，随着需求的进一步复杂与团队的扩充，就进入了工程化的阶段，各类分层 MVC，MVP，MVVM 之类，可视化开发，自动化测试，团队协同系统；这个阶段会出现大量的小而美的库。

Web 前端开发可以追溯于 1991 年蒂姆·伯纳斯-李公开提及 HTML 描述，而后 1999 年 W3C 发布 HTML4 标准，这个阶段主要是 B/S 架构，没有所谓的前端开发概念，网页只不过是后端工程师的顺手之作，服务端渲染是主要的数据传递方式。接下来的几年间随着互联网的发展与 REST 等架构标准的提出，前后端分离与富客户端的概念日渐为人认同，我们需要在语言与基础的 API 上进行扩充，这个阶段出现了以 jQuery 为代表的一系列前端辅助工具。

2009 年以来，智能手机开发普及，移动端大浪潮势不可挡，SPA 单页应用的设计理念也大行其道，相关联的前端模块化、组件化、响应式开发、混合式开发等等技术需求甚为迫切。这个阶段催生了 Angular 1、Ionic 等一系列优秀的框架以及 AMD、CMD、UMD 与 RequireJS、SeaJS 等模块标准与加载工具，前端工程师也成为了专门的开发领域，拥有独立于后端的技术体系与架构模式。而近两年间随着 Web 应用复杂度的提升、团队人员的扩充、用户对于页面交互友好与性能优化的需求，我们需要更加优秀灵活的开发框架来协助我们更好的完成前端开发。这个阶段涌现出了很多关注点相对集中、设计理念更为优秀的框架，譬如 React、Vue.js、Angular 2 等组件框架允许我们以声明式编程来替代以 DOM 操作为核心的命令式编程，加快了组件的开发速度，并且增强了组件的可复用性与可组合性。而遵循函数式编程的 Redux 与借鉴了响应式编程理念的 MobX 都是非常不错的状态管理辅助框架，辅助开发者将业务逻辑与视图渲染剥离，更为合理地划分项目结构，更好地贯彻单一职责原则与提升代码的可维护性。在项目构建工具上，以 Grunt、Gulp 为代表的任务运行管理与以 Webpack、Rollup、JSPM 为代表的项目打包工具各领风骚，帮助开发者更好的搭建前端构建流程，自动化地进行预处理、异步加载、Polyfill、压缩等操作。

## 参考

## 版权

笔者所有文章遵循 [知识共享 署名-非商业性使用-禁止演绎 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh)，欢迎转载，尊重版权。如果觉得本系列对你有所帮助，欢迎给我家布丁买点狗粮(支付宝扫码)~

![](https://github.com/wxyyxc1992/OSS/blob/master/2017/8/1/Buding.jpg?raw=true)

# 目录

* [CSS 处理器](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Development-Foundation/CSS%20%E5%A4%84%E7%90%86%E5%99%A8/Index.md)
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/CSS%20%E5%A4%84%E7%90%86%E5%99%A8/Index.md):
  * [PostCSS](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/CSS%20%E5%A4%84%E7%90%86%E5%99%A8/PostCSS.md): PostCSS
  * [SCSS](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/CSS%20%E5%A4%84%E7%90%86%E5%99%A8/SCSS.md): SCSS 语法介绍与实践技巧
* [CSS-in-JS](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Development-Foundation/CSS-in-JS/Index.md)
  * [CSS-in-JS](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/CSS-in-JS/CSS-in-JS.md): CSS-in-JS
* [CSS](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Development-Foundation/CSS/Index.md)
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/CSS/Index.md):
  * [概念引入与基础语法](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/CSS/%E6%A6%82%E5%BF%B5%E5%BC%95%E5%85%A5%E4%B8%8E%E5%9F%BA%E7%A1%80%E8%AF%AD%E6%B3%95.md): CSS 概念引入与基础语法
  * [边属性与图形绘制](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/CSS/%E8%BE%B9%E5%B1%9E%E6%80%A7%E4%B8%8E%E5%9B%BE%E5%BD%A2%E7%BB%98%E5%88%B6.md): 边
* [DOM](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Development-Foundation/DOM/Index.md)
  * [DOM 概念与元素选择](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/DOM/DOM%20%E6%A6%82%E5%BF%B5%E4%B8%8E%E5%85%83%E7%B4%A0%E9%80%89%E6%8B%A9.md): DOM 概念与元素选择
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/DOM/Index.md):
  * [元素操作](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/DOM/%E5%85%83%E7%B4%A0%E6%93%8D%E4%BD%9C.md): 元素操作
  * [浏览器对象](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/DOM/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%AF%B9%E8%B1%A1.md): 浏览器对象
* [HTML](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Development-Foundation/HTML/Index.md)
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/HTML/Index.md):
  * [元素标签](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/HTML/%E5%85%83%E7%B4%A0%E6%A0%87%E7%AD%BE.md): HTML 常见元素
  * [规范与模板](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/HTML/%E8%A7%84%E8%8C%83%E4%B8%8E%E6%A8%A1%E6%9D%BF.md): HTML 规范与模板
  * [语义化标签与元标签](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/HTML/%E8%AF%AD%E4%B9%89%E5%8C%96%E6%A0%87%E7%AD%BE%E4%B8%8E%E5%85%83%E6%A0%87%E7%AD%BE.md): 元标签
* [jQuery](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Development-Foundation/jQuery/Index.md)
  * [jQuery 实践技巧](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/jQuery/jQuery%20%E5%AE%9E%E8%B7%B5%E6%8A%80%E5%B7%A7.md):
  * [事件处理与网络交互](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/jQuery/%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E4%B8%8E%E7%BD%91%E7%BB%9C%E4%BA%A4%E4%BA%92.md): 事件处理与网络交互
  * [元素操作](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/jQuery/%E5%85%83%E7%B4%A0%E6%93%8D%E4%BD%9C.md): 元素操作
  * [插件](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/jQuery/%E6%8F%92%E4%BB%B6.md): jQuery 插件
* [事件响应](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Development-Foundation/%E4%BA%8B%E4%BB%B6%E5%93%8D%E5%BA%94/Index.md)
  * [事件绑定与传递](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E4%BA%8B%E4%BB%B6%E5%93%8D%E5%BA%94/%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E4%B8%8E%E4%BC%A0%E9%80%92.md): Event Handling:事件处理
  * [常用事件类型](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E4%BA%8B%E4%BB%B6%E5%93%8D%E5%BA%94/%E5%B8%B8%E7%94%A8%E4%BA%8B%E4%BB%B6%E7%B1%BB%E5%9E%8B.md): DOM 中常用事件类型概述
  * [手势识别](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E4%BA%8B%E4%BB%B6%E5%93%8D%E5%BA%94/%E6%89%8B%E5%8A%BF%E8%AF%86%E5%88%AB.md): 手势识别
  * [移动端事件](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E4%BA%8B%E4%BB%B6%E5%93%8D%E5%BA%94/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E4%BA%8B%E4%BB%B6.md): Touch & Tap
* [变换与动画](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Development-Foundation/%E5%8F%98%E6%8D%A2%E4%B8%8E%E5%8A%A8%E7%94%BB/Index.md)
  * [CSS 变换与动画](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E5%8F%98%E6%8D%A2%E4%B8%8E%E5%8A%A8%E7%94%BB/CSS%20%E5%8F%98%E6%8D%A2%E4%B8%8E%E5%8A%A8%E7%94%BB.md): GPU Animation
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E5%8F%98%E6%8D%A2%E4%B8%8E%E5%8A%A8%E7%94%BB/Index.md): 变换与动画
  * [JavaScript 动画](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E5%8F%98%E6%8D%A2%E4%B8%8E%E5%8A%A8%E7%94%BB/JavaScript%20%E5%8A%A8%E7%94%BB.md):
* [数据存储](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Development-Foundation/%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8/Index.md)
  * [前端缓存](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8/%E5%89%8D%E7%AB%AF%E7%BC%93%E5%AD%98.md): sessionStorage & localStorage
  * [剪贴板](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8/%E5%89%AA%E8%B4%B4%E6%9D%BF.md): 基于 DOM 的剪贴板操作
  * [离线存储](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8/%E7%A6%BB%E7%BA%BF%E5%AD%98%E5%82%A8.md):
* [渐进式布局](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Development-Foundation/%E6%B8%90%E8%BF%9B%E5%BC%8F%E5%B8%83%E5%B1%80/Index.md)
  * [CSS Grid](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E6%B8%90%E8%BF%9B%E5%BC%8F%E5%B8%83%E5%B1%80/CSS%20Grid.md): CSS Grid
  * [Flexbox](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E6%B8%90%E8%BF%9B%E5%BC%8F%E5%B8%83%E5%B1%80/Flexbox.md): Flexbox
  * [JavaScript 动态布局](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E6%B8%90%E8%BF%9B%E5%BC%8F%E5%B8%83%E5%B1%80/JavaScript%20%E5%8A%A8%E6%80%81%E5%B8%83%E5%B1%80.md): LayoutManagement
* [现代 Web 开发概述](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Development-Foundation/%E7%8E%B0%E4%BB%A3%20Web%20%E5%BC%80%E5%8F%91%E6%A6%82%E8%BF%B0/Index.md)
  * [1.Web 开发简史](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E7%8E%B0%E4%BB%A3%20Web%20%E5%BC%80%E5%8F%91%E6%A6%82%E8%BF%B0/1.Web%20%E5%BC%80%E5%8F%91%E7%AE%80%E5%8F%B2.md): Web 开发简史
  * [2.数据流驱动的界面](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E7%8E%B0%E4%BB%A3%20Web%20%E5%BC%80%E5%8F%91%E6%A6%82%E8%BF%B0/2.%E6%95%B0%E6%8D%AE%E6%B5%81%E9%A9%B1%E5%8A%A8%E7%9A%84%E7%95%8C%E9%9D%A2.md): 数据流驱动的界面
  * [3.前后端分离与全栈架构](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E7%8E%B0%E4%BB%A3%20Web%20%E5%BC%80%E5%8F%91%E6%A6%82%E8%BF%B0/3.%E5%89%8D%E5%90%8E%E7%AB%AF%E5%88%86%E7%A6%BB%E4%B8%8E%E5%85%A8%E6%A0%88%E6%9E%B6%E6%9E%84.md): 前后端分离与全栈架构
  * [4.模块化与组件化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E7%8E%B0%E4%BB%A3%20Web%20%E5%BC%80%E5%8F%91%E6%A6%82%E8%BF%B0/4.%E6%A8%A1%E5%9D%97%E5%8C%96%E4%B8%8E%E7%BB%84%E4%BB%B6%E5%8C%96.md): 模块化与组件化
  * [5.工具化与工程化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E7%8E%B0%E4%BB%A3%20Web%20%E5%BC%80%E5%8F%91%E6%A6%82%E8%BF%B0/5.%E5%B7%A5%E5%85%B7%E5%8C%96%E4%B8%8E%E5%B7%A5%E7%A8%8B%E5%8C%96.md): 工具化与工程化
  * [6.大前端的未来](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E7%8E%B0%E4%BB%A3%20Web%20%E5%BC%80%E5%8F%91%E6%A6%82%E8%BF%B0/6.%E5%A4%A7%E5%89%8D%E7%AB%AF%E7%9A%84%E6%9C%AA%E6%9D%A5.md): 大前端的未来
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E7%8E%B0%E4%BB%A3%20Web%20%E5%BC%80%E5%8F%91%E6%A6%82%E8%BF%B0/Index.md): 现代 Web 开发概述
* [盒模型与文档流](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Development-Foundation/%E7%9B%92%E6%A8%A1%E5%9E%8B%E4%B8%8E%E6%96%87%E6%A1%A3%E6%B5%81/Index.md)
  * [文档流与元素定位](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E7%9B%92%E6%A8%A1%E5%9E%8B%E4%B8%8E%E6%96%87%E6%A1%A3%E6%B5%81/%E6%96%87%E6%A1%A3%E6%B5%81%E4%B8%8E%E5%85%83%E7%B4%A0%E5%AE%9A%E4%BD%8D.md): Document Flow:文档流
  * [盒模型](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E7%9B%92%E6%A8%A1%E5%9E%8B%E4%B8%8E%E6%96%87%E6%A1%A3%E6%B5%81/%E7%9B%92%E6%A8%A1%E5%9E%8B.md): CSS 布局：盒模型
  * [视口与尺寸单元](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E7%9B%92%E6%A8%A1%E5%9E%8B%E4%B8%8E%E6%96%87%E6%A1%A3%E6%B5%81/%E8%A7%86%E5%8F%A3%E4%B8%8E%E5%B0%BA%E5%AF%B8%E5%8D%95%E5%85%83.md): CSS 视口与尺寸单元详解
* [网络请求](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Development-Foundation/%E7%BD%91%E7%BB%9C%E8%AF%B7%E6%B1%82/Index.md)
  * [HTTP 请求](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E7%BD%91%E7%BB%9C%E8%AF%B7%E6%B1%82/HTTP%20%E8%AF%B7%E6%B1%82.md): XMLHttpRequest
  * [实时交互](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E7%BD%91%E7%BB%9C%E8%AF%B7%E6%B1%82/%E5%AE%9E%E6%97%B6%E4%BA%A4%E4%BA%92.md):
  * [文件传输](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E7%BD%91%E7%BB%9C%E8%AF%B7%E6%B1%82/%E6%96%87%E4%BB%B6%E4%BC%A0%E8%BE%93.md): DOM 文件传输
  * [跨域请求](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Development-Foundation/%E7%BD%91%E7%BB%9C%E8%AF%B7%E6%B1%82/%E8%B7%A8%E5%9F%9F%E8%AF%B7%E6%B1%82.md): JSONP
