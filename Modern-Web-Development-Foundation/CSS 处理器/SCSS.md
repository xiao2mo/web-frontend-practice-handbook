[![返回目录](https://parg.co/U0y)](https://parg.co/UHU) 

# SCSS 语法介绍与实践技巧

Sass 有两种语法规则(syntaxes),目前新的语法规则（从 Sass 3开始）被称为 “SCSS”( 时髦的css（Sassy CSS）),它是css3语法的的拓展级，就是说每一个语法正确的CSS3文件也是合法的SCSS文件，SCSS文件使用.scss作为拓展名。第二种语法别成为缩进语法（或者 Sass），它受到了Haml的简洁精炼的启发，它是为了人们可以用和css相近的但是更精简的方式来书写css而诞生的。它没有括号，分号，它使用 行缩进 的方式来指定css 块，虽然sass不是最原始的语法，但是缩进语法将继续被支持，在缩进语法的文件以 .sass 为拓展名。

## 注释

有三种形式：

（1）//comment：该注释只是在.scss源文件中有，编译后的css文件中没有。

（2）/*! */：重要注释，任何style的css文件中都会有，一般放置css文件版权说明等信息。

（3）/* */：该注释在compressed的style的css中没有，其他style的css文件都会含有。



## Quick Start

### Installation

### Build

**1.切换到.scss文件所在目录**

　　命令行下切换到代码文件夹目录（如Z:\），假设有文件test.scss文件，里面内容如下：（SASS完全支持css语法）

``` css
h1{
    font-size:17px;    
}
h2{
    font-size:18px;
}
```

**2.编译scss文件为css文件**

　　运行命令：sass --style compressed test.scss test.css，即可生成压缩版的css文件，并且命名为test.css。几点说明：

（1）--style 后面可以有四个参数可选，分别为expanded、nested、compact、compressed，分别选用不同参数的效果可以自己尝试体验。

（2）test.scss和test.css文件目录可以自定义，例如把Z盘sass目录下的test.scss文件编译为压缩版的文件，并放置在Z盘css目录下，那么命令即：sass --style compressed z:\sass\test.scss z:\css\test.css

（3）开发过程中，只需要修改scss文件，然后编译；前端页面只需要引用相应的css文件即可。

**3.侦听文件和文件夹**

如果希望某一个scss文件或者相应的文件夹下面文件修改后，自动进行编译，那么可以使用侦听命令。

（1）侦听文件：

sass --watch --style compressed test.scss:test.css

当test.scss文件有修改后，会自动编译为test.css，并且是compressed的。

（2）侦听文件夹：

sass --watch --style compressed sass:css

当sass文件夹下.scss文件有修改的时候，会自动编译为与sass中文件同名的css文件。

 **备注：**

（1）注意源文件和目标文件之间是**冒号**，与编译命令中为空格不同。

（2）生成的map文件可以查找source map文件的作用。

### Webpack

Webpack中也内置了sass-loader，通过简单的配置既可以使用。不过需要注意的是，Webpack的sass-loader还是依赖于node-sass以及sass(gem)，所以如果安装sass-loader报错可以先尝试安装sass。

# 变量与选择器

## 变量

### 定义

变量的定义一般以$开头，某个变量的作用域仅限于他们定义的层级以及子层级。如果变量是定义在所有嵌套选择器之外的，那么他们可以在各处被调用。

``` scss
$color1:#aeaeae;
.div1{
    background-color:$color1;
}
```

编译后： 

``` scss
.div1 {
  background-color: #aeaeae;
}
/*# sourceMappingURL=test.css.map */
```

如果希望某个在子选择器中定义的变量能够成为全局变量，可以使用!global关键字：

``` 
#main {
  $width: 5em !global;
  width: $width;
}

#sidebar {
  width: $width;
}
```



### 嵌套引用

嵌套引用在其他编程语言中即是字符串插值，需要用#{}进行包裹：

``` scss
$left:left;
.div1{
    border-#{$left}-width:5px;
}
```

### 变量计算

Sass中也是支持对于变量进行简单的计算：

``` scss
$left:20px;
.div1{
    margin-left:$left+12px;
}
```

变量可以支持计算的类型，还是比较多的：

``` scss
p {
  font: 10px/8px;             // Plain CSS, no division
  $width: 1000px;
  width: $width/2;            // Uses a variable, does division
  width: round(1.5)/2;        // Uses a function, does division
  height: (500px/2);          // Uses parentheses, does division
  margin-left: 5px + 8px/2px; // Uses +, does division
  font: (italic bold 10px/8px); // In a list, parentheses don't count
}
```



## 选择器

### 嵌套

``` scss
.div1{
    .span1{
        height: 12px;
    }
    .div2{
        width: 16px;
    }
}
```

属性也可以嵌套，比如border-color属性，可以写成：

``` scss
　　p {
　　　　border: {
　　　　　　color: red;
　　　　}
　　}
```

注意，border后面必须加上冒号。



### 父元素引用

在嵌套的子层级中，允许使用&引用父元素：

``` scss
.div1{
    &:hover{
        cursor: hand;
    }
}
```

# 代码重用

## 继承

SASS允许一个选择器，继承另一个选择器。比如，现有class1：

``` scss
.class1{
    font-size:19px;
}
.class2{
    @extend .class1;
    color:black;
}
```

**注意：如果在class2后面有设置了class1的属性，那么也会影响class2，如下：**

``` scss
.class1{
    font-size:19px;
}
.class2{
    @extend .class1;
    color:black;
}
.class1{
    font-weight:bold;
}
```

由此可以看出Scss也是递归编译的。

## **引用外部css文件（Partials）**

有时网页的不同部分会分成多个文件来写样式，或者引用通用的一些样式，那么可以使用@import。

``` scss
@import "_test1.scss";
@import "_test2.scss";
@import "_test3.scss";
```



## Mixin&Include

Mixin有点像C语言的宏（macro），是可以重用的代码块。

使用@mixin命令，定义一个代码块。

``` scss
　　@mixin left {
　　　　float: left;
　　　　margin-left: 10px;
　　}
```

使用@include命令，调用这个mixin。

``` scss
　　div {
　　　　@include left;
　　}
```

### 参数与缺省值

- 边距设置

``` scss
@mixin common($value1,$value2,$defaultValue:12px){
    display:block;
    margin-left:$value1;
    margin-right:$value2;
    padding:$defaultValue;
}
.class1{
    font-size:16px;
    @include common(12px,13px,15px);
}
.class2{
    font-size:16px;
    @include common(12px,13px);
}
```

- 浏览器前缀设置设置

下面是一个mixin的实例，用来生成浏览器前缀。

``` scss
　　@mixin rounded($vert, $horz, $radius: 10px) {
　　　　border-#{$vert}-#{$horz}-radius: $radius;
　　　　-moz-border-radius-#{$vert}#{$horz}: $radius;
　　　　-webkit-border-#{$vert}-#{$horz}-radius: $radius;
　　}
```

使用的时候，可以像下面这样调用：

``` scss
　　#navbar li { @include rounded(top, left); }
　　#footer { @include rounded(top, left, 5px); }
```

### Mixins Collection:一些常见的Mixins搜集
#### [family.scss](http://lukyvj.github.io/family.scss/):使nth-child更易用
![](http://7xkt0f.com1.z0.glb.clouddn.com/49E92992-98AC-42FF-93EE-EFA222B735BE.png)


# 编程式方法

## 流程控制

### 条件语句

@if可以用来判断：

``` scss
　　p {
　　　　@if 1 + 1 == 2 { border: 1px solid; }
　　　　@if 5 < 3 { border: 2px dotted; }
　　}
```

配套的还有@else命令：

``` scss
　　@if lightness($color) > 30% {
　　　　background-color: #000;
　　} @else {
　　　　background-color: #fff;
　　}
```





### 循环语句

SASS支持for循环：

``` 
　　@for $i from 1 to 10 {
　　　　.border-#{$i} {
　　　　　　border: #{$i}px solid blue;
　　　　}
　　}
```

也支持while循环：

``` 
　　$i: 6;
　　@while $i > 0 {
　　　　.item-#{$i} { width: 2em * $i; }
　　　　$i: $i - 2;
　　}
```

each命令，作用与for类似：

``` 
　　@each $member in a, b, c, d {
　　　　.#{$member} {
　　　　　　background-image: url("/image/#{$member}.jpg");
　　　　}
　　}
```





## 函数

Sass允许用户自定义函数，原型如下所示：

``` scss
　　@function double($n) {
　　　　@return $n * 2;
　　}

　　#sidebar {
　　　　width: double(5px);
　　}
```

### 颜色函数

SASS提供了一些内置的颜色函数，以便生成系列颜色。

``` scss
　　lighten(#cc3, 10%)  // #d6d65c
　　darken(#cc3, 10%)  //  #a3a329
　　grayscale(#cc3) // #808080
　　complement(#cc3) // #33c
```
