
> [原文地址](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060#.fxxdorvid)

> [Github 系列文章地址]()



在阅读此文之前，你要明确两个概念。这篇文章不会长篇大论地跟你介绍React中的源代码实现或者其他一些类似的Virtual DOM的实现。它们过于复杂了，其实一个Virtual DOM的实现只要不超过50行代码即可。好了，下面即是你要了解的两个概念：

- Virtual DOM是真正DOM的一种表现

- 当Virtual DOM Tree发生变化时，算法会自动比较新旧两棵树，找出其中的差异，并且只对真实的DOM树做最小化改变



本文即是循序渐进地阐述这两个概念。

# DOM树的表示

首先，我们需要将DOM树存放于内存中，最简单的，我们可以将DOM树表示为一个JavaScript的Object对象，假设我们有一棵这样的DOM树：

```

<ul class=”list”>

  <li>item 1</li>

  <li>item 2</li>

</ul>

```

而该DOM树对应的JS对象如下：

```

{ type: ‘ul’, props: { ‘class’: ‘list’ }, children: [

  { type: ‘li’, props: {}, children: [‘item 1’] },

  { type: ‘li’, props: {}, children: [‘item 2’] }

] }

```

两相比较，我们可以发现，我们将DOM中的任一元素表示为：

```

{ type: ‘…’, props: { … }, children: [ … ] }

```

而DOM中的纯文本节点会被表示为普通的JavaScript中的字符串。不过这还是一个简单的DOM树，如果是一个较大型的树，我们就需要一个辅助函数来构造结构：

```

function h(type, props, …children) {

  return { type, props, children };

}

```

基于这个辅助函数，我们可以把上面那个简单的DOM树用如下方式表示：

```

h(‘ul’, { ‘class’: ‘list’ },

  h(‘li’, {}, ‘item 1’),

  h(‘li’, {}, ‘item 2’),

);

```

看上去是不是清晰了很多呀？这种结构和转化方程看上去很像大名鼎鼎的JSX啊，以Babel解释器为例，它会把上面提及的DOM树转化为如下结构：

```

React.createElement(‘ul’, { className: ‘list’ },

  React.createElement(‘li’, {}, ‘item 1’),

  React.createElement(‘li’, {}, ‘item 2’),

);

```

总结而言，我们可以按照如下JSX的语法编写DOM树：

```

/** @jsx h */

const a = (
 <ul className=”list”>
   <li>item 1</li>
   <li>item 2</li>
 </ul>
);

```

而Babel会将JSX转化为如下格式：

```

const a = (

  h(‘ul’, { className: ‘list’ },

    h(‘li’, {}, ‘item 1’),

    h(‘li’, {}, ‘item 2’),

  );

);

```

在`h`函数执行之后，整个对象会转化为基本的JS对象：

```

const a = (

  { type: ‘ul’, props: { className: ‘list’ }, children: [

    { type: ‘li’, props: {}, children: [‘item 1’] },

    { type: ‘li’, props: {}, children: [‘item 2’] }

  ] }

);

```

本部分在JSFiddle上的地址是:[这里](https://jsfiddle.net/deathmood/5qyLubt4/?utm_source=website&utm_medium=embed&utm_campaign=5qyLubt4)

完整的Babel可编译的源代码为：

```

/** @jsx h */

function h(type, props, ...children) {
  return { type, props, children };
}

const a = (
  <ul class="list">
    <li>item 1</li>
    <li>item 2</li>
  </ul>
);

console.log(a);
```

# Applying our DOM Representation

现在已经可以将DOM树用纯粹的JS对象进行表示，那么下一步我们就是需要将自定义的虚拟DOM结构体转化到真实的DOM树中。首先阐述下下文会用到的一些术语表达式：

- 所有真实DOM节点，譬如元素与文本节点，都以`$`开头描述，譬如`$parent`就是一个真实的DOM元素

- 所有的Virtual DOM将会用变量`node`描述

- 跟React中类似，只可以有一个根节点存在，其他所有的节点都会包含在该根节点内



那么下面我们就要来编写函数`createElement`，负责将输入的虚拟DOM转化为一个真实的DOM，这里暂时不考虑`props`与`children`，那么最简单的函数实现是：

```

function createElement(node) {

  if (typeof node === ‘string’) {

    return document.createTextNode(node);

  }

  return document.createElement(node.type);

}

```

因为我们需要考虑到同时处理文本节点与元素节点的需要，所以进行了一个简单的分支判断，这是最简单的实现，下面我们要考虑怎么对子元素进行渲染。每个节点的子节点可能是个文本节点，也可能是元素节点，换言之，我们要沿着虚拟节点的树一直从根节点处理到叶子节点，差不多就是要用迭代的思想进行构造，然后用`appendChild()`函数将产生的子节点挂载到父节点上。最终实现的函数差不多这个样子：

```

﻿function createElement(node) {
  if (typeof node === ‘string’) {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  node.children
    .map(createElement)
    .forEach($el.appendChild.bind($el));
  return $el;
}
```

本部分的JSFiddle调试在[这里](https://jsfiddle.net/deathmood/cL0Lc7au/?utm_source=website&utm_medium=embed&utm_campaign=cL0Lc7au)，完整的JSX代码为：

```

/** @jsx h */

function h(type, props, ...children) {
  return { type, props, children };
}

function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  node.children
    .map(createElement)
    .forEach($el.appendChild.bind($el));
  return $el;
}

const a = (
  <ul class="list">
    <li>item 1</li>
    <li>item 2</li>
  </ul>
);

const $root = document.getElementById('root');
$root.appendChild(createElement(a));
```

# Handling Changes

现在我们已经成功地将Virtual DOM转化为了真实的DOM节点，下面就要考虑下Virtual DOM核心的算法，即差异检测。我们先来写一个最简单的Virtual DOM比较算法，保证只会对真实的DOM节点做最小改动。首先我们还是来看下可能有几种发生改变的情况：

（1）添加了部分节点，需要调用`appendChild()`函数进行添加

![](http://7xlgth.com1.z0.glb.clouddn.com/1-GFUWrX6pBgiDQ5Z-IvzjUw.png)

（2）移除了部分节点，需要调用`removeChild()`函数进行删除

![](http://7xlgth.com1.z0.glb.clouddn.com/1-VRoYwAeWPF0jbiWXsKb2HA.png)

（3）部分节点变成了其他节点，需要调用`replaceChild()`进行替换

![](http://7xlgth.com1.z0.glb.clouddn.com/1-6iQYEH0APjbuPvYmnD7Qlw.png)

（4）某个节点的标签发生了变化，或者被挂载到了其他地方

![](http://7xlgth.com1.z0.glb.clouddn.com/1-x1Eq-uuqgL0z9d9qn_opww.png)



对于以上这几种情况，我们统一使用`updateElement()`函数对DOM树进行更新，该函数会传入三个参数：

- $parent 代表Virtual DOM挂载在DOM树上的根节点

- newNode 新的Virtual DOM

- oldNode 老的Virtual DOM



## 初始化时候没有老的Virtual DOM情况

如果oldNode直接为空，那么我们只要简单地创建新的节点即可：

```

function updateElement($parent, newNode, oldNode) {

  if (!oldNode) {

    $parent.appendChild(

      createElement(newNode)

    );

  }

}

```

## 整个newNode被置空，即从DOM树中移除了

如果newNode为空，即整个Virtual DOM树上没有挂载任何节点，那么我们需要将VirtualDOM对应的节点树从DOM中移除，最简单的方法就是调用`$parent.removeChild()`函数，然后传入整个真实DOM元素的引用。不过实际上，我们在内存里只有Virtual DOM而没有真实DOM的引用。那我们换个思路，如果我们知道Virtual DOM对应处于真实DOM中的第几个子节点，就可以根据下标删除了，大概是这个样子：

```

function updateElement($parent, newNode, oldNode, index = 0) {

  if (!oldNode) {

    $parent.appendChild(

      createElement(newNode)

    );

  } else if (!newNode) {

    $parent.removeChild(

      $parent.childNodes[index]

    );

  }

}

```

## 节点发生了变化

首先我们需要写一个简单的比较方程比较两个虚拟节点是否发生了变化，类似于创建元素的函数，我们同样需要考虑文本节点与元素节点：

```

function changed(node1, node2) {

  return typeof node1 !== typeof node2 ||

         typeof node1 === ‘string’ && node1 !== node2 ||

         node1.type !== node2.type

}

```

有了这个比较函数和当前Virtual DOM映射的真实DOM在父节点中的序号，我们就可以将更新函数完善成如下介个样子：

```

function updateElement($parent, newNode, oldNode, index = 0) {

  if (!oldNode) {

    $parent.appendChild(

      createElement(newNode)

    );

  } else if (!newNode) {

    $parent.removeChild(

      $parent.childNodes[index]

    );

  } else if (changed(newNode, oldNode)) {

    $parent.replaceChild(

      createElement(newNode),

      $parent.childNodes[index]

    );

  }

}

```

注意，上面比较函数中，在节点发生变化的情况，只考虑了Virtual DOM中根节点发生了变化的情况，比较的方式也是直接比较内存地址，是否是新对象，从这一点也可以看出Immutable的重要意义。



# Diff children

上面提及的算法里并没有对子节点进行检查，而在实际情况下，我们不仅要检查根节点，还要递归检查子节点是否发生了变化，即递归找到变化的那个节点，在编写代码之前，我们脑中要清楚以下几点：

- 只有对元素节点才需要进行子节点对比，文本节点是没有子节点的

- 递归过程中，会不断传入当前节点作为子节点对比的根节点处理

- 上面说的index，这里就可以看出了，只是子节点在父节点中的序号



```

function updateElement($parent, newNode, oldNode, index = 0) {

  if (!oldNode) {

    $parent.appendChild(

      createElement(newNode)

    );

  } else if (!newNode) {

    $parent.removeChild(

      $parent.childNodes[index]

    );

  } else if (changed(newNode, oldNode)) {

    $parent.replaceChild(

      createElement(newNode),

      $parent.childNodes[index]

    );

  } else if (newNode.type) {

    const newLength = newNode.children.length;

    const oldLength = oldNode.children.length;

    for (let i = 0; i < newLength || i < oldLength; i++) {

      updateElement(

        $parent.childNodes[index],

        newNode.children[i],

        oldNode.children[i],

        i

      );

    }

  }

}

```

最终代码的调试地址是[JSFiddle](https://jsfiddle.net/deathmood/0htedLra/?utm_source=website&utm_medium=embed&utm_campaign=0htedLra)，其效果为：

![](http://7xkt0f.com1.z0.glb.clouddn.com/1-e1s_Zc_fVxL3i0un2ZNEtg.gif)



到这里我们就完成了一个最简单的Virtual DOM算法，不过其与真正能够投入实战的Virtual DOM算法还是有很大距离，进一步阅读推荐：

- [深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)

- [我的前端故事----React算法又是个什么鬼？！](http://www.cnblogs.com/fuhuixiang/p/5505848.html?f=tt&hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)

- [A Virtual DOM and diffing algorithm](https://github.com/Matt-Esch/virtual-dom):一个比较复杂的Virtual DOM算法的实现

- [simple-virtual-dom](https://github.com/livoras/simple-virtual-dom):一个简单的Virtual DOM的实现

- [how-to-write-your-own-virtual-dom](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060#.59fqwanqa)

- [Virtual DOM Benchmark](http://vdom-benchmark.github.io/vdom-benchmark/)

