<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Config](#config)
  - [Entry](#entry)
  - [Resolve](#resolve)
    - [alias](#alias)
  - [ProvidePlugin](#provideplugin)
  - [External](#external)
- [Entry](#entry-1)
- [Output](#output)
  - [Library](#library)
    - [Multiple Entry](#multiple-entry)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

 



# Config

## Entry

``` 
{
    entry: {
        a: "./a",
        b: "./b",
        c: ["./c", "./d"]
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].entry.js"
    }
}
```



## Resolve

### alias

``` xml
resolve : {
        alias: {
            jquery      : "../vendor/jquery/jquery-1.10.2.js",
            underscore  : "../vendor/backbone/underscore.js",
            backbone    : "../vendor/backbone/backbone.js"
                }
         }
```



## ProvidePlugin

``` 
ProvidePlugin提供一种将模块映射为自由变量的方法，其官方解释为：
```

> Every time I use the (free) variable `xyz` inside a module you (webpack) should set `xyz` to `require("abc")`

``` 
在使用ProvidePlugin之前，代码为：
```

``` javascript
// You need to require underscore before you can use it
var _ = require("underscore");
_.size(...);
```

``` 
在使用了ProvidePlugin之后：
```

``` javascript
plugins: [
  new webpack.ProvidePlugin({
    "_": "underscore"
  }) 
]

// If you use "_", underscore is automatically required
_.size(...)
```

## External

如果我们需要用```<script>```标签方式来引入某个JS脚本文件，譬如在引入CDN或者引入jQuery插件，这些插件往往是没有使用CMD规范但是仍然需要一个全局的jQuery变量的，就需要使用external选项来定义一些全局的变量。

``` html
<script src="https://code.jquery.com/jquery-git2.min.js"></script>

// the artifial module "jquery" exports the global var "jQuery"
externals: { jquery: "jQuery" }

// inside any module
var $ = require("jquery");
```

​	这样，首先我们需要jquery文件，并且安装bootstrap(3.3.5) ,font-awesome(4.4.0),以及imports-loader(0.6.3)。还需要sass-loader(3.1.2)及less-loader(2.5.3)。

​	然后，在主要入口文件要这么引用下面的样式文件：

``` 
require('bootstrap/less/bootstrap.less');
require('font-awesome/scss/font-awesome.scss');
require('./index.scss');
```

在webpack.config.js的entry项目里，可以加上这个vendor:

``` javascript
common: ['jquery', 'bootstrap'],
```

在loaders里加入以下loader，将jQuery暴露到全局:

``` 
{
    test: path.join(config.path.src, '/libs/jq/jquery-2.1.4.min'),
    loader: 'expose?jQuery'
},
```

​	再添加以下loader，让webpack帮助复制font文件

``` 
{ 
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,  
        loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[ext]' 
},
```

在plugins里添加ProvidePlugin，让$指向jQuery

``` 
new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
}),
```

这样，就可以同时使用jQuery, Bootstrap和Fontawesome了。



# Entry



# Output



##  Library

有时候，我们希望使用Webpack编译好的函数能够直接在Global作用域下使用，或者能够通过AMD/CMD规范引入，最直观的用法就是能够直接挂载在`script`标签下使用。这时候，我们就需要特别设置将Webpack的生成目标设置为library。譬如我们有如下函数：

```


var jQuery = require("jquery");
var math = require("math-library");

function Foo() {}

// ...

module.exports = Foo;
```

我们希望能够在全局作用域中使用Foo函数，推荐的设置为：

```


{
    output: {
        // export itself to a global var
        libraryTarget: "var",
        // name of the global var: "Foo"
        library: "Foo"
    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "jquery": "jQuery"
    }
}
```

基于该配置最终生成的Bundle为：

```


var Foo = (/* ... webpack bootstrap ... */
({
    0: function(...) {
        var jQuery = require(1);
        /* ... */
    },
    1: function(...) {
        module.exports = jQuery;
    },
    /* ... */
});


```

最后，关于Library生成的脚本配置的总览为

```

module.exports = {
    entry: ['./_js/script.js'],
    output: {
       library: 'YourLibrary',
        path: __dirname,
        filename: './build/script.js'
    }
```

### Multiple Entry

```


var path = require("path");
module.exports = {
    entry: {
        alpha: "./alpha",
        beta: "./beta"
    },
    output: {
        path: path.join(__dirname, "js"),
        filename: "MyLibrary.[name].js",
        library: ["MyLibrary", "[name]"],
        libraryTarget: "umd"
    }
}
```

在这样配置的多入口的Library项目中，最终生成文件为```js/MyLibrary.alpha.js```与```js/MyLibrary.beta.js```，其挂载的全局命名空间也分别是alpha与beta:

```


module.exports = "alpha";
```

以及

```


module.exports = "beta";
```





