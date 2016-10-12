**本文档尚未定稿，如果转发请注明来源，就好像不要把没PS的照片传到朋友圈**

# Introduction

## ECMAScript 6

ECMAScript是JavaScript语言的国际标准，JavaScript是ECMAScript的实现。要讲清楚这个问题，需要回顾历史。1996年11月，JavaScript的创造者Netscape公司，决定将JavaScript提交给国际标准化组织ECMA，希望这种语言能够成为国际标准。次年，ECMA发布262号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为ECMAScript。这个版本就是ECMAScript 1.0版。

之所以不叫JavaScript，有两个原因。一是商标，Java是Sun公司的商标，根据授权协议，只有Netscape公司可以合法地使用JavaScript这个名字，且JavaScript本身也已经被Netscape公司注册为商标。二是想体现这门语言的制定者是ECMA，不是Netscape，这样有利于保证这门语言的开放性和中立性。因此，ECMAScript和JavaScript的关系是，前者是后者的规格，后者是前者的一种实现。在日常场合，这两个词是可以互换的。

ECMAScript定义了：

- [语言语法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar) – 语法解析规则、关键字、语句、声明、运算符等。
- [类型](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) – 布尔型、数字、字符串、对象等。
- [原型和继承](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- 内建对象和函数的[标准库](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) – [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)、[Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)、[数组方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)、[对象自省方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)等。

ECMAScript标准不定义HTML或CSS的相关功能，也不定义类似DOM（文档对象模型）的[Web API](https://developer.mozilla.org/en-US/docs/Web/API)，这些都在独立的标准中进行定义。ECMAScript涵盖了各种环境中JS的使用场景，无论是浏览器环境还是类似[node.js](http://nodejs.org/)的非浏览器环境。

ECMAScript 6（以下简称ES6）是JavaScript语言的下一代标准，已经在2015年6月正式发布了。Mozilla公司将在这个标准的基础上，推出JavaScript 2.0。ES6的目标，是使得JavaScript语言可以用来编写大型的复杂的应用程序，成为企业级开发语言。标准的制定者有计划，以后每年发布一次标准，使用年份作为标准的版本。因为当前版本的ES6是在2015年发布的，所以又称ECMAScript 2015。

1. **Module & Module Loader**
   
   ES2015中加入的原生模块机制支持可谓是意义最重大的feature了，且不说目前市面上五花八门的module/loader库，各种不同实现机制
   
   互不兼容也就罢了(其实这也是非常大的问题)，关键是那些模块定义/装载语法都丑到爆炸，但是这也是无奈之举，在没有语言级别的支持下，js只能做到这一
   
   步，正所谓巧妇难为无米之炊。ES2016中的Module机制借鉴自 
   
   CommonJS，同时又提供了更优雅的关键字及语法(虽然也存在一些问题)。遗憾的是同样有重大价值的Module 
   
   Loader在2014年底从ES2015草案中移除了，我猜测可能是对于浏览器而言Module 
   
   Loader的支持遭遇了一些技术上的难点，从而暂时性的舍弃了这一feature。但是一个原生支持的模块加载器是非常有意义的，相信它不久后还是会回
   
    归到ES规范中(目前由WHATWG组织在单独维护)。
   
2. **Class**
   
   ​	准确来说class关键字只是一个js里构造函数的语法糖而已，跟直接function写法无本质区别。只不过有了Class的原生支持后，js的面向对象机制有了更多的可能性，比如衍生的extends关键字(虽然也只是语法糖)。
   
3. **Promise & Reflect API**
   
   ​	Promise的诞生其实已经有几十年了，它被纳入ES规范最大意义在于，它将市面上各种异步实现库的最佳实践都标准化了。至于Reflect API，它让js历史上第一次具备了元编程能力，这一特性足以让开发者们脑洞大开。



除此之外，ES2016的相关草案也已经确定了一大部分其他new features。这里提两个我比较感兴趣的new feature：

1. async/await：协程。ES2016中 async/await 实际是对Generator&Promise的上层封装，几乎同步的写法写异步比Promise更优雅更简单，非常值得期待。
2. decorator：装饰器，其实等同于Java里面的注解。注解机制对于大型应用的开发的作用想必不用我过多赘述了。用过的同学都说好。



而关于纯ES6语法在各大浏览器上的支持情况，可以查看[这里](http://kangax.github.io/compat-table/es6/)。

另外推荐一个可以将ES5代码转化为可读的ES6代码的转化器：[lebab](https://github.com/mohebifar/lebab)




## 注释与代码分割

JavaScript程序的执行单位为行（line），也就是一行一行地执行。一般情况下，每一行就是一个语句。语句（statement）是为了完成某种任务而进行的操作，比如下面就是一行赋值语句：

``` javascript
var a = 1 + 3;
```

`1 + 3`叫做表达式（expression），指一个为了得到返回值的计算式。语句和表达式的区别在于，前者主要为了进行某种操作，一般情况下不需要返回值；后者则是为了得到返回值，一定会返回一个值。凡是JavaScript语言中预期为值的地方，都可以使用表达式。比如，赋值语句的等号右边，预期是一个值，因此可以放置各种表达式。一条语句可以包含多个表达式。语句以分号结尾，一个分号就表示一个语句结束。多个语句可以写在一行内。

``` javascript
var a = 1 + 3  var b = "abc";
```

分号前面可以没有任何内容，JavaScript引擎将其视为空语句。

``` javascript
;;;
```



### 代码块

JavaScript中会将`{`作为代码块的开始，譬如`{a:1}.a`会报错:`Uncaught SyntaxError: Unexpected token .`，使用`({a:1}.a) // 或({a:1}).a`即可以。


## Strict Mode(严格模式)

> [深入理解javascript严格模式(Strict Mode)](http://www.jb51.net/article/57954.htm)





## Reference

### Tutorial & Docs

- [JavaScript 标准参考教程-阮一峰][9]
- [js-bits](https://github.com/vasanthk/js-bits):基于代码的JavaScript概念讲解


#### ES6

- [understanding-s6](https://github.com/sgaurav/understanding-es6)：一系列关于ES6的用法
- [es6-cheatsheet](https://github.com/DrkSephy/es6-cheatsheet)

- [ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/intro)
- [InfoQ-深入浅出ES6系列专栏][10]

- [ES6 Overview in 350 Bullet Points](https://github.com/bevacqua/es6)

- [ES6官方起草文档][7]
- [Github-ES6特性介绍][8]
- [Github-ES5与ES6对比](https://github.com/addyosmani/es6-equivalents-in-es5)


### Books & Tools

- [You don’t know Js](https://github.com/getify/You-Dont-Know-JS):每日的一点JS小技巧介绍
- [ecma262](http://tc39.github.io/ecma262/):ECMAScript 2017标准介绍 
- [Eloquent Javascript](http://eloquentjavascript.net/index.html)

### Blogs & News

- [PonyFoo](https://ponyfoo.com/articles/es6-proxies-in-depth?utm_medium=email)

### Practices & Resources

- [Github-JavaScript Path JavaScript学习规划](https://github.com/javascript-society/javascript-path)
- [essential-javascript-links](https://github.com/ericelliott/essential-javascript-links)
- [awesome-javascript-guide](https://github.com/wwsun/awesome-javascript)
- [成为 JavaScript 忍者](http://mp.weixin.qq.com/s?__biz=MjM5NTM1NDcyOQ==&mid=403592063&idx=1&sn=eb0215e659314465fa2b5fe849c572e5)



#### Tips

- [jstips-每天更新的一些JavaScript小技巧](

https://github.com/loverajoel/jstips)
#### Interviews

- [toptal-interview-questions](https://www.toptal.com/javascript/interview-questions)

- [21-essential-javascript-tech-interview-practice-questions-answers](https://www.codementor.io/javascript/tutorial/21-essential-javascript-tech-interview-practice-questions-answers)

- [top-85-javascript-interview-questions](http://career.guru99.com/top-85-javascript-interview-questions/)

- [interviewcake-javascript-interview-questions ](https://www.interviewcake.com/javascript-interview-questions)



# Quick Start

目前并不是主流浏览器都支持ES6，因此我们尚且需要一些工具来进行代码维护或者转化，[ES6-Tools][2]是一个Github上关于目前流行的ES6辅助开发工具。笔者比较倾向于使用[Babel][3]这个工具，它不仅仅可以做到对于ES6的实时编译成ES5，并且能够支持React的JSX语法。

如果需要在WebStorm中支持ES6的語法，需要進行如下設置：


![WebStorm中设定支持ES6](http://blog.jetbrains.com/webstorm/files/2015/05/js-version.png)



## Node-REPL

如果你在系统中已经安装了NodeJS环境，那么直接输入`node`命令即可启动Node REPL来进行测试。不过默认的Node不支持ES6，可以考虑用[babel-repl](https://www.npmjs.com/package/babel-repl)这个扩展进行支持。



## Transfer(转码器)

转译器使用起来非常简单，只需两步即可描述它所做的事情：

1. 用ES6的语法编写代码。
   
   ``` 
   let q = 99;
   let myVariable = `${q} bottles of beer on the wall, ${q} bottles of beer.`;
   ```
   
2. 用上面那段代码作为转译器的输入，经过处理后得到以下这段输出：
   
   ``` 
   "use strict";
   
   var q = 99;
   var myVariable = "" + q + " bottles of beer on the wall, " + q + " bottles of beer."
   ```

这正是我们熟知的老式JavaScript，这段代码可以在任意浏览器中运行。

转译器内部从输入到输出的逻辑高度复杂，完全超出本篇文章的讲解范围。正如我们无须知道所有的内部引擎结构就可以驾驶一辆汽车，现在，我们同样可以将转译器视为一个能够处理我们代码的黑盒。



### Babel

Babel 6中作了全新的设置，即默认不会包含任何的编译工具，而全部转化为了可选的presets。并且将核心模块与命令控制器拆分为了两个独立的包：

``` javascript
$ npm install --global babel-cli
# or
$ npm install --save-dev babel-core
```

如果我们需要使用ES2015中的部分特性，只需要首先使用`npm`命令进行包安装：

``` 
$ npm install --save-dev babel-plugin-check-es2015-constants
$ npm install --save-dev babel-plugin-transform-es2015-block-scoping
```

然后在`.babelrc`文件中添加如下的配置：

``` javascript
{
  "plugins": [
    "check-es2015-constants",
    "transform-es2015-block-scoping"
  ]
}
```

不过这样一种细致的分割并不是很好逐个引入，也可以直接全部引入：

``` 
$ npm install --save-dev babel-preset-es2015

{
  "presets": ["es2015"]
}

```

React also has it’s own preset:

``` 
$ npm install --save-dev babel-preset-react

{
  "presets": ["react"]
}
```



[Babel][5]可以帮助用户快速搭建ES6以及JSX的开发环境。如果需要在Gulp中引入Babel作为中间编译器，只需要在Gulp中引入如下：

``` javascript
var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", function () {
  return gulp.src("src/app.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});
```

如果需要生成source map:

``` javascript
var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task("default", function () {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("all.js"))
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});
```

babel已经被集成进了几乎所有主流的打包或者编译工具中，笔者现在就是比较习惯于使用Webpack加上Babel的方式进行JS预编译。

### Traceur

Google公司的[Traceur](https://github.com/google/traceur-compiler)转码器，也可以将ES6代码转为ES5代码。Traceur允许将ES6代码直接插入网页。首先，必须在网页头部加载Traceur库文件。

``` javascript
<!-- 加载Traceur编译器 -->
<script src="http://google.github.io/traceur-compiler/bin/traceur.js"
        type="text/javascript"></script>
<!-- 将Traceur编译器用于网页 -->
<script src="http://google.github.io/traceur-compiler/src/bootstrap.js"
        type="text/javascript"></script>
<!-- 打开实验选项，否则有些特性可能编译不成功 -->
<script>
        traceur.options.experimental = true;
</script>
```

接下来，就可以把ES6代码放入上面这些代码的下方。

``` javascript
<script type="module">
  class Calc {
    constructor(){
      console.log('Calc constructor');
    }
    add(a, b){
      return a + b;
    }
  }

  var c = new Calc();
  console.log(c.add(4,5));
</script>
```

正常情况下，上面代码会在控制台打印出9。

注意，`script`标签的`type`属性的值是`module`，而不是`text/javascript`。这是Traceur编译器识别ES6代码的标识，编译器会自动将所有`type=module`的代码编译为ES5，然后再交给浏览器执行。

如果ES6代码是一个外部文件，也可以用`script`标签插入网页。

``` 
<script type="module" src="calc.js" >
</script>
```
### [lebab](https://github.com/mohebifar/lebab):将ES5代码转化为ES6

可以直接使用npm进行安装:

```

$ npm install -g lebab

```

然后通过预置的`lebab`命令可以将ES5的代码转化为ES6的代码了：

```

$ lebab es5.js -o es6.js --enable let

```

譬如之前在ES5中，我们定义一个类似于类的对象，可能是如下方式：

```


           
var Employee = function Employee() {
  this.alive = true;
};

Employee.prototype.setSkills = function(skills) {
  skills = skills || [];
  var defaultSkills = ['JavaScript'];
  this.skills = skills.concat(defaultSkills);
};

Employee.prototype.sayHello = function() {
  window.setTimeout(function() {
    console.log('Hello World!');
  }, 2000);
};

Object.defineProperty(Employee.prototype, 'name', {
  get: function() {
    return this.firstName + ' ' + this.lastName;
  }
});
```

使用lebab之后，可以转化为如下格式：

```

class Employee {

  constructor() {
    this.alive = true;
  }

  setSkills(skills=[]) {
    const defaultSkills = ['JavaScript'];
    this.skills = skills.concat(defaultSkills);
  }

  sayHello() {
    window.setTimeout(() => {
      console.log('Hello World!');
    }, 2000);
  }

  get name() {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

## Notebook:[kajero](https://github.com/JoelOtter/kajero)

![](https://raw.githubusercontent.com/JoelOtter/kajero/master/doc/screenshot.png)





# NPM

> [NodeJS包管理工具——npm入门](http://aerotiger.info/archives/beginners-guide-node-package-manager.html?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)

随着JavaScript项目的成长，如果你不小心处理的话，他们往往会变得难以管理。我们发现自己常常陷入的一些问题： 当在创建新的页面时发现，很难重用或测试之前写的代码。当我们更深处地研究这些问题，我们发现根本原因是无效的依赖管理造成的。比如，脚本A依赖脚本B，并且脚本B又依赖脚本C，当C没有被正确引入时，整个依赖链就无法正常工作了。经过对AMD的进一步探索，我们已经基本确定，组织严密的JavaScript一般都呈现以下五个特点：

- 始终声明我们的依赖
- 为第三方代码库添加shim（垫片）
- 定义跟调用应该分离
- 依赖应该异步加载
- 模块不应依赖全局变量

## Dependence Installation

## Dependence Manager(依赖管理):

### npm-link:使用全局项目依赖

用npm link替代npm install。npm link [package-name]命令的原理是，去 [prefix]/lib/node_modules/下检索是否已经全局安装了当前的package，如果是，则直接用软链接的方法在本地路径指向全局 package。如果没检索到，则会先在全局路径下安装该package，再去建立软链接。npm获取全局路径的命令是：npm config get prefix。

需要注意的是，有package.json的路径下，不要类比npm install，就这么执行npm link。此时npm link会把当前路径作为一个本地package，在全局路径下创建一个软链接。由此可知，npm link并不会像npm install一样，读取package.json中的依赖并自动配置。



## Extension

### [npm-check](https://github.com/dylang/npm-check):自动检测过期、错误或者尚未使用的依赖



![](https://cloud.githubusercontent.com/assets/51505/9569917/96947fea-4f48-11e5-9783-2d78077256f2.png)



```

$ npm install -g npm-check
$ npm-check
```



[1]: https://github.com/airbnb/javascript
[2]: https://github.com/addyosmani/es6-tools
[3]: https://babeljs.io/docs/learn-es2015/
[4]: http://blog.jetbrains.com/webstorm/files/2015/05/js-version.png
[5]: https://babeljs.io/docs/learn-es2015/
[6]: http://facebook.github.io/immutable-js/
[7]: https://people.mozilla.org/~jorendorff/es6-draft.html
[8]: https://github.com/lukehoban/es6features
[9]: http://javascript.ruanyifeng.com/#introduction
[10]: http://www.infoq.com/cn/es6-in-depth/