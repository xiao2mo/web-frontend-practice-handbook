







[![](https://parg.co/UbM)](https://parg.co/bWg)

# 基于 create-react-app 的快速开发与应用调试





React，或者说React+Redux+Webpack形成的一套完整的开发体系与项目结构是笔者目前的选择，但是正如很多人吐槽的，整个React社区对初学者实在太不友好了。就好像之前对于Java的吐槽，Python中HelloWord就一行，但是Java里你要专门去建个类。有时候太多的选择反而只会带来痛苦。所以在这里笔者想先说一句，使用你能够学会的，做到你能力范围内最好的即可，不然只会带来无尽的半成品。


# Setup
基本的React的页面形式如下所示：

``` html
    <!DOCTYPE html>
    <html>
      <head>
        <script src="../build/react.js"></script>
        <script src="../build/JSXTransformer.js"></script>
      </head>
      <body>
        <div id="example"></div>
        <script type="text/jsx">
          // ** Our code goes here! **
        </script>
      </body>
    </html>
```
React独创了一种JS、CSS和HTML混写的JSX格式，可以通过在页面中引入JSXTransformer这个文件进行客户端的编译，不过还是推荐在服务端编译。
``` javascript
var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});
React.render(
  <HelloMessage name="John" />,
  document.getElementById('container')
);
```

React.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。要注意的是，React的渲染函数并不是简单地把HTML元素复制到页面上，而是维护了一张Virtual Dom映射表。

``` javascript
class ExampleComponent extends React.Component {
 constructor() {
  super();
  this. _handleClick = this. _handleClick.bind(this);
  this.state = Store.getState();
 }
 // ...
}
```

在对于React的基本语法有了了解之后，下面我们会开始进行快速地环境搭建与实验。
## [create-react-app](https://github.com/facebookincubator/create-react-app):来自Facebook官方的零配置命令行工具
create-react-app是来自于Facebook出品的零配置命令行工具，能够帮你自动创建基于Webpack+ES6的最简易的React项目模板，有助于初学者快速上手实践。安装create-react-app的方式也非常简单，可以直接使用`npm`命令进行全局安装。

```npm install -g create-react-app

create-react-app my-app
cd my-app/
npm start
```
执行完上述命令之后，你可以直接打开`http://localhost:3000`，即可以看到你React APP的运行效果。此时也是处于开发模式下，如果你要进行发布，则使用`npm run build`进行编译。
![](https://camo.githubusercontent.com/506a5a0a33aebed2bf0d24d3999af7f582b31808/687474703a2f2f692e696d6775722e636f6d2f616d794e66434e2e706e67)
`create-react-app`生成的目录格式如下所示:

```my-app/
  README.md
  index.html
  favicon.ico
  node_modules/
  package.json
  src/
    App.css
    App.js
    index.css
    index.js
    logo.svg
```
如果你是使用`npm start`来启动配置，那么自动会进入开发模式，此时热替换是处于自动激活状态，你也可以实时地在界面或者命令行中看到错误提示:
![](https://camo.githubusercontent.com/41678b3254cf583d3186c365528553c7ada53c6e/687474703a2f2f692e696d6775722e636f6d2f466e4c566677362e706e67)
如果你使用`npm run build`来编译得到生产环境，此时代码会被编译到`build`目录下，此时会自动将整个应用打包发布，它会自动使用Webpack控件进行优化与压缩。


## Multiple Application Configuration:真实环境下单项目多应用配置
上述所讲的`create-react-app`是来自于Facebook官方，不过笔者在自己的真实应用开发中还是习惯使用[Webpack-React-Redux-Boilerplate](https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/tree/boilerplate)，其允许在一个项目中配置多个应用入口，同时支持开发模式、构建模式与库构建模式。同时笔者习惯不将webpack配置文件分成单独的dev与prod文件，而是合并到一个文件中。如果需要使用该模板，直接使用如下命令:
```
git clone -b boilerplate https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/ # 克隆模板文件夹
./install.sh # 安装运行所需要的依赖项
```
得到的模本文件夹主要由以下构成:
```
├── README.md

├── README.zh.md

├── dev-config : 配置文件入口

│   ├── apps.config.js : 应用配置文件

│   ├── dev.html : 开发模式下使用的HTML文件

│   ├── devServer.js : 开发服务器

│   ├── eslint.js : ESLint配置文件

│   ├── template.html : 构建模式下推荐的HTML模板文件

│   └── webpack.config.js : webpack配置文件

├── install.sh 

├── package.json

└── src : 源代码目录

    ├── count : 某个应用

    │   ├── App.js

    │   ├── async_library.js

    │   ├── colors.js

    │   ├── count.html

    │   └── count.js

    ├── helloworld

    │   ├── App.css

    │   ├── App.js

    │   ├── helloworld.css

    │   ├── helloworld.html

    │   ├── helloworld.js

    │   └── logo.svg

    ├── library

    │   ├── foo.js

    │   ├── library.html

    │   └── library_portal.js

    └── vendors.js
```

其核心的关于应用的配置文件即`apps.config.js`，在模板项目中其配置为:
```

/**
 * Created by apple on 16/6/8.
 */
module.exports = {
    apps: [
        //HelloWorld
        {
            id: "helloworld",
            title: "HelloWorld",
            entry: {
                name: "helloworld",
                src: "./src/helloworld/helloworld.js"
            },
            indexPage: "./src/helloworld/helloworld.html",
            compiled: true
        },
        //Count
        {
            id: "count",
            title: "Count",
            entry: {
                name: "count",
                src: "./src/count/count.js"
            },
            indexPage: "./src/count/count.html",
            compiled: true
        }
    ],


    //开发服务器配置
    devServer: {
        appEntrySrc: "./src/helloworld/helloworld.js", //当前待调试的APP的编号
        port: 3000 //监听的Server端口
    },


    //如果是生成的依赖库的配置项
    library: {
        name: "library_portal",//依赖项入口名
        entry: "./src/library/library_portal.js",//依赖库的入口,
        library: "libraryName",//生成的挂载在全局依赖项下面的名称
        libraryTarget: "var"//挂载的全局变量名
    }
};
```
### 开发模式
开发模式下主要读取`apps.config.js`中的`devServer`配置，主要是可以配置调试的入口JS文件与开发服务器监听的端口号。开发模式下会自动使用`dev.html`作为默认的HTML文件传输到浏览器中展示，譬如在模板项目中是将helloworld项目作为当前正在开发的项目，切换到项目目录下使用`npm start`，即可开启开发模式，此时在浏览器内打开`http://localhost:3000`，即可以看到如下画面:
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/7/3/8775DB19-1394-41FB-9CA0-645936E35E86.png)
开发模式默认是支持热加载机制，另外，因为笔者经常需要进行移动端开发，因此需要在局域网内使用手机端进行访问，目前开发模式已经支持以LAN地址进行访问，你可以直接在其他端输入`http://192.168.1.1:3000`即可。
### 构建模式

对于应用中存在的多应用入口，主要是在`apps.config.js`中的apps下进行配置的，一个典型的应用配置为:
```

            id: "helloworld", //编号
            title: "HelloWorld", //生成的HTML文件中的标题
            entry: {
                name: "helloworld", //用于webpack的入口名
                src: "./src/helloworld/helloworld.js" //入口文件地址
            },
            indexPage: "./src/helloworld/helloworld.html", //HTML模板文件地址
            compiled: true //是否进行编译
```
我们使用`npm run build`即可以自动进行打包，同样的，会自动进行代码压缩与优化，同时还会将CSS提取到一个单独的文件中，以在文件头部引入。对于图片等资源也会自动放置到dist目录下。如果你使用`npm run deploy`，则会自动地建立一个监听dist目录的HTTP Server，譬如在模板项目中使用`npm run deploy`，然后再访问`http://localhost:8080`，既可以得到如下界面:
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/7/3/B1C9E083-02E5-4507-9C79-66E9EF92BECE.png)
另外，构建模式下也默认设置了`vendors`这个公共的Chunk来进行公共代码提取，建议是将React等公共代码的引入放置到`src/vendors.js`文件中，这样多应用之间共享的公共代码就会被提取出来。


### 库构建模式
有时候，我们希望使用Webpack编译好的函数能够直接在Global作用域下使用，或者能够通过AMD/CMD规范引入，最直观的用法就是能够直接挂载在script标签下使用。关于此部分的理论说明参考[Webpack Configuration](https://github.com/wxyyxc1992/web-frontend-practice-handbook/blob/master/builder/webpack/webpack-configuration.md#library)。在模板项目中，关于库构建的配置在:
```
    //如果是生成的依赖库的配置项
    library: {
        name: "library_portal",//依赖项入口名
        entry: "./src/library/library_portal.js",//依赖库的入口,
        library: "libraryName",//生成的挂载在全局依赖项下面的名称
        libraryTarget: "var"//挂载的全局变量名
}
```
我们首先构建一个基于ES6类的服务:
```/**
 * Created by apple on 16/7/23.
 */

/**
 * @function 基于ES6的服务类
 */
export class FooService {

    static echo(){

        const fooService = new FooService();

        return fooService.getMessage();
    }

    /**
     * @function 默认构造函数
     */
    constructor() {
        this.message = "This is Message From FooService!";
    }

    getMessage() {
        return this.message;
    }

}
```
然后设置一个模板的入口文件:
```/**
 * Created by apple on 16/7/23.
 */
import {FooService} from "./foo";

/**
 * @function 配置需要暴露的API
 * @type {{foo: {echo: FooService.echo}}}
 */
module.exports = {

    foo: {
        echo: FooService.echo
    }

};
```
注意，暴露出来的接口貌似只能是静态函数。最后我们使用`npm run build:library`进行库构建，构建完成后再HTML文件中可以如此使用:
```alert(window.libraryName.foo.echo());

```


## StarterKit

### [react-slingshot](https://github.com/coryhouse/react-slingshot)
### [redux-easy-boilerplate](https://github.com/anorudes/redux-easy-boilerplate)
### [react-production-starter](https://github.com/jaredpalmer/react-production-starter)

# ES6

> [refactoring-react-components-to-es6-classes](http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes)

ES6是一门非常让人兴奋的语法规范，而React自身的譬如JSX这样的语法也是别具特色，笔者一贯坚持从现在开始就广泛使用ES6。而在React的实践编程中，如果需要完全使用ES6语法进行开发，需要注意以下几点。

## 使用Class代替createClass

- Before

``` javascript
var ExampleComponent = React.createClass({
 render: function() { 
  return <div onClick={this._handleClick}>Hello, world.</div>;
 },
 _handleClick: function() {
  console.log(this);
 }
});
```

- After，这里要注意将类的方法绑定到当前对象，避免在方法内部this指针被覆盖

``` javascript
class ExampleComponent extends React.Component {
 constructor() {
  super();
  this. _handleClick = this. _handleClick.bind(this);
 }
 render() { 
  return <div onClick={this._handleClick}>Hello, world.</div>;
 }
 _handleClick() {
  console.log(this); // this is an ExampleComponent
 }
}
```

## 在Constructor中初始化State

如果使用createClass方法创建一个Component组件，可以自动调用它的getInitialState方法来获取初始化的State对象，但是在ES6的Class中并不会如此自动调用，因此，要稍作修改。


- Before

``` javascript
class ExampleComponent extends React.Component {
 getInitialState() {
  return Store.getState();
 }
 constructor() {
  super();
  this. _handleClick = this. _handleClick.bind(this);
 }
 // ...
}
```

- After

``` javascript
class ExampleComponent extends React.Component {
 constructor() {
  super();
  this. _handleClick = this. _handleClick.bind(this);
  this.state = Store.getState();
 }
 // ...
}
```

## Mixin

``` 
Mixin是React中非常好用的一个功能，但是ES6提倡的面向对象，即使用类继承等方式来进行传递。如果需要在ES6中继续使用Mixin，特别是大量现存的React Library中的Mixin功能，可以有以下几种方式：
```

- 使用extends继承，然后在对应方法中调用父类方法。
- 参考[react-mixin](https://github.com/brigand/react-mixin)这个库。


## propTypes
在React中可以通过设置propTypes来对输入的Props进行格式校验，而如果是利用的ES6的语法的话，可以在类中通过如下方式来设置：
```// JPlayer component
class JPlayer extends React.Component {
  static propTypes = {
    sources: React.PropTypes.array.isRequired
  }
......
}

//或者以类属性的方式
JPlayer.propTypes = {
    sources: React.PropTypes.array.isRequired
  }
```


# jQuery Integration
目前，我们项目中不可避免的还会存在大量的基于jQuery的插件，这些插件也确实非常的好用呦，通常我们会采取将jQuery插件封装成一个React组件的方式来进行调用，譬如我们需要调用一个用于播放的jQuery插件JPlayer，那么可以以如下方式使用：
```// JPlayer component
class JPlayer extends React.Component {
  static propTypes = {
    sources: React.PropTypes.array.isRequired
  }
  componentDidMount () {
     $(this.refs.jplayer).jPlayer({
      ready: () => {
        $(this.refs.jplayer).jPlayer("setMedia", this.props.sources);
      },
      swfPath: "/js",
      supplied: _.keys(this.props.sources)
    });
  } 
  componentWillUmount () {
    // I don't know jPlayer API but if you need to destroy it do it here.
  }
  render () {
    return <div ref='jplayer' className='jplayer'/>
  }
}

// Use it in another component...
<JPlayer sources={{m4a: "/media/mysound.mp4", oga: "/media/mysound.ogg"}}/>

```
# Utils


## [React Devtools](https://github.com/facebook/react-devtools)
React Devtools是React官方提供的类似于浏览器调试台的插件，可以允许以查看组件的层次、各个组件的Props、States等等信息。使用方式也很简单，直接在Firefox或者Chrome的加载项仓库中搜索下载即可。
![](https://github.com/facebook/react-devtools/raw/master/images/devtools-full.gif)


## [React-StoryBook](https://github.com/kadirahq/react-storybook):开发中独立于APP查看React组件


![](https://github.com/kadirahq/react-storybook/raw/master/docs/react_storybook_screenshot.png)
React Storybook可以在你开发的过程中将React组件独立于整个应用程序进行查看，其主要特征为：
- 独立的组件运行环境
- 组件的热加载
- 可以与Redux、Relay以及Meteor无缝集成
- 支持CSS
### Quick Start
#### Installation
首先需要将React Storybook添加到应用中，使用npm进行安装即可：
```npm i --save-dev @kadira/storybook
```
然后，将运行脚本添加到`package.json`文件中：
```{
  ...
  "scripts": {
    "storybook": "start-storybook -p 9001"
  }
  ...
}
```
接下来，你就可以直接输入`npm run storybook`然后启动开发模块。
#### 编写测试用的Story
在测试环境搭建完成之后需要编写一些Stories，即是测试故事。基本来说，一个Story就是一个单独的组件的视图，有点类似与一个测试用例，但是可以在Storybook UI中直接查看。一个典型的测试Story如下所示：
```

// components/stories/button.js

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('Button', module)
  .add('with text', () => (
    <button onClick={action('clicked')}>My First Button</button>
  ))
  .add('with no text', () => (
    <button></button>
  ));
```


#### Configuration
在编写好了Story之后需要告诉Storybook应该如何加载，需要进行一些简单的配置，只要添加如下类似的内容到`.storybook/config.js`中：
```

import { configure } from '@kadira/storybook';

function loadStories() {
  require('../components/stories/button');
  // require as many stories as you need.
}

configure(loadStories, module);
```

接下来，可以直接使用`npm run storybook`来运行界面。
#### CSS Support
有时候，我们需要在进行组件预览的时候导入额外的CSS文件，如果直接是在组件的JS内引入的CSS则可以直接使用，譬如你可以直接使用Material UI。而如果是使用Webpack的话可以在config文件中添加如下webpack.config(`.storybook/webpack.config.js`):
```

var path = require('path')
var webpack = require('webpack')

module.exports = {

  ...

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css?$/,
        loaders: [ 'style', 'raw' ],
        include: __dirname
      }
    ]
  }
}
```
如果是使用Meteor的话，可以在Meteor app中添加如下配置：
```

const path = require('path');
module.exports = {
  module: {
    loaders: [
      {
        test: /\.css?$/,
        loaders: [ 'style', 'raw' ],
        include: path.resolve(__dirname, '../')
      }
    ]
  }
}



```
### Stories
#### Redux
- 组件
```
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'


class TodoItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false
    }
  }


  handleDoubleClick() {
    this.setState({ editing: true })
  }


  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo(id, text)
    }
    this.setState({ editing: false })
  }


  render() {
    const { todo, completeTodo, deleteTodo } = this.props


    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.id, text)} />
      )
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => completeTodo(todo.id)} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {todo.text}
          </label>
          <button className="destroy"
                  onClick={() => deleteTodo(todo.id)} />
        </div>
      )
    }


    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}


TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
}


export default TodoItem
```
- Story
```
import React from 'react';
import TodoItem from '../TodoItem';
import { storiesOf, action } from '@kadira/storybook';


storiesOf('TodoItem', module)
  .add('not completed', () => {
    const todo = {
      id: 'the-id',
      text: 'Hello Todo',
      completed: false
    };


    return getItem(todo);
  })
  .add('completed', () => {
    const todo = {
      id: 'the-id',
      text: 'Hello Todo',
      completed: true
    };


    return getItem(todo);
  });




function getItem(todo) {
  return (
    <div className="todoapp">
      <div className="todo-list">
        <TodoItem
          todo={todo}
          editTodo={action('editTodo')}
          deleteTodo={action('deleteTodo')}
          completeTodo={action('completeTodo')}/>
      </div>
    </div>
  );
}
```


## HTML2JSX:智能地将HTML文件转化为JSX格式

对于大量现存的基于HTML开发的网页，我们可能需要将它们转化为JSX的语法，笔者推荐使用[html-to-react-components](https://github.com/roman01la/html-to-react-components)这个工具，可以自动将HTML标签转化为JSX的标签：

![usage example animation](https://github.com/roman01la/html-to-react-components/raw/master/sample.gif)

``` 
$ npm i -g html-to-react-components
$ html2react ./src/*.html -c stateless -m es6 -d _ -o components -e jsx
```


## [react-monocle](https://github.com/team-gryff/react-monocle):可视化地展示React组件的层次结构
React Monocle是一个帮助开发人员可视化浏览React组件的层次结构的工具，其大概的功能如下所示:
![](https://github.com/team-gryff/react-monocle/raw/master/demo.gif)
React Monocle会遍历你的React源文件来构建一颗基于React组件的可视化树，而且随着你的应用程序状态的变化，譬如存储在Redux中的状态的变化也会动态地来修正层次结构。该工具的安装方式也十分简单:
```
npm install -g react-monocle
monocle -c <html> -b <bundle>
```




## [why-did-you-update](https://github.com/garbles/why-did-you-update):提醒你不必要的重渲染
![](https://camo.githubusercontent.com/0f34a575ad3f81c9826f54c03a17da848e1ee038/687474703a2f2f692e696d6775722e636f6d2f556938595542652e706e67)
该函数会在出现不必要的重渲染的时候提醒你。使用方法也很简单:

```import React from 'react'

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update')
  whyDidYouUpdate(React)
}
```
