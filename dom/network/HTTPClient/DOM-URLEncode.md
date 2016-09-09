

> 本文从属于笔者的[前端入门与最佳实践](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices)中的[DOM 网络处理](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/dom/README.md#dom-%E7%BD%91%E7%BB%9C%E5%A4%84%E7%90%86)系列文章，包括[基于fetch的DOM网络请求](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/dom/network/HTTPClient/DOM-HTTPClient.md)、[URL编码详解与DOM中GBK编码实践](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/dom/network/HTTPClient/DOM-URLEncode.md)、[浏览器中跨域机制详解与实战](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/dom/network/HTTPClient/DOM-CrossDomain.md)、[浏览器中长连接的几种风味](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/dom/network/DOM-LongLivedConnection.md)、[文件传输](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/dom/network/DOM-FileTransfer.md)这几个部分。

# URLEncode

URL只能使用英文字母、阿拉伯数字和某些标点符号，不能使用其他文字和符号。根据RFC1738中做的规定:"只有字母和数字[0-9a-zA-Z]、一些特殊符号"$-_.+!*'(),"[不包括双引号]、以及某些保留字，才可以不经过编码直接用于URL。"笔者之前一直使用的是JavaScript中encodeURI与encodeURIComponent进行的编解码工作，直到有一天笔者需要用Ajax抓取[这个页面](http://ggzy.njzwfw.gov.cn/njggzy/consultant/showresault.aspx?ShowLsh=0&Mlsh=123456&Name=%D7%F3%C5%CE)，其中最后一个参数是中文名，笔者才遇到需要在前端进行GBK编码的问题。可能是因为笔者没有搜索到合适的文章，目前发现的很多对汉字进行GBK编码的方案都是基于服务端进行的，而纯前端的编码方案不多。其中有一个是[gb2312-utf8-convert.js](https://gist.github.com/19317362/a1d8e40bfb6587463d4d)，不过我是测试失败了，因此本文是参考了[纯前端Js解决各种汉字urlencode,urldecode（GBK、UTF-8均可）](http://zcw.me/blogwp/front-end-urldecode-gbk/)中提出的基于iframe的浏览器自编码方案，实战效果还可以。同时，因为笔者是在Node环境下进行网络请求模块的单元测试，然后无缝移植到Browser中运行，因此笔者自己封装了一个[isomorphic-urlencode](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/tree/master/dom/network/HTTPClient/isomorphic-urlencode)。

## Reference
> - [纯前端Js解决各种汉字urlencode,urldecode（GBK、UTF-8均可）](http://zcw.me/blogwp/front-end-urldecode-gbk/)
> - [阮一峰的网络日志:关于URL编码](http://www.ruanyifeng.com/blog/2010/02/url_encoding.html)



# JavaScript内置编码函数

## escape
Javascript语言用于编码的函数，一共有三个，最古老的一个就是escape()。该方法不会对 ASCII 字母和数字进行编码，也不会对下面这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。其他所有的字符都会被转义序列替换。所有的空格符、标点符号、特殊字符以及其他非ASCII字符都将被转化成%xx格式的字符编码（xx等于该字符在字 符集表里面的编码的16进制数字）。比如，空格符对应的编码是%20。不会被此方法编码的字符： @ * / +。实际上，escape()不能直接用于URL编码，它的真正作用是返回一个字符的Unicode编码值。比如"王下邀月熊"的返回结果 是%u738B%u4E0B%u9080%u6708%u718A，也就是说在Unicode字符集中，"王"是第738B个（十六进制）字符，后面的以此类推。
```
> escape("王下邀月熊")
'%u738B%u4E0B%u9080%u6708%u718A'
```
其对应的解码函数为unescape:
```
> unescape('%u738B%u4E0B%u9080%u6708%u718A')
'王下邀月熊'
```
## encodeURI
encodeURI()是Javascript中真正用来对URL编码的函数。它着眼于对整个URL进行编码，因此除了常见的符号以外，对其他一些在网址中有特殊含义的符号"; / ? : @ & = + $ , #"，也不进行编码。编码后，它输出符号的utf-8形式，并且在每个字节前加上%。
```
> encodeURI("http://王下邀月熊.com")
'http://%E7%8E%8B%E4%B8%8B%E9%82%80%E6%9C%88%E7%86%8A.com'
```
它对应的解码函数是decodeURI()。
```
> decodeURI('http://%E7%8E%8B%E4%B8%8B%E9%82%80%E6%9C%88%E7%86%8A.com')
'http://王下邀月熊.com'
```

## encodeURIComponent
最后一个Javascript编码函数是encodeURIComponent()。与encodeURI()的区别是，它用于对URL的组成部分进行个别编码，而不用于对整个URL进行编码。因此，"; / ? : @ & = + $ , #"，这些在encodeURI()中不被编码的符号，在encodeURIComponent()中统统会被编码。至于具体的编码方法，两者是一样。
```
> encodeURIComponent("http://王下邀月熊.com")
'http%3A%2F%2F%E7%8E%8B%E4%B8%8B%E9%82%80%E6%9C%88%E7%86%8A.com'
```
它对应的解码函数是decodeURIComponent()。


# DOM下GBK编码
在node环境下我们可以使用[node-urlencode](https://www.npmjs.com/package/urlencode)方便地进行各种格式的编解码，但是在DOM下GBK的编码却是个小麻烦。另一方面，如果看过笔者之前的[浏览器跨域方法与基于Fetch的Web请求最佳实践](https://segmentfault.com/a/1190000006095018)这篇文章会发现，因为希望能在Node环境下测试，而后在Browser环境中无缝运行，所以笔者封装了[isomorphic-urlencode](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/tree/master/dom/network/HTTPClient/isomorphic-urlencode)，其保证了接口风格是与[node-urlencode](https://www.npmjs.com/package/urlencode)保持一致，但是因为基于DOM的解码是异步进行的，因此最后是设置了Promise作为异步的返回对象。在Browser中其核心的对于GBK的编码方式分为两步，首先是在当前的页面中创建隐藏的form表单与隐藏的iframe:
```
//创建form通过accept-charset做encode
var form = document.createElement('form');
form.method = 'get';
form.style.display = 'none';
form.acceptCharset = "gbk";

//创建伪造的输入
var input = document.createElement('input');
input.type = 'hidden';
input.name = 'str';
input.value = url;

//将输入框添加到表单中
form.appendChild(input);
form.target = '_urlEncode_iframe_';

document.body.appendChild(form);

//隐藏iframe截获提交的字符串
if (!window['_urlEncode_iframe_']) {
  var iframe = document.createElement('iframe');
  //iframe.name = '_urlEncode_iframe_';
  iframe.setAttribute('name', '_urlEncode_iframe_');
  iframe.style.display = 'none';
  iframe.width = "0";
  iframe.height = "0";
  iframe.scrolling = "no";
  iframe.allowtransparency = "true";
  iframe.frameborder = "0";
  iframe.src = 'about:blank';
  document.body.appendChild(iframe);
}

//
window._urlEncode_iframe_callback = callback;

//设置回调编码页面的地址，这里需要用户修改
form.action = window.location.href;

//提交表单
form.submit();

//定时删除两个子Element
setTimeout(function () {
  form.parentNode.removeChild(form);
  iframe.parentNode.removeChild(iframe);
}, 100)
```
即将form表单的提交结果异步显示在iframe中，因为笔者是基于React进行的开发，因此只有一个HTML文件作为入口，因此笔者是提交到了自身，并且需要在HTML文件首部添加如下回调控制代码:
```
if (parent._urlEncode_iframe_callback) {

    parent._urlEncode_iframe_callback(location.search.split('=')[1]);

    //直接关闭当前子窗口
    window.close();
}
```
在原文中还有关于IE的Bug的讨论，这里暂时不做详细介绍。总结而言，isomorphic-urlencode简单的用法为:
```
var urlencode = require("isomorphic-urlencode");

urlencode("王下邀月熊").then(function (data) {
  console.log(data);
});

urlencode("王下邀月熊", "gbk").then(function (data) {
  console.log(data);
});
```

在笔者自己以流式风格基于fetch封装的[fluent-fetch](https://www.npmjs.com/package/fluent-fetcher)中，建议是将所有的非UTF-8编码的操作提取到网络请求之外，即可以以[如下方式](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/dom/network/HTTPClient/fluent-fetcher/fluent_fetcher.test.js)使用:
```
//测试需要以GBK编码方式发起的请求
var urlencode = require("isomorphic-urlencode");

urlencode("左盼", "gbk").then((data)=> {
  fluentFetcher = new FluentFetcher({host: "ggzy.njzwfw.gov.cn", responseContentType: "text"});

  //http://ggzy.njzwfw.gov.cn/njggzy/consultant/showresault.aspx?ShowLsh=0&Mlsh=123456&Name=%D7%F3%C5%CE
  //测试以代理模式发起请求
  fluentFetcher
    .parameter({ShowLsh: "0", Mlsh: "123456", Name: data})
    .get({path: "/njggzy/consultant/showresault.aspx"})
    .proxy({proxyUrl: "http://app.truelore.cn:11499/proxy"})
    .build()
    .then((data)=> {
      console.log(data);
    }).catch((error)=> {
    console.log(error);
  });

});
```