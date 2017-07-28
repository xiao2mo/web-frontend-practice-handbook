
# Frontend Responsive
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/11/3/1-7YeOvzoYgUEDJdfQy2ERXg.png)

## Reference

> - [这可能是史上最全的CSS自适应布局总结](http://mp.weixin.qq.com/s?__biz=MzA4ODIxMzg5MQ==&mid=2653995792&idx=1&sn=730974c4cff6d3738c52902a2f99ed7e&scene=23&srcid=0516rsLrl38nVY19S5QIKHGC#rd)
> - [developing-mobile-web-apps-when-why-and-how](https://www.toptal.com/android/developing-mobile-web-apps-when-why-and-how)
> - [10-tips-for-mobile-web-design-optimization](https://www.elegantthemes.com/blog/tips-tricks/10-tips-for-mobile-web-design-optimization)
> - [The pro's guide to responsive web design](http://www.creativebloq.com/rwd/pros-guide-responsive-web-design-71515692?utm_source=tuicool&utm_medium=referral):Advanced techniques from top web designers to build better sites for any device.

# HTML Boilerplate
(1)百分比下高度问题
笔者习惯于在Chrome进行调试开发，往往在将界面放在Android或者iOS的WebView时候会发现部分元素在垂直方向上的尺寸出现了异常，即高度出现了异常。做两个对比：
```
<div   id="a"  style="width: 100px; height: 200px; background-color: orange"><div id="aa" style="width: 100px; height: 50%;   background-color: blue"></div></div>
``` 
其效果为黄蓝色各占一半，而如果未对父元素设置尺寸：
```
<div   id="b"  style="width: 100px;              background-color: orange"><div id="bb" style="width: 100px; height: 50%; background-color: blue"></div></div>
```
最终的效果就是一片空白，或者说在此状态下元素的高度由内部内容决定，譬如：
```
<div id="outer"><div id="inner"><p>Where is pancakes house?</p></div></div>
```
outer与inner两个div的高度会扩展到足够容纳文本内容。

## Viewport
## Semantic HTML
> [why-not-use-tables-for-layout-in-html](http://stackoverflow.com/questions/83073/why-not-use-tables-for-layout-in-html?rq=1)

The whole "Tables vs Divs" thing just barely misses the mark. It's not "table" or "div". It's about using semantic html.

Even the div tag plays only a small part in a well laid out page. Don't overuse it. You shouldn't need that many if you put your html together correctly. Things like lists, field sets, legends, labels, paragraphs, etc can replace much of what a div or span is often used to accomplish. Div should be used primarily when it makes sense to indicate a logical *div*ision, and only appropriated for extra layout when absolutely necessary. The same is true for table; use it when you have tabular data, but not otherwise.

Then you have a more semantic page and you don't need quite as many classes defined in your CSS; you can target the tags directly instead. Possibly most importantly, you have a page that will score much better with Google (anecdotally) than the equivalent table or div-heavy page. Most of all it will help you better connect with a portion of your audience.

So if we go back and look at it in terms of table vs div, it's my opinion that we've actually come to the point where div is over-used and table is under-used. Why? Because when you really think about it, there are a lot of things out there that fall into the category of "tabular data" that tend to be overlooked. Answers and comments on this very web page, for example. They consist of multiple records, each with the same set of fields. They're even stored in a sql server table, for crying out loud. This is the exact definition of tabular data. This means an html table tag would absolutely be a good semantic choice to layout something like the posts here on StackOverflow. The same principle applies to many other things as well. It may not be a good idea to use a table tag to set up a three column layout, but it's certainly just fine to use it for grids and lists... except, of course, when you can actually use the ol or ul (list) tags.





# Responsive Size:响应式尺寸
## Media Query:媒介查询
> - [CSS Media Queries for iPads & iPhones](http://stephen.io/mediaqueries/)

### Media Query By SCSS
### Responsive Menu
老实说，笔者一直觉得响应式开发最成功的应用就是菜单了，这里介绍简单的响应式菜单的开发方式，借鉴了[W3School](http://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_topnav)的教程，首先，HTML的元素布局为：
```
<ul class="topnav">
  <li><a href="#home">Home</a></li>
  <li><a href="#news">News</a></li>
  <li><a href="#contact">Contact</a></li>
  <li><a href="#about">About</a></li>
  <li class="icon">
    <a href="javascript:void(0);" onclick="myFunction()">&#9776;</a>
  </li>
</ul>
```
然后我们可以添加基本的样式：
```
/* Remove margins and padding from the list, and add a black background color */
ul.topnav {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
}

/* Float the list items side by side */
ul.topnav li {float: left;}

/* Style the links inside the list items */
ul.topnav li a {
    display: inline-block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    transition: 0.3s;
    font-size: 17px;
}

/* Change background color of links on hover */
ul.topnav li a:hover {background-color: #111;}

/* Hide the list item that contains the link that should open and close the topnav on small screens */
ul.topnav li.icon {display: none;}
```
然后通过Media Query进行不同的尺寸下的样式设置：
```
/* When the screen is less than 680 pixels wide, hide all list items, except for the first one ("Home"). Show the list item that contains the link to open and close the topnav (li.icon) */
@media screen and (max-width:680px) {
  ul.topnav li:not(:first-child) {display: none;}
  ul.topnav li.icon {
    float: right;
    display: inline-block;
  }
}

/* The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. This class makes the topnav look good on small screens */
@media screen and (max-width:680px) {
  ul.topnav.responsive {position: relative;}
  ul.topnav.responsive li.icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  ul.topnav.responsive li {
    float: none;
    display: inline;
  }
  ul.topnav.responsive li a {
    display: block;
    text-align: left;
  }
}
```
对于实际的效果的例子在[这里](http://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_topnav)
## Flexible Units:灵活的尺寸单位
### Viewport Size:基于Viewport的单位
```
1vw = 1% of viewport width
1vh = 1% of viewport height
1vmin = 1vw or 1vh, whichever is smaller
1vmax = 1vw or 1vh, whichever is larger
```
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/7/2/44744A57-A3CE-4218-8824-438E302A8636.png)

总而言之，就笔者目前的认知而言，虽然在下文中也会介绍几种关于Viewport Size的Polyfill，不过总体而言笔者还不是很建议现在就大范围地使用Viewport Size。

#### [viewport-units-buggyfill](https://github.com/rodneyrehm/viewport-units-buggyfill)
#### [vminpoly](https://github.com/saabi/vminpoly)
整体而言该Polyfill的完善度与社区活跃度皆不如上者，建议有需要的还是参考下上面那个Polyfill。

### FontSize:字体
> - [css-font-size-em-vs-px-vs-pt-vs](http://kyleschaeffer.com/development/css-font-size-em-vs-px-vs-pt-vs/)
> - [the-ems-have-it-proportional-media-queries-ftw](https://cloudfour.com/thinks/the-ems-have-it-proportional-media-queries-ftw/)

### Fixed Size
To avoid mobile browsers (iOS Safari, *et al*.) from zooming in on HTML form elements when a `` drop-down is tapped, add `font-size` to the selector rule:

```
input[type="text"],
input[type="number"],
select,
textarea {
  font-size: 16px;
}
```


### Flexible Size
The type font size in a responsive layout should be able to adjust with each viewport. You can calculate the font size based on the viewport height and width using `:root`:

```
:root {
  font-size: calc(1vw + 1vh + .5vmin);
}
```

Now you can utilize the `root em` unit based on the value calculated by `:root`:

```
body {
  font: 1em/1.6 sans-serif;
}
```

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/7/1/use-root-flexible-type.gif)
```
:root {
  font-size: calc(1vw + 1vh + .25vmin);
}
body {
  font: 1em/1.75 "Open Sans", sans-serif;
}
.container {
  padding: 0 1em
}
code {
  background: #eee;
  border-radius: 3px;
}
em {
  background: #ffeb3b;
  font-style: normal;
}
code,
em {
  padding: .1em .2em;
}
```
## 合理的单位搭配
在响应式开发中，很多人都会建议不要使用px这种绝对值作为尺寸，不过这也是因人而异的，过度的使用相对值也会导致开发的复杂度与不可预测性的增加。老实说，最傻瓜的开发方案就是在一套视觉稿基础上使用绝对值开发，然后使用下文介绍的按比例缩放的技巧去适应各个屏幕。
For layout type things like the sizes of boxes, you want to use % because you will typically have several columns sized as a percentage of their parent that will stack on top of each other at a certain breakpoint (width:100%). No other unit will allow you to fill 100% of the space like % does. But with the min-height, max-height, min-width, max-width CSS keys.

For padding/margins use em, normally you will want to space your elements out relative to the size of your text. With em (the with of an 'M' character) you can quite easily say I want approximately 1 character spacing here.

For borders you can use px or em, there is a difference though. If you want your border to look like it's one pixel wide on all devices, use 1px. It may not be one pixel on all devices however, high density displays convert 1px into 2px for example. If you want your border to be a size based on your font, use em.

[dabblet](http://dabblet.com/gist/3734579)

For fonts use em (or %), the use of em carries through parents to children and it just a nicer unit to work with over px.

For the next generation

vw and vh. The vw is 1/100th of the window's width and the vh is 1/100th of the window's height. For responsiveness they are going to be the new units.

# Auto Resize:自动缩放
## CSS Responsive Grid System
> - [understanding-css-grid-systems](https://www.sitepoint.com/understanding-css-grid-systems/)

### CSS Grid Layouts
> - [The future of layout with CSS: Grid Layouts](https://medium.com/@patrickbrosset/css-grid-layout-6c9cba6e8a5a#.abrk05o7z)

## Flexbox:动态分配空间
## Proportional Scale:按比例缩放

# Auto Layout:自动布局
## Flexbox:flex-wrap
### Bugs
在iOS中有时候会发现如果没有设置flex元素的尺寸，只是设置了最大值或者最小值会导致计算是否需要换行出现错误，可以参考[row-wrap-in-flex-box-not-wrapping-in-safari](http://stackoverflow.com/questions/25360526/row-wrap-in-flex-box-not-wrapping-in-safari/30792851#30792851)这个问题，即如果我们的样式是：
```
div.flex {
    display: -webkit-flex;
    display: flex;-webkit-flex-wrap: wrap;
    flex-wrap: wrap;-webkit-flex-direction: row;
    flex-direction: row;}
div.flex .item {
    min-width: 15em;-webkit-flex: 1;
    flex: 1;}
```
这样的item是不会自动换行的，而需要显式的指明item的尺寸：
```
div.flex {
    display: -webkit-flex;
    display: flex;-webkit-flex-wrap: wrap;
    flex-wrap: wrap;-webkit-flex-direction: row;
    flex-direction: row;}
div.flex .item {
    min-width: 15em;-webkit-flex: 1 1 15em; /* this */
    flex: 1;} 
```
该Bug已经提交到了在[Safari (WebKit) doesn't wrap element within flex when width comes below min-width](https://bugs.webkit.org/show_bug.cgi?id=136041)，可以使用iOS打开[CodePen](http://codepen.io/philipwalton/pen/BNrGwN)来查看问题复现。

不过笔者在实际使用flex-wrap属性的时候发现在iPhone 5/5s(iOS 8/9)上出现了一个很奇怪的错误，详情可见笔者在StackOverflow上提出的[flex-wrap-doesnt-work-in-iphone5-ios-8](http://stackoverflow.com/questions/38365121/flex-wrap-doesnt-work-in-iphone5-ios-8)问题。

## [Autoresponsive React](https://xudafeng.github.io/autoresponsive-react/)
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/7/2/autolayout.gif)


# Appropriate Image:合适的图片
> - [responsive-images-client-hints](https://davidwalsh.name/responsive-images-client-hints?utm_source=tuicool&utm_medium=referral)
## Image Compression:图片压缩
> - [Image Compression for Web Developers](http://www.html5rocks.com/en/tutorials/speed/img-compression/)

## Responsive Image:响应式图片
> - [quick-guide-responsive-images](http://slicejack.com/quick-guide-responsive-images/)
> - [responsive-images-done-right-guide-picture-srcset](https://www.smashingmagazine.com/2014/05/responsive-images-done-right-guide-picture-srcset/)

### [Picturefill](https://github.com/scottjehl/picturefill)