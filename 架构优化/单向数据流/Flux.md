[![返回目录](https://parg.co/US3)](https://parg.co/UGZ) 
 


# Flux

Flux倡导的是单向数据流的原则，在这种架构下，通过Store存放应用程序的状态数据。当应用状态发生变化时，Store 可以发出事件，通知应用的组件并进行组件的重新渲染。另外，Dispatcher起到中央hub的作用，它为组件(View)和Store构建 起了桥梁。此外，你可以在组件上调用action，它会向Store发起事件。Store正是通过订阅这些事件，并根据事件的触发来改变 应用程序的内部状态的。


![150827-flux.jpg](http://cc.cocimg.com/api/uploads/20150902/1441160534608355.jpg)


Signs you need MobX:
* Simple workflows
* 10k+ dynamic DOM elements
* Lots of cascading computations
* Same data / many contexts


Signs you need Redux:
* Complex workflows
* Users collaborate
* Many sources of data updates
* Need to rewind/replay state
