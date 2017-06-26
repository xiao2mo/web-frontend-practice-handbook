# MobX 中的 observable
MobX 中实现响应式的第一步就是创造 observable 对象，在前面的例子中我们可以看到，无论是简单值 number、string，还是数组或者对象，首先都要使用装饰器 `@observable` 进行处理。下面，就让我们来深入 `@observable` 装饰器中，看看它是如何使一个普通值具有响应能力的。

## 用法
之前，我们已经介绍了创建 observable 值的基本方法，核心就是 MobX 提供的 observable 方法。除了普通的用法之外，还是使用 ES Next 中的装饰器方法将普通值转换为 observable 值：
```
@observable price = 0;
  
@observable amount = 1;
```
两种写法效果相同，相比之下使用装饰器写法更加简洁优雅一些。需要注意的是，如果要使用装饰器写法，需要对 Babel 进行相应的配置，才可以支持装饰器语法。

## observable 类型
虽然所有类型的值都可以通过 `observable()` 方法或者 `@observable` 装饰器转换为 observable 值。但是不同类型的值在转换为 observable 时也会产生不同的类型，下面我们会一一介绍各种类型的特点和使用方法：

### 简单值
JavaScript 中的 primitive 数据类型包括 number、string、boolean、null 和 undefined。它们不是对象，不具备属性和方法，因此，想将它们转换为 observable，就需要用一个容器来实现。
在转换简单值的时候，使用 `observable()` 方法和使用 `@observable` 装饰器会产生不同的效果。首先，让我们看一下使用 `observable()` 方法，使用此方法在本质上调用了 `observable.box(value)` 方法。
`observable.box(value)` 可以用来存储各种类型的值，返回一个 observable 对象：
```
import {observable} from "mobx";

const cityName = observable("Vienna");

console.log(cityName.get());
// prints 'Vienna'

cityName.observe(function(change) {
    console.log(change.oldValue, "->", change.newValue);
});

cityName.set("Amsterdam");
// prints 'Vienna -> Amsterdam'        
```    
    
包装的 observable 对象具有以下方法：
- get() 返回当前值
- set(value) 设置新值并通知所有观察者
- intercept(interceptor) 在变更应用之前，拦截变更
- observe(callback: (change) => void, fireImmediately = false) 注册观察者，在每次存储的值发生变更时触发回调

`@observable` 装饰器与 `observable()` 方法有所不同，`@observable` 装饰器创造的 observable 对象会通过访问器属性来存取值，因此，不能使用 `get()` 和 `set()` 方法存取值。
```
class Person {
  
  @observable age = 1;

  constructor() {
    autorun(() => console.log(`age -> ${this.age}`))
  }
}

let person = new Person();
person.age = 10;

// prints 'age -> 1'        
// prints 'age -> 10'        
```

此外，还有一个 `observable.shallowBox(value)` 方法，只对初始值进行转换。

### object
首先声明一下，这里的 object 指的是基本对象，判断的标准为：
```
const proto = Object.getPrototypeOf(value);
proto === Object.prototype || proto === null;
```
转换 object 时，本质上调用的是 `observable。object()` 方法。转换的过程中，对象中的每个属性都会被复制一份再转换为 observable value，如果遇到的值是 object 或者 array 的话，会使用 `observable()` 方法进行递归操作，直到所有的值都被转换成 observable。
```
import {observable, autorun, action} from "mobx";

var person = observable({
    // observable properties:
    name: "John",
    age: 42,
    showAge: false,

    // computed property:
    get labelText() {
        return this.showAge ? `${this.name} (age: ${this.age})` : this.name;
    },

    // action:
    setAge: action(function() {
        this.age = 21;
    })
});

// object properties don't expose an 'observe' method,
// but don't worry, 'mobx.autorun' is even more powerful
autorun(() => console.log(person.labelText));

person.name = "Dave";
// prints: 'Dave'

person.setAge(21);
// etc
```
转换 object 有几点需要注意的地方：
- 只有已经存在的属性才会被转换为 observable，后面添加的属性不能被转换为 observable，除非使用 `extendObservable()`。
- 非基本对象应该再构造器中完成属性的转换工作。
- getter 属性会被自动转换为派生属性，就像 computed value 那样。
- 在递归过程中 `observable()` 方法也只对基本对象起作用，不会递归进非基本对象。

