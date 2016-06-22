> [原文地址](https://medium.freecodecamp.com/leveling-up-css-44b5045a2667#.67f5mvy07)



CSS的学习是一个典型的低门槛，高瓶颈的过程，第一次接触CSS的时候觉得一切是如此简单，直到后面越学越发现自己一无所知，建议看看张鑫旭老师的[说说CSS学习中的瓶颈](http://www.zhangxinxu.com/wordpress/2012/07/bottleneck-css-study/)。本文则是从四个方面来讨论如何编写可扩展、可维护的CSS代码：

- 使用合理的语义化命名

- 模块化

- 遵循命名规范

- 遵循单一职责原则



# Use Proper Semantics:使用合理的语义化命名

在HTML与CSS中都存在着语义化标记的概念，Semantics即是单次的语义和其关联，在HTML中一个简单的示意如下：

```

<!-- bad -->

<div class=”footer”></div>

<!-- good -->

<footer></footer>

```

语义化的HTML能够比较直接的表示出某个标记的功能，另一方面，Semantic CSS会更加地抽象与主观化。编写语义化地CSS代码意味着你选定的样式类名要能够简单明了的反映出结构与功能信息。另一方面，样式类命名的时候可以不用太过具体化，这样也方便你复用样式类。

![](http://7xiegq.com1.z0.glb.clouddn.com/1-bXUT9ToNeBTYfTAFY18RrQ.png)

这里我们以Medium的CSS进行一个说明：

```

<div class="stream">
 <div class="streamItem">
   <article class="postArticle">
     <div class="postArticle-content">
       <!-- content -->
     </div>
   </article>
 </div>
</div>

```

从上述代码中，你可以迅速辨别出结构、角色和含义。父类为`stream`，代表着一系列文章的列表。而第一个子类为`streamItem`，即列表中的某个文章的实体，这就明显表现出了子类与父类之间的从属关系。另外，这样一个类与结构可以在任何包含文章的页面上完成复用。对于可读性较好地HTML与CSS代码，不应该像一本书，而应该像一个故事，一个故事中会存在角色和角色之间的关系，而这种更多的语义化地CSS可以较好地提示你整个代码的可维护性。下面推荐几个深入阅读的文章：

- [What Makes for Semantic Class Names](https://css-tricks.com/semantic-class-names/)

- [Naming CSS Stuff is Really Hard](https://seesparkbox.com/foundry/naming_css_stuff_is_really_hard) 

- [Semantics and Sensibility](http://csswizardry.com/2010/08/semantics-and-sensibility/)

- [About HTML semantics and front-end architecture](

http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)


# Modularize:模块化

在像React这样的基于组件的项目中，模块化就是根本地准则。通过创建可复用可组合的模块可以将整个系统合理解耦。

![](http://7xiegq.com1.z0.glb.clouddn.com/1-DYyfF6m1JW4DTSncGztYlg.png)

上图中每个蓝色块内就代表一个组件：

```

<div class="stream">
 <div class="streamItem">
   <!-- product info -->
 </div>
</div>

```

大部分的组件又可以拆分为更多的小组件：

![](http://7xiegq.com1.z0.glb.clouddn.com/1-_SKkr5D4W-UmBsABXkGhFw.png)

每个Stream Item都含有一个缩略图和特征信息：

```

<!-- STREAM COMPONENT -->
<div class="stream">
 <div class="streamItem">    <!-- POST COMPONENT -->
   <div class="post">
     <img src="thumbnail.png" class="postThumbnail"/>
     <div class="content">
       <!-- product info -->
     </div>
   </div>  </div>
</div>

```

因为stream组件不依赖于其子组件，因此可以随意地修改post类而不会对stream类有明显地影响。一般来说，代码之间的耦合程度越低，代码的可修改性与可维护性就越好。

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/6/4/1-kylsX1bPHVD-qBjSS6KSJA.png)



深入阅读：

- [CSS Architectures: Scalable and Modular Approaches](https://www.sitepoint.com/css-architectures-scalable-and-modular-approaches/)

- [Writing Modular CSS with Sass](http://sassbreak.com/writing-modular-css-with-sass/)

-  [Modularizing Your Front-End Code for Long Term Maintainability and Sanity](http://www.berndtgroup.net/thinking/blog/development/modularizing-your-front-end-code-for-long-term-maintainability-and-sanity)



# 选择一个好的命名约定

目前已经有了很多的优秀的CSS命名约定规范，不过最好的CSS命名规范还是最适合自己的，因此笔者自己的感觉就是选一个最顺眼的命名约定然后将它改造成适合自己的项目的规范。

- [Object oriented CSS OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)

- [Block element modifier (BEM)](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

- [Scalable and modular architecture for CSS (SMACSS)](https://smacss.com/)

- [Atomic](http://acss.io/)



我个人最喜欢的一个命名规范就是BEM：

![](http://7xiegq.com1.z0.glb.clouddn.com/1-IiVPU9-HXHbxGcx6IJ8Wgg.png)

BEM是最简单，不过也是最严格的命名规范：

```

.block {}
.block__element {}
.block--modifier {}

```

上述代码中的Blocks代表了高等级的一些类，Elements则是Blocks的子元素，而Modifiers代表了不同的状态。

![](http://7xiegq.com1.z0.glb.clouddn.com/1-hkJWfX4XgUf0wbn6iWognA.png)

```

<div class="search">
<input type="search__btn search__btn--active" />
</div>

```

在上述例子中，search类是一个Block，而Search Button则是它的一个子元素，如果你希望修改按钮的状态，那么应该添加一个类似于active的Modifier。另外你需要记住的是，未来你工作的代码库里很有可能会出现多个命名规范，你也要学会兼容并包，能够接受学习其他的一些标准。如果你希望对于BEM进行深入了解，那么可以阅读以下文章：

- [Getting your head ’round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

-  [BEM 101](https://css-tricks.com/bem-101/)

-  [Intro to BEM](http://getbem.com/introduction/)

-  [OOCSS, ACSS, BEM, SMACSS: what are they? What should I use?](http://clubmate.fi/oocss-acss-bem-smacss-what-are-they-what-should-i-use/)



# 遵循单一职责原则

SRP原则即只每个模块或者类只应承担软件系统中的某个单一功能，并且该职责应该完整地封装在类的内部，即对外屏蔽内部实现。而具体到CSS的领域里，SRP意味着某个代码片、类或者模块只应该做一件事。而在CSS的文件组织上，意味着像Carousels、Navigation Bar这样的组件应该有自己独立的CSS文件。

```

/components 

  |- carousel

  |- |- carousel.css

  |- |- carousel.partial.html

  |- |- carousel.js

  |- nav

  |- |- nav.css

  |- |- nav.partial.html

  |- |- nav.js

```

另一个常见的文件组织方式就是按照功能进行文件组织，举例而言，在上述的代码片中，所有关于Carousel的文件都应该被放到同一个文件夹中。通过这种方式可以将文件索引变得更加容易。同样地，对于常见的全局样式而言，也需要适用于独立地全局样式：

```

/base

  |- application.css 

  |- typography.css

  |- colors.css

  |- grid.css

```

在上述例子里，不同类型的全局样式需要分割到不同的文件中，这样的话如果你需要去更改你的颜色等等样式，那就很容易找到修改哪个文件。无论哪种文件组织方式比较顺眼，你都应该遵循统一的SRP原则。如果某个文件变得冗余臃肿，你应该考虑根据逻辑或者其他东西对内容进行切分。关于文件组织结构与CSS结构方面地深入阅读：

- [Aesthetic Sass 1: Architecture and Style Organization](https://scotch.io/tutorials/aesthetic-sass-1-architecture-and-style-organization) 

- [Scalable and Maintainable CSS Architecture](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/).


对于每个独立的CSS类而言，都应该只包含一个功能。换言之，应该根据关注点的差异将样式切分到不同的类中，这里有个小例子：

```

.splash {

  background: #f2f2f2;

  color: #fffff;

  margin: 20px;

  padding: 30px;

  border-radius: 4px;

  position: absolute;

  top: 0;

  right: 0;

  bottom: 0;

  left: 0;

}

```

在上面这个例子里，我们搞错了某些关注点，`splash`类不仅包含了其自己的展示的样式与逻辑，还定义了部分关于其子元素的样式，因此需要切分到两个单独类中：

```

.splash {

  position: absolute;

  top: 0;

  right: 0;

  bottom: 0;

  left: 0;

}

```



```

.splash__content {

  background: #f2f2f2;

  color: #fffff;

  padding: 30px;

  border-radius: 4px;

}

```



深入阅读：

- [The single responsibility principle applied to CSS](http://csswizardry.com/2012/04/the-single-responsibility-principle-applied-to-css/) 

- [Single Responsibility](http://drewbarontini.com/articles/single-responsibility/).







