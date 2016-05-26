<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Introduction](#introduction)
  - [React Native Advantages](#react-native-advantages)
  - [Reference](#reference)
    - [Tutorials&Docs](#tutorials&docs)
    - [Practice&Resources](#practice&resources)
    - [Blog&News](#blog&news)
    - [Books&Tools](#books&tools)
    - [Boilerplate](#boilerplate)
      - [Snowflake](#snowflake)
- [Quick Start](#quick-start)
  - [Installation](#installation)
    - [Requirements](#requirements)
    - [Create New Application(创建新的应用)](#create-new-application%E5%88%9B%E5%BB%BA%E6%96%B0%E7%9A%84%E5%BA%94%E7%94%A8)
    - [Integrating With Existing Apps](#integrating-with-existing-apps)
  - [Build](#build)
    - [JavaScript Environment(JavaScript运行环境)](#javascript-environmentjavascript%E8%BF%90%E8%A1%8C%E7%8E%AF%E5%A2%83)
    - [React Native Webpack Server](#react-native-webpack-server)
  - [Debug & Test](#debug-&-test)
    - [Chrome Debugger](#chrome-debugger)
    - [Type-Checking with Flow](#type-checking-with-flow)
    - [Testing with Jest](#testing-with-jest)
  - [rnpm:支持依赖Link的React Native 包管理](#rnpm%E6%94%AF%E6%8C%81%E4%BE%9D%E8%B5%96link%E7%9A%84react-native-%E5%8C%85%E7%AE%A1%E7%90%86)
    - [Automatic Linking](#automatic-linking)
    - [Manual Linking](#manual-linking)
  - [Application Exploration(应用探究)](#application-exploration%E5%BA%94%E7%94%A8%E6%8E%A2%E7%A9%B6)
    - [Architecture(应用架构)](#architecture%E5%BA%94%E7%94%A8%E6%9E%B6%E6%9E%84)
    - [Virtual Dom的扩展](#virtual-dom%E7%9A%84%E6%89%A9%E5%B1%95)
    - [载入JavaScript代码](#%E8%BD%BD%E5%85%A5javascript%E4%BB%A3%E7%A0%81)
    - [React Native中的现代JavaScript代码](#react-native%E4%B8%AD%E7%9A%84%E7%8E%B0%E4%BB%A3javascript%E4%BB%A3%E7%A0%81)
- [Deco](#deco)
  - [Setup](#setup)
  - [创建新项目](#%E5%88%9B%E5%BB%BA%E6%96%B0%E9%A1%B9%E7%9B%AE)
  - [运行模拟器](#%E8%BF%90%E8%A1%8C%E6%A8%A1%E6%8B%9F%E5%99%A8)
  - [编写代码](#%E7%BC%96%E5%86%99%E4%BB%A3%E7%A0%81)
  - [实时调试](#%E5%AE%9E%E6%97%B6%E8%B0%83%E8%AF%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Introduction

React Native的优势在于性能比Cordova好，原生的支持比NativeScript这些好。在未来的客户端开发中，负责与用户交互以及存储这一部分建议采用原生的代码，而对于逻辑控制这边，建议是采用JavaScript方式实现。需要注意的是，React Native本质上是用JSX的语法风格编写原生的应用，它本质上还是跨平台编译性质的，并没有提供完整的类似于WebView那样的上下文，并且大量的HTML元素也是不可以直接应用的。React Native只是借用了HTML的语法风格，并且提供了JS与原生的桥接。

## React Native Advantages



## Reference

### Tutorials&Docs

- [introducing-react-native-building-apps-javascript](http://www.raywenderlich.com/99473/introducing-react-native-building-apps-javascript)
- [react-native-example-app](http://tech.taskrabbit.com/blog/2015/09/21/react-native-example-app/)
- [React-Native学习指南](https://github.com/ele828/react-native-guide)
- [用React Native设计的第一个iOS应用](https://www.sdk.cn/news/2333)


### Practice&Resources

- [整理了一份React-Native学习指南](http://www.tuicool.com/articles/zaInUbA)




- [ZhiHuDaily-React-Native](https://github.com/race604/ZhiHuDaily-React-Native?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)



- [learning-react-native-Code：本书的附带的很多教学代码，还是很不错的](https://github.com/bonniee/learning-react-native)



- [React Native Playground](https://rnplay.org/)



- [awesome-react-native](https://github.com/jondot/awesome-react-native)



- [ReactNativeSampleApp](https://github.com/taskrabbit/ReactNativeSampleApp)

![](http://tech.taskrabbit.com/images/posts/react-native-navigation/screenshots.png)

### Blog&News

- [www.reactnative.com](http://www.reactnative.com/)
- [JAVASCRIPT WITHOUT GRAMMAR](http://browniefed.com/)

### Books&Tools

- [learning-react-native](https://www.safaribooksonline.com/library/view/learning-react-native/9781491929049/preface01.html#idp116000)
- [beginning-mobile-app-development-with-react-native](https://leanpub.com/beginning-mobile-app-development-with-react-native?a=0_dCaHBbnEiR_Uy2Ihm_Wk)



### Boilerplate

#### [Snowflake](https://github.com/bartonhammond/snowflake)

A React-Native starter mobile app, or maybe just an example, or maybe a boilerplate (you decide) for iOS and Android with a single code base.

![](http://7xlgth.com1.z0.glb.clouddn.com/8C9DE5C8-B3E3-4ED0-A349-9C5C72BD0D61.png)



# Quick Start

## Installation

### Requirements

1. OS X - 目前ReactNative只支持Mac系统
2. [Homebrew](http://brew.sh/) 
3. 安装NodeJs 4.0或以上版本，推荐使用NVM版本管理器安装：

``` 
​```nvm install node && nvm alias default node```
```

  4.```brew install watchman```

  5.`brew install flow`

### Create New Application(创建新的应用)

``` 
$ npm install -g react-native-cli 
$ react-native init FirstProject 
$ cd FirstProject/
```

创建新的应用之后，可以在iOS的文件夹内看到如下的文件部署：

![File structure in the default project](https://www.safaribooksonline.com/library/view/learning-react-native/9781491929049/assets/firstproject-structure.png)

### Integrating With Existing Apps



## Build

如果是在Xcode中选择运行该项目，或者手动允许编译命令：```npm start```，既可以看到如下的界面：

![The React packager launching](https://www.safaribooksonline.com/library/view/learning-react-native/9781491929049/assets/react-packager.png)

一旦编译打包完成，iOS的模拟器中会启动默认的应用程序，呈现出如下的界面：

![default app screenshot](https://www.safaribooksonline.com/library/view/learning-react-native/9781491929049/assets/default-app-screenshot.png)

> 常见错误
> 
> - TypeError: Cannot read property 'root' of null
>   
>   可以尝试使用```brew update & brew update watchman```
>   
>   或者
>   
>   npm install --registry=[http://registry.npm.taobao.org](http://registry.npm.taobao.org/)
>   
>   ​

### JavaScript Environment(JavaScript运行环境)

在React Native 0.5.0版本之后，React Native已经迁移到了Babel编译器，可以直接查看Babel的官方文档来获取其编译支持的情况。

ES5

- Reserved Words: `promise.catch(function() { });`

ES6

- [Arrow functions](http://babeljs.io/docs/learn-es2015/#arrows): ` this.setState({pressed: true})}`
- [Call spread](http://babeljs.io/docs/learn-es2015/#default-rest-spread): `Math.max(...array);`
- [Classes](http://babeljs.io/docs/learn-es2015/#classes): `class C extends React.Component { render() { return  } }`
- [Destructuring](http://babeljs.io/docs/learn-es2015/#destructuring): `var {isActive, style} = this.props;`
- [Modules](http://babeljs.io/docs/learn-es2015/#modules): `import React, { Component } from 'react-native';`
- [Computed Properties](http://babeljs.io/docs/learn-es2015/#enhanced-object-literals): `var key = 'abc'; var obj = {[key]: 10};`
- Object Consise Method: `var obj = { method() { return 10; } };`
- [Object Short Notation](http://babeljs.io/docs/learn-es2015/#enhanced-object-literals): `var name = 'vjeux'; var obj = { name };`
- [Rest Params](https://github.com/sebmarkbage/ecmascript-rest-spread): `function(type, ...args) { }`
- [Template Literals](http://babeljs.io/docs/learn-es2015/#template-strings): `var who = 'world'; var str = `Hello ${who}`;`

ES7

- [Object Spread](https://github.com/sebmarkbage/ecmascript-rest-spread): `var extended = { ...obj, a: 10 };`
- [Function Trailing Comma](https://github.com/jeffmo/es-trailing-function-commas): `function f(a, b, c,) { }`



### React Native Webpack Server

笔者已经习惯使用Webpack作为模块管理与编译工具，在React Native的开发中，同样可以使用Webpack进行开发，笔者参考的是这个[Repo](https://github.com/mjohnston/react-native-webpack-server)。

- 安装

``` 
npm install --save-dev react-native-webpack-server
```

- 使用

React Native命令行默认会查找index.ios.js或者index.android.js文件作为整个项目的根文件，在Webpack的配置文件中则可以按照Webpack的风格进行如下配置：

``` 
entry: {
  'index.ios': ['./src/main.js']
}
```

完整的webpack.config.js配置文件如下：

``` javascript
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var config = {

  debug: true,

  devtool: 'source-map',

  entry: {
    'index.ios': ['./src/main.js'],
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        stage: 0,
        plugins: []
      }
    }]
  },

  plugins: [],

};

// Hot loader
if (process.env.HOT) {
  config.devtool = 'eval'; // Speed up incremental builds
  config.entry['index.ios'].unshift('react-native-webpack-server/hot/entry');
  config.entry['index.ios'].unshift('webpack/hot/only-dev-server');
  config.entry['index.ios'].unshift('webpack-dev-server/client?http://localhost:8082');
  config.output.publicPath = 'http://localhost:8082/';
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
  config.module.loaders[0].query.plugins.push('react-transform');
  config.module.loaders[0].query.extra = {
    'react-transform': {
      transforms: [{
        transform: 'react-transform-hmr',
        imports: ['react-native'],
        locals: ['module']
      }]
    }
  };
}

// Production config
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
```

在项目的package.json可以添加如下控制脚本：

``` 
"scripts": {
  "bundle": "rnws bundle",
  "start": "rnws start"
}
```

使用```npm start```命令即可开启开发服务器，在代码中设置路径如下即可：

``` objective-c
jsCodeLocation = [NSURL URLWithString:@"http://localhost:8080/index.ios.bundle"];
```

如果需要构建一个发布版本，则可以使用如下命令：

``` javascript
rnws bundle
# OR, using the above package.json script:
npm run bundle
```

## Debug & Test

### Chrome Debugger

在模拟器中使用*CMD+D*命令可以弹出开发者菜单，从该菜单中可以选择打开Chrome或者Safari调试器。而在真实的设备中，可以通过摇晃设备来打开开发者菜单。在Chrome或者Safari中可以查看```console.log```的记录从而方便调试，正如调试React Web一样的效果。不过需要注意的是，如果在频繁的刷新下这种调试会导致应用程序很明显的运行变慢。

![.Working with the Chrome debugger.](https://www.safaribooksonline.com/library/view/learning-react-native/9781491929049/assets/debugger_workflow.png)

### Type-Checking with Flow

在安装React Native开发环境时官方就推荐了Flow作为开发辅助工具，Flow是一个用于静态类型检查的JavaScript的开发库。Flow依赖于类型推导来检测代码中可能的类型错误，并且允许逐步向现存的项目中添加类型声明。如果需要使用Flow，只需要用如下的命令：

``` 
flow check
```

一般情况下默认的应用中都会包含一个*.flowconfig*文件，用于配置Flow的行为。如果不希望flow检查全部的文件，可以在*.flowconfig*文件中添加配置进行忽略：

``` 
[ignore]
.*/node_modules/.*
```

最终检查的时候就可以直接运行：

``` shell
$ flow check
$ Found 0 errors.
```

### Testing with Jest

React Native支持使用Jest进行React组件的测试，Jest是一个基于Jasmine的单元测试框架，它提供了自动的依赖Mock，并且与React的测试工具协作顺利。

``` 
npm install jest-cli --save-dev
```

可以将test脚本加入到package.son文件中：

``` javascript
{
  ...
  "scripts": {
    "test": "jest"
   }
   ...
}
```

直接使用*npm test*命令直接运行jest命令，下面可以创建tests文件夹，Jest会递归搜索tests目录中的文件，这些测试文件中的代码如下：

``` javascript
'use strict';

describe('a silly test', function() {
 it('expects true to be true', function() {
   expect(true).toBe(true);
 });
});
```

而对于一些复杂的应用可以查看React Native的官方文档，以其中一个getImageSource为例：

``` javascript
**
 * Taken from https://github.com/facebook/react-native/blob/master/Examples/Movies/__tests__/getImageSource-test.js
 */

'use strict';

jest.dontMock('../getImageSource');
var getImageSource = require('../getImageSource');

describe('getImageSource', () => {
  it('returns null for invalid input', () => {
    expect(getImageSource().uri).toBe(null);
  });
  ...
});
```

因为Jest是默认自动Mock的，所以需要对待测试的方法设置dontMock.


## [rnpm](https://github.com/rnpm/rnpm):支持依赖Link的React Native 包管理

![](https://camo.githubusercontent.com/9b7152bc6c5ca19ea470aae7860617840f65ce19/687474703a2f2f7331382e706f7374696d672e6f72672f6578376f6c61646a742f6c6f676f726e706d5f66696e616c342e706e67)

rnpm是一个社区项目，允许自动在你的项目中链接本地依赖。

### Automatic Linking

- Installation



直接使用`npm`命令即可以全局安装：

```

npm install rnpm -g

```

注意，`rnpm`需要node 4.1或者以上版本。

- 安装依赖



```

npm install <library-with-native-dependencies> --save

```



- 将依赖链接到项目

```

rnpm link

```

### Manual Linking

（1）Step 1

如果你使用的依赖项目中含有本地代码，那么在它的源代码文件中就会包含一个`.xcodeproj`文件，将该文件在Xcode中拖拽到项目里，一般来说就是`Libraries`分组：

![](https://facebook.github.io/react-native/img/AddToLibraries.png)

（2）Step 2

将编译好的文件添加到编译上下文中：

![](https://facebook.github.io/react-native/img/AddToBuildPhases.png)

（3）Step 3

将头文件添加到搜索路径中：

![](https://facebook.github.io/react-native/img/AddToSearchPaths.png)





## Application Exploration(应用探究)


### Architecture(应用架构)

当使用react-native命令创建新的项目时，调用的即https://github.com/facebook/react-native/blob/master/react-native-cli/index.js这个脚本。当使用```react-native init HelloWorld```创建一个新的应用目录时，它会创建一个新的HelloWorld的文件夹，包含如下列表：

> HelloWorld.xcodeproj/
> 
> Podfile
> 
> iOS/
> 
> Android/
> 
> index.ios.js
> 
> index.android.js
> 
> node_modules/
> 
> package.json

React Native最大的卖点在于（1）可以使用JavaScript编写iOS或者Android原生程序。（2）应用可以运行在原生环境下并且提供流畅的UI与用户体验。众所周知，iOS或者Android并不能直接运行JavaScript代码，而是依靠类似于UIWebView这样的原生组件去运行JavaScript代码，也就是传统的混合式应用。整个应用运行开始还是自原生开始，不过类似于Objective-C/Java这样的原生代码只是负责启动一个WebView容器，即没有浏览器界面的浏览器引擎。

而对于React Native而言，并不需要一个WebView容器去执行Web方面的代码，而是将所有的JavaScript代码运行在一个内嵌的JavaScriptCore容器实例中，并最终渲染为高级别的平台相关的组件。这里以iOS为例，打开HelloWorld/AppDelegate.m文件，可以看到如下的代码：

``` objective-c
.....................
RCTRootView *rootView = [[RCTRootView alloc] 	
initWithBundleURL:jsCodeLocation
moduleName:@"HelloWorld"
launchOptions:launchOptions];
.....................
```

AppDelegate.m文件本身是iOS程序的入口，相信每一个有iOS开发经验的同学都不会陌生，这也是本地的Objective-C代码与React Native的JavaScript代码胶合的地方。而这种胶合的关键就是RCTRootView这个组件，可以从React声明的组件中加载到Native的组件。RCTRootView组件是一个由React Native提供的原生的Objective-C类，可以读取React的JavaScript代码并且执行，除此之外，也允许我们从JavaScript代码中调用iOS UI的组件。

到这里我们可以看出，React Native并没有将JavaScript代码编译转化为原生的Objective-C或者Swift代码，但是这些在React中创建的组件渲染的方式也非常类似于传统的Objective-C或者Swift创建的基于UIKit的组件，并不是类似于WebView中网页渲染的结果。

这种架构也就很好地解释了为什么可以动态加载我们的应用，当我们仅仅改变了JS代码而没有原生的代码改变的时候，不需要去重新编译。RCTRootView组件会监听```Command+R```组合键然后重新执行JavaScript代码。

### Virtual Dom的扩展

Virtual Dom是React的核心机制之一，对于Virtual Dom的详细说明可以参考笔者React系列文章。在React组件被用于原生渲染之前，Clipboard已经将React用于渲染到HTML的Canvas中，可以查看[render React to the HTML element](https://github.com/Flipboard/react-canvas)这篇文章。对于React Web而言，就是将React组件渲染为DOM节点，而对于React Natively而言，就是利用原生的接口把React组件渲染为原生的接口，其大概示意图可以如下：

![React Native behaves much like React, but can render to many different targets.](https://www.safaribooksonline.com/library/view/learning-react-native/9781491929049/assets/render-targets.png)

虽然React最初是以Web的形式呈现，但是React声明的组件可以通过*bridge*，即不同的桥接器转化器会将同样声明的组件转化为不同的具体的实现。React在组件的render函数中返回具体的平台中应该如何去渲染这些组件。对于React Native而言，```<View/>```这个组件会被转化为iOS中特定的```UIView```组件。

### 载入JavaScript代码

React Native提供了非常方便的动态调试机制，具体的表现而言即是允许以一种类似于中间件服务器的方式动态的加载JS代码，即

``` objective-c
jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle"];
```

另一种发布环境下，可以将JavaScript代码打包编译，即```npm build```：

``` objective-c
jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```

如果在Xcode中直接运行程序会自动调用```npm start```命令来启动一个动态编译的服务器，如果没有自动启动可以手动的使用```npm start```命令，就如定义在package.json文件中的，它会启动node_modules/react-native/packager/packager.sh这个脚本。

### React Native中的现代JavaScript代码

从上文中可以看出，React Native中使用的是所谓的JSX以及大量的ES6的语法，在打包器打包之前需要将JavaScript代码进行一些转换。这是因为iOS与Android中的JavaScript解释器目前主要还是支持到了ES5版本，并不能完全识别React Native中提供的语法或者关键字。当然，并不是说我们不能使用ES5的语法去编写React Native程序，只是最新的一些语法细则规范可以辅助我们快速构建高可维护的应用程序。

譬如我们以JSX的语法编写了如下渲染函数：

``` javascript
render: function() {
  return (
    <View style={styles.container}>
      <TextInput
      style={styles.nameInput}
      onChange={this.onNameChanged}
      placeholder='Who should be greeted?'/>
      <Text style={styles.welcome}>
      Hello, {this.state.name}!</Text>
      <Text style={styles.instructions}>
      To get started, edit index.ios.js
      </Text>
      <Text style={styles.instructions}>
      Press Cmd+R to reload,{'\n'}
      Cmd+Control+Z for dev menu
      </Text>
    </View>
  );
}
```

在JS代码载入之前，React打包器需要首先将JSX语法转化为ES5的表达式：

``` javascript
render: function() {
  return (
  	React.createElement(View, {style: styles.container},
    React.createElement(TextInput, {
    style: styles.nameInput,
    onChange: this.onNameChanged,
    placeholder: "Who should be greeted?"}),
    React.createElement(Text, {style: styles.welcome},
    "Hello, ", this.state.name, "!"),
    React.createElement(Text, {style: styles.instructions},
    "To get started, edit index.ios.js"
    ),
    React.createElement(Text, {style: styles.instructions},
    "Press Cmd+R to reload,", '\n',
    "Cmd+Control+Z for dev menu"
    )
  )
);
}
```

另一些比较常用的语法转换，一个是模块导入时候的结构器，即我们常常见到模块导入：

``` javascript
var React = require('react-native');
var {
AppRegistry,
StyleSheet,
Text,
TextInput,
View,
} = React;
```

上文中的用法即是所谓的解构赋值，一个简单的例子如下：

``` javascript
var fruits = {banana: "A banana", orange: "An orange", apple: "An apple"};
var { banana, orange, apple } = fruits;
```

那么我们在某个组件中进行导出的时候，就可以用如下语法：

``` javascript
module.exports.displayName = "Name";
module.exports.Component = Component;
```

而导入时，即是：

``` javascript
var {Component} = require("component.js");
```

另一个常用的ES6的语法即是所谓的Arrow Function，这有点类似于Lambda表达式：

``` javascript
AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
```

会被转化为：

``` javascript
AppRegistry.registerComponent('HelloWorld', function() {return HelloWorld;});
```




# [Deco](https://www.decosoftware.com/docs/getting-started)

今天逛Reddit，偶然看到了Deco，觉得很不错，特地开个单章安利一波，下载地址[这里](https://www.decosoftware.com/download)，国内有点卡，可以考虑proxychains爬梯子。在刚才的Quick Start里面介绍的基本的搭建RN开发环境，还是有点麻烦的，而Deco就是一个整体的打包IDE，可以开箱即用，这个对初学者很有优势。另外它还内置了很多的组件模板，可以利用拖拽方式加入到代码中，同时，它还支持热替换等等功能。

![](https://camo.githubusercontent.com/f31b730a41bf5a0a6a22cb64bcaa8ced499a85b1/687474703a2f2f692e696d6775722e636f6d2f4b6f5a72576f462e706e67)



## Setup

要使用Deco，你首先需要安装好Xcode与npm 3.0+环境，安装好了之后你就可以直接打开IDE了：

![](https://www.decosoftware.com/images/docs/xcode-plus-deco.png)



## 创建新项目

在打开Deco之后，点击"Create New Project"即可创建一个新项目，也可以选择已有的项目。

![](https://www.decosoftware.com/images/docs/new-project-button.png)

一个基本的Deco项目包含以下几个部分：

- **android/** - The files necessary to open your project in Android Studio and build for Android.

- **ios/** - The files necessary to open your project in Xcode and build for iOS.

- **node_modules/** - The node modules needed for your React Native project to run.

- **.flowconfig** - If you want to use Facebook's flow language, which adds static typechecking for JavaScript, use this file to configure your project's flow settings.

- **.gitignore** - Default files for git to ignore

- **.watchmanconfig** - Used to configure Facebook Watchman, the file watcher used by the React Native packager.

- **index.ios.js** - The entry point for your React Native app on iOS.

- **index.android.js** - The entry point for your React Native app on Android.

- **package.json** - Describes this project and lists its npm dependencies.



如果你希望创建一个特定版本的RN项目，那么需要你手动执行`react-native init`命令了，然后再导入进来就好。

## 运行模拟器

在Deco顶部的Simulator按钮内就有iOS模拟器，可以直接选择使用：

![](https://www.decosoftware.com/images/docs/launch-simulator-2.png)

同样的可以用`Cmd+D`来打开调试台，可以通过底部的`Packager Output`来查看输出。如果是Android，那需要在命令行里手动开启：

```

react-native run-android

```



## 编写代码

Deco支持帮你自动插入代码，大概就是下面这个样子：

![](https://www.decosoftware.com/images/docs/insert-segmented-control.gif)

Deco还提供了一个搜索部分，可以允许你自动搜索npm，然后帮你自动下载并且添加依赖，大概是这个样子：

![](https://www.decosoftware.com/images/docs/deco-component-browser.png)

Deco插入组件主要也支持两种方式：

（1）拖拽组件进你的代码

![](https://www.decosoftware.com/images/docs/drag-and-drop-component.gif)

（2）使用⌘+i 来进行自动补全

![](https://www.decosoftware.com/images/docs/insert-component-hotkey.gif)



## 实时调试

Deco还支持帮你调整组件属性，譬如以调整颜色为例，你可以这样：

![](https://www.decosoftware.com/images/docs/segmented-control-tint-color.gif)

