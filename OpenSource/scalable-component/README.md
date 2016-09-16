# ScalableComponent

> 借鉴了[pageResponse](https://github.com/peunzhang/pageResponse/blob/master/README.md)这个移动端响应式插件
> 本项目的开发环境脚手架使用了[Webpack-React-Redux-Boilerplate](https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/tree/boilerplate)

# Usage

## 设置视口
```
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
```

## 导入 ScalableComponent

```
/**
 * Created by apple on 16/6/30.
 */
import React from "react";
import {render} from "react-dom";
import ScalableComponent from "./scalable";

render(<ScalableComponent mode="contain" wrapperBackgroundColor="rgb(117,155,156)">
    <div style={{color:"white"}}>
        <h1 style={{position:"absolute"}}>HI</h1>
        <p style={{position:"absolute",top:"50px"}}>This is Demo For Scalable</p>
        <img height="504px" width="320px" src="http://img5.cache.netease.com/photo/0031/2014-09-20/A6K9J0G94UUJ0031.jpg"
             alt=""/>
    </div>
</ScalableComponent>, document.getElementById('root'));

```

ths props of ScalableComponent is :

```
    static propTypes = {
        mode: PropTypes.oneOf(['auto', 'contain', 'cover']), //modes
        width: PropTypes.number, //width of the visual Design
        height: PropTypes.number, //height of the visual Design
        origin: PropTypes.string,//origin for scale
        wrapperBackgroundColor: PropTypes.string//background Color for hatch area
    };

```
# Mode

## Contain

Contain模式即保证页面完全包含在浏览器窗口中,在保证页面的宽高比情况下调整页面的宽度或者高度中的较大者,使得页面水平垂直居中,左右或上下可能出现空白。

![](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/OpenSource/scalable-component/screenshots/contain.gif?raw=true)

## Cover

Cover模式即使页面完全覆盖浏览器窗口,保持页面的宽高比，调整页面的宽度或高度（较小者),页面水平垂直居中，超出浏览器窗口左右或上下的内容会被隐藏
![](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/OpenSource/scalable-component/screenshots/cover.gif?raw=true)

## Auto
保持页面的宽高比，调整页面的宽度，使页面宽度完全包含在浏览器窗口中
![](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/OpenSource/scalable-component/screenshots/auto.gif?raw=true)


