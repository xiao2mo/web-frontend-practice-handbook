# JSX

我们在上文中已经很多次的提及了JSX，大家也对于基本的基于JSX编写React组件所有了解。实际上在JSX推出之初饱受非议，很多人觉得其很怪异。的确虽然与正统的HTML相比其都是类XML语法的声明式标签语言，但是其对于类名强制使用className、强制要求标签闭合等特点会让不少的传统前端开发者不太适应。JSX的引入对笔者之前的工作流的冲击在于不能够直接使用UI部门提供的页面模板，并且因为组件化的分割与预编译，UI比较麻烦地直接在浏览器开发工具中调整CSS样式然后保存到源代码中。

## Reference

- [JSX Specification](https://facebook.github.io/jsx/)
- [JSX In Depth](https://facebook.github.io/react/docs/jsx-in-depth.html)
- [Conditional Rendering](http://reactpatterns.com/#conditional-rendering)

# JSX的前世今生

JSX语言的名字最早出现在游戏厂商DeNA，不过其偏重于加入增强语法使得JavaScript变得更快、更安全、更简单。而React则是依赖于ECMAScript语法本身，并没有添加扩充语义。React引入JSX主要是为了方便View层组件化，承载了构建HTML结构化页面的职责。这一点与其他很多的JavaScript模板语言异曲同工，不过React是将JSX映射为虚拟元素，并且通过创建与更新虚拟元素来管理整个Virtual DOM系统。譬如我们JSX语法声明某个虚拟组件时，会被转化为`React.createElement(component,props,...children)`函数调用，譬如我们定义了某个`MyButton`：
```
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```
会被编译为
```
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```
而如果我们直接声明某个DOM元素，同样会转化为createElement函数调用:
```
React.createElement(
  'div',
  {className: 'sidebar'},
  null
)
```

## 其他JSX转换器

实际上除了最著名的React JSX转换器之外，我们还可以使用`JSXDOM`与`Mercury JSX`这两个同样的可以将JSX语法转化为DOM或者Virtual DOM。在JSXDOM中，只支持使用DOM元素，允许在DOM标签中直接使用JavaScript变量，譬如当我们需要声明某个列表时，可以使用如下语法:
```
/** @jsx JSXDOM */
 
var defaultValue = "Fill me ...";
 
document.body.appendChild(
  <div>
    <input type="text" value={defaultValue} />
    <button onclick="alert('clicked!');">Click Me!</button>
    <ul>
      {['un', 'deux', 'trois'].map(function(number) {
        return <li>{number}</li>;
      })}
    </ul>
  </div>
);
```
## JSX与Template Literals

这里我们还想讨论另一个问题，为什么需要引入JSX。在ECAMScript 6的ECMA-262标准中引入了所谓的模板字符串（Template Literals），即可以在ECMAScript中使用内嵌的DSL来引入JavaScript变量，不过虽然模板字符串对于较长的嵌入式DSL作用极佳，但是对于需要引入大量作用域中的ECMAScript表达式会造成大量的噪音副作用，譬如如果我们要声明某个评论框布局，使用JSX的方式如下:
```
// JSX
var box =
  <Box>
    {
      shouldShowAnswer(user) ?
      <Answer value={false}>no</Answer> :
      <Box.Comment>
         Text Content
      </Box.Comment>
    }
  </Box>;
```
而使用模板字符串的方式如下:
```
// Template Literals
var box = jsx`
  <${Box}>
    ${
      shouldShowAnswer(user) ?
      jsx`<${Answer} value=${false}>no</${Answer}>` :
      jsx`
        <${Box.Comment}>
         Text Content
        </${Box.Comment}>
      `
    }
  </${Box}>
`;
```
其主要缺陷在于因为存在变量的嵌套，需要在作用域中进进出出，很容易造成语法错误，因此还是JSX语法为佳。

# JSX与HTML比较

JSX的官方定义是类XML语法的ECMAscript扩展，完美地利用了JavaScript自带的语法和特性，并使用大家熟悉的HTML语法来创建虚拟元素。JSX基本语法基本被XML囊括了，但也有很多的不同之处。

## 标签闭合

React在定义标签时，标签一定要闭合，否则无法编译通过。这一点与标准的HTML差别很大，HTML在浏览器渲染时会自动进行补全，而强大的JSX报错机制则直接在编译阶段就以报错的方式指明出来。HTML中自闭合的标签（如`<img>`）在JSX中也遵循同样规则，自定义标签可以根据是否有子组件或文本来决定闭合方式。另外DOCTYPE头也是一个非常特殊的标志，一般会在使用React作为服务端渲染时用到。在HTML中，DOCTYPE是没有闭合的，也就是说我们无法直接渲染它。常见的做法是构造一个保存HTML的变量，将DOCTYPE与整个HTML标签渲染后的结果串联起来。

## 单一根元素

使用JSX声明组件时，最外层的组件根元素只允许使用单一根元素。这一点我们在上文中也陈述过，因为JSX语法会被转化为`React.createElement(component,props,...children)`调用，而该函数的第一个参数只允许传入单元素，而不允许传入多元素。


## 元素属性

### style

JSX中的style并没有跟HTML一样接收某个CSS字符串，而是接收某个使用camelCase风格属性的JavaScript对象，这一点倒是和DOM对象的style属性一致。譬如:
```
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```
注意，内联样式并不能自动添加前缀，这也是笔者不太喜欢使用CSS-in-JS这种形式设置样式的的原因。为了支持旧版本浏览器，需要提供相关的前缀：
```
const divStyle = {
  WebkitTransition: 'all', // note the capital 'W' here
  msTransition: 'all' // 'ms' is the only lowercase vendor prefix
};

function ComponentWithTransition() {
  return <div style={divStyle}>This should work cross-browser</div>;
}
```

### className

React中是使用`className`来声明CSS类名，这一点对于所有的DOM与SVG元素都起作用。不过如果你是将React与Web Components结合使用，也是可以使用`class`属性的。

### htmlFor

因为`for`是JavaScript中的保留关键字，因此React元素是使用`htmlFor`作为替代。

### Boolean系列属性

HTML表单元素中我们经常会使用disabled、required、checked与readOnly等Boolean值性质的书，缺省的属性值会导致JSX认为bool值设为true。当我们需要传入false时，必须要使用属性表达式。譬如`<input type='checkbox' checked={true}>`可以简写为`<input type='checkbox' checked>`，而`<input type='checkbox' checked={falsed}>`即可以省略checked属性。

### 自定义属性

如果在JSX中向DOM元素中传入自定义属性，React是会自动忽略的:
```
<div customProperty='a' />
```
不过如果要使用HTML标准的自定义属性，即以`data-*`或者`aria-*`形式的属性是支持的。
```
<div data-attr='attr' />
```

## 避免XSS注入攻击

最后需要提及的是，React中JSX能够帮我们自动防护部分XSS攻击，譬如我们常见的需要将用户输入的内容再呈现出来:
```
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```
在标准的HTML中，如果我们不对用户输入作任何的过滤，那么当用户输入`<script>alert(1)<script/>`这样的可执行代码之后，就存在被XSS攻击的危险。而React在实际渲染之前会帮我们自动过滤掉嵌入在JSX中的危险代码，将所有的输入进行编码，保证其为纯字符串之后再进行渲染。不过这种安全过滤有时候也会对我们造成不便，譬如如果我们需要使用`&copy;`这样的实体字符时，React会自动将其转移最后导致无法正确渲染，我们可以寻找如下几种解决方法：
- 直接使用UTF-8字符或者使用对应字符的Unicode编码
- 使用数组封装
- 直接插入原始的HTML，React为我们提供了dangerouslySetInnerHTML属性，其类似于DOM的innerHTML属性，允许我们声明强制直接插入HTML代码:

```
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

# JSX语法

## 空格

## 注释

## 变量

## 条件渲染

在JSX中我们不能再使用传统的if/else条件判断语法，但是可以使用更为简洁明了的Conditional Operator运算符，譬如我们要进行if操作：
```
{condition && <span>为真时进行渲染</span> }
```
如果要进行非操作：
```
{condition || <span>为假时进行渲染</span> }
```
我们也可以使用常见的三元操作符进行判断:
```
{condition
  ? <span>为真时进行渲染</span>
  : <span>为假时进行渲染</span>
}
```
如果对于较大的代码块，建议是进行换行以提升代码可读性：
```
{condition ? (
  <span>
   为假时进行渲染
  </span>
) : (
  <span>
   为假时进行渲染
  </span>
)}
```
# React支持的HTML与SVG属性
## HTML
React 支持所有的`data-*`与`aria-*`属性：
```
accept acceptCharset accessKey action allowFullScreen allowTransparency alt
async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge
charSet checked cite classID className colSpan cols content contentEditable
contextMenu controls coords crossOrigin data dateTime default defer dir
disabled download draggable encType form formAction formEncType formMethod
formNoValidate formTarget frameBorder headers height hidden high href hrefLang
htmlFor httpEquiv icon id inputMode integrity is keyParams keyType kind label
lang list loop low manifest marginHeight marginWidth max maxLength media
mediaGroup method min minLength multiple muted name noValidate nonce open
optimum pattern placeholder poster preload profile radioGroup readOnly rel
required reversed role rowSpan rows sandbox scope scoped scrolling seamless
selected shape size sizes span spellCheck src srcDoc srcLang srcSet start step
style summary tabIndex target title type useMap value width wmode wrap
```
另外React还支持部分RDFa属性，其他的属性因为与标准的HTML属性相冲突而被移除:
```
about datatype inlist prefix property resource typeof vocab
```
除此之外，如下的非标准属性也可以被支持：
- 在移动Safari浏览器中支持 `autoCapitalize autoCorrect` 
- Safari中的`<link rel="mask-icon" />`支持`color`
- HTML microdata中支持`itemProp itemScope itemType itemRef itemID`
- 在老版本的Internet Explorer浏览器中使用`security`
- Internet Explorer中使用`unselectable`
- 在`Webkit/Blink`的search输入域中支持`results autoSave`

## SVG
React支持如下SVG属性：
```
accentHeight accumulate additive alignmentBaseline allowReorder alphabetic
amplitude arabicForm ascent attributeName attributeType autoReverse azimuth
baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight
clip clipPath clipPathUnits clipRule colorInterpolation
colorInterpolationFilters colorProfile colorRendering contentScriptType
contentStyleType cursor cx cy d decelerate descent diffuseConstant direction
display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground
end exponent externalResourcesRequired fill fillOpacity fillRule filter
filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize
fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy
g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef
gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic
imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength
kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor
limitingConeAngle local markerEnd markerHeight markerMid markerStart
markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode
numOctaves offset opacity operator order orient orientation origin overflow
overlinePosition overlineThickness paintOrder panose1 pathLength
patternContentUnits patternTransform patternUnits pointerEvents points
pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits
r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions
requiredFeatures restart result rotate rx ry scale seed shapeRendering slope
spacing specularConstant specularExponent speed spreadMethod startOffset
stdDeviation stemh stemv stitchTiles stopColor stopOpacity
strikethroughPosition strikethroughThickness string stroke strokeDasharray
strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity
strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor
textDecoration textLength textRendering to transform u1 u2 underlinePosition
underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic
vHanging vIdeographic vMathematical values vectorEffect version vertAdvY
vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing
writingMode x x1 x2 xChannelSelector xHeight xlinkActuate xlinkArcrole
xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlBase xmlLang xmlSpace
y y1 y2 yChannelSelector z zoomAndPan
```













