# 搭建 React 脚手架

## Reference

- [facebook - create-react-app](https://github.com/facebookincubator/create-react-app)
- [npm docs](https://docs.npmjs.com/)
- [yarn docs](https://yarnpkg.com/en/docs/)
- [atom docs](https://atom.io/docs)
- [yarn能帮你解决的五件事](http://www.zcfy.cc/article/5-things-you-can-do-with-yarn-2055.html)

关于 create-react-app 为何默认不支持 decorator 语法

- https://github.com/facebookincubator/create-react-app/issues/107
- https://github.com/facebookincubator/create-react-app/issues/512
- https://github.com/facebookincubator/create-react-app/issues/167

## node 环境搭建

### node 版本控制工具 nvm 的安装

node 的版本更新较快，不同版本之间的库可能会存在兼容性问题，有时我们想在某个特定版本下测试代码或
编译项目，手工切换 node 版本的话比较麻烦。对于这个问题开源社区提供了一些比较好的 node 版本控制
工具。其中最广泛被使用的是 nvm，它的安装和使用都比较简单，而且对于各操作系统平台都有支持。
上维护了一个叫 nvm-windows 的仓库。在各个平台上，它的使用方式基本相同。

macOS 和 GNU/Linux 用户可以使用在 Github 上由 creationix 维护的 nvm 仓库提供的版本，对于
windows 用户，corebutler 维护了一个兼容版本，仓库名为 nvm-windows。

下面介绍一下各个平台上 nvm 工具安装方式。对于 windows 用户，在 nvm-windows 提供了安装包，
在其仓库发布页下载最新版本的 nvm-setup.zip，解压后双击安装文件进行安装。对于 macOS 和 GNU/Linux
用户来说，稍微麻烦一点，但安装过程应该也不会太过复杂。注意这里 GNU/Linux 使用 Ubuntu 为例，其它
发行版应该类似。

nvm 的安装需要使用 c++ 编译器以及一些相关的库。macOS 中，你可以选择从 app store 中安装 Xcode，
但是它足足有四个多G，如果不愿意安装它，可以使用命令 `xcode-select --install` 只安装必要的命令行工具。
Ubuntu 中，执行命令 `sudo apt-get install build-essential libssl-dev` 安装 build-essential 
和 libssl-dev 就足够了。接下来执行的安装脚本，macOS默认提供了cURL，执行下面命令安装：

`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash`

Ubuntu 上一般默认安装了 wget，执行下面命令安装：

`wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash`

上面的脚本安装的版本为 0.32.1 的 nvm。你可以从其仓库查找最新版本的安装脚本执行。

最后需要配置 shell 启动脚本，macOS 与 Ubuntu 默认 shell 为 bash，如果你定制使用了其它 shell，
请去 nvm 的 Github 仓库查看配置方法。macOS 用户请将下面脚本写到文件 `~/.bash_profile` 结尾；Ubuntu
用户应将其写到文件 `~/.bash_rc` 末尾。

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # 这行加载 nvm
```

完成后，重启终端或者执行命令 `source ~/.bash_profile` （或 `source ~/.bash_rc`）为当前终端加载配置。

你可以执行 `nvm --version` 验证是否安装成功，如果安装成功它应该返回所装 nvm 的版本号。

```sh
$ nvm version
0.32.0
```

### 使用 nvm 安装 node

nvm 使用比较简单，我们首先用它安装 node 的最新 lts（Long Term Support，长期支持）版本。打开终端执行
`nvm install --lts`，这一步可能耗时较长，请耐心等待它自动完成。你可以在 https://github.com/nodejs/LTS#lts_schedule
中跟进 node lts 版本的更新计划与支持年限。

npm 工具会随 node 一起被安装。按上面步骤安装结束后，依次执行下列命令查看 node 与 npm 是否成功被安装：

```sh
$ node --version
v6.9.2
$ npm --version
3.10.9
```

其它常用命令如下：

| 命令                        | 作用                                                              |
|---------------------------|-----------------------------------------------------------------|
| `nvm install --lts`       | 安装最新 lts 版本 node                                                |
| `nvm install --lts=argon` | 安装名为 argon 的 lts 版本                                             |
| `nvm install v6.9.1`      | 安装版本号为 `v6.9.1` 的node                                           |
| `nvm ls`                  | 查看当前安装的所有 node 版本                                               |
| `nvm alis default v6.9.1` | 将 v6.9.1 设定为默认 node 版本，以后打开命令行后默认使用该版本 node                     |
| `nvm use --lts`           | 在当前环境（一般就是你执行该条命令的 shell）中使用 lts 版本的 node                       |
| `nvm use v6.9.1`          | 在当前环境（一般就是你执行该条命令的 shell）中使用 v6.9.1 版本的 node                    |
| `nvm ls-remote`           | 查看所有可以安装的 node 版本                                               |
| `nvm use system`          | 如果你的系统中安装了 node 比如在 Ubuntu 中你使用 apt-get 安装了 node，执行该命令使用系统 node |

## create-react-app  2页

`create-react-app` 是开源社区贡献的一个很好的供入门学习者快速搭建 React 运行环境的工具，它提供了
一组脚本帮助你快速建立一个无需配置构建脚本的测试项目。下面介绍它的使用方法。

首先你需要安装 `create-react-app` 命令行工具，在终端中执行 `npm install -g create-react-app` 将
该工具安装到全局环境。执行命令 `create-react-app helloworld` 创建一个测试项目。命令执行完成你会在当前
目录下看到新建项目目录 `helloworld`，其目录结构如下：

```sh
helloworld
├── README.md
├── node_modules/
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   └── logo.svg
└── yarn.lock
```

可以看见其目录结构比较简单，除应用相关文件之外无其它配置文件。下面进入项目目录并启动应用，执行：

```sh
cd helloworld
npm start
```

应用在开发模式启动，使用浏览器打开 http://localhost:3000 查看应用效果如下：

![](https://coding.net/u/hoteam/p/Cache/git/raw/3157226c5ce8ab064a75328bbd8362a9efe43d7e/Book/React%25E5%2588%259D%25E7%25AA%25A5/%25E6%2590%25AD%25E5%25BB%25BAReact%25E8%2584%259A%25E6%2589%258B%25E6%259E%25B6/create_react_app_0.png)

开发模式下，支持热加载，修改相关应用代码后，应用页面会自动刷新并加载运行最新改变；同时构建错误
和代码 lint 警告信息会在终端显示：

![](https://coding.net/u/hoteam/p/Cache/git/raw/3157226c5ce8ab064a75328bbd8362a9efe43d7e/Book/React%25E5%2588%259D%25E7%25AA%25A5/%25E6%2590%25AD%25E5%25BB%25BAReact%25E8%2584%259A%25E6%2589%258B%25E6%259E%25B6/create_react_app_1.png)

下面介绍一下项目目录下可用脚本，命令 `npm start` 用于启动应用，上面说过不再赘述。命令 `npm test` 
用于启动交互模式下的 test runner。执行 `npm run build` 将构建代码到 `build` 目录下；
它会在 production 模式下正确打包 React 应用，并进行性能优化；构建得到的文件经被最小化，
文件的 hash 值作为文件名的一部分便于缓存，此时你的应用已经可以用于部署。

最后还有一个命令 `npm run eject`。前面说过 `create-react-app` 创建的应用中并不包含与构建相关的配置。
如果你已经入门称为正式玩家、或不满足于默认配置和构建工具，你可以使用该条命令将所有配置弹出到项目目录，该命令
是单向不可逆的，入门学习时无需使用。配置弹出后，上面提到的除了 `npm run eject` 外所有命令仍可使用，
但此时，项目所有的配置都在你掌控下了。

很多时候你并不需要弹出配置，默认配置提供的特性已经很适合小中型应用部署，当然也不需要受限于该配置，
等到已经入门并做好准备，学习如何定制构建环境可以说是一项必备技能。

下面一节将以 vscode 为例介绍如何搭建一个代码编辑环境。我们会继续使用本节中创建的实例来介绍一些
编辑器中常用特性。

## 选用合适编辑器搭建开发环境  3页

> 着重介绍、配置一款开源编辑器（暂定 atom/vscode，现偏向 atom），搭建舒适的开发环境。介绍常用的
> 便于开发的编辑器特性如语法高亮、语言或工具相关插件、版本控制相关插件、自定义模版系统等。

对于前端开发者而言，比较好的 IDE 是 jetbeans 推出的 Webstorm，它开箱即用，感兴趣的读者可以下载试用，
它提供了 30 天的试用期，如果觉得合适，可以购买正版使用，决定使用该 IDE 的话，本章关于编辑器配置的部分
可略过不看。对于那些更愿意使用相对轻量的编辑器的开发者而言，可选的优质编辑器很多，如 emacs、vim、atom、
sublime、vscode。除 sublime 以外，其它编辑器都是开源的，而 sublime 也提供永久免费使用（偶尔弹窗提醒购买 license）；
它们都是跨平台的。这一节将以 vscode 为例来配置一个开发环境。它是由微软推出的一款开源的代码编辑器，
相对 emacs 和 vim 来说上手相对容易，而性能优于 atom，你可以从其官网 https://code.visualstudio.com/
下载安装。

其界面如下：

![](https://coding.net/u/hoteam/p/Cache/git/raw/2c386ca1062cd8f1a376b95cf308c84376e45a2b/Book/React%25E5%2588%259D%25E7%25AA%25A5/%25E6%2590%25AD%25E5%25BB%25BAReact%25E8%2584%259A%25E6%2589%258B%25E6%259E%25B6/vscode_ui_0.png)

左侧五个按钮功能分别是文件浏览器、搜索、版本管理、调试和插件安装。UI 设计比较清爽，功能也很直接，
使用起来应该没有太大门槛。

在左侧文件浏览器中点击 Open Folder 或者点击菜单中 File|Open 选择上一节创建的 helloworld 项目目录，
打开后界面如下：

![](https://coding.net/u/hoteam/p/Cache/git/raw/cdccb2e72e0621b5ae62a0749fba101a6b07b7d0/Book/React%25E5%2588%259D%25E7%25AA%25A5/%25E6%2590%25AD%25E5%25BB%25BAReact%25E8%2584%259A%25E6%2589%258B%25E6%259E%25B6/vscode_ui_1.png)

可以左侧文件浏览器中右击目录或选中目录后点击界面上按钮创建文件或目录到指定位置，同时它也支持文件
拖动操作。

![](https://coding.net/u/hoteam/p/Cache/git/raw/56e7f5c50d474b90b1e403f2be107b0f0599b46a/Book/React%25E5%2588%259D%25E7%25AA%25A5/%25E6%2590%25AD%25E5%25BB%25BAReact%25E8%2584%259A%25E6%2589%258B%25E6%259E%25B6/vscode_ui_3.png)

它的窗口分割功能非常方便，相信大家会经常用到，点击左侧文件浏览器打开一个文件后，点击 View|Split Editor 会
竖向分割窗口（注意如果当前未打开任何文件，不会执行窗口分割）。

![](https://coding.net/u/hoteam/p/Cache/git/raw/d6192963795ed266a2c537f15f1dff4f42f43d98/Book/React%25E5%2588%259D%25E7%25AA%25A5/%25E6%2590%25AD%25E5%25BB%25BAReact%25E8%2584%259A%25E6%2589%258B%25E6%259E%25B6/vscode_ui_4.png)



## NPM 与 Yarn  3.5页



## 常用开发工具  4页

介绍常用的开发工具，推荐相关 Chrome 插件（如 React devtools），介绍  Storybook 及周边。
