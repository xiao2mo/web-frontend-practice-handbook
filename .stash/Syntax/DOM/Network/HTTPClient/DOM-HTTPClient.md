

> 本文从属于笔者的[Web前端中DOM系列文章](https://github.com/wxyyxc1992/web-frontend-practice-handbook#advanced-2).
# Introduction
本文是对于DOM中常见的网络请求方式与知识点进行总结，关于知识图谱请参考笔者的[客户端知识图谱之网络](https://github.com/wxyyxc1992/Coder-Knowledge-Graph/blob/master/client/network/client-network.zh.md)。

# URI Handler
## Encode
## Analysis
### Query Params
```
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
```
```
// query string: ?foo=lorem&bar=&baz
var foo = getParameterByName('foo'); // "lorem"
var bar = getParameterByName('bar'); // "" (present with empty value)
var baz = getParameterByName('baz'); // "" (present with no value)
var qux = getParameterByName('qux'); // null (absent)
```
# XMLHttpRequest
| 属性                   | 类型                           | 描述                                       |
| -------------------- | ---------------------------- | ---------------------------------------- |
| `onreadystatechange` | `Function?`                  | 一个JavaScript函数对象，当readyState属性改变时会调用它。回调函数会在user interface线程中调用。**警告:** 不能在本地代码中使用. 也不应该在同步模式的请求中使用. |
| `readyState`         | `unsigned short`             | 请求的五种状态值状态描述`0``UNSENT `(未打开)`open()`方法还未被调用.`1``OPENED`  (未发送)`send()`方法还未被调用.`2``HEADERS_RECEIVED (已获取响应头)``send()`方法已经被调用, 响应头和响应状态已经返回.`3``LOADING (正在下载响应体)`响应体下载中;`responseText`中已经获取了部分数据.`4``DONE (请求完成)`整个请求过程已经完毕. |
| `response`           | varies                       | 响应实体的类型由 `responseType 来指定，` 可以是 `ArrayBuffer，` `Blob，` [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)， JavaScript 对象 (即 "json")， 或者是字符串。如果请求未完成或失败，则该值为 `null。` |
| `responseText`       | `DOMString`                  | 此次请求的响应为文本，或是当请求未成功或还未发送时为 `null。`**只读。** |
| `responseType`       | `XMLHttpRequestResponseType` | 设置该值能够改变响应类型。就是告诉服务器你期望的响应格式。ValueData type of `response`property`""` (空字符串)字符串(默认值)`"arraybuffer"`[`ArrayBuffer`](https://developer.mozilla.org/zh-cn/JavaScript_typed_arrays/ArrayBuffer)`"blob"`[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)`"document"`[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)`"json"`JavaScript 对象，解析自服务器传递回来的JSON 字符串。`"text"`字符串 |
| `responseXML`        | `Document?`                  | 本次请求的响应是一个 `Document` 对象，如果是以下情况则值为 `null：`请求未成功，请求未发送，或响应无法被解析成 XML 或 HTML。当响应为text/xml 流时会被解析。当 `responseType` 设置为"document"，并且请求为异步的，则响应会被当做 `text/html` 流来解析。**只读****.****注意:** 如果服务器不支持 `text/xml` Content-Type 头，你可以使用 `overrideMimeType() 强制 ``XMLHttpRequest` 将响应解析为 XML。 |
| `status`             | `unsigned short`             | 该请求的响应状态码 (例如, `状态码`200 表示一个成功的请求).**只读.** |
| `statusText`         | `DOMString`                  | 该请求的响应状态信息,包含一个状态码和原因短语 (例如 "`200 OK`"). **只读****.** |
| `upload`             | `XMLHttpRequestUpload`       | 可以在 `upload 上添加一个事件监听来跟踪上传过程。`           |
| `withCredentials`    | `boolean`                    | 表明在进行跨站(cross-site)的访问控制(Access-Control)请求时，是否使用认证信息(例如cookie或授权的header)。 默认为 `false。`**注意:** 这不会影响同站(same-site)请求. |


在部分浏览器中不支持XMLHttpRequest，因此需要做如下的检测：
```
// Just getting XHR is a mess!
if (window.XMLHttpRequest) { // Mozilla, Safari, ...
  request = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE
  try {
    request = new ActiveXObject('Msxml2.XMLHTTP');
  } 
  catch (e) {
    try {
      request = new ActiveXObject('Microsoft.XMLHTTP');
    } 
    catch (e) {}
  }
}

// Open, send.
request.open('GET', 'https://davidwalsh.name/ajax-endpoint', true);
request.send(null);
```
看一个复杂一点的例子：
```
    var userName;  
    var passWord;  
    var xmlHttpRequest;  
            
    //XmlHttpRequest对象  
    function createXmlHttpRequest(){  
        if(window.ActiveXObject){ //如果是IE浏览器  
            return new ActiveXObject("Microsoft.XMLHTTP");  
        }else if(window.XMLHttpRequest){ //非IE浏览器  
            return new XMLHttpRequest();  
        }  
    }  
      
    function onLogin(){  
        userName = document.f1.username.value;  
        passWord = document.f1.password.value;    
          
        var url = "LoginServlet?username="+userName+"&password="+passWord+"";     
              
        //1.创建XMLHttpRequest组建  
        xmlHttpRequest = createXmlHttpRequest();  
          
        //2.设置回调函数  
        xmlHttpRequest.onreadystatechange = zswFun;  
          
        //3.初始化XMLHttpRequest组建  
        xmlHttpRequest.open("POST",url,true);  
          
        //4.发送请求  
        xmlHttpRequest.send(null);    
    }     
            
    //回调函数  
    function zswFun(){  
        if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){  
            var b = xmlHttpRequest.responseText;  
            if(b == "true"){  
                alert("登录成功！");  
            }else{  
                alert("登录失败！");  
            }         
        }  
    }
```

# 同源策略与跨域
- [JavaScript 四种跨域方法](http://segmentfault.com/a/1190000003642057)
- [同源策略和跨域访问](http://blog.csdn.net/shimiso/article/details/21830313)
- [前端跨域的整理 ](http://qiutc.me/post/cross-domain-collections.html)
- [MDN-HTTP访问控制(CORS)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E9%99%84%E5%B8%A6%E5%87%AD%E8%AF%81%E4%BF%A1%E6%81%AF%E7%9A%84%E8%AF%B7%E6%B1%82)

## 同源策略
可谓同源？URL由协议、域名、端口和路径组成，如果两个URL的协议、域名和端口相同，则表示他们同源。浏览器的同源策略，限制了来自不同源的"document"或脚本，对当前"document"读取或设置某些属性，即从一个域上加载的脚本不允许访问另外一个域的文档属性。比如一个恶意网站的页面通过iframe嵌入了银行的登录页面（二者不同源），如果没有同源限制，恶意网页上的javascript脚本就可以在用户登录银行的时候获取用户名和密码。所谓道高一尺魔高一丈，虽然浏览器以同源策略限制了我们随意请求资源，但是从这个策略出现开始就有很多各种各样的Hacker技巧来。

## JSONP
JSONP是较为常用的一种跨域方式，不受到浏览器兼容性的限制，但是因为它只能以GET动词进行请求，这样就破坏了标准的REST风格，比较丑陋。JSONP本质上是利用`<script>`标签的跨域能力实现跨域数据的访问，请求动态生成的JavaScript脚本同时带一个callback函数名作为参数。其中callback函数本地文档的JavaScript函数，服务器端动态生成的脚本会产生数据，并在代码中以产生的数据为参数调用 callback函数。当这段脚本加载到本地文档时，callback函数就被调用。
（1）浏览器端构造请求地址
```
function resolveJson(result) {
	console.log(result.name);
}
var jsonpScript= document.createElement("script");
jsonpScript.type = "text/javascript";
jsonpScript.src = "http://www.qiute.com?callbackName=resolveJson";
document.getElementsByTagName("head")[0].appendChild(jsonpScript);
```
标准的Script标签的请求地址为:请求资源的地址＋获取函数的字段名＋回调函数名称，这里的获取函数的字段名是需要和服务端提前约定好，譬如jQuery中默认的获取函数名就是`callback`。而`resolveJson`是我们默认注册的回调函数，注意，该函数名需要全局唯一，该函数接收服务端返回的数据作为参数，而函数内容就是对于该参数的处理。
（2）服务端构造返回值
在接受到浏览器端 script 的请求之后，从url的query的callbackName获取到回调函数的名字，例子中是`resolveJson`。
然后动态生成一段javascript片段去给这个函数传入参数执行这个函数。比如：
```
resolveJson({name: 'qiutc'});
```
（3）客户端以脚本方式执行服务端返回值
服务端返回这个 script 之后，浏览器端获取到 script 资源，然后会立即执行这个 javascript，也就是上面那个片段。这样就能根据之前写好的回调函数处理这些数据了。
## CORS:跨域资源共享
跨域资源共享，Cross-Origin Resource Sharing是由W3C提出的一个用于浏览器以XMLHttpRequest方式向其他源的服务器发起请求的规范。不同于JSONP，CORS是以Ajax方式进行跨域请求，需要服务端与客户端的同时支持。目前CORS在绝大部分现代浏览器中都是支持的:
![](http://qiutc.me/img/cross-domain-cors.png)
CORS标准定义了一个规范的HTTP Headers来使得浏览器与服务端之间可以进行协商来确定某个资源是否可以由其他域的客户端请求获得。尽管很多的验证与鉴权是由服务端完成，但是本质上大部分的检查和限制还是应该由浏览器完成。一般来说CORS会分为Simple Request，简单请求与Preflight，需要预检的请求两大类。其基本的流程如下:
![](https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flowchart_showing_Simple_and_Preflight_XHR.svg/1024px-Flowchart_showing_Simple_and_Preflight_XHR.svg.png)
### 预检请求
当浏览器的请求方式是HEAD、GET或者POST，并且HTTP的头信息中不会超出以下字段:
- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

时，浏览器会将该请求定义为简单请求，否则就是预检请求。预检请求会在正式通信之前，增加一次HTTP查询请求。浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。预检请求的发送请求：
```
OPTIONS /cors HTTP/1.1
Origin: http://api.qiutc.me
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.qiutc.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```
“预检”请求用的请求方法是OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是Origin，表示请求来自哪个源。
除了Origin字段，”预检”请求的头信息包括两个特殊字段:
- Access-Control-Request-Method:该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。
- Access-Control-Request-Headers:该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header。

预检请求的返回：
```
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.qiutc.me
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```
- Access-Control-Allow-Methods:必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次”预检”请求。
- Access-Control-Allow-Headers:如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在”预检”中请求的字段。
- Access-Control-Max-Age:该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。

一旦服务器通过了”预检”请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段。

### 简单请求
对于简单的跨域请求或者通过了预检的请求，浏览器会自动在请求的头信息加上`Origin`字段，表示本次请求来自哪个源（协议 + 域名 + 端口），服务端会获取到这个值，然后判断是否同意这次请求并返回。典型的请求头尾:
```
// 请求
GET /cors HTTP/1.1
Origin: http://api.qiutc.me
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```
如果服务端允许，在返回的头信息中会多出几个字段:
```
// 返回
Access-Control-Allow-Origin: http://api.qiutc.me
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: Info
Content-Type: text/html; charset=utf-8
```
- Access-Control-Allow-Origin:必须。它的值是请求时Origin字段的值或者 `*`，表示接受任意域名的请求。
- Access-Control-Allow-Credentials:可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。
  再需要发送cookie的时候还需要注意要在AJAX请求中打开withCredentials属性：`var xhr = new XMLHttpRequest(); xhr.withCredentials = true;`
  **需要注意的是**，如果要发送Cookie，Access-Control-Allow-Origin就不能设为`*`，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且原网页代码中的`document.cookie`也无法读取服务器域名下的Cookie。
- Access-Control-Expose-Headers:可选。CORS请求时，XMLHttpRequest对象的`getResponseHeader()`方
  法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-
  Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，`getResponseHeader('Info')`可以返回Info字段的值。

如果服务端拒绝了调用，即不会带上 `Access-Control-Allow-Origin` 字段，浏览器发现这个跨域请求的返回头信息没有该字段，就会抛出一个错误，会被 `XMLHttpRequest` 的 `onerror` 回调捕获到。这种错误无法通过 HTTP 状态码判断，因为回应的状态码有可能是200。

## postMessage
![](http://qiutc.me/img/cross-domain-postmessage.png)
window.postMessage 是一个用于安全的使用跨源通信的方法。通常，不同页面上的脚本当且仅当执行它们的页面所处的位置使用相同的协议（通常都是 http）、相同的端口（http默认使用80端口）和相同的主机（两个页面的 document.domain 的值相同）只在这种情况下被允许互相访问。 而window.postMessage 提供了一个受控的机制来安全地绕过这一限制。其函数原型如下:

```
windowObj.postMessage(message, targetOrigin);
```
- `windowObj`: 接受消息的 Window 对象。
- `message`: 在最新的浏览器中可以是对象。
- `targetOrigin`: 目标的源，`*` 表示任意。

调用postMessage方法的window对象是指要接收消息的那一个window对象，该方法的第一个参数message为要发送的消息，类型只能为字符串；第二个参数targetOrigin用来限定接收消息的那个window对象所在的域，如果不想限定域，可以使用通配符 * 。需要接收消息的window对象，可是通过监听自身的message事件来获取传过来的消息，消息内容储存在该事件对象的data属性中。上面所说的向其他window对象发送消息，其实就是指一个页面有几个框架的那种情况，因为每一个框架都有一个window对象。在讨论第种方法的时候，我们说过，不同域的框架间是可以获取到对方的window对象的，虽然没什么用，但是有一个方法是可用的－window.postMessage。下面看一个简单的示例，有两个页面：
```
//在主页面中获取子页面的句柄
var iframe =document.getElementById('iframe');
var iframeWindow = iframe.contentWindow;
//向子页面发送消息
iframeWindow.postMessage("I'm message from main page.");
//在子页面中监听获取消息
window.onmessage = function(e) {
	e = e || event;
	console.log(e.data);
}
```

## Proxy:服务端跨域
使用代理方式跨域更加直接，因为SOP的限制是浏览器实现的。如果请求不是从浏览器发起的，就不存在跨域问题了。使用本方法跨域步骤如下：
- 把访问其它域的请求替换为本域的请求
- 本域的请求是服务器端的动态脚本负责转发实际的请求

不过笔者在自己的开发实践中发现目前服务端跨域还是很有意义的，特别当我们希望从不支持CORS或者JSONP的服务端获取数据的时候，往往只能通过跨域请求。

# Fetch
- [JavaScript Fetch API](http://www.tuicool.com/articles/QZBJ7zJ)
- [fetch API](https://davidwalsh.name/fetch)

JavaScript 通过XMLHttpRequest(XHR)来执行异步请求，这个方式已经存在了很长一段时间。虽说它很有用，但它不是最佳API。它在设计上不符合职责分离原则，将输入、输出和用事件来跟踪的状态混杂在一个对象里。而且，基于事件的模型与最近JavaScript流行的Promise以及基于生成器的异步编程模型不太搭。新的 Fetch API打算修正上面提到的那些缺陷。 它向JS中引入和HTTP协议中同样的原语。具体而言，它引入一个实用的函数 fetch() 用来简洁捕捉从网络上检索一个资源的意图。Fetch 规范 的API明确了用户代理获取资源的语义。它结合ServiceWorkers，尝试达到以下优化：
- 改善离线体验
- 保持可扩展性

而与`jQuery`相比， `fetch` 方法与 `jQuery.ajax()` 的主要区别在于：
- `fetch()`方法返回的Promise对象并不会在HTTP状态码为`404`或者`500`的时候自动抛出异常，而需要用户进行手动处理
- 默认情况下，fetch并不会发送任何的本地的cookie到服务端，注意，如果服务端依靠Session进行用户控制的话要默认开启Cookie

## Installation & Polyfill
window.fetch是基于XMLHttpRequest的浏览器的统一的封装，针对老的浏览器可以使用Github的这个[polypill](https://github.com/github/fetch)。fetch基于ES6的Promise，在旧的浏览器中首先需要引入Promise的polypill，可以用这个:
``` 
$ bower install es6-promise
```
对于fetch的引入，可以用bower或者npm：
``` 
$ bower install fetch
$ npm install whatwg-fetch --save
```
如果是基于Webpack的项目，可以直接在Webpack的config文件中引入这种polyfill：
``` javascript
plugins: [
  new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  })
]
```
这个插件的配置主要依靠[`imports-loader`](https://github.com/webpack/imports-loader)与[`exports-loader`](https://github.com/webpack/exports-loader)，因此也需要导入它们：
``` 
$ npm i imports-loader exports-loader -S
```
如果感觉这种方式比较麻烦，也可以使用 [**isomorphic-fetch**](https://github.com/matthew-andrews/isomorphic-fetch)：
``` 
npm install --save isomorphic-fetch es6-promise
bower install --save isomorphic-fetch es6-promise
```
使用的时候也非常方便：
``` 
require('es6-promise').polyfill();
require('isomorphic-fetch');
fetch('//offline-news-api.herokuapp.com/stories')
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(stories) {
        console.log(stories);
    });
```
从笔者自己的体验中，还是非常推荐使用isomorphic-fetch，其一大优势在于能够在node里直接进行单元测试与接口可用性测试。老实说笔者之前用Mocha进行带真实网络请求的测试时还是比较不方便的，往往需要在浏览器或者phatomjs中进行，并且需要额外的HTML代码。而在笔者的[model.test.js](https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/blob/master/src/model/model.test.js)文件中，只需要直接使用`babel-node model.test.js `即可以获取真实的网络请求，这样可以将网络测试部分与UI相剥离。

### Basic Usage:基本使用
假设`fetch`已经被挂载到了全局的window目录下。
```
// Simple response handling
fetch('/some/url').then(function(response) {

}).catch(function(err) {
    // Error :(
});
// Chaining for more "advanced" handling
fetch('/some/url').then(function(response) {
    return //...
}).then(function(returnedValue) {
    // ...
}).catch(function(err) {
    // Error :(
});
```
## Request:请求构造
Request对象代表了一次`fetch`请求中的请求体部分，你可以自定义`Request`对象:
A `Request` instance represents the request piece of a `fetch` call. By passing`fetch` a `Request` you can make advanced and customized requests:

- `method` - 使用的HTTP动词，`GET`, `POST`, `PUT`, `DELETE`, `HEAD`
- `url` - 请求地址，URL of the request
- `headers` - 关联的Header对象
- `referrer` - referrer 
- `mode` - 请求的模式，主要用于跨域设置，`cors`, `no-cors`, `same-origin`
- `credentials` - 是否发送Cookie `omit`, `same-origin`
- `redirect` - 收到重定向请求之后的操作，`follow`, `error`, `manual`
- `integrity` - 完整性校验
- `cache` - 缓存模式(`default`, `reload`, `no-cache`)

```
var request = new Request('/users.json', {
    method: 'POST', 
    mode: 'cors', 
    redirect: 'follow',
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
});

// Now use it!
fetch(request).then(function() { /* handle response */ });
```
```
fetch('/users.json', {
    method: 'POST', 
    mode: 'cors', 
    redirect: 'follow',
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
}).then(function() { /* handle response */ });
```

### URI Encode
注意，fetch方法是自动会将URI中的双引号进行编码的，如果在URI中存入了部分JSON，有时候会出现意想不到的问题，譬如我们以GET方法访问如下的URI：
```
[GET] http://api.com?requestData={"p":"q"}
```
那么fetch会自动将双引号编码，变成：
```
[GET] http://api.com?requestData={%22p%22:%22q%22}
```
那么这样一个请求传入到Spring MVC中时是会引发错误的，即URI对象构造失败这个很恶心的错误。笔者没有看过源代码，不过猜想会不会是Spring MVC看到`{`这个字符没有被编码，因此默认没有进行解码，结果没想到后面的双引号被编码了，为了避免这个无厘头的错误，笔者建议是对URI的Query Parameter部分进行统一的URI编码：
```
//将requestData序列化为JSON
var requestDataString = encodeURIComponent(JSON.stringify(requestData).replace(/%22/g, "\""));
//将字符串链接
const packagedRequestURL = `${Model.BASE_URL}${path}?requestData=${requestDataString}&action=${action}`;
```

### Headers:自定义请求头
```
// Create an empty Headers instance
var headers = new Headers();

// Add a few headers
headers.append('Content-Type', 'text/plain');
headers.append('X-My-Custom-Header', 'CustomValue');

// Check, get, and set header values
headers.has('Content-Type'); // true
headers.get('Content-Type'); // "text/plain"
headers.set('Content-Type', 'application/json');

// Delete a header
headers.delete('X-My-Custom-Header');

// Add initial values
var headers = new Headers({
'Content-Type': 'text/plain',
'X-My-Custom-Header': 'CustomValue'
});
```
常见的请求方法有： `append`, `has`, `get`, `set`以及 `delete`
```
var request = new Request('/some-url', {
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
});

fetch(request).then(function() { /* handle response */ });
```

### POST & body:POST请求
```
fetch('/users', {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
  })
})
```
### File Upload:文件上传
``` 
var input = document.querySelector('input[type="file"]')

var data = new FormData()
data.append('file', input.files[0])
data.append('user', 'hubot')

fetch('/avatars', {
  method: 'post',
  body: data
})
```
### Cookies
如果需要设置`fetch`自动地发送本地的Cookie，需要将credentials设置为`same-origin`:
``` 
fetch('/users', {
  credentials: 'same-origin'
})
```
该选项会以类似于XMLHttpRequest的方式来处理Cookie，否则，可能因为没有发送Cookie而导致基于Session的认证出错。可以将`credentials`的值设置为`include`来在CORS情况下发送请求。
``` 
fetch('https://example.com:1234/users', {
  credentials: 'include'
})
```
另外需要注意的是，根据[附带凭证信息的请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E9%99%84%E5%B8%A6%E5%87%AD%E8%AF%81%E4%BF%A1%E6%81%AF%E7%9A%84%E8%AF%B7%E6%B1%82)这里描述的，当你为了配置在CORS请求中附带Cookie等信息时，来自于服务器的响应中的Access-Control-Allow-Origin不可以再被设置为 * ，必须设置为某个具体的域名,则响应会失败。


## Response:响应处理
在`fetch`的`then`函数中提供了一个`Response`对象，即代表着对于服务端返回值的封装，你也可以在Mock的时候自定义Response对象，譬如在你需要使用Service Workers的情况下，在`Response`中，你可以作如下配置:

- `type` - `basic`, `cors`
- `url`
- `useFinalURL` - 是否为最终地址
- `status` - 状态码 (ex: `200`, `404`, etc.)
- `ok` - 是否成功响应 (status in the range 200-299)
- `statusText` - status code (ex: `OK`)
- `headers` - 响应头

```
// Create your own response for service worker testing
// new Response(BODY, OPTIONS)
var response = new Response('.....', {
ok: false,
status: 404,
url: '/'
});

// The fetch's `then` gets a Response instance back
fetch('/')
.then(function(responseObj) {
console.log('status: ', responseObj.status);
});
```
The `Response` also provides the following methods:

- `clone()` - Creates a clone of a Response object.
- `error()` - Returns a new Response object associated with a network error.
- `redirect()` - Creates a new response with a different URL.
- `arrayBuffer()` - Returns a promise that resolves with an ArrayBuffer.
- `blob()` - Returns a promise that resolves with a Blob.
- `formData()` - Returns a promise that resolves with a FormData object.
- `json()` - Returns a promise that resolves with a JSON object.
- `text()` - Returns a promise that resolves with a USVString (text).

### Handling HTTP error statuses:处理HTTP错误状态

``` 
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

fetch('/users')
  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    console.log('request succeeded with JSON response', data)
  }).catch(function(error) {
    console.log('request failed', error)
  })
```
### Handling JSON:处理JSON响应
```
fetch('https://davidwalsh.name/demo/arsenal.json').then(function(response) { 
// Convert to JSON
return response.json();
}).then(function(j) {
// Yay, `j` is a JavaScript object
console.log(j); 
});
```
### Handling Basic Text/HTML Response:处理文本响应
```
fetch('/next/page')
  .then(function(response) {
    return response.text();
  }).then(function(text) { 
  // <!DOCTYPE ....
  console.log(text); 
  });
```
### Blob Responses
如果你希望通过fetch方法来载入一些类似于图片等资源：
```
fetch('flowers.jpg')
    .then(function(response) {
       return response.blob();
    })
    .then(function(imageBlob) {
       document.querySelector('img').src = URL.createObjectURL(imageBlob);
});
```
`blob()`方法会接入一个响应流并且一直读入到结束。

## Transparent HTTP Proxy:透明HTTP代理
在上面的介绍中会发现，fetch并没有在客户端实现Cancelable Request的功能，或者超时自动放弃功能，因此这一步骤往往是需要在代理层完成。笔者在自己的工作中还遇到另一个请求，就是需要在客户端抓取其他没有设置CORS响应或者JSONP响应的站点，而必须要进行中间代理层抓取。笔者为了尽可能小地影响逻辑层代码，因此在自己的封装中封装了如下方法:
```
/**
 * @function 通过透明路由,利用get方法与封装好的QueryParams形式发起请求
 * @param BASE_URL 请求根URL地址,注意,需要添加http://以及末尾的/,譬如`http://api.com/`
 * @param path 请求路径,譬如"path1/path2"
 * @param queryParams 请求的查询参数
 * @param contentType 请求返回的数据格式
 * @param proxyUrl 请求的路由地址
 */
getWithQueryParamsByProxy({BASE_URL=Model.BASE_URL, path="/", queryParams={}, contentType="json", proxyUrl="http://api.proxy.com"}) {

    //初始化查询字符串,将BASE_URL以及path进行编码
    let queryString = `BASE_URL=${encodeURIComponent(BASE_URL)}&path=${encodeURIComponent(path)}&`;

    //根据queryParams构造查询字符串
    for (let key in queryParams) {

        //拼接查询字符串
        queryString += `${key}=${encodeURIComponent(queryParams[key])}&`;

    }

    //将查询字符串进行编码
    let encodedQueryString = (queryString);

    //封装最终待请求的字符串
    const packagedRequestURL = `${proxyUrl}?${encodedQueryString}action=GET`;

    //以CORS方式发起请求
    return this._fetchWithCORS(packagedRequestURL, contentType);

}
```
另外自带缓存的透明代理层的配置为，代码存放于[Github仓库](https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/blob/master/src/model/server.js):
```
/**
 * Created by apple on 16/7/26.
 */
var express = require('express');
var cors = require('cors');

import Model from "../model/model";
import ServerCache from "./server_cache";

//创建服务端缓存实例
const serverCache = new ServerCache();

/**
 * @region 全局配置
 * @type {string}
 */
const hashKey = "ggzy"; //缓存的Hash值
const timeOut = 5; //设置超时时间,5秒
/**
 * @endregion 全局配置
 */

//添加跨域支持
var app = express(cors());

//默认的GET类型的透明路由
app.get('/get_proxy', cors(), (req, res)=> {

    //所有查询参数是以GET方式传入
    //获取原地址
    let BASE_URL = decodeURIComponent(req.query.BASE_URL);

    //获取原路径
    let path = decodeURIComponent(req.query.path);

    //反序列化请求参数集合
    let params = {};

    //构造生成的全部的字符串
    let url = "";

    //遍历所有传入的参数集合
    for (let key in req.query) {

        if (key == "BASE_URL" || key == "path") {
            //对于传入的根URL与路径直接忽略,
            //封装其他参数
            continue;
        } else {
            params[key] = decodeURIComponent(req.query[key]);
        }

        url += `${key}${req.query[key]}`;

    }

    //判断缓存中是否存在值
    serverCache.get(hashKey, url).then((data)=> {

        //如果存在数据
        res.set('Access-Control-Allow-Origin', '*');
        res.send(data);
        res.end();

    }).catch((error)=> {

        //如果不存在数据,执行数据抓取
        //发起GET形式的请求
        const model = new Model();

        //判断是否已经返回
        let isSent = false;

        //使用模型类发起请求,并且不进行解码直接返回
        model.getWithQueryParams({
            BASE_URL,
            path,
            params,
            contentType: "text" //不进行解码,直接返回
        }).then((data)=> {

            if (isSent) {
                //如果已经设置了超时返回,则直接返回
                return;
            }
            //返回抓取到的数据
            res.set('Access-Control-Allow-Origin', '*');
            res.send(data);
            res.end();

            isSent = true;

        }, (error)=> {

            if (isSent) {
                //如果已经设置了超时返回,则直接返回
                return;
            }

            //如果直接抓取失败,则返回无效信息
            res.send(JSON.stringify({
                "message": "Invalid Request"
            }));

            isSent = true;

            throw error;

        });

        //设置秒超时返回N
        setTimeout(
            ()=> {

                if (isSent) {
                    //如果已经设置了超时返回,则直接返回
                    return;
                }

                //设置返回超时
                res.status(504);
                
                //终止本次返回
                res.end();

                isSent = true;

            },
            1000 * timeOut
        );

    });


});

//设置POST类型的默认路由

//默认的返回值
app.get('/', function (req, res) {
    res.send('Hello World!');
    res.end();

});

//启动服务器
var server = app.listen(399, '0.0.0.0', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
```
笔者在这里是使用Redis作为缓存:
```
/**
 * Created by apple on 16/8/4.
 */
var redis = require("redis");

export default class ServerCache {

    /**
     * @function 默认构造函数
     */
    constructor() {

        //构造出Redis客户端
        this.client = redis.createClient();

        //监听Redis客户端创建错误
        this.client.on("error", (err) => {
            this.client = null;
            // console.log("Redis Client Error " + err);
        });
    }

    /**
     * @function 从缓存中获取数据
     * @param hashKey
     * @param url
     * @returns {Promise}
     */
    get(hashKey = "hashKey", url = "url") {

        return new Promise((resolve, reject)=> {

            if (!!this.client) {
                //从Redis中获取数据
                this.client.hget(hashKey, url, function (err, replies) {

                    //如果存在数据
                    if (!!replies) {
                        resolve(replies);
                    } else {
                        reject(err);
                    }

                });
            } else {
                reject(new Error("Invalid Client"));
            }


        });

    }


    /**
     * @function 默认将数据放置到缓存中
     * @param hashKey 存入的键
     * @param url 存入的域URL
     * @param data 存入的数据
     * @param expire 第一次存入时候的过期时间
     * @result 如果设置失败,则返回null
     */
    put(hashKey = "hashKey", url = "url", data = "data", expire = 60 * 60 * 6 * 1000) {

        //判断客户端是否有效
        if (!this.client) {
            //如果客户端无效,直接返回null
            return null;
        }

        //第一次设置的时候判断ggzy是否存在,如果不存在则设置初始值
        this.client.hlen(hashKey, function (err, replies) {

            //获取键值长度,第一次获取时候长度为0
            if (replies == 0) {

                //12小时之后删除数据
                client.expire(hashKey, expire);
            }

        });

        //设置数据
        client.hset(hashKey, url, data);

    }

}
```
注意，笔者在这里使用的是isomorphic-fetch，因此在服务端与客户端的底层请求上可以复用同一份代码，测试代码如下，直接使用`babel-node model.test.js`即可:
```
/**
 * Created by apple on 16/7/21.
 */

import Model from "./model";

const model = new Model();

//正常的发起请求
model
    .getWithQueryParams({
        BASE_URL: "http://ggzy.njzwfw.gov.cn/njggzy/jsgc/",
        path: "001001/001001001/001001001001/",
        queryParams: {
            Paging: 100
        },
        contentType: "text"

    })
    .then(
        (data)=> {
            console.log(data);
        }
    )
    .catch((error)=> {
        console.log(error);
    });

//使用透明路由发起请求
model
    .getWithQueryParamsByProxy({
        BASE_URL: "http://ggzy.njzwfw.gov.cn/njggzy/jsgc/",
        path: "001001/001001001/001001001001/",
        queryParams: {
            Paging: 100
        },
        contentType: "text",
        proxyUrl: "http://153.3.251.190:11399/"

    })
    .then(
        (data)=> {
            console.log(data);
        }
    )
    .catch((error)=> {
        console.log(error);
    });
```



## Best Practice
笔者在自己的项目中封装了一个基于ES6 Class的基本的模型请求类，[代码地址](https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/blob/master/src/model/model.js)。
```

/**
 * Created by apple on 16/5/3.
 */
//自动进行全局的ES6 Promise的Polyfill
require('es6-promise').polyfill();
require('isomorphic-fetch');
// import "whatwg-fetch";


/**
 * @function 基础的模型类,包含了基本的URL定义
 */
export default class Model {


    //默认的基本URL路径
    static BASE_URL = "/";

    //默认的请求头
    static headers = {
        "Origin": "*", //默认允许加载所有域的信息,
    };

    /**
     * @function 默认构造函数
     */
    constructor() {

        this._checkStatus = this._checkStatus.bind(this);

        this._parseJSON = this._parseJSON.bind(this);

        this._parseText = this._parseText.bind(this);

        this._fetchWithCORS = this._fetchWithCORS.bind(this);


    }

    /**
     * @function 检测返回值的状态
     * @param response
     * @returns {*}
     */
    _checkStatus(response) {

        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }

    /**
     * @function 解析返回值中的Response为JSON形式
     * @param response
     * @returns {*}
     */
    _parseJSON(response) {

        if (!!response) {

            return response.json();
        }
        else {
            return undefined;
        }

    }

    /**
     * @function 解析TEXT性质的返回
     * @param response
     * @returns {*}
     */
    _parseText(response) {


        if (!!response) {

            return response.text();
        }
        else {
            return undefined;
        }

    }

    /**
     * @function 封装好的跨域请求的方法
     * @param packagedRequestURL
     * @returns {*|Promise.<TResult>}
     * @private
     */
    _fetchWithCORS(packagedRequestURL, contentType) {

        //HTTP请求头
        let httpHeaders = new Headers();

        //遍历所有的当前请求头
        for (let key in Model.headers) {
            httpHeaders.append(key, Model.headers[key]);
        }

        return fetch(packagedRequestURL, {
            mode: "cors", headers: httpHeaders
        })
            .then(this.checkStatus, (error)=> {
                throw error;
            })
            .then(contentType === "json" ? this._parseJSON : this._parseText, (error)=> {
                throw error;
            });


    }

    /**
     * @function 利用get方法发起请求
     * @param path 请求的路径(包括路径参数)
     * @param requestData 请求的参数
     * @param contentType 返回的类型
     * @returns {Promise.<TResult>|*} Promise.then((data)=>{},(error)=>{});
     */
    get({BASE_URL=Model.BASE_URL, path="/", contentType="json"}) {

        //封装最终待请求的字符串
        const packagedRequestURL = `${BASE_URL}${(path)}?action=GET`;

        //以CORS方式发起请求
        return this._fetchWithCORS(packagedRequestURL, contentType);

    }

    /**
     * @function 利用get方法与封装好的QueryParams形式发起请求
     * @param path 请求的路径(包括路径参数)
     * @param requestData 请求的参数
     * @returns {Promise.<TResult>|*} Promise.then((data)=>{},(error)=>{});
     */
    getWithQueryParams({BASE_URL=Model.BASE_URL, path="/", queryParams={}, contentType="json"}) {


        //初始化查询字符串
        let queryString = "";

        //根据queryParams构造查询字符串
        for (let key in queryParams) {

            //拼接查询字符串
            queryString += `${key}=${encodeURIComponent(queryParams[key])}&`;

        }

        //将查询字符串进行编码
        let encodedQueryString = (queryString);

        //封装最终待请求的字符串
        const packagedRequestURL = `${BASE_URL}${path}?${encodedQueryString}action=GET`;

        console.log(packagedRequestURL);

        //以CORS方式发起请求
        return this._fetchWithCORS(packagedRequestURL, contentType);

    }

    /**
     * @function 通过透明路由,利用get方法与封装好的QueryParams形式发起请求
     * @param BASE_URL 请求根URL地址,注意,需要添加http://以及末尾的/,譬如`http://api.com/`
     * @param path 请求路径,譬如"path1/path2"
     * @param queryParams 请求的查询参数
     * @param contentType 请求返回的数据格式
     * @param proxyUrl 请求的路由地址
     */
    getWithQueryParamsByProxy({BASE_URL=Model.BASE_URL, path="/", queryParams={}, contentType="json", proxyUrl="http://api.proxy.com"}) {

        //初始化查询字符串,将BASE_URL以及path进行编码
        let queryString = `BASE_URL=${encodeURIComponent(BASE_URL)}&path=${encodeURIComponent(path)}&`;

        //根据queryParams构造查询字符串
        for (let key in queryParams) {

            //拼接查询字符串
            queryString += `${key}=${encodeURIComponent(queryParams[key])}&`;

        }

        //将查询字符串进行编码
        let encodedQueryString = (queryString);

        //封装最终待请求的字符串
        const packagedRequestURL = `${proxyUrl}?${encodedQueryString}action=GET`;

        //以CORS方式发起请求
        return this._fetchWithCORS(packagedRequestURL, contentType);

    }

    /**
     * @function 以url-form-encoded方式发起请求
     * @param path
     * @param queryParams
     * @param contentType
     */
    post({path="/", queryParams={}, contentType="json"}) {

    }

    postWithJSONBody({path="/", queryParams={}, contentType="json"}) {

    }

}


Model.testData = {};

Model.testData.error = {};

```




![](http://153.3.251.190:11900/dom-network-httpclient)


