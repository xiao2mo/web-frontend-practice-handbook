# Mobile Style Preset
> 项目的很多设想受[Mobi.css](https://github.com/xcatliu/mobi.css)启发,这是一个非常优秀的面向移动端样式的CSS轻量级库,如果想要寻找合适的Production-Ready的库请直接转向Mobi.css

笔者最近一直在基于APICloud做Mobile Web与Hybrid APP开发,。笔者在构想Mobile Style Preset之处,觉得它应该具有如下特性:

- Pure CSS,不考虑引入JavaScript。
- 轻量级非侵入式，笔者在使用BootStrap这些稍显重量级的框架时会感觉给默认样式的侵入太多，在需要进行些修改时会导致。
- Mobile First & SCSS First，因为笔者主要是在React中以SCSS进行样式设置，因此所有的属性设置都会以Mixin形式提供使用，而在Dist版本中以提供可以直接使用的样式类。


Mobile Style Preset主要是笔者在日常工作中一些常用的移动端样式的总结,目前推荐是在SCSS中使用MSP，首先需要用`npm`命令安装:

```
npm i mobile-style-preset --save
```

然后在Webpack中,需要将node_mudules添加到搜索路径中:

```
{
  test: /\.scss$/, 
  loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true&includePaths[]=./node_modules' 
},
```

然后在项目的scss文件中,使用`import`引入:

```
@import "~mobile-style-preset/msp.scss";
```

目前Mobile Style Preset正在处于开发中,接口与样式类名可能发生变化,如果有建议或者想法的也欢迎提ISSUE一起讨论,欢迎指出错误。



## Media Query
对于移动端开发中遇到的首要问题即使响应式开发问题,可以参考笔者的[]()。总结而言,常见的响应式开发可以有使用Viewport Size、使用媒介查询、使用类似于[]()这样的按比例缩放的库等等。而目前因为还需要适配大量的低版本的浏览器与性能的考量，笔者还是选择使用了Media Query来设置HTML的FontSize基准值，然后使用`em`作为主要的尺寸单位。首先看下我们常见的移动端尺寸（以iPhone为主）：

| Device                    | resolution (px) | device-width/ device-height (px)         |
| ------------------------- | --------------- | ---------------------------------------- |
| iPhone                    | 320 x 480       | 320 x 480, in both portrait and landscape mode |
| iPhone 4                  | 640 x 960       | 320 x 480, in both portrait and landscape mode. `device-pixel-ratio`is 2 |
| iPhone 5, 5s              | 640 x 1136      | 320 x 568, in both portrait and landscape mode. `device-pixel-ratio`is 2 |
| iPhone 6                  | 750 x 1334      | 375 x 667, in both portrait and landscape mode. `device-pixel-ratio`is 2 |
| iPhone 6 plus             | 1242 x 2208     | 414 x 736, in both portrait and landscape mode. `device-pixel-ratio`is 3 |
| iPad 1 and 2              | 768 x 1024      | 768 x 1024, in both portrait and landscape mode |
| iPad 3                    | 1536 x 2048     | 768 x 1024, in both portrait and landscape modeCSS pixel density is 2 |
| Samsung Galaxy S I and II | 480 x 800       | 320 x 533, in portrait modeCSS pixel density is 1.5 |
| Samsung Galaxy S III      | 720 x 1280      | 360? x 640?, in portrait mode            |
| HTC Evo 3D                | 540 x 960       | 360 x 640, portrait modeCSS pixel density is 1.5 |
| Amazon Kindle Fire        | 1024 x 600      | 1024 x 600, landscape mode               |

在Mobile Style Preset中，笔者是改造的[sass-mediaqueries](https://github.com/paranoida/sass-mediaqueries/blob/master/_media-queries.scss)，主要是面向iPhone的几个型号进行适配，另外添加了部分Android设备的支持，这里以iPad的Media Query为例:

```
@mixin ipad($orientation: all)
{
  $deviceMinWidth: 768px;
  $deviceMaxWidth: 1024px;

  @if $orientation == all
  {
    @media only screen and (min-device-width: $deviceMinWidth) and (max-device-width: $deviceMaxWidth)
    {
      @content;
    }
  }
  @else
  {
    @media only screen and (min-device-width: $deviceMinWidth) and (max-device-width: $deviceMaxWidth)
    and (orientation:#{$orientation})
    {
      @content;
    }
  }
}
```



## CSS Children Selector

子元素选择器是使用CSS时常有的选择器之一，这里改用了[Family.scss](https://github.com/LukyVj/family.scss)来提供了内置的快速的SCSS`:nth-child`mixins。另外在iOS 8中直接使用`:nth-child`会存在[一定问题](http://stackoverflow.com/questions/27127879/nth-child-not-working-on-iossafari-8)，需要提供如下的Polyfill才能保证正常工作:

```
.itemgrid-3cols li:nth-of-type(3n+1) {
    clear: left;
}
```

而对于便捷的子元素选择器，

# Mobile Reset

# Layout

# Utilities


