


# 现代 Web 应用架构与性能调优


`Copyright © 2017 王下邀月熊`



# 前言


# 目录

- [MVVM](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/MVVM/Index.md) 
    - [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/MVVM/Index.md):  
    - [VirtualDOM](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/MVVM/VirtualDOM.md): Virtual DOM Insights## Reference# DOM Representation 
    - [高性能 DOM 变化监听与响应](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/MVVM/%E9%AB%98%E6%80%A7%E8%83%BD%20DOM%20%E5%8F%98%E5%8C%96%E7%9B%91%E5%90%AC%E4%B8%8E%E5%93%8D%E5%BA%94.md):  
- [MobX](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/MobX/Index.md) 
    - [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/MobX/Index.md):  
- [PWA](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/PWA/Index.md) 
    - [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/PWA/Index.md):  
    - [PWA 概述](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/PWA/PWA%20%E6%A6%82%E8%BF%B0.md): 离线优先 
    - [ServiceWorker](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/PWA/ServiceWorker.md): ServiceWorkerA web worker is a JavaScript script executed from an HTML page that runs in the background, independently of other user-interface scripts that may also have been executed from the same HTML page.Mimics multithreading, allowing intensive scripts to be run in the background so they do not block other scripts from running. Ideal for keeping your UI responsive while also performing processor-intensive functions. Cannot directly interact with the DOM. Communication must go through the Web Worker’s postMessage method. 
    - [离线存储](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/PWA/%E7%A6%BB%E7%BA%BF%E5%AD%98%E5%82%A8.md):  
- [Redux](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/Redux/Index.md) 
    - [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/Redux/Index.md):  
- [SPA](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/SPA/Index.md) 
    - [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/SPA/Index.md):  
    - [前端路由](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/SPA/%E5%89%8D%E7%AB%AF%E8%B7%AF%E7%94%B1.md): 前端路由 
- [WebComponents](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/WebComponents/Index.md) 
    - [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/WebComponents/Index.md):  
- [响应式开发](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/响应式开发/Index.md) 
    - [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%BC%80%E5%8F%91/Index.md):  
    - [响应式尺寸](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%BC%80%E5%8F%91/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%B0%BA%E5%AF%B8.md): Element Query 
    - [响应式布局与自动缩放](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%BC%80%E5%8F%91/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%B8%83%E5%B1%80%E4%B8%8E%E8%87%AA%E5%8A%A8%E7%BC%A9%E6%94%BE.md): Auto Resize:自动缩放## CSS Responsive Grid System 
    - [响应式设计](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%BC%80%E5%8F%91/%E5%93%8D%E5%BA%94%E5%BC%8F%E8%AE%BE%E8%AE%A1.md): 响应式设计 
- [性能优化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/性能优化/Index.md) 
    - [Index](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/Index.md): Web 应用性能优化 
    - [Web 应用运行机制](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/Web%20%E5%BA%94%E7%94%A8%E8%BF%90%E8%A1%8C%E6%9C%BA%E5%88%B6.md): Rendering![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/6/4/56A2BDBE-4ABE-4269-B961-2BB1EA253F48.png) 
    - [交互与动画](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/%E4%BA%A4%E4%BA%92%E4%B8%8E%E5%8A%A8%E7%94%BB.md): 交互与动画 
    - [关键渲染路径](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/%E5%85%B3%E9%94%AE%E6%B8%B2%E6%9F%93%E8%B7%AF%E5%BE%84.md): 关键路径渲染 
    - [图片优化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/%E5%9B%BE%E7%89%87%E4%BC%98%E5%8C%96.md): 图片优化 
    - [性能评测](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/%E6%80%A7%E8%83%BD%E8%AF%84%E6%B5%8B.md): Web 应用性能评测 
    - [移动端优化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E4%BC%98%E5%8C%96.md):  
    - [脚本解析与执行](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/%E8%84%9A%E6%9C%AC%E8%A7%A3%E6%9E%90%E4%B8%8E%E6%89%A7%E8%A1%8C.md): 脚本解析与执行 
    - [资源请求与缓存](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/%E8%B5%84%E6%BA%90%E8%AF%B7%E6%B1%82%E4%B8%8E%E7%BC%93%E5%AD%98.md): 资源请求与缓存 
    - [页面布局与渲染策略](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/%E9%A1%B5%E9%9D%A2%E5%B8%83%E5%B1%80%E4%B8%8E%E6%B8%B2%E6%9F%93%E7%AD%96%E7%95%A5.md): 页面布局与渲染策略 
- [状态管理](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/状态管理/Index.md) 
    - [状态管理概述](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86/%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E6%A6%82%E8%BF%B0.md):  
    - [状态类型划分](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86/%E7%8A%B6%E6%80%81%E7%B1%BB%E5%9E%8B%E5%88%92%E5%88%86.md): 状态类型划分 
- [组件化](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/Modern-Web-Application-Architecture-And-Performance-Optimization/组件化/Index.md) 
    - [基于组件的设计工作流](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E7%BB%84%E4%BB%B6%E5%8C%96/%E5%9F%BA%E4%BA%8E%E7%BB%84%E4%BB%B6%E7%9A%84%E8%AE%BE%E8%AE%A1%E5%B7%A5%E4%BD%9C%E6%B5%81.md): 何谓 Component Based Design？简而言之，Component Based Design 就是将整个 UI 切分为更小的、更可控的具有清晰命名的部分。而这些细小的部分又可以划分为如下 6 个不同的分组。 
    - [组件化概述](https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices/blob/master/Modern-Web-Application-Architecture-And-Performance-Optimization/%E7%BB%84%E4%BB%B6%E5%8C%96/%E7%BB%84%E4%BB%B6%E5%8C%96%E6%A6%82%E8%BF%B0.md): 组件化 



# 狗粮
如果觉得本系列对你有所帮助，欢迎给我家布丁买点狗粮（支付宝扫码）~




![](https://github.com/wxyyxc1992/OSS/blob/master/2017/8/1/Buding.jpg?raw=true)





# 参考


# 版权



![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)



![](https://parg.co/bDm)



笔者所有文章遵循 [知识共享 署名-非商业性使用-禁止演绎 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh)，欢迎转载，尊重版权。

