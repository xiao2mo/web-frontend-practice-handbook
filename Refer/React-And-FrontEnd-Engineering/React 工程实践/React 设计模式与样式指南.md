
# React 设计模式与样式指南

## Reference

- [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.uz8irdipq)

# Presentational Component:展示型组件

# High-Order Component:高阶组件

# 组件代码风格

本小节我们关注如何写出漂亮的组件，你或许可以认为萝卜青菜各有所爱，但是代码本身是应当保证其可读性，特别是在一个团队中，你的代码是注定要被其他人阅读的。计算机是不会在意这些的，不管你朝它们扔过去什么，它们都会老老实实的解释，但是你的队友们可不会这样，他们会把丑陋的代码扔回到你的脸上。一般来说，漂亮的组件应该具备以下特征：
- 即使没有任何注释的情况下也易于理解
- 比乱麻般的代码有更好的性能表现
- 更易于进行Bug追溯
- 简洁明了，一句顶一万句

在讨论语法的语法细节之前，我们应该遵循如下的基本原则：

- 每个文件中只包含一个React组件。
- 尽可能地使用JSX语法。
- 除非不用JSX语法创建一个应用，否则不要使用```React.createElement```方法。

## 组件规范

### Class 与 React.createClass方法

尽可能地使用ES6中的类的语法，除非有特殊的对于Mixin的需求。

``` javascript
// bad
const Listing = React.createClass({
  render() {
    return <div />;
  }
});

// good
class Listing extends React.Component {
  render() {
    return <div />;
  }
}
```
### 组件命名

- 扩展名：使用.jsx作为React组件的扩展名。
- 文件名：使用帕斯卡命名法命名文件，譬如ReservationCard.jsx。
- 引用命名：使用帕斯卡命名法命名组件和camelCase命名实例。

``` javascript
// bad
const reservationCard = require('./ReservationCard');

// good
const ReservationCard = require('./ReservationCard');

// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
```

### Props

- 对于Props的命名使用camelCase。

``` javascript
// bad
<Foo
  UserName="hello"
  phone_number={12345678}
/>

// good
<Foo
  userName="hello"
  phoneNumber={12345678}
/>
```

- 将Props或者State的声明写在类外。

``` javascript
import React, { Component, PropTypes } from 'react';

const propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
};

const defaultProps = {
  text: 'Hello World',
};

export default class Link extends Component {
  static methodsAreOk() {
    return true;
  }

  render() {
    return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>
  }
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;
```

### Declaration(声明)

- 不要使用displayName来命名组件，而使用引用。

``` javascript
// bad
export default React.createClass({
  displayName: 'ReservationCard',
  // stuff goes here
});

// good
export default class ReservationCard extends React.Component {
}
```

### 合理使用对象结构与属性扩展

大的组件往往受困于`this.props`过长的窘境，典型的如下所示:
```
render() {
  return (
    <ProductPrice
      hidePriceFulfillmentDisplay=
       {this.props.hidePriceFulfillmentDisplay}
      primaryOffer={this.props.primaryOffer}
      productType={this.props.productType}
      productPageUrl={this.props.productPageUrl}
      inventory={this.props.inventory}
      submapType={this.props.submapType}
      ppu={this.props.ppu}
      isLoggedIn={this.props.isLoggedIn}
      gridView={this.props.isGridView}
    />
  );
}
```
这么多的Props估计看着都头疼，如果我们要将这些Props继续传入下一层，大概就要变成下面这个样子了:
```
render() {
  const {
    hidePriceFulfillmentDisplay,
    primaryOffer,
    productType,
    productPageUrl,
    inventory,
    submapType,
    ppu,
    isLoggedIn,
    gridView
  } = this.props;
  return (
    <ProductPrice
      hidePriceFulfillmentDisplay={hidePriceFulfillmentDisplay}
      primaryOffer={primaryOffer}
      productType={productType}
      productPageUrl={productPageUrl}
      inventory={inventory}
      submapType={submapType}
      ppu={ppu}
      isLoggedIn={isLoggedIn}
      gridView={isGridView}
    />
  );
}
```
暂时不考虑unKnown Props，我们可以使用解构赋值来实现这个功能:
```
render() {
  const props = this.props;
  return <ProductPrice {...props} />
}
```

## JSX规范

### Alignment(对齐)

- 跟随如下的JSX的语法

``` javascript
// bad
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />

// good
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>

// if props fit in one line then keep it on the same line
<Foo bar="bar" />

// children get indented normally
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
  <Spazz />
</Foo>
```

### Quotes

对于JSX的属性用双引号表示，对于其他属性，用单引号表示。

``` 
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

// bad
<Foo style={{ left: "20px" }} />

// good
<Foo style={{ left: '20px' }} />
```

### Spacing(空格)

- 在自闭合的标签中仅使用单空格。

``` 
// bad
<Foo/>

// very bad
<Foo                 />

// bad
<Foo
 />

// good
<Foo />
```

### 多段

- 当JSX包含多行代码时，将它们包含在小括号中。

``` javascript
/// bad
render() {
  return <MyComponent className="long body" foo="bar">
           <MyChild />
         </MyComponent>;
}

// good
render() {
  return (
    <MyComponent className="long body" foo="bar">
      <MyChild />
    </MyComponent>
  );
}

// good, when single line
render() {
  const body = <div>hello</div>;
  return <MyComponent>{body}</MyComponent>;
}
```

## 方法规范

### Naming(方法命名)

- 对于一个React组件的内部方法，不要使用下划线作为前缀。

``` javascript
// bad
React.createClass({
  _onClickSubmit() {
    // do stuff
  }

  // other stuff
});

// good
class extends React.Component {
  onClickSubmit() {
    // do stuff
  }

  // other stuff
});
```

### Ordering(顺序)

- React.Component子类


1. constructor
2. optional static methods
3. getChildContext
4. componentWillMount
5. componentDidMount
6. componentWillReceiveProps
7. shouldComponentUpdate
8. componentWillUpdate
9. componentDidUpdate
10. componentWillUnmount
11. *clickHandlers or eventHandlers* like onClickSubmit() or onChangeDescription()
12. *getter methods for render* like getSelectReason() or getFooterContent()
13. *Optional render methods* like renderNavigation() or renderProfilePicture()
14. render


- React.createClass



1. displayName
2. propTypes
3. contextTypes
4. childContextTypes
5. mixins
6. statics
7. defaultProps
8. getDefaultProps
9. getInitialState
10. getChildContext
11. componentWillMount
12. componentDidMount
13. componentWillReceiveProps
14. shouldComponentUpdate
15. componentWillUpdate
16. componentDidUpdate
17. componentWillUnmount
18. *clickHandlers or eventHandlers* like onClickSubmit() or onChangeDescription()
19. *getter methods for render* like getSelectReason() or getFooterContent()
20. *Optional render methods* like renderNavigation() or renderProfilePicture()
21. render


### 使用箭头函数减少冗余代码

箭头函数是ES6引入的新特性之一，其不仅可以帮我们避免手动绑定`this`指针，还能让我们不用声明过多的`function`关键字，譬如我觉得非常适用Arrow Function的地方就是Redux的mapStateToProps函数:
```
const mapStateToProps = ({isLoading}) => {
  return ({
    loading: isLoading,
  });
};
```
需要注意的是，如果你返回的是Object，你需要包裹在大括号内:
```
const mapStateToProps = ({isLoading}) => ({
  loading: isLoading
});
```
