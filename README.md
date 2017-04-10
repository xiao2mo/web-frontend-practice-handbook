![](https://camo.githubusercontent.com/42266e71aa395fc757534be4b1b4d64bbf556e46/68747470733a2f2f636f64696e672e6e65742f752f686f7465616d2f702f43616368652f6769742f7261772f6d61737465722f323031362f31302f322f312d7261574f3364684d346a4d6a663956592d6b5a7a4e672e706e67)

# Web 开发基础与工程实践


本仓库存放笔者 Web 开发基础与工程实践的相关博客、示例代码与开源项目、整理成的系列书籍等内容。近年来，随着浏览器性能的提升与移动互联网浪潮的汹涌而来，Web 前端开发进入了高歌猛进，日新月异的时代。这是最好的时代，我们永远在前行，这也是最坏的时代，无数的前端开发框架、技术体系争妍斗艳，让开发者们陷入困惑，乃至于无所适从。Web 前端开发可以追溯于1991 年蒂姆·伯纳斯-李公开提及 HTML 描述，而后 1999 年 W3C 发布 HTML4 标准，这个阶段主要是 BS 架构，没有所谓的前端开发概念，网页只不过是后端工程师的顺手之作，服务端渲染是主要的数据传递方式。接下来的几年间随着互联网的发展与 REST 等架构标准的提出，前后端分离与富客户端的概念日渐为人认同，我们需要在语言与基础的 API 上进行扩充，这个阶段出现了以 jQuery 为代表的一系列前端辅助工具。2009 年以来，智能手机开发普及，移动端大浪潮势不可挡，SPA单页应用的设计理念也大行其道，相关联的前端模块化、组件化、响应式开发、混合式开发等等技术需求甚为迫切。这个阶段催生了 Angular 1、Ionic 等一系列优秀的框架以及 AMD、CMD、UMD 与 RequireJS、SeaJS 等模块标准与加载工具，前端工程师也成为了专门的开发领域，拥有独立于后端的技术体系与架构模式。而近两年间随着Web应用复杂度的提升、团队人员的扩充、用户对于页面交互友好与性能优化的需求，我们需要更加优秀灵活的开发框架来协助我们更好的完成前端开发。这个阶段涌现出了很多关注点相对集中、设计理念更为优秀的框架，譬如React、VueJS、Angular 2 等组件框架允许我们以声明式编程来替代以 DOM 操作为核心的命令式编程，加快了组件的开发速度，并且增强了组件的可复用性与可组合性。而遵循函数式编程的Redux与借鉴了响应式编程理念的 MobX 都是非常不错的状态管理辅助框架，辅助开发者将业务逻辑与视图渲染剥离，更为合理地划分项目结构，更好地贯彻单一职责原则与提升代码的可维护性。在项目构建工具上，以 Grunt、Gulp 为代表的任务运行管理与以 Webpack、Rollup、JSPM 为代表的项目打包工具各领风骚，帮助开发者更好的搭建前端构建流程，自动化地进行预处理、异步加载、Polyfill、压缩等操作。更多讨论参考 [2015-我的前端之路：数据流驱动的界面](https://segmentfault.com/a/1190000004292245)、[2016-我的前端之路：工具化与工程化](https://zhuanlan.zhihu.com/p/24575395)。

本仓库主要包含以下部分：
- 遵循[泛前端知识图谱](https://github.com/wxyyxc1992/FrontendTechnology-Handbook)的[博客列表]()，总结了笔者平日里原创或者翻译的 Web 开发相关的文章或分享。
- 期望能够适用于各个层次的 Web 开发者的 [Web 学习与进阶指南](https://parg.co/b4x) 以及从属于 [AwesomeReference: 程序员成长道路上的阅读学习资料工具集锦](https://parg.co/b4z) 的每个阶段或者知识点关联的[ Web 学习资料索引](https://parg.co/b4T)。
- 博客与进阶指南以及学习资料索引还是偏向于碎片化阅读，笔者根据自己的阅读、写作与实践归纳出的成体系的书籍。需要强调的是，这些书籍并不严谨，只是笔者希望每年能够至少整理出一本电子书，对于自己的成长也是见证。
- 示例代码与开源项目，包括笔者博客与书籍中的示例代码以及日常工作中总结而出的开源项目。

# 书籍列表

- [现代 JavaScript 开发：语法基础与实践技巧【想象中】]()：ES5/ES6/ES7 关键语法、JavaScript 性能优化、JavaScript 样式指南。
- [现代 JavaScript 开发：算法与设计模式【想象中】]()：基于 JavaScript 实现的常见数据结构与算法、设计模式。
- [现代 JavaScript 开发：深入浅出 Node.js 全栈架构【想象中】]()：
- [现代 Web 开发基础【想象中】]()：
- [React 开发与前端工程化实战【写作中】](https://parg.co/b4D)：近年来前端领域百花齐放，各种技术方案争妍斗艳，各领风骚。本书立足于其中的佼佼者 React，深入浅出的介绍 React、Webpack、ES6、Redux、MobX 等常见前端开发工具与开发库的用法，帮助初学者能够迅速成为一名合格前端工程师。而本书也不仅局限于工具使用的层面，探寻各种技术方案背后蕴含的设计思想与架构模式，从前端工程化的角度讨论前端开发者在进阶过程中需要掌握的工程实践、模块化与组件化、质量保障、性能优化等知识要点。最终帮助开发者在前端开发中能够因地制宜的指定合理方案，以尽可能快的速度实现可信赖的产品。


# Web 知识图谱

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/3/1/frontend.png)

# Web 学习与进阶指南

# 开源项目列表

- [external-loader](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/OpenSource/external-loader/README.md):面向React的组件式脚本加载工具

- [fluent-fetcher](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/OpenSource/fluent-fetcher/README.md):基于流式接口的Fetch封装，支持微信小程序

- [isomorphic-urlencode](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/OpenSource/isomorphic-urlencode/README.md):通用的JavaScript URL编解码工具

- [material-ui-extension](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/tree/master/OpenSource/material-ui-extension):对于Material UI的组件类扩展

- [mobile-style-preset](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/tree/master/OpenSource/mobile-style-preset):面向移动端的轻量级非侵入式样式库

- [mobx-react-webpack-boilerplate](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/tree/master/OpenSource/mobx-react-webpack-boilerplate):基于Webpack+MobX+React的模板项目

- [react-swiper](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/tree/master/OpenSource/react-swiper):基于React封装的Swiper

- [scalable-component](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/tree/master/OpenSource/scalable-component):基于React封装的自动按比例缩放的自适应组件容器
