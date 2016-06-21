> [原文地址](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060#.fxxdorvid)

> [Github 系列文章地址](https://github.com/wxyyxc1992/web-frontend-practice-handbook/blob/master/dom/advanced/virtual-dom/how-to-write-your-own-virtual-dom.md)



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

function createElement(node) {
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



function changed(node1, node2) {

  return typeof node1 !== typeof node2 ||

         typeof node1 === 'string' && node1 !== node2 ||

         node1.type !== node2.type

}



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



// ---------------------------------------------------------------------



const a = (

  <ul>

    <li>item 1</li>

    <li>item 2</li>

  </ul>

);



const b = (

  <ul>

    <li>item 1</li>

    <li>hello!</li>

  </ul>

);



const $root = document.getElementById('root');

const $reload = document.getElementById('reload');



updateElement($root, a);

$reload.addEventListener('click', () => {

  updateElement($root, b, a);

});



```





> [第二部分原文：write-your-virtual-dom-2-props-events](https://medium.com/@deathmood/write-your-virtual-dom-2-props-events-a957608f5c76#.ihf8gz430)

> [完整的示例代码地址](https://github.com/wxyyxc1992/web-frontend-practice-handbook/tree/master/dom/advanced/virtual-dom/demo/simple-virtual-dom)



# Props

首先我们要回顾下前文讲的一个有些偏差的小点，假设我们在JSX中只写一个最简单的Div:

```

<div></div>

```

Babel会自动将该JSX转化为如下的DOM表达式：

```

{ type: ‘’, props: null, children: [] }

```

注意，这里的props默认是null，我们在之前的文章中并没有关注到这个属性，而本部分则是要讲解Virtual DOM中Props的用法。一般来说，无论在哪种编程环境下都要尽量避免Null的出现，因此我们首先来改造下`h`函数，使得其能够默认返回一个空的Object，而不是Null:

```

function h(type, props, …children) {
 return { type, props: props || {}, children };
}

```

## Setting Props:设置Props

接触过React的同学对于Props肯定不会陌生，而设置Props也就跟使用普通的HTML标签属性很类似：

```

<ul className=”list” style=”list-style: none;”></ul>

```

而最终会转化为如下的表达式：

```

{ 
 type: ‘ul’, 
 props: { className: ‘list’, style: ’list-style: none;’ } 
 children: []
}

```

props对象中的每个键即为属性名，而值为属性值，一般来说我们只需要简单的调用一个`setAttribute`方法来讲这个Props中的键值对设置到DOM元素上即可：

```

function setProp($target, name, value) {
 $target.setAttribute(name, value);
}

```

这个函数用于将单个的Prop值设置到DOM元素上，而对于props对象，我们要做的就是依次遍历：

```

function setProps($target, props) {
 Object.keys(props).forEach(name => {
   setProp($target, name, props[name]);
 });
}

```

你应该还记得那个用于创建元素的`createElement`方法吧，我们需要将`setProps`方法放置到元素成功创建之后：

```

function createElement(node) {
 if (typeof node === ‘string’) {
   return document.createTextNode(node);
 }
 const $el = document.createElement(node.type);
 setProps($el, node.props);
 node.children
   .map(createElement)
   .forEach($el.appendChild.bind($el));
 return $el;
}

```

不要急，这还远远不够。React的初学教程中一直强调className与class的区别，在我们的setProps中也需要对于这些JS的保留字做一个替换，譬如：

```

<nav className=”navbar light”>

 <ul></ul>
</nav>

```

另外，还有比较常见的就是对于DOM的布尔属性，譬如checked、disabled等等的处理：

```

<input type=”checkbox” checked={false} />

```

在真实的DOM节点上，如果是出现了false的情况，我们并不希望checked属性会出现，那么我们的Props函数就要能智能地进行判断：

```

function setBooleanProp($target, name, value) {
 if (value) {
   $target.setAttribute(name, value);
   $target[name] = true;
 } else {
   $target[name] = false;
 }
}

```

最后呢，要做的就是对于自定义的，即非标准的HTML属性进行一个过滤，这些属性只应该出现在JS对象上，而不应该出现在真实的DOM对象上：

```

function isCustomProp(name) {
 return false;
}

```

```

function setProp($target, name, value) {
 if (isCustomProp(name)) {
   return;
 } else if (name === ‘className’) {
   $target.setAttribute(‘class’, value);
 } else if (typeof value === ‘boolean’) {
   setBooleanProp($target, name, value);
 } else {
   $target.setAttribute(name, value);
 }
}

```

总结一下，本部分完整的JSX代码为：

```

/** @jsx h */

function h(type, props, ...children) {
  return { type, props: props || {}, children };
}

function setBooleanProp($target, name, value) {
  if (value) {
    $target.setAttribute(name, value);
    $target[name] = true;
  } else {
    $target[name] = false;
  }
}

function isCustomProp(name) {
  return false;
}

function setProp($target, name, value) {
  if (isCustomProp(name)) {
    return;
  } else if (name === 'className') {
    $target.setAttribute('class', value);
  } else if (typeof value === 'boolean') {
    setBooleanProp($target, name, value);
  } else {
    $target.setAttribute(name, value);
  }
}

function setProps($target, props) {
  Object.keys(props).forEach(name => {
    setProp($target, name, props[name]);
  });
}

function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  setProps($el, node.props);
  node.children
    .map(createElement)
    .forEach($el.appendChild.bind($el));
  return $el;
}

//--------------------------------------------------

const f = (
  <ul style="list-style: none;">
    <li className="item">item 1</li>
    <li className="item">
      <input type="checkbox" checked={true} />
      <input type="text" disabled={false} />
    </li>
  </ul>
);

const $root = document.getElementById('root');
$root.appendChild(createElement(f));
```



## Diffing Props:Props变化比较

现在我们已经创建了带有Props属性的元素，下一个需要考虑的就是应该如何应用到我们上文提到的Diff算法中。首先我们要来看下如何从真实的DOM中移除某些Props:

```

function removeBooleanProp($target, name) {
 $target.removeAttribute(name);
 $target[name] = false;
}function removeProp($target, name, value) {
 if (isCustomProp(name)) {
   return;
 } else if (name === ‘className’) {
   $target.removeAttribute(‘class’);
 } else if (typeof value === ‘boolean’) {
   removeBooleanProp($target, name);
 } else {
   $target.removeAttribute(name);
 }
}

```

然后我们需要写一个updateProp函数，来根据新旧节点的Props的变化进行恰当的真实DOM节点的修改，共有以下几种情况：

- 新节点移除了某个旧节点的Prop

![](http://7xiegq.com1.z0.glb.clouddn.com/1-N18Z791AZ-0c59IW1JNl3Q.png)

- 新节点添加了某个旧节点没有的Prop

![](http://7xiegq.com1.z0.glb.clouddn.com/1-TWNB5FSzfjqGa0g_D8OXtg.png)

- 新旧节点的某个Prop的值发生了变化

![](http://7xiegq.com1.z0.glb.clouddn.com/1-W0jGFee-2ptAP1Lm05nzDg.png)



根据以上规则，我们可知更新Prop的函数为：

```

function updateProp($target, name, newVal, oldVal) {
 if (!newVal) {
   removeProp($target, name, oldVal);
 } else if (!oldVal || newVal !== oldVal) {
   setProp($target, name, newVal);
 }
}

```

可以看出，更新单个Prop的函数还是非常简单的，就是将移除与设置结合起来使用，那么我们扩展到Props，就得到如下的函数：

```

function updateProps($target, newProps, oldProps = {}) {

  const props = Object.assign({}, newProps, oldProps);

  Object.keys(props).forEach(name => {

    updateProp($target, name, newProps[name], oldProps[name]);

  });

}

```

同样地，我们需要将该更新函数添加到`updateElement`函数中：

```

function updateElement($parent, newNode, oldNode, index = 0) {

  ...

  } else if (newNode.type) {

    updateProps(

      $parent.childNodes[index],

      newNode.props,

      oldNode.props

    );

 

    ...

  }

}

```



# Events

用户交互是任何一个应用不可或缺的部分，而在这里我们讨论下如何为Virtual DOM添加事件处理的能力，React大概会这么做：

```

<button onClick={() => alert(‘hi!’)}></button>

```

可以看出，设置一个事件处理器就是添加一个Prop，只不过名称会以`on`开始，那么我们可以用如下函数来判断某个Prop是否与事件相关：

```

function isEventProp(name) {
 return /^on/.test(name);
}

```

判断是事件类型之后，我们可以提取出事件名：

```

function extractEventName(name) {
 return name.slice(2).toLowerCase();
}

```

看到这里，估计你会考虑直接将事件处理也放到setProps与updateProps函数中，不过这边就会存在一个问题，在diffProps的时候，你很难去比较两个function：

![](http://7xiegq.com1.z0.glb.clouddn.com/1-kHULR4jucUYsJmRoS5aSBA.png)

因此我们将所有的事件类型的Props认为是自定义的Props，这样我们上面提到的isCustomProp就起作用了：

```

function isCustomProp(name) {
 return isEventProp(name);
}

```

而把事件响应函数绑定到真实的DOM节点也很简单：

```

function addEventListeners($target, props) {
 Object.keys(props).forEach(name => {
   if (isEventProp(name)) {
     $target.addEventListener(
       extractEventName(name),
       props[name]
     );
   }
 });
}

```

同样的需要将该函数添加到createElement中：

```

function createElement(node) {
 if (typeof node === ‘string’) {
   return document.createTextNode(node);
 }
 const $el = document.createElement(node.type);
 setProps($el, node.props);
 addEventListeners($el, node.props);
 node.children
   .map(createElement)
   .forEach($el.appendChild.bind($el));
 return $el;
}

```

## Re-Adding Events:重新设置了事件响应

在这里我们暂时不考虑地很复杂，即不深入地比较那些事件类型的Prop发生变化的情况，作为替代的，我们引入一个forceUpdate属性，即强制整个DOM进行更新：

```

function changed(node1, node2) {
 return typeof node1 !== typeof node2 ||
        typeof node1 === ‘string’ && node1 !== node2 ||
        node1.type !== node2.type ||
        node.props.forceUpdate;
}

```

```

function isCustomProp(name) {
 return isEventProp(name) || name === ‘forceUpdate’;
}

```



最后，本文完整的JSX为：

```

/** @jsx h */

function h(type, props, ...children) {
  return { type, props: props || {}, children };
}

function setBooleanProp($target, name, value) {
  if (value) {
    $target.setAttribute(name, value);
    $target[name] = true;
  } else {
    $target[name] = false;
  }
}

function removeBooleanProp($target, name) {
  $target.removeAttribute(name);
  $target[name] = false;
}

function isEventProp(name) {
  return /^on/.test(name);
}

function extractEventName(name) {
  return name.slice(2).toLowerCase();
}

function isCustomProp(name) {
  return isEventProp(name) || name === 'forceUpdate';
}

function setProp($target, name, value) {
  if (isCustomProp(name)) {
    return;
  } else if (name === 'className') {
    $target.setAttribute('class', value);
  } else if (typeof value === 'boolean') {
    setBooleanProp($target, name, value);
  } else {
    $target.setAttribute(name, value);
  }
}

function removeProp($target, name, value) {
  if (isCustomProp(name)) {
    return;
  } else if (name === 'className') {
    $target.removeAttribute('class');
  } else if (typeof value === 'boolean') {
    removeBooleanProp($target, name);
  } else {
    $target.removeAttribute(name);
  }
}

function setProps($target, props) {
  Object.keys(props).forEach(name => {
    setProp($target, name, props[name]);
  });
}

function updateProp($target, name, newVal, oldVal) {
  if (!newVal) {
    removeProp($target, name, oldVal);
  } else if (!oldVal || newVal !== oldVal) {
    setProp($target, name, newVal);
  }
}

function updateProps($target, newProps, oldProps = {}) {
  const props = Object.assign({}, newProps, oldProps);
  Object.keys(props).forEach(name => {
    updateProp($target, name, newProps[name], oldProps[name]);
  });
}

function addEventListeners($target, props) {
  Object.keys(props).forEach(name => {
    if (isEventProp(name)) {
      $target.addEventListener(
        extractEventName(name),
        props[name]
      );
    }
  });
}

function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  setProps($el, node.props);
  addEventListeners($el, node.props);
  node.children
    .map(createElement)
    .forEach($el.appendChild.bind($el));
  return $el;
}