此外，还有一个 `observable.shallowObject()` 方法，只进行 shallow observable 转换。

### array
数组的转换是调用了 `observable.array()` 方法，同样会进行递归转换，但是与转换 object 不同的是，数组中不仅仅已经存在的条目会被转换，未来的新添加的值也会被转换为 observable。
```
import {observable, autorun} from "mobx";

var todos = observable([
    { title: "Spoil tea", completed: true },
    { title: "Make coffee", completed: false }
]);

autorun(() => {
    console.log("Remaining:", todos
        .filter(todo => !todo.completed)
        .map(todo => todo.title)
        .join(", ")
    );
});
// Prints: 'Remaining: Make coffee'

todos[0].completed = false;
// Prints: 'Remaining: Spoil tea, Make coffee'

todos[2] = { title: 'Take a nap', completed: false };
// Prints: 'Remaining: Spoil tea, Make coffee, Take a nap'

todos.shift();
// Prints: 'Remaining: Make coffee, Take a nap'
```
需要注意的是，observableArray 本质上是使用了一个对象来模拟数组。虽然模仿了数组大部分的属性和方法，但是还是有一些细微的区别。例如，使用 `Array.isArray(observableArray)` 进行判断时，会返回 `false`。这可能导致一些错误，所以，最好在需要传入数组的地方使用 `observableArray.slic()` 方法产生一个真正的数组。这样，就可以通过 `Array.isArray()` 的判断了。此外，observableArray 中的 `sort()` 和 `reverse()` 方法与原生数组的对应方法有所不同，这两个方法不会操作本数组，而是返回一个处理后的新数组。
除了原生数组的内置方法以外，observableArray 还提供了一下的方法：
- `intercept(interceptor)` 可以在变更生效前拦截本次变更
- `observe(listener, fireImmediately? = false)` 注册观察者，监听数组的变更
- `clear()` 清除数组中所有的条目
- `replace(newItems)` 替换数组中的指定条目
- `find(predicate: (item, index, array) => boolean, thisArg?, fromIndex?)` 
- `remove(value)` 移除数组中对应的条目
- `peek()` 类似于 `slice()`，返回一个真正的数组，可以安全的传入第三方库

对应的，`observable.shallowArray(values)` 方法创建一个 shallowObservableArray，数组的条目不会经过 `observable()` 方法转换，而是直接保存在数组内。


### map
如果不关心条目内容的变化，只关心条目的增删，可以使用 ES6 中新增加的数据结构 Map，相比于 ES6 中的 Map，MobX 提供的 observableMap 增加了使用对象初始化 Map 的方式：
```
let map = observable.map({a: 1});
autorun(() => console.log(map.get('a')))
map.set('a', 10);
```
此外，observableMap 对象除了实现了所有 ES6 Map 的方法外，还额外添加了几个方法：
- `toJS()` 返回一个基本对象，内容为 map 的浅拷贝。如果想要深拷贝的话，请使用 `mobx.toJS(map)` 方法
- `intercept(interceptor)` 注册拦截器，可以在变更生效前拦截本次变更
- `observe(listener, fireImmediately?)` 注册观察者，监听数据的变更
- `merge(values)` 将 value 中的条目复制到 map 中，values 可以是基本对象，数组或者 Map
- `replace(values)` 用 values 中的内容替换 map 中的内容，相当于 `.clear().merge(values)`

对应的，`observable.shallowMap(values)` 方法创建一个 shallowObservableArray，添加到 Map 的条目不会经过 `observable()` 方法转换，而是直接保存在数组内。

### 总结
至此，MobX 中的 observable 值类型就介绍完了，熟悉转换规则，可以使我们使用合适的数据类型和结构保存状态，减少错误，提高效率。在需要的时候，别忘了使用每个类型对应的 shallow 形式。
 
## observable 原理
TODO