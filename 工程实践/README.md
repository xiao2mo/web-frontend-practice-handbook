![封面](https://media.githubusercontent.com/media/wxyyxc1992/OSS/master/Cover/Web/%E7%8E%B0%E4%BB%A3%20Web%20%E5%B7%A5%E7%A8%8B%E5%8C%96%E5%AE%9E%E8%B7%B5-%E5%B0%81%E9%9D%A2.jpg)

# [现代 Web 开发--工程实践篇](https://github.com/wxyyxc1992/Web-Series/)

`Copyright © 2017 王下邀月熊`

Web 开发已然自成体系，别具一格；本系列即是讨论真实应用开发中所需要的理论知识与实践技巧。

# 前言

这是一个最好的时代，也是最坏的时代，我们亲身经历着激动人心的变革，也往往会陷入选择的迷茫。随着浏览器版本的革新与硬件性能的提升，Web 前端开发进入了高歌猛进，日新月异的时代，无数的前端开发框架、技术体系争妍斗艳，让开发者们陷入困惑，乃至于无所适从。特别是随着现代 Web 前端框架(Angular、React、Vue.js)的出现，JavaScript、CSS、HTML 等语言特性的提升，工程化、跨平台、大前端等理论概念的提出，Web 前端开发的技术栈、社区也是不断丰富完善。

任何一个编程生态都会经历三个阶段，首先是原始时期，由于需要在语言与基础的 API 上进行扩充，这个阶段会催生大量的辅助工具。第二个阶段，随着做的东西的复杂化，需要更多的组织，会引入大量的设计模式啊，架构模式的概念，这个阶段会催生大量的框架。第三个阶段，随着需求的进一步复杂与团队的扩充，就进入了工程化的阶段，各类分层 MVC，MVP，MVVM 之类，可视化开发，自动化测试，团队协同系统；这个阶段会出现大量的小而美的库。

Web 前端开发可以追溯于 1991 年蒂姆·伯纳斯-李公开提及 HTML 描述，而后 1999 年 W3C 发布 HTML4 标准，这个阶段主要是 B/S 架构，没有所谓的前端开发概念，网页只不过是后端工程师的顺手之作，服务端渲染是主要的数据传递方式。接下来的几年间随着互联网的发展与 REST 等架构标准的提出，前后端分离与富客户端的概念日渐为人认同，我们需要在语言与基础的 API 上进行扩充，这个阶段出现了以 jQuery 为代表的一系列前端辅助工具。

2009 年以来，智能手机开发普及，移动端大浪潮势不可挡，SPA 单页应用的设计理念也大行其道，相关联的前端模块化、组件化、响应式开发、混合式开发等等技术需求甚为迫切。这个阶段催生了 Angular 1、Ionic 等一系列优秀的框架以及 AMD、CMD、UMD 与 RequireJS、SeaJS 等模块标准与加载工具，前端工程师也成为了专门的开发领域，拥有独立于后端的技术体系与架构模式。而近两年间随着 Web 应用复杂度的提升、团队人员的扩充、用户对于页面交互友好与性能优化的需求，我们需要更加优秀灵活的开发框架来协助我们更好的完成前端开发。这个阶段涌现出了很多关注点相对集中、设计理念更为优秀的框架，譬如 React、Vue.js、Angular 2 等组件框架允许我们以声明式编程来替代以 DOM 操作为核心的命令式编程，加快了组件的开发速度，并且增强了组件的可复用性与可组合性。而遵循函数式编程的 Redux 与借鉴了响应式编程理念的 MobX 都是非常不错的状态管理辅助框架，辅助开发者将业务逻辑与视图渲染剥离，更为合理地划分项目结构，更好地贯彻单一职责原则与提升代码的可维护性。在项目构建工具上，以 Grunt、Gulp 为代表的任务运行管理与以 Webpack、Rollup、JSPM 为代表的项目打包工具各领风骚，帮助开发者更好的搭建前端构建流程，自动化地进行预处理、异步加载、Polyfill、压缩等操作。

## 参考

## 版权

![](https://parg.co/bDY) ![](https://parg.co/bDm)

笔者所有文章遵循 [知识共享 署名-非商业性使用-禁止演绎 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh)，欢迎转载，尊重版权。

如果觉得本系列对你有所帮助，欢迎给我家布丁买点狗粮(支付宝扫码)~

![](https://github.com/wxyyxc1992/OSS/blob/master/2017/8/1/Buding.jpg?raw=true)

# 目录

* [TestRunner](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Engineering-Practices/TestRunner/Index.md)
  * [Jest](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/TestRunner/Jest.md): 基于 Jest 的单元测试
  * [Karma](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/TestRunner/Karma.md):
  * [Mocha](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/TestRunner/Mocha.md):
* [Webpack](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Engineering-Practices/Webpack/Index.md)
  * [基础使用](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/Webpack/%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8.md): 基于 Webpack 的 Web 应用构建与打包基础
  * [自定义加载器与插件](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/Webpack/%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8A%A0%E8%BD%BD%E5%99%A8%E4%B8%8E%E6%8F%92%E4%BB%B6.md): Webpack  自定义加载器与插件
  * [进阶实践](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/Webpack/%E8%BF%9B%E9%98%B6%E5%AE%9E%E8%B7%B5.md): Webpack 进阶使用与工程实践
* [响应式开发](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Engineering-Practices/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%BC%80%E5%8F%91/Index.md)
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%BC%80%E5%8F%91/Index.md):
  * [响应式尺寸](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%BC%80%E5%8F%91/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%B0%BA%E5%AF%B8.md): Element Query
  * [响应式布局与自动缩放](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%BC%80%E5%8F%91/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%B8%83%E5%B1%80%E4%B8%8E%E8%87%AA%E5%8A%A8%E7%BC%A9%E6%94%BE.md): Auto Resize:自动缩放
  * [响应式设计](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%BC%80%E5%8F%91/%E5%93%8D%E5%BA%94%E5%BC%8F%E8%AE%BE%E8%AE%A1.md): 响应式设计
* [应用测试](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Engineering-Practices/%E5%BA%94%E7%94%A8%E6%B5%8B%E8%AF%95/Index.md)
  * [Jest](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E5%BA%94%E7%94%A8%E6%B5%8B%E8%AF%95/Jest.md):
  * [Web 自动化测试概述](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E5%BA%94%E7%94%A8%E6%B5%8B%E8%AF%95/Web%20%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B5%8B%E8%AF%95%E6%A6%82%E8%BF%B0.md): Web 自动化测试概述
* [构建工具](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Engineering-Practices/%E6%9E%84%E5%BB%BA%E5%B7%A5%E5%85%B7/Index.md)
  * [任务执行](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E6%9E%84%E5%BB%BA%E5%B7%A5%E5%85%B7/%E4%BB%BB%E5%8A%A1%E6%89%A7%E8%A1%8C.md): Gulp
  * [依赖管理](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E6%9E%84%E5%BB%BA%E5%B7%A5%E5%85%B7/%E4%BE%9D%E8%B5%96%E7%AE%A1%E7%90%86.md): [Yarn](https://github.com/yarnpkg/yarn)
  * [构建工具](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E6%9E%84%E5%BB%BA%E5%B7%A5%E5%85%B7/%E6%9E%84%E5%BB%BA%E5%B7%A5%E5%85%B7.md): 构建工具概述
* [样式指南](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Engineering-Practices/%E6%A0%B7%E5%BC%8F%E6%8C%87%E5%8D%97/Index.md)
  * [DOM 与组件](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E6%A0%B7%E5%BC%8F%E6%8C%87%E5%8D%97/DOM%20%E4%B8%8E%E7%BB%84%E4%BB%B6.md): Syntax
  * [Facebook 的 CSS 代码质量保障之道](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E6%A0%B7%E5%BC%8F%E6%8C%87%E5%8D%97/Facebook%20%E7%9A%84%20CSS%20%E4%BB%A3%E7%A0%81%E8%B4%A8%E9%87%8F%E4%BF%9D%E9%9A%9C%E4%B9%8B%E9%81%93.md): Facebook 的 CSS 代码质量保障之道
  * [布局与样式](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E6%A0%B7%E5%BC%8F%E6%8C%87%E5%8D%97/%E5%B8%83%E5%B1%80%E4%B8%8E%E6%A0%B7%E5%BC%8F.md): 明白何谓 Margin Collapse
  * [项目架构](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E6%A0%B7%E5%BC%8F%E6%8C%87%E5%8D%97/%E9%A1%B9%E7%9B%AE%E6%9E%B6%E6%9E%84.md): Project Architecture: 项目架构
* [浏览器自动化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Engineering-Practices/%E6%B5%8F%E8%A7%88%E5%99%A8%E8%87%AA%E5%8A%A8%E5%8C%96/Index.md)
  * [Headless-Chrome](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E6%B5%8F%E8%A7%88%E5%99%A8%E8%87%AA%E5%8A%A8%E5%8C%96/Headless-Chrome.md): Headless Chrome 实战：动态渲染、页面抓取与端到端测试
* [生产环境](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Engineering-Practices/%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83/Index.md)
  * [异常监控与上报](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83/%E5%BC%82%E5%B8%B8%E7%9B%91%E6%8E%A7%E4%B8%8E%E4%B8%8A%E6%8A%A5.md):
  * [跨浏览器适配](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83/%E8%B7%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E9%80%82%E9%85%8D.md): 浏览器版本监控与特性识别
* [端到端测试](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Engineering-Practices/%E7%AB%AF%E5%88%B0%E7%AB%AF%E6%B5%8B%E8%AF%95/Index.md)
  * [Nightwatch.js](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E7%AB%AF%E5%88%B0%E7%AB%AF%E6%B5%8B%E8%AF%95/Nightwatch.js):
  * [TestCafe](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E7%AB%AF%E5%88%B0%E7%AB%AF%E6%B5%8B%E8%AF%95/TestCafe.md): 自定义浏览器支持
  * [Watir](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E7%AB%AF%E5%88%B0%E7%AB%AF%E6%B5%8B%E8%AF%95/Watir.md):
* [调试](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Engineering-Practices/%E8%B0%83%E8%AF%95/Index.md)
  * [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E8%B0%83%E8%AF%95/Index.md):
  * [内存分析与内存泄露定位](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E8%B0%83%E8%AF%95/%E5%86%85%E5%AD%98%E5%88%86%E6%9E%90%E4%B8%8E%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2%E5%AE%9A%E4%BD%8D.md):
  * [日志记录](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E8%B0%83%E8%AF%95/%E6%97%A5%E5%BF%97%E8%AE%B0%E5%BD%95.md): 调试与错误追踪
  * [样式与布局调试](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E8%B0%83%E8%AF%95/%E6%A0%B7%E5%BC%8F%E4%B8%8E%E5%B8%83%E5%B1%80%E8%B0%83%E8%AF%95.md): CSS 调试
  * [调试工具](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E8%B0%83%E8%AF%95/%E8%B0%83%E8%AF%95%E5%B7%A5%E5%85%B7.md):
* [输入插件](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Engineering-Practices/%E8%BE%93%E5%85%A5%E6%8F%92%E4%BB%B6/Index.md)
  * [文件上传](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Engineering-Practices/%E8%BE%93%E5%85%A5%E6%8F%92%E4%BB%B6/%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.md):
