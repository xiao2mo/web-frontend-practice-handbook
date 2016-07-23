<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Coding Style(编码风格)](#coding-style%E7%BC%96%E7%A0%81%E9%A3%8E%E6%A0%BC)
  - [Basic Rules(基本原则)](#basic-rules%E5%9F%BA%E6%9C%AC%E5%8E%9F%E5%88%99)
  - [Component(组件规范)](#component%E7%BB%84%E4%BB%B6%E8%A7%84%E8%8C%83)
    - [Class 与 React.createClass方法](#class-%E4%B8%8E-reactcreateclass%E6%96%B9%E6%B3%95)
    - [组件命名](#%E7%BB%84%E4%BB%B6%E5%91%BD%E5%90%8D)
    - [Declaration(声明)](#declaration%E5%A3%B0%E6%98%8E)
    - [Props](#props)
  - [JSX(JSX规范)](#jsxjsx%E8%A7%84%E8%8C%83)
    - [Alignment(对齐)](#alignment%E5%AF%B9%E9%BD%90)
    - [Quotes](#quotes)
    - [Spacing(空格)](#spacing%E7%A9%BA%E6%A0%BC)
    - [多段](#%E5%A4%9A%E6%AE%B5)
  - [Methods](#methods)
    - [Naming(方法命名)](#naming%E6%96%B9%E6%B3%95%E5%91%BD%E5%90%8D)
    - [Ordering(顺序)](#ordering%E9%A1%BA%E5%BA%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->




## Coding Style(编码风格)


### Basic Rules(基本原则)

- 每个文件中只包含一个React组件。
- 尽可能地使用JSX语法。
- 除非不用JSX语法创建一个应用，否则不要使用```React.createElement```方法。

### Component(组件规范)

#### Class 与 React.createClass方法

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

#### 组件命名

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

#### Declaration(声明)

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

#### Props

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

### JSX(JSX规范)

#### Alignment(对齐)

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

#### Quotes

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

#### Spacing(空格)

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

#### 多段

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

### Methods

#### Naming(方法命名)

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

#### Ordering(顺序)

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
