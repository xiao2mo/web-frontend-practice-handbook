[![返回目录](https://parg.co/U01)](https://parg.co/bWF) 



# Vue.js 概述


Vue是专注于构建用户界面层的渐进式JavaScript框架，它可以很方便地与各种中间件或者后端应用程序集成使用。Vue为我们构建界面层提供了大量有用的工具，助我们构建复杂的单页应用。Vue的特性包括但不限于：
- 响应式界面
- 声明式路由
- 数据绑定
- 指令
- 模板逻辑
- 组件
- 事件处理
- 属性推断
- CSS 变换与动画
- 过滤


Vue.js 2核心库大概只有17KB，非常小，这就保证了引入Vue.js并不会对你的编译后的版本添加过多的代码，加速网站的加载。Vue.js的官方代码位于：[https://vuejs.org/](https://vuejs.org/)。
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/1/2/1-jh3ITjmvej5l-T-t_GmqmA.png)


# 如何引入Vue.js


Vue.js为我们提供了多种引入方式，可以根据我们项目的实际需求自由选择：
- 在HTML中添加`script`标签从CDN引入
- 使用NPM安装
- 使用Bower安装
- 使用Vue-cli初始化项目


本文是选择了最后一种初始化的方式来创建新的项目。


## 使用 Vue-cli
首先，我们可以使用NPM安装Vue-cli。你必须要检查下系统中是否已经安装好了NodeJS并且npm命令行工具可以正常使用，然后使用如下命令在本地系统进行全局安装：
```
$ npm install -g vue-cli

```
安装完毕之后，我们可以使用如下方式来初始化新的项目:
```
$ vue init webpack vueapp01

```
这里我们让Vue-cli以Webpack模板创建新的项目，并且个新项目取名为vueapp01，运行该命令之后它会向你咨询基本的项目信息，截图如下：
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/1/2/1-KmPTe6A0_9qG_OR5awet4A.png)


到这里项目的模板文件被添加到了vueapp01目录下，进入该目录即可以启动开发服务器：
```
$ npm run dev
```
该命令会启动一个监听8080端口的开发服务器，在浏览器中打开该端口可以看到如下界面：
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/1/2/1-GuIRPERP01oedu0iIAtqyA.png)




如果你希望将项目打包出开发版本，可以使用build命令，它会将项目打包编译之后的文件放置在dist目录下：
```
$ npm run build

```


# 项目结构


该部分的代码参考[vue-boilerplate](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Engineering-Practices/tree/master/OpenSource/vue-boilerplate)。首先我们来看下Vue-cli构建的项目目录结构：
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/1/2/1-hvpOnNNjqls-qRbFj7LSMg.png)


进入项目根目录之后我们使用`npm intsall`命令安装所有依赖，所有的依赖被声明在`package.json`文件中。文件`index.html`中包含了如下HTML代码：
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>vueapp01</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
该文件是整个应用的入口点，注意，无论你把`<div>`元素放在哪，只要保证其`id`属性为`app`即可，该元素是整个由Vue.js生成文件的插入点。然后我们看下src文件夹中的main.js文件，该文件是Vue应用初始化的地方：
```
import Vue from 'vue'
import App from './App'
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
```
文件首部我们发现两个引入语句：
- `import Vue from 'vue'`：Vue是整个框架的主类
- `import App from './App'`：App是整个应用的根元素


使用`new`关键字能够创建Vue的实例，构造函数会接收包含三个属性的配置对象：
- el:设定Vue应用的DOM挂载点
- template:包含HTML代码的模板
- components:用于模板中的Vue.js组件


该模板仅包含一个元素：`<App />`，当然这并不是HTML标准元素，整个App组件的的定义在`App.vue`文件中：
```
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
  </div>
</template>
<script>
import Hello from './components/Hello'
export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```
对于每个Vue.js 2单文件组件，其会包含三部分：
- `<template></template>`: Component's template code- `<script></script>`: Component's script code- `<style></style>`: Component' CSS code
我们先看看`template`与`script`这两块。`script`块导出了某个声明为`app`的组件，该组件中的属性声明了对于`Hello`组件的引用。`Hello`组件则是被定义在`hello.vue`文件中，为了使用其他组件我们同样需要在`script`首部引入该组件。整个Hello组件的定义如下：```<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```





# 使用标准指令


我们可以使用基本的Vue.js指令来为Hello组件添加更多的功能与数据逻辑。


## v-for
`v-fot`指令允许我们遍历某个数组并且将每一个元素渲染到模板中，我们可以先创建如下的数组：
```
users: [
        {firstname: 'Sebastian', lastname: 'Eschweiler'},
        {firstname: 'Bill', lastname: 'Smith'},
        {firstname: 'John', lastname: 'Porter'}
      ],
```
然后使用`v-for`指令遍历该列表并且提取出每个元素的`firstname`与`lastname`值：
```
<div>
      <ul>
        <li v-for="user in users">
          {{user.firstname}} {{user.lastname}}
        </li>
      </ul>
</div>
```


## v-model


`v-model`指令会在输入元素与组件之间创建双向数据绑定，我们首选需要定义一个存放数据的变量：
```
input_val: ''

```
然后使用`v-model`将变量绑定到元素上：
```
<div>
      <input type="text" v-model="input_val">
</div>
```
这种双向绑定会有两个效果：
- 每次用户输入值时都会同步更新到`input_val`变量
- 如果我们在程序中手动修改`input_val`变量的值，元素中的展示值也会被相应更新


## v-text
`v-text`指令被用于设置文本内容，其作用等效于`{{...}}`，我们可以用其来展示部分文本：
```
Input Value: <span v-text="input_val"></span>

```


## 总结
完整的Hello组件的实现如下：
```
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <hr />
    <div>
      <ul>
        <li v-for="user in users">
          {{user.firstname}} {{user.lastname}}
        </li>
      </ul>
    </div>
    <hr />
    <div>
      <input type="text" v-model="input_val">
    </div>
    <div>
      Input Value: <span v-text="input_val"></span>
    </div>
    <hr />
    <div>
      <button class="btn btn-primary" v-on:click="counter++">You've clicked this button {{counter}} times!</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      users: [
        {firstname: 'Sebastian', lastname: 'Eschweiler'},
        {firstname: 'Bill', lastname: 'Smith'},
        {firstname: 'John', lastname: 'Porter'}
      ],
      input_val: '',
      counter: 0
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
    list-style-position: inside;
}
a {
  color: #42b983;
}
</style>
```
最后的结果如下所示：
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/1/2/1-xdoMDrZ5XUIFRz8Bg1AFMA.png)





