function changed(node1, node2) {
  return typeof node1 !== typeof node2 ||
         typeof node1 === 'string' && node1 !== node2 ||
         node1.type !== node2.type ||
         node1.props && node1.props.forceUpdate;
}

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
    updateProps(
      $parent.childNodes[index],
      newNode.props,
      oldNode.props
    );
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

//---------------------------------------------------------

function log(e) {
  console.log(e.target.value);
}

const f = (
  <ul style="list-style: none;">
    <li className="item" onClick={() => alert('hi!')}>item 1</li>
    <li className="item">
      <input type="checkbox" checked={true} />
      <input type="text" onInput={log} />
    </li>
    {/* this node will always be updated */}
    <li forceUpdate={true}>text</li>
  </ul>
);

const g = (
  <ul style="list-style: none;">
    <li className="item item2" onClick={() => alert('hi!')}>item 1</li>
    <li style="background: red;">
      <input type="checkbox" checked={false} />
      <input type="text" onInput={log} />
    </li>
    {/* this node will always be updated */}
    <li forceUpdate={true}>text</li>
  </ul>
);

const $root = document.getElementById('root');
const $reload = document.getElementById('reload');

updateElement($root, f);
$reload.addEventListener('click', () => {
  updateElement($root, g, f);
});


```





到这里我们就完成了一个最简单的Virtual DOM算法，不过其与真正能够投入实战的Virtual DOM算法还是有很大距离，进一步阅读推荐：

- [深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)

- [我的前端故事----React算法又是个什么鬼？！](http://www.cnblogs.com/fuhuixiang/p/5505848.html?f=tt&hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)

- [A Virtual DOM and diffing algorithm](https://github.com/Matt-Esch/virtual-dom):一个比较复杂的Virtual DOM算法的实现

- [simple-virtual-dom](https://github.com/livoras/simple-virtual-dom):一个简单的Virtual DOM的实现

- [how-to-write-your-own-virtual-dom](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060#.59fqwanqa)

- [Virtual DOM Benchmark](http://vdom-benchmark.github.io/vdom-benchmark/)


