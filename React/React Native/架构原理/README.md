[![返回目录](https://parg.co/UY3)](https://parg.co/U0I)

# React Native 架构原理

React Native 是一个跨平台开发框架，允许开发人员使用 Javascript 构建原生应用程序。RN 和基于 Cordova 的应用程序之间的主要区别在于：基于 Cordova 的应用程序在 Webview 中运行，而 RN 应用程序使用原生视图进行渲染；RN 应用程序可以直接访问底层移动操作系统提供的所有 Native API 和视图，因此具有与本机应用程序相同的开发体验和性能表现。

React Native 并没有直接将 JS 代码编译到相应的本机代码中，因为 Java 和 Objective C 是强类型语言，而 Javascript 则不是。 本质上，React Native 可以被视为一组 React 组件，其中每个组件代表相应的本机视图和组件；例如，TextInput 将具有相应的 RN 组件，该组件可以直接导入到 JS 代码中，并像任何其他 React 组件一样使用。因此，开发人员将像编写任何其他 React Web 应用程序一样编写代码，但输出将是原生应用程序。

# 架构概览

React Native 的 iOS 与 Android 版本的架构大同小异，可以认为大体包含以下三个模块：

- Native Code/Modules:

Bridge 的作用就是给 RN 内嵌的 JS Engine 提供原生接口的扩展供 JS 调用。所有的本地存储、图片资源访问、图形图像绘制、3D 加速、网络访问、震动效果、NFC、原生控件绘制、地图、定位、通知等都是通过 Bridge 封装成 JS 接口以后注入 JS Engine 供 JS 调用。理论上，任何原生代码能实现的效果都可以通过 Bridge 封装成 JS 可以调用的组件和方法, 以 JS 模块的形式提供给 RN 使用。

每一个支持 RN 的原生功能必须同时有一个原生模块和一个 JS 模块，JS 模块是原生模块的封装，方便 Javascript 调用其接口。Bridge 会负责管理原生模块和对应 JS 模块之间的沟通, 通过 Bridge, JS 代码能够驱动所有原生接口，实现各种原生酷炫的效果。RN 中 JS 和 Native 分隔非常清晰，JS 不会直接引用 Native 层的对象实例，Native 也不会直接引用 JS 层的对象实例(所有 Native 和 JS 互掉都是通过 Bridge 层会几个最基础的方法衔接的)。

Bridge 原生代码负责管理原生模块并生成对应的 JS 模块信息供 JS 代码调用。每个功能 JS 层的封装主要是针对 ReactJS 做适配，让原生模块的功能能够更加容易被用 ReactJS 调用。MessageQueue.js 是 Bridge 在 JS 层的代理，所有 JS2N 和 N2JS 的调用都会经过 MessageQueue.js 来转发。JS 和 Native 之间不存在任何指针传递，所有参数都是字符串传递。所有的 instance 都会被在 JS 和 Native 两边分别编号，然后做一个映射,然后那个数字/字符串编号会做为一个查找依据来定位跨界对象。
