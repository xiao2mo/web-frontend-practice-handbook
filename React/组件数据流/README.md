[![返回目录](https://parg.co/UY3)](https://parg.co/U0I) 







# 组件数据流


组件的主要职责是将原始数据转化为HTML中的富文本格式，而Props与State协作完成这件事，换言之，Props与State的并集即是全部的原始数据。Props与State之间也是有很多交集的，譬如：

- Props与State都是JS对象。
- Props与State的值的改变都会触发界面的重新渲染。
- Props与State都是确定性的，即在确定的Props或者State的值的情况下都会得出相同的界面。

不过Props顾名思义，更多的是作为Component的配置项存在。Props往往是由父元素指定并且传递给自己的子元素，不过自身往往不会去改变Props的值。另一方面，State在组件被挂载时才会被赋予一个默认值，而常常在与用户的交互中发生更改。往往一个组件独立地维护它的整个状态机，可以认为State是一个私有属性。他们的对比如下：

| 描述             | Props | State |
| -------------- | ----- | ----- |
| 是否可以从父元素获取初始值  | Yes   | Yes   |
| 是否可以被父元素改变     | Yes   | No    |
| 是否可以设置默认值      | Yes   | Yes   |
| 是否可以在组件内改变     | No    | Yes   |
| 是否可以设置为子元素的初始值 | Yes   | Yes   |
| 是否可以在子元素中改变    | Yes   | No    |


