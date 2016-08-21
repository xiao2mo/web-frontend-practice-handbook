> 本文从属于笔者的[JavaScript 入门与最佳实践](https://github.com/wxyyxc1992/web-frontend-practice-handbook#javascript)系列文章，同时，本部分内容也归纳于笔者的[我的校招准备之路:从Web前端到服务端应用架构](https://github.com/wxyyxc1992/Coder-Knowledge-Graph/blob/master/interview/my-frontend-backend-interview.md)这篇综述。

> [大部分人都会做错的经典JS闭包面试题](http://www.cnblogs.com/xxcanghai/p/4991870.html?utm_source=tuicool&utm_medium=referral)
> [how-do-javascript-closures-work](http://stackoverflow.com/questions/111102/how-do-javascript-closures-work)

# Lexical Scope:词法作用域
> functions are executed using the scope chain that was in effect when they were defined

一般来说，在编程语言里我们常见的变量作用域就是词法作用域与动态作用域(Dynamic Scope)，绝大部分的编程语言都是使用的词法作用域。词法作用域注重的是所谓的Write-Time，即编程时的上下文，而动态作用域以及常见的this的用法，都是Run-Time，即运行时上下文。词法作用域关注的是函数在何处被定义，而动态作用域关注的是函数在何处被调用。JavaScript是典型的词法作用域的语言，即一个符号参照到语境中符号名字出现的地方，局部变量缺省有着词法作用域。此二者的对比可以参考如下这个例子：
```
function foo() {
    console.log( a ); // 2 in Lexical Scope ，But 3 in Dynamic Scope
}

function bar() {
    var a = 3;
    foo();
}

var a = 2;

bar();
```
看一个实例如下：
```
var scope = "I am global";
function whatismyscope(){
   var scope = "I am just a local";
   function func() {return scope;}
   return func;
}

whatismyscope()()
```
该代码片最终输出的结果是：
```
I am just a local
```


# Closure
闭包本身是含有自由变量的代码块，在JavaScript中我们常用的闭包则是本身的词法作用域与变量保留相结合的表现，首先回顾下一个基本的词法作用域的用法：
```
function init() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  displayName();
}
init();
```
函数 init() 创建了一个局部变量 name，然后定义了名为 displayName() 的函数。displayName() 是一个内部函数——定义于 init() 之内且仅在该函数体内可用。displayName() 没有任何自己的局部变量，然而它可以访问到外部函数的变量，即可以使用父函数中声明的 name 变量。注意，这里是直接执行外部的init函数，下面看一个闭包的例子:
```
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();
```
运行这段代码的效果和之前的 init() 示例完全一样：字符串 "Mozilla" 将被显示在一个 JavaScript 警告框中。其中的不同 — 也是有意思的地方 — 在于 displayName() 内部函数在执行前被从其外围函数中返回了。这段代码看起来别扭却能正常运行。通常，函数中的局部变量仅在函数的执行期间可用。一旦 makeFunc() 执行过后，我们会很合理的认为 name 变量将不再可用。虽然代码运行的没问题，但实际并不是这样的。这个谜题的答案是 myFunc 变成一个闭包了。 闭包是一种特殊的对象。它由两部分构成：函数，以及创建该函数的环境。环境由闭包创建时在作用域中的任何局部变量组成。在我们的例子中，myFunc 是一个闭包，由 displayName 函数和闭包创建时存在的 "Mozilla" 字符串形成。

# 避免闭包
在真实的开发中我们常常会使用闭包这一变量保留的特性来传递变量到异步函数中，不过闭包也往往会使程序出乎我们的控制，譬如在下面这个简单的循环中，我们本希望能够打印出0~9这几个数:
```
for(var i = 0;i < 10;i++){
   setTimeout(()=>{console.log(i),1000})
}
```
不过所有输入的i的值都是10，这与我们的期望产生了很大的偏差。因此我们在部分情况下需要破坏闭包而获取真实的变量值。

## 将异步获取值保留到新增的闭包中
我们可以考虑加一层闭包，将i以函数参数形式传递给内层函数：
```
    function init3() {     
      var pAry = document.getElementsByTagName("p");     
      for( var i=0; i<pAry.length; i++ ) {     
       (function(arg){         
           pAry[i].onclick = function() {         
              alert(arg);     
           };     
       })(i);//调用时参数     
      }     
    }     
```
或者在新增的闭包中将`i`以局部变量形式传递给内部函数中:
```
    function init4() {     
      var pAry = document.getElementsByTagName("p");     
      for( var i=0; i<pAry.length; i++ ) {       
        (function () {     
          var temp = i;//调用时局部变量     
          pAry[i].onclick = function() {       
            alert(temp);       
          }     
        })();     
      }     
    }     
```
## 将变量值保留到作用域之外
在DOM环境中，我们可以将变量值存储到要操作的DOM对象中:
```
    function init() {     
      var pAry = document.getElementsByTagName("p");     
      for( var i=0; i<pAry.length; i++ ) {     
         pAry[i].i = i;     
         pAry[i].onclick = function() {     
            alert(this.i);     
         }     
      }     
    }     
```
也可以将变量`i`保存在匿名函数本身:
```
    function init2() {     
      var pAry = document.getElementsByTagName("p");     
      for( var i=0; i<pAry.length; i++ ) {       
       (pAry[i].onclick = function() {     
            alert(arguments.callee.i);     
        }).i = i;     
      }     
    }     
```


![](http://153.3.251.190:11900/JavaScript-LexicalScope-Closure)

