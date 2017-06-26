# Context

## Reference
- [How to safely use React context](https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076#.pnc15zji9)
- [React Docs:Context](https://facebook.github.io/react/docs/context.html)

# Context 基本使用

如果希望在组件中使用`Context`，我们需要引入`contextTypes`、`getChildContext`、`childContextTypes`这三个属性：
- getChildContext: 该函数是父组件的类函数之一，它会返回子函数中获取到的`this.context`的值内容，因此我们需要在这里设置子函数能够返回的属性信息。
- childContextTypes:该对象用于描述`getChildContext`返回值的数据结构，其会起到类似于`propTyps`这样的类型校验功能。
- contextTypes:该对象在子组件中用于描述父组件提供的上下文数据结构，可以将它看做子组件对于父组件的请求，同时也会起到类型检测的作用。

# Context 潜在问题

React 官方并不建议我们大量使用Context，原因概括为以下两点：
- 尽管其可以减少逐层传递带来的冗余代码，尽量的解耦和组件，但是当构造复杂时，我们也会陷入抽象漏洞，无法去判断`Context`到底是哪个父组件提供的。此时`Context`就像所谓的全局变量一样，大量的全局变量的使用会导致组件的不可以预测性，导致整个系统的鲁棒性降低。
- `Context`并不会触发组件重渲染。

# Context 强制更新策略