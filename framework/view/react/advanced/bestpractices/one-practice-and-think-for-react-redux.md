<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Project Structure](#project-structure)
- [Reducer](#reducer)
- [表单](#%E8%A1%A8%E5%8D%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

> 本部分的代码参考[ConfigurableAPIServer](https://github.com/wxyyxc1992/ConfigurableAPIServer/tree/master/ui)



这是笔者第一次将React+Redux应用到一个较为复杂的项目中，这个项目初期遇到最大的问题是以何种粒度进行组件拆分，因为该项目没有专配的UI，所以是程序猿直接按照自己的理解进行开发，在这种情况下，笔者习惯性的先写了一个包含菜单以及常见控制项的整体项目，然后再进行拆分。笔者在本文中就是把一些迭代和自己感受到的点扯扯。水文一篇，一笑而过。



首先来看下整个项目的大概功能与用户逻辑：

![](http://7xkt0f.com1.z0.glb.clouddn.com/0C649B14-6DCA-431E-A9DD-F6AAC9B22AD5.png)



可以看出整个项目的分布上，分为五个角色，然后每个角色有一个单独的入口。为了保证一定的隔离性与代码的清晰性，笔者是分为了五个模块，然后在这五个模块里面对公共组件进行封装。总体而言，不同组件中表示同一功能的代码块都应该被抽出来形成独立的组件。组件之间的通信应该从Redux的Store进行。

另外，这边还有一个考虑，就是是否需要将所有的状态都放到Redux中进行统一管理。譬如在我们有一个创建接口的弹窗，大概就是下图这个样子：

![](http://7xkt0f.com1.z0.glb.clouddn.com/fjadslcnadsjfasd.png)

这个组件相对而言还是独立的，其中的接口状态等暂时可以认为是不需要与其他组件交互的。那么到底要不要将它的状态，或者说要不要将创建API等等逻辑函数也提出来放到ActionCreator与Reducer中，感觉有点多此一举啊，毕竟对于一个Demo而言UnitTest与Time Travel好像都不是那么必须。不过，千里之堤毁于蚁穴，为了避免未来坑多，还是从零开始都规范一点吧。具体会在下文中的表单部分进行讨论

# Project Structure

项目的总体目录情况如下：

- /src 源代码目录
    - app 主界面以及通用模块
        - components 可重用组件
            - .story 用于在StoryBook中进行预览
            - api 接口方面组件
                - api.reducer.js 对于api部分组件的Reducer的封装，详细讨论见下面
                - api_content api内容管理
                    - api_content.action.js 相关的Action与ActionCreator定义
                    - api_content.js 包含Component于Container定义
                    - api_content.scss 样式文件
                    - api_content.reducer.js Reducer定义
        - models 模型层
            - model.js 通用请求封装
            - api api部分的数据交互组件
        - service 常见的服务层
            - url 常见的url过滤处理
            - storage 常见的存储服务
    - modules 独立页面
        - content api内容管理模块
            - components 相关组件定义
                - api 对于api组件的重新封装
            - container 根容器以及路由定义
            - reducers 对于全部的reducer的封装
            - store 对于跟Store的定义
            - content.html
            - content.js        
    
    
    
# Webpack Config
对于Webpack部分的详细配置与讲解可以参考[Webpack-React-Redux-Boilerplate](https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate)这个。

```
var path = require('path');
var webpack = require('webpack');

//PostCSS plugins
var autoprefixer = require('autoprefixer');

//webpack plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var NODE_ENV = process.env.NODE_ENV || "develop";//获取命令行变量

//@region 可配置区域

//定义统一的Application，不同的单页面会作为不同的Application
/**
 * @function 开发状态下默认会把JS文本编译为main.bundle.js,然后使用根目录下dev.html作为调试文件.
 * @type {*[]}
 */
var apps = [
    {
        //登录与注册
        id: "login",//编号
        title: "登录",//HTML文件标题
        entry: {
            name: "login",//该应用的入口名
            src: "./src/modules/login/login_container.js",//该应用对应的入口文件
        },//入口文件
        indexPage: "./src/modules/login/login.html",//主页文件

        //optional
        dev: false,//判断是否当前正在调试,默认为false
        compiled: true//判斷當前是否加入编译,默认为true
    },
    {
        //内容管理
        id: "content",//编号
        title: "内容管理",//HTML文件标题
        entry: {
            name: "content",//该应用的入口名
            src: "./src/modules/content/content.js"//该应用对应的入口文件
        },//入口文件
        indexPage: "./src/modules/content/content.html",//主页文件

        //optional
        dev: true,//判断是否当前正在调试,默认为false
        compiled: true//判斷當前是否加入编译,默认为true
    },
    {
        //权限管理
        id: "auth",//编号
        title: "权限管理",//HTML文件标题
        entry: {
            name: "auth",//该应用的入口名
            src: "./src/modules/auth/auth.js"//该应用对应的入口文件
        },//入口文件
        indexPage: "./src/modules/auth/auth.html",//主页文件

        //optional
        dev: false,//判断是否当前正在调试,默认为false
        compiled: true//判斷當前是否加入编译,默认为true
    },
    {
        //密钥管理
        id: "key",//编号
        title: "密钥管理",//HTML文件标题
        entry: {
            name: "key",//该应用的入口名
            src: "./src/modules/key/key.js"//该应用对应的入口文件
        },//入口文件
        indexPage: "./src/modules/key/key.html",//主页文件

        //optional
        dev: false,//判断是否当前正在调试,默认为false
        compiled: true//判斷當前是否加入编译,默认为true
    },
    {
        //超级管理
        id: "admin",//编号
        title: "权限管理",//HTML文件标题
        entry: {
            name: "admin",//该应用的入口名
            src: "./src/modules/admin/admin.js"//该应用对应的入口文件
        },//入口文件
        indexPage: "./src/modules/admin/admin.html",//主页文件

        //optional
        dev: false,//判断是否当前正在调试,默认为false
        compiled: false//判斷當前是否加入编译,默认为true
    }
];

//定义非直接引用依赖
//定义第三方直接用Script引入而不需要打包的类库
//使用方式即为var $ = require("jquery")
const externals = {
    jquery: "jQuery",
    pageResponse: 'pageResponse'
};


/*********************************************************/
/*********************************************************/
/*下面属于静态配置部分，修改请谨慎*/
/*********************************************************/
/*********************************************************/

//开发时的入口考虑到热加载，只用数组形式，即每次只会加载一个文件
var devEntry = [
    'eventsource-polyfill',
    'webpack-hot-middleware/client'
];

//生产环境下考虑到方便编译成不同的文件名，所以使用数组
var proEntry = {
    "vendors": "./src/vendors.js"//存放所有的公共文件
};

//定义HTML文件入口,默认的调试文件为src/index.html
var htmlPages = [];

//遍历定义好的app进行构造
apps.forEach(function (app) {

    //判断是否加入编译
    if (app.compiled === false) {
        //如果还未开发好,就设置为false
        return;
    }

    //添加入入口
    proEntry[app.entry.name] = app.entry.src;

    //构造HTML页面
    htmlPages.push({
        filename: app.id + ".html",
        title: app.title,
        // favicon: path.join(__dirname, 'assets/images/favicon.ico'),
        template: 'underscore-template-loader!' + app.indexPage, //默认使用underscore
        inject: false, // 使用自动插入JS脚本,
        chunks: ["vendors", app.entry.name] //选定需要插入的chunk名
    });

    //判断是否为当前正在调试的
    if (app.dev === true) {
        //如果是当前正在调试的，则加入到devEntry
        devEntry.push(app.entry.src);
    }
});

//@endregion 可配置区域

//基本配置
var config = {
    devtool: 'source-map',
    //所有的出口文件，注意，所有的包括图片等本机被放置到了dist目录下，其他文件放置到static目录下
    output: {
        path: path.join(__dirname, 'dist'),//生成目录
        filename: '[name].bundle.js',//文件名
        sourceMapFilename: '[name].bundle.map'//映射名
    },
    //配置插件
    plugins: [
        // new WebpackMd5Hash(),//计算Hash插件
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                //因为使用热加载，所以在开发状态下可能传入的环境变量为空
                'NODE_ENV': process.env.NODE_ENV === undefined ? JSON.stringify('develop') : JSON.stringify(NODE_ENV)
                // NODE_ENV: JSON.stringify('development')
            },
            //判断当前是否处于开发状态
            __DEV__: process.env.NODE_ENV === undefined || process.env.NODE_ENV === "develop" ? JSON.stringify(true) : JSON.stringify(false)
        }),

        //提供者fetch Polyfill插件
        new webpack.ProvidePlugin({
            // 'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),

        //提取出所有的CSS代码
        new ExtractTextPlugin('[name].css'),

        //自动分割Vendor代码
        new CommonsChunkPlugin({name: 'vendors', filename: 'vendors.bundle.js', minChunks: Infinity}),

        //自动分割Chunk代码
        // new CommonsChunkPlugin({
        //     children: true,
        //     async: true,
        // })
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(libs|node_modules)/,
                loaders: ["babel-loader"]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                loader: 'url?limit=100000&name=[name].[ext]'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    },
    postcss: [autoprefixer({browsers: ['last 10 versions', "> 1%"]})],//使用postcss作为默认的CSS编译器
    resolve: {
        alias: {
            libs: path.resolve(__dirname, 'libs'),
            nm: path.resolve(__dirname, "node_modules"),
            assets: path.resolve(__dirname, "assets"),
        }
    }
};

//进行脚本组装
config.externals = externals;

//自动创建HTML代码
htmlPages.forEach(function (p) {
    config.plugins.push(new HtmlWebpackPlugin(p));
});

//为开发状态下添加插件
if (process.env.NODE_ENV === undefined || process.env.NODE_ENV === "develop") {

    //配置SourceMap
    config.devtool = 'cheap-module-eval-source-map';

    config.module.loaders.push({
        test: /\.(css|scss|sass)$/,
        loader: "style-loader!css-loader!postcss-loader!sass?sourceMap"
    });

    //设置入口为调试入口
    config.entry = devEntry;

    //設置公共目錄名
    config.output.publicPath = '/dist/'//公共目录名


    //添加插件
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.NoErrorsPlugin());

} else {
    //如果是生产环境下
    config.entry = proEntry;

    //设置提取CSS文件的插件
    config.module.loaders.push({
        test: /\.(css|scss|sass)$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass?sourceMap")
    });

    //如果是生成环境下，将文件名加上hash
    config.output.filename = '[name].bundle.js.[hash:8]';

    //設置公共目錄名
    config.output.publicPath = '/'//公共目录名

    //添加代码压缩插件
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }));

    //添加MD5计算插件

    //判断是否需要进行检查
    if (process.env.CHECK === "true") {
        config.module.loaders[0].loaders.push("eslint-loader");
    }
}

module.exports = config;
```

# Reducer

Redux本身的特点就是将原来的逻辑处理部分拆分到ActionCreator与Reducer中，而Reducer本身的层次关系又决定了State的结构。为了划分State中的层叠结构，笔者一开始是打算利用如下的方式：

```

import apiDataGridReducer from "../../../../app/components/api/api_datagrid/api_datagrid.reducer";
import apiContentReducer from "../../../../app/components/api/api_content/api_content.reducer";
import apiGroupReducer from "../../../../app/components/api/api_group/api_group.reducer";
const defaultState = {

    api_datagrid: {},

    api_content: {},

    api_group: {}

};

export default function reducer(state = defaultState, action) {

    state = Object.assign({}, state, {
        api_datagrid: apiDataGridReducer(state.api_datagrid, action)
    });

    state = Object.assign({}, state, {
        api_content: apiContentReducer(state.api_content, action)
    });

    state = Object.assign({}, state, {
        api_group: apiGroupReducer(state.api_group, action)
    });

    return state;

}
```

就是不停地将子部分的Reducer在父Reducer中进行合成，然后在模块的根reducer.js中引入父Reducer，不过这样后来感觉不太合适，譬如在内容管理员的部分，我只需要用到`apiDataGridReducer`，但是还不得不把其他的Reducer也引入。后来笔者改成了直接在根reducer.js中引入单个的Reducer，然后利用层叠调用combineReducers方法：

```

rootReducer = combineReducers({
  router, // redux-react-router reducer
    account: combineReducers({
      profile: combineReducers({
         info, // reducer function
         credentials // reducer function
      }),
      billing // reducer function
    }),
    // ... other combineReducers
  })
});
```



# 表单

笔者一开始没有注意到表单这一点，后来做着做着发现整个项目的一个很大的组成部分就是各式各样的重复的表单







笔者建议使用[redux-form](http://redux-form.com/5.2.3/#/getting-started?_k=wz24w7)，它比较好地将常见的表单操作结合到了一起，另一方面，它还能解决上文提到的一个Reducer问题，即是State的命名空间的嵌套问题。这部分的示例代码可以参考[form](https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/tree/master/src/modules/form)



（1）使用npm安装redux-form

```

npm install --save redux-form

```

（2）将redux-form提供的formReducer挂载到rootReducer中

```

import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
const reducers = {
  // ... your other reducers here ...
  form: formReducer     // <---- Mounted at 'form'. See note below.
}
const reducer = combineReducers(reducers);
const store = createStore(reducer);
```

（3）编写自定义form组件

```

import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

class ContactForm extends Component {
  render() {
    const {fields: {firstName, lastName, email}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input type="text" placeholder="First Name" {...firstName}/>
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" {...lastName}/>
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Email" {...email}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ContactForm = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields: ['firstName', 'lastName', 'email'] // all the fields in your form
})(ContactForm);

export default ContactForm;
```