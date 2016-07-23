<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [HTML 与 CSS基础](#html-%E4%B8%8E-css%E5%9F%BA%E7%A1%80)
- [Practicing HTML and CSS Basics](#practicing-html-and-css-basics)
  - [Experiment 1](#experiment-1)
  - [Experiment 2](#experiment-2)
- [HTML and CSS Best Practices](#html-and-css-best-practices)
  - [**Semantic Markup**:语义标记](#semantic-markup%E8%AF%AD%E4%B9%89%E6%A0%87%E8%AE%B0)
  - [**CSS Naming Conventions**](#css-naming-conventions)
  - [CSS Reset](#css-reset)
  - [**Cross Browser Support**](#cross-browser-support)
  - [**CSS Preprocessors and Postprocessors**](#css-preprocessors-and-postprocessors)
  - [**Grid Systems and Responsiveness**](#grid-systems-and-responsiveness)
- [Practicing HTML and CSS Best Practices](#practicing-html-and-css-best-practices)
  - [Experiment 3](#experiment-3)
      - [Experiment 4](#experiment-4)
- [Stay current](#stay-current)
- [Learn by example](#learn-by-example)
  - [**Styleguides**](#styleguides)
  - [**Code Conventions**](#code-conventions)
- [Further Reading](#further-reading)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

本文翻译自FreeCodeCamp的[from-zero-to-front-end-hero-part](https://medium.freecodecamp.com/from-zero-to-front-end-hero-part-1-7d4f7f0bff02#.ailsv41bd)。



> 译者的废话，不感兴趣的直接忽略

> 前两天才翻译了一篇文章：[解决你的前端面试](https://segmentfault.com/a/1190000005127264)，这类型的文章都是关于前端的一些基础知识的，不过文章里的链接都是外文资料，更多的会学习的是思想吧和知识点列表。对于前端，或者更广泛的说的客户端开发的知识点图谱还是推荐下[这个](https://segmentfault.com/a/1190000004612590)。笔者打算先写完[React+Redux+Webpack的系列笔记和实战](https://github.com/wxyyxc1992/web-frontend-practice-handbook)然后就把这些学习链接看看整理找一些中文的或者自己整理一些放出来，不过估计应该也有大神写了现成的，欢迎分享给我。



记得那年，我初学前端，遇见了很多的文章，在浩瀚的知识海洋里我手足无措，不知从何开始。己所不欲，勿施于人。这篇文章就会帮你去遨游前端学习的海洋，主要包含了在我之前的学习过程中整理的一些资源和一些感悟。我打算将整篇文章切分为两部分，第一部分重温HTML与CSS的基本知识，第二部分概括JavaScript、前端框架与设计模式。

# HTML 与 CSS基础

前端的领域里，任何东西都离不开[HTML](https://en.wikipedia.org/wiki/HTML) 与 [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)。HTML与CSS基本上控制了你看到的所有东西，HTML用来定义内容而CSS负责样式与布局。



![](http://7xkt0f.com1.z0.glb.clouddn.com/1-1msCRn-wDUzuGtI1yPUbAA.gif)



首先从[HTML](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Introduction) 以及 [CSS](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/What_is_CSS) 开始，这里推荐的是MDN的官方指南。MDN对于重要的HTML与CSS内容进行了详细条理的阐述，除此之外，每一章都是单独的一页，提供了在CodePen与JSFiddle展示的Demo。  

看完了这些基础教程之后，可以来看看由CodeAcademy提供的t[Make a Website](https://www.codecademy.com/learn/make-a-website)系列课程。这个课程只要几个小时就能看完，如果你想要更多的锻炼，可以瞅瞅[CSS Diner](http://flukeout.github.io/)，这是一个CSS挑战的小游戏。

最后，可以看看怎么使用 [Google Fonts](https://www.google.com/fonts)，参考下 CSSTricks出的[Basics of Google Font API](https://css-tricks.com/snippets/css/basics-of-google-font-api/)。 

> 国内用不了Google Fonts的话可以参考下FontAwesome，如果你要用中文字体的话建议参考FontSpider，请自行Github搜索。



Typography--排版也是个构建界面时候很重要的部分，有时间的话推荐你看看Donny Truong写的[Professional Web Typography](https://prowebtype.com/)这本书，它会教你基本上关于排版的所有东西。在学习这些的时候不要太担心自己会忘了，反正记不住。你应该着重于记录这些并且理解HTML和CSS是怎么工作的。



# Practicing HTML and CSS Basics

到这里你应该已经明白了HTML与CSS的基本使用，下面我们要学以致用了。这一部分就设计了两个小实验来让你自己动手构建网站与界面。我是把它们形容成实验，所以不要害怕失败。

## Experiment 1

第一个实验里，我们用的是[CodePen](http://codepen.io/)，一个在线的HTML与CSS实验台。同时也提供了实时预览功能，一石二鸟呦。好了，下面我们要看看我们做的界面的原型了，转到 [Dribbble](https://dribbble.com/)吧, 这嘎达可全是设计创意啊。

我是看上了这个系列：[1](https://dribbble.com/shots/2262761-Mobile-Blog-App-Interface/attachments/424147), [2](https://dribbble.com/shots/2492038-Task-List-App/attachments/489171), [3](https://dribbble.com/shots/2144170-Day-014-Location-Card/attachments/392323), [4](https://dribbble.com/shots/2639709-Confirm-Reservation/attachments/528798), 以及 [5](https://dribbble.com/shots/2314157-Daily-UI-Day-1/attachments/439137).。我选择了一个移动优先的设计是因为与桌面设计相比更简单一点，不过你也可以自己找一个。

![](http://7xkt0f.com1.z0.glb.clouddn.com/1-fJ77FSYZ3uadewW0Z8F_ZA.png)

在你选定了设计之后，就可以在CodePen上面开始动手了。你也可以看看其他人设计的Pen： [pens on CodePen](http://codepen.io/pens/). 另外，别忘了[StackOverflow](http://stackoverflow.com/) ，这可是你的小伙伴呦。如果你最后实现的东西跟设计相去甚远，也不要灰心，不断尝试总会提高的。

## Experiment 2

经过实验一估计你已经有点自信了，在实验二里面我们将会先借鉴一些大公司的经典站点。有不少站点会用一些CSS框架或者混淆它们的CSS类名，这会让源代码的阅读比较麻烦，这嘎达我列举了几个源代码可读性比较好的：

- [Dropbox for Business](https://www.dropbox.com/business): Try replicating their [hero](https://en.wikipedia.org/wiki/Hero_image) section

- [AirBnB](https://www.airbnb.com/): Try replicating their footer

- [PayPal](https://www.paypal.com/home): Try replicating their navigation bar

- [Invision](http://www.invisionapp.com/): Try replicating their signup section at the bottom of the page

- [Stripe](https://stripe.com/us/pricing): Try replicating their payments section



再次强调下，实验二的目的并不是让你去重构整个页面，而是知道怎么去分割组件以及人家是怎么做的。如果你没有设计的背景，可能你要好好发掘下你的潜能了。一个优秀的前端开发者要能够辨别好的设计然后完美地重现它们，可以参考下我的这篇文章：[develop your design eye](https://medium.com/@JonathanZWhite/developing-your-eye-for-design-cce944bbeae4#.tsg9204dm).

![](http://7xkt0f.com1.z0.glb.clouddn.com/1-RGfXwH8rD3vQPAGIwhikVA.png)



你可以选择在线编程：[CodePen](http://codepen.io/) 或者直接本地开发。如果你选择本地做，那你可以使用这个 [模板项目](https://github.com/murtaugh/HTML5-Reset) 。我推荐是使用[Atom](https://atom.io/) 或者[Sublime](https://www.sublimetext.com/)这样的编辑器。另外，对于Firefox或者Chrome自带的控制台与开发者工具也要好好瞅瞅。





# HTML and CSS Best Practices

好了，现在你已经能够用HTML与CSS做一些简单的事情了，下面就要看看所谓的最佳实践了。最佳实践实际上就是一系列的在日常开发中总结出来的约定俗成的规范的集合，来让你更快地开发与构建更高质量的代码。

## **Semantic Markup**:语义标记

HTML与CSS最佳实践中重要的一条就是怎么来写出有语义可读性的标记。好的语义即是你使用了合适的HTML标签与CSS的类名来传达出你想表达的结构含义。

譬如 *h1 *标签会告诉我们里面包裹的是一些很重要的标题信息，另一个例子就是*footer *标签，会直截了当地跟你说，这里面是包含一些页脚信息。建议你阅读 [A Look Into Proper HTML5 Semantics](http://www.hongkiat.com/blog/html-5-semantics/) 以及CSSTricks的 [What Makes For a Semantic Class Name](https://css-tricks.com/semantic-class-names/)。



## **CSS Naming Conventions**

下面一个比较重要的事情就是怎么给你的CSS定一个合适的类名。好的命名习惯，譬如语义化的标记，可以更好地传达含义，让代码的可读性与可维护性大大增加。你可以瞅瞅[OOCSS, ACSS, BEM, SMACSS: what are they? What should I use?](http://clubmate.fi/oocss-acss-bem-smacss-what-are-they-what-should-i-use/)这篇文章里提及的CSS的一些命名的习惯。

总体来说，我的建议是跟着你的直觉来确定命名习惯，随着时间的发展你会觉得这样看上去很舒服。如果你要看看大公司，譬如Medium是怎么实践BEM这样的命名规范的，可以阅读 [Medium’s CSS is actually pretty f***ing good](https://medium.com/@fat/mediums-css-is-actually-pretty-fucking-good-b8e2a6c78b06#.ef81j61eg)这篇文章，在这里你会学到怎么在一个快速迭代地情况下也维护你的有效地CSS命名习惯。

## CSS Reset

不同的浏览器在譬如margin以及line-height这些小的样式点之间存在着一些不一致性，因此你要学会重置你的CSS环境。 [MeyerWeb](http://meyerweb.com/eric/tools/css/reset/index.html) 就是一个常见的重置手段，如果你想深入了解下，推荐你阅读 [Create Your Own Simple Reset.css File](http://code.tutsplus.com/tutorials/weekend-quick-tip-create-your-own-resetcss-file--net-206)这篇文章。



## **Cross Browser Support**

跨浏览器支持意味着你的代码要去支持绝大部分的现代浏览器，一些常见的CSS属性，譬如 *transition* 需要 [vendor prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) 来运行在不同的浏览器中。你可以在 [CSS Vendor Prefixes](http://webdesign.about.com/od/css/a/css-vendor-prefixes.htm)这篇文章里获取更多的知识。这就意味着你需要花费更多的时间来在不同的浏览器之间进行测试。 

![](http://7xkt0f.com1.z0.glb.clouddn.com/1-pCAitbJZl5eai2oNdzIphA.png)



## **CSS Preprocessors and Postprocessors**

翻开CSS的历史，自90年代以来，CSS走过了一段漫长而崎岖的道路。整个UI系统变得日益繁复，人们也会去选择使用一些预处理器或者后处理器来管理这种复杂性。CSS的预处理器或者CSS语言的扩展会在无声无息之间提供类似于变量、Mixins以及继承这些特性。最主要的两个CSS的预处理器就是[Sass](http://sass-lang.com/guide) 与 [Less](http://lesscss.org/)。2016年中Sass被越发广泛地使用，著名的响应式框架BootStrap就是从Less迁移到了Sass。另外，很多人谈到SASS的时候也会提到Scss，你可以参考 [whats-difference-sass-scss](https://www.sitepoint.com/whats-difference-sass-scss/)这篇文章。

![](http://7xkt0f.com1.z0.glb.clouddn.com/1-7Px9Kzaw8-eLCf2D41yauQ.png)

CSS后处理器则对于手写的CSS文件或者经过预编译的CSS文件进行一些处理，以著名的[PostCSS](https://github.com/postcss/postcss) 为例，它有一个插件可以帮你自动地添加一些渲染前缀。

当你接触过CSS的预处理与后处理器之后，你会把它们提升到日常伴侣的。不过，过犹不及，像变量和Mixins这些特性不能滥用啊，还是应该在合适的地方使用（译者注：此言非常有理）。还是推荐下[Medium’s CSS is actually pretty f***ing good](https://medium.com/@fat/mediums-css-is-actually-pretty-fucking-good-b8e2a6c78b06#.ef81j61eg)这篇文章。



## **Grid Systems and Responsiveness**

网格系统即是用来水平或者垂直地排布元素的CSS架构。



![](http://7xkt0f.com1.z0.glb.clouddn.com/1-SqbRKZTnd78gsQEOPPAt1g.png)

著名的网格框架有[Bootstrap](http://getbootstrap.com/), [Skeleton](http://getskeleton.com/), 以及 [Foundation](http://foundation.zurb.com/)，它们提供了用于在布局中进行行列管理的样式表。这些框架用起来很方便，不过我们也是要理解网格的工作原理，推荐看[Understanding CSS Grid Systems](http://www.sitepoint.com/understanding-css-grid-systems/) 以及 [Don’t Overthink Grids](https://css-tricks.com/dont-overthink-it-grids/)。

网格系统另一个目标就是是你的网站具有响应式特性。响应式意味着你的网站可以根据屏幕的大小来动态调整你网站大小与布局。很多时候这个响应式特性都是基于[CSS media queries](http://www.w3schools.com/css/css_rwd_mediaqueries.asp), 即根据不同的屏幕大小选用不同的CSS样式规则。

![](http://7xkt0f.com1.z0.glb.clouddn.com/1-EERzyzZhHJ5FWXKi2PNxuA.gif)

你可以看一下 [Intro to Media Queries](https://varvy.com/mobile/media-queries.html)来了解更多。另外，因为我们正在进行一场所谓[mobile-first](http://zurb.com/word/mobile-first)变革，推荐你看下[An Introduction to Mobile-First Media Queries](http://www.sitepoint.com/introduction-mobile-first-media-queries/)。

# Practicing HTML and CSS Best Practices

恭喜道友，筑基成功，你已经能够了解一些关于HTML与CSS的最佳实践了，下面又到了学以致用的时间。这里的两个实验主要是让你锻炼下编写整洁的代码和保证长期的可读性与可维护性。



## Experiment 3

实验3中，你需要选一个你之前自己做的项目并且用上文中提及的最佳实践去重构它们，从而保证你的代码更易读并且更简洁。掌握如何有效地重构代码是前端开发者的一个重要技能。当然，写出高质量的代码并非一蹴而就，而是需要一个长期的迭代过程，[CSS Architectures: Refactor Your CSS](https://www.sitepoint.com/css-architectures-refactor-your-css/)这篇文章就是一个不错的学习起点。 

![](http://7xkt0f.com1.z0.glb.clouddn.com/1-u0dt7ROmLrAV4sm7uqtxWA.png)

当你决定要重构代码之前，你要先扪心自问以下几点

- 你的类名定义是不是模糊不清的，6个月之后你还能否明白你类名的意义。

- 你的HTML与CSS是否足够语义化，一眼望去是否就能明白你的代码架构与关系意义？

- 你是否N次的重复使用了相同的颜色代码，别忘了可以用[Sass variable](http://webdesign.tutsplus.com/articles/understanding-variable-scope-in-sass--cms-23498)。

- 你的代码是否能够在Safari与Chrome都能正常运行？

- 能否用像[Skeleton](http://getskeleton.com/)这样的网格框架来代替你自己的布局?

- 你是不是经常使用了`!important`?



#### Experiment 4

最后一个实验是一个大杂烩，把前面讲的所有知识都混杂起来。不过要知道的是，上面讲的很多最佳实践在一个草稿或者小型项目里难见分晓，只有在大项目里才能显露峥嵘。

因此，最后一个项目我是建议建立一个自己的作品剪辑网站，作为一个前端开发者，个人网站就是自己的电子名片。这里会展示你的作品与项目的积累，也是一个回溯你发展的进程与开发履历的地方。

![](http://7xkt0f.com1.z0.glb.clouddn.com/1-0Yyx08kVpfchZodM7DkHZA.jpeg)

可以参考Adham Dannaway的文章 [My (Simple) Workflow To Design And Develop A Portfolio Website](https://www.smashingmagazine.com/2013/06/workflow-design-develop-modern-portfolio-website/)来从零开始。



# Stay current

当HTML与CSS已经是小菜一碟，你就算是进入了前端开发者的殿堂，一个不断发生改变的地方。

![](http://7xkt0f.com1.z0.glb.clouddn.com/1-a-UBbU05CgPwMgkFFeDHXg.jpeg)



这里推荐一些博客或者期刊，你可以随时关注：



- [CSSTricks](https://css-tricks.com/)

- [Smashing Magazine](https://www.smashingmagazine.com/)

- [Designer News](https://www.designernews.co/)

- [Nettuts+](http://code.tutsplus.com/)

- [CSS Wizard](http://csswizardry.com/)



------



# Learn by example

最后，一般来说，最好的学习方式呢就是跟着例子来，这里再安利一波别人家的公司的样式与命名规范。

## **Styleguides**



![](https://cdn-images-1.medium.com/max/1600/1*792UDPCcmauyc7MDehMHYg.png)



- [Mapbox](https://www.mapbox.com/base/styling/)

- [LonelyPlanet](http://rizzo.lonelyplanet.com/styleguide/design-elements/colours)

- [SalesForce](https://www.lightningdesignsystem.com/)

- [MailChimp](http://ux.mailchimp.com/patterns/)



## **Code Conventions**



- [CSS Guidelines](http://cssguidelin.es/)

- [Github internal CSS toolkit and guidelines](https://github.com/primer/primer)

- [AirBnB’s CSS Styleguide](https://github.com/airbnb/css)



------

# Further Reading

- [我的前端之路](https://segmentfault.com/a/1190000004292245)

- [百度前端训练营](https://github.com/baidu-ife/ife/tree/master/2015_summer)

