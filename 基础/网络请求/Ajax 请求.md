[![返回目录](https://parg.co/U0y)](https://parg.co/UHU)

# Web Ajax 请求与 XMLHttpRequest, fetch 详解

Ajax 的[官方定义](http://www.tutorialspoint.com/ajax/what_is_ajax.htm)为 Asynchronous JavaScript and XML，即是依赖于现有的 XML/CSS/HTML/JavaScript 来提供可交互性更好的网页应用的技术方案。Ajax 并不是新的技术规范，其中最核心的依赖可以认为就是 XMLHTTPRequest 对象，这个对象使得浏览器可以发出 HTTP 请求与接收 HTTP 响应。XMLHTTPRequest 由微软提出，经过 W3C 标准化定义，于 2008 年提出了 [XMLHttpRequest Level 2](http://dev.w3.org/2006/webapi/XMLHttpRequest-2/) 草案。该版本开始支持跨域请求，支持发送和接收二进制对象、formData 对象、进度判断、请求超时与放弃等特性。

You can use the Cache API with the request and response objects;can't override the content-type header of the response

You can perform no-cors requests, getting a response from a server that doesn't implement CORS. You can't access the response body directly from JavaScript, but you can use it with other APIs (e.g. the Cache API);

Streaming responses (with XHR the entire response is buffered in memory, with fetch you will be able to access the low-level stream). This isn't available yet in all browsers, but will be soon.

* 缺乏超时放弃、进度监控等功能，不过可以通过 [x-fetch](https://parg.co/UL5) 等第三方库，利用 Promise 的特性实现类似功能。

# XMLHttpRequest

## 基础使用

XMLHttpRequest 对象的 HTTP 和 HTTPS 请求必须通过 open 方法初始化。这个方法必须在实际发送请求之前调用，以用来验证请求方法，URL 以及用户信息。这个方法不能确保 URL 存在或者用户信息必须正确。初始化请求可以接受 5 个参数：

```js
open(
     method, // 请求的方式，如 GET/POST/HEADER 等，这个参数不区分大小写
     url // 请求的地址，可以是相对地址或者绝对地址
     [, async = true // 默认值为true，即为异步请求，若async=false，则为同步请求
     [, username = null // Basic 认证的用户名密码
     [, password = null]]]
);
```

值得一提的是，第三个参数 async 用于标识是否为异步请求，如果为同步请求的话则会默认阻塞直至消息返回；并且其还有如下限制：xhr.timeout 必须为 0，xhr.withCredentials 必须为 false，xhr.responseType 必须为""。在现代 Web 应用开发中我们应该避免以同步方式发起请求，以防止页面阻塞而出现停滞。

```js
var xhr = new XMLHttpRequest();
xhr.timeout = 3000;
xhr.ontimeout = function(event) {
  alert('请求超时！');
};
var formData = new FormData();
formData.append('tel', '18217767969');
formData.append('psw', '111111');
xhr.open('POST', 'http://www.test.com:8000/login');
xhr.send(formData);

// 如果是同步请求，则不需要监听事件
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    alert(xhr.responseText);
  } else {
    alert(xhr.statusText);
  }
};
```

对于部分老版本浏览器，我们还需要考虑兼容性问题，即判断是否存在 XMLHTTPRequest 对象：

```js
// Just getting XHR is a mess!
if (window.XMLHttpRequest) {
  // Mozilla, Safari, ...
  request = new XMLHttpRequest();
} else if (window.ActiveXObject) {
  // IE
  try {
    request = new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e) {
    try {
      request = new ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {}
  }
}

// Open, send.
request.open('GET', 'https://davidwalsh.name/ajax-endpoint', true);
request.send(null);
```

下表列举了 XMLHTTPRequest 的关键属性，我们也会在接下来的章节中针对不同的业务场景对属性进行深入解读。

| 属性                 | 类型                         | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onreadystatechange` | `Function?`                  | 一个 JavaScript 函数对象，当 readyState 属性改变时会调用它。回调函数会在 user interface 线程中调用。**警告:** 不能在本地代码中使用. 也不应该在同步模式的请求中使用.                                                                                                                                                                                                                                                                                                     |
| `readyState`         | `unsigned short`             | 请求的五种状态值状态描述` 0``UNSENT `(未打开)`open()`方法还未被调用.` 1``OPENED ` (未发送)`send()`方法还未被调用.` 2``HEADERS_RECEIVED (已获取响应头)``send() `方法已经被调用, 响应头和响应状态已经返回.` 3``LOADING (正在下载响应体) `响应体下载中;`responseText`中已经获取了部分数据.` 4``DONE (请求完成) `整个请求过程已经完毕.                                                                                                                                      |
| `response`           | varies                       | 响应实体的类型由 `responseType 来指定，` 可以是 `ArrayBuffer，` `Blob，` [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)， JavaScript 对象 (即 "json")， 或者是字符串。如果请求未完成或失败，则该值为 `null。`                                                                                                                                                                                                                                  |
| `responseText`       | `DOMString`                  | 此次请求的响应为文本，或是当请求未成功或还未发送时为 `null。`**只读。**                                                                                                                                                                                                                                                                                                                                                                                                 |
| `responseType`       | `XMLHttpRequestResponseType` | 设置该值能够改变响应类型。就是告诉服务器你期望的响应格式。ValueData type of `response`property`""` (空字符串)字符串(默认值)`"arraybuffer"`[`ArrayBuffer`](https://developer.mozilla.org/zh-cn/JavaScript_typed_arrays/ArrayBuffer)`"blob"`[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)`"document"`[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)`"json"`JavaScript 对象，解析自服务器传递回来的 JSON 字符串。`"text"`字符串 |
| `responseXML`        | `Document?`                  | 本次请求的响应是一个 `Document` 对象，如果是以下情况则值为 `null：`请求未成功，请求未发送，或响应无法被解析成 XML 或 HTML。当响应为 text/xml 流时会被解析。当 `responseType` 设置为"document"，并且请求为异步的，则响应会被当做 `text/html` 流来解析。**只读\*\***.\***\*注意:** 如果服务器不支持 `text/xml` Content-Type 头，你可以使用 ` overrideMimeType() 强制 ``XMLHttpRequest ` 将响应解析为 XML。                                                                |
| `status`             | `unsigned short`             | 该请求的响应状态码 (例如, `状态码`200 表示一个成功的请求).**只读.**                                                                                                                                                                                                                                                                                                                                                                                                     |
| `statusText`         | `DOMString`                  | 该请求的响应状态信息,包含一个状态码和原因短语 (例如 "`200 OK`"). **只读\*\***.\*\*                                                                                                                                                                                                                                                                                                                                                                                      |
| `upload`             | `XMLHttpRequestUpload`       | 可以在 `upload 上添加一个事件监听来跟踪上传过程。`                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `withCredentials`    | `boolean`                    | 表明在进行跨站(cross-site)的访问控制(Access-Control)请求时，是否使用认证信息(例如 cookie 或授权的 header)。 默认为 `false。`**注意:** 这不会影响同站(same-site)请求.                                                                                                                                                                                                                                                                                                    |

## 路径与参数

```js
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// 使用方式如下
// query string: ?foo=lorem&bar=&baz
var foo = getParameterByName('foo'); // "lorem"
var bar = getParameterByName('bar'); // "" (present with empty value)
var baz = getParameterByName('baz'); // "" (present with no value)
var qux = getParameterByName('qux'); // null (absent)
```

## 请求与响应

## 状态监控与控制

# Fetch

> * [JavaScript Fetch API](http://www.tuicool.com/articles/QZBJ7zJ)
> * [fetch API](https://davidwalsh.name/fetch)

JavaScript 通过 XMLHttpRequest(XHR)来执行异步请求，这个方式已经存在了很长一段时间。虽说它很有用，但它不是最佳 API。它在设计上不符合职责分离原则，将输入、输出和用事件来跟踪的状态混杂在一个对象里。而且，基于事件的模型与最近 JavaScript 流行的 Promise 以及基于生成器的异步编程模型不太搭。新的 Fetch API 打算修正上面提到的那些缺陷。 它向 JS 中引入和 HTTP 协议中同样的原语。具体而言，它引入一个实用的函数 fetch() 用来简洁捕捉从网络上检索一个资源的意图。Fetch 规范 的 API 明确了用户代理获取资源的语义。它结合 ServiceWorkers，尝试达到以下优化：

* 改善离线体验
* 保持可扩展性

而与`jQuery`相比， `fetch` 方法与 `jQuery.ajax()` 的主要区别在于：

* `fetch()`方法返回的 Promise 对象并不会在 HTTP 状态码为`404`或者`500`的时候自动抛出异常，而需要用户进行手动处理
* 默认情况下，fetch 并不会发送任何的本地的 cookie 到服务端，注意，如果服务端依靠 Session 进行用户控制的话要默认开启 Cookie

## Installation & Polyfill

window.fetch 是基于 XMLHttpRequest 的浏览器的统一的封装，针对老的浏览器可以使用 Github 的这个[polypill](https://github.com/github/fetch)。fetch 基于 ES6 的 Promise，在旧的浏览器中首先需要引入 Promise 的 polypill，可以用这个:

```
$ bower install es6-promise
```

对于 fetch 的引入，可以用 bower 或者 npm：

```
$ bower install fetch
$ npm install whatwg-fetch --save
```

如果是基于 Webpack 的项目，可以直接在 Webpack 的 config 文件中引入这种 polyfill：

```javascript
plugins: [
  new webpack.ProvidePlugin({
    fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  })
];
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

从笔者自己的体验中，还是非常推荐使用 isomorphic-fetch，其一大优势在于能够在 node 里直接进行单元测试与接口可用性测试。老实说笔者之前用 Mocha 进行带真实网络请求的测试时还是比较不方便的，往往需要在浏览器或者 phatomjs 中进行，并且需要额外的 HTML 代码。而在笔者的[model.test.js](https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/blob/master/src/model/model.test.js)文件中，只需要直接使用`babel-node model.test.js`即可以获取真实的网络请求，这样可以将网络测试部分与 UI 相剥离。

### Basic Usage:基本使用

假设`fetch`已经被挂载到了全局的 window 目录下。

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

Request 对象代表了一次`fetch`请求中的请求体部分，你可以自定义`Request`对象:
A `Request` instance represents the request piece of a `fetch` call. By passing`fetch` a `Request` you can make advanced and customized requests:

* `method` - 使用的 HTTP 动词，`GET`, `POST`, `PUT`, `DELETE`, `HEAD`
* `url` - 请求地址，URL of the request
* `headers` - 关联的 Header 对象
* `referrer` - referrer
* `mode` - 请求的模式，主要用于跨域设置，`cors`, `no-cors`, `same-origin`
* `credentials` - 是否发送 Cookie `omit`, `same-origin`
* `redirect` - 收到重定向请求之后的操作，`follow`, `error`, `manual`
* `integrity` - 完整性校验
* `cache` - 缓存模式(`default`, `reload`, `no-cache`)

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

注意，fetch 方法是自动会将 URI 中的双引号进行编码的，如果在 URI 中存入了部分 JSON，有时候会出现意想不到的问题，譬如我们以 GET 方法访问如下的 URI：

```
[GET] http://api.com?requestData={"p":"q"}
```

那么 fetch 会自动将双引号编码，变成：

```
[GET] http://api.com?requestData={%22p%22:%22q%22}
```

那么这样一个请求传入到 Spring MVC 中时是会引发错误的，即 URI 对象构造失败这个很恶心的错误。笔者没有看过源代码，不过猜想会不会是 Spring MVC 看到`{`这个字符没有被编码，因此默认没有进行解码，结果没想到后面的双引号被编码了，为了避免这个无厘头的错误，笔者建议是对 URI 的 Query Parameter 部分进行统一的 URI 编码：

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

常见的请求方法有: `append`, `has`, `get`, `set`以及 `delete`

```
var request = new Request('/some-url', {
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
});

fetch(request).then(function() { /* handle response */ });
```

### POST & body:POST 请求

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

如果需要设置`fetch`自动地发送本地的 Cookie，需要将 credentials 设置为`same-origin`:

```
fetch('/users', {
  credentials: 'same-origin'
})
```

该选项会以类似于 XMLHttpRequest 的方式来处理 Cookie，否则，可能因为没有发送 Cookie 而导致基于 Session 的认证出错。可以将`credentials`的值设置为`include`来在 CORS 情况下发送请求。

```
fetch('https://example.com:1234/users', {
  credentials: 'include'
})
```

另外需要注意的是，根据[附带凭证信息的请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E9%99%84%E5%B8%A6%E5%87%AD%E8%AF%81%E4%BF%A1%E6%81%AF%E7%9A%84%E8%AF%B7%E6%B1%82)这里描述的，当你为了配置在 CORS 请求中附带 Cookie 等信息时，来自于服务器的响应中的 Access-Control-Allow-Origin 不可以再被设置为 \* ，必须设置为某个具体的域名,则响应会失败。

## Response:响应处理

在`fetch`的`then`函数中提供了一个`Response`对象，即代表着对于服务端返回值的封装，你也可以在 Mock 的时候自定义 Response 对象，譬如在你需要使用 Service Workers 的情况下，在`Response`中，你可以作如下配置:

* `type` - `basic`, `cors`
* `url`
* `useFinalURL` - 是否为最终地址
* `status` - 状态码 (ex: `200`, `404`, etc.)
* `ok` - 是否成功响应 (status in the range 200-299)
* `statusText` - status code (ex: `OK`)
* `headers` - 响应头

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

* `clone()` - Creates a clone of a Response object.
* `error()` - Returns a new Response object associated with a network error.
* `redirect()` - Creates a new response with a different URL.
* `arrayBuffer()` - Returns a promise that resolves with an ArrayBuffer.
* `blob()` - Returns a promise that resolves with a Blob.
* `formData()` - Returns a promise that resolves with a FormData object.
* `json()` - Returns a promise that resolves with a JSON object.
* `text()` - Returns a promise that resolves with a USVString (text).

### Handling HTTP error statuses:处理 HTTP 错误状态

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

### Handling JSON:处理 JSON 响应

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

如果你希望通过 fetch 方法来载入一些类似于图片等资源：

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

## Transparent HTTP Proxy:透明 HTTP 代理

在上面的介绍中会发现，fetch 并没有在客户端实现 Cancelable Request 的功能，或者超时自动放弃功能，因此这一步骤往往是需要在代理层完成。笔者在自己的工作中还遇到另一个请求，就是需要在客户端抓取其他没有设置 CORS 响应或者 JSONP 响应的站点，而必须要进行中间代理层抓取。笔者为了尽可能小地影响逻辑层代码，因此在自己的封装中封装了如下方法:

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

另外自带缓存的透明代理层的配置为，代码存放于[Github 仓库](https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/blob/master/src/model/server.js):

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

笔者在这里是使用 Redis 作为缓存:

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

注意，笔者在这里使用的是 isomorphic-fetch，因此在服务端与客户端的底层请求上可以复用同一份代码，测试代码如下，直接使用`babel-node model.test.js`即可:

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

笔者在自己的项目中封装了一个基于 ES6 Class 的基本的模型请求类，[代码地址](https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/blob/master/src/model/model.js)。

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

# Fluent Fetcher

```
var p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
])
p.then(response => console.log(response))
p.catch(error => console.log(error))
```

9

1function getParameterByName(name, url) {

2    if (!url) url = window.location.href;

3    name = name.replace(/[\[\]]/g, "\\$&");

4    var regex = new RegExp("[?&]" + name + "(=([^&#]\*)|&|#|$)"),

5        results = regex.exec(url);

6    if (!results) return null;

7    if (!results[2]) return '';

8    return decodeURIComponent(results[2].replace(/\+/g, " "));

9}

```

```

// query string: ?foo=lorem&bar=&baz
var foo = getParameterByName('foo'); // "lorem"
var bar = getParameterByName('bar'); // "" (present with empty value)
var baz = getParameterByName('baz'); // "" (present with no value)
var qux = getParameterByName('qux'); // null (absent)

1// query string: ?foo=lorem&bar=&baz

2var foo = getParameterByName('foo'); // "lorem"

3var bar = getParameterByName('bar'); // "" (present with empty value)

4var baz = getParameterByName('baz'); // "" (present with no value)

5var qux = getParameterByName('qux'); // null (absent)

```
# XMLHttpRequest

| 属性                   | 类型                           | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onreadystatechange`   | `Function?`                    | 一个 JavaScript 函数对象，当 readyState 属性改变时会调用它。回调函数会在 user interface 线程中调用。**警告:** 不能在本地代码中使用. 也不应该在同步模式的请求中使用.                                                                                                                                                                                                                                                                                                     |
| `readyState`           | `unsigned short`               | 请求的五种状态值状态描述` 0``UNSENT `(未打开)`open()`方法还未被调用.` 1``OPENED `  (未发送)`send()`方法还未被调用.` 2``HEADERS_RECEIVED (已获取响应头)``send() `方法已经被调用, 响应头和响应状态已经返回.` 3``LOADING (正在下载响应体) `响应体下载中;`responseText`中已经获取了部分数据.` 4``DONE (请求完成) `整个请求过程已经完毕.                                                                                                                                     |
| `response`             | varies                         | 响应实体的类型由 `responseType 来指定，` 可以是 `ArrayBuffer，` `Blob，` [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)， JavaScript 对象 (即 "json")， 或者是字符串。如果请求未完成或失败，则该值为 `null。`                                                                                                                                                                                                                                  |
| `responseText`         | `DOMString`                    | 此次请求的响应为文本，或是当请求未成功或还未发送时为 `null。`**只读。**                                                                                                                                                                                                                                                                                                                                                                                                 |
| `responseType`         | `XMLHttpRequestResponseType`   | 设置该值能够改变响应类型。就是告诉服务器你期望的响应格式。ValueData type of `response`property`""` (空字符串)字符串(默认值)`"arraybuffer"`[`ArrayBuffer`](https://developer.mozilla.org/zh-cn/JavaScript_typed_arrays/ArrayBuffer)`"blob"`[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)`"document"`[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)`"json"`JavaScript 对象，解析自服务器传递回来的 JSON 字符串。`"text"`字符串 |
| `responseXML`          | `Document?`                    | 本次请求的响应是一个 `Document` 对象，如果是以下情况则值为 `null：`请求未成功，请求未发送，或响应无法被解析成 XML 或 HTML。当响应为 text/xml 流时会被解析。当 `responseType` 设置为"document"，并且请求为异步的，则响应会被当做 `text/html` 流来解析。**只读\*\***.\***\*注意:** 如果服务器不支持 `text/xml` Content-Type 头，你可以使用 ` overrideMimeType() 强制 ``XMLHttpRequest ` 将响应解析为 XML。                                                                |
| `status`               | `unsigned short`               | 该请求的响应状态码 (例如, `状态码`200 表示一个成功的请求).**只读.**                                                                                                                                                                                                                                                                                                                                                                                                     |
| `statusText`           | `DOMString`                    | 该请求的响应状态信息,包含一个状态码和原因短语 (例如 "`200 OK`"). **只读\*\***.\*\*                                                                                                                                                                                                                                                                                                                                                                                      |
| `upload`               | `XMLHttpRequestUpload`         | 可以在 `upload 上添加一个事件监听来跟踪上传过程。`                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `withCredentials`      | `boolean`                      | 表明在进行跨站(cross-site)的访问控制(Access-Control)请求时，是否使用认证信息(例如 cookie 或授权的 header)。 默认为 `false。`**注意:** 这不会影响同站(same-site)请求.                                                                                                                                                                                                                                                                                                    |

在部分浏览器中不支持 XMLHttpRequest，因此需要做如下的检测：
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

//XmlHttpRequest 对象
    function createXmlHttpRequest(){
        if(window.ActiveXObject){ //如果是 IE 浏览器
            return new ActiveXObject("Microsoft.XMLHTTP");
        }else if(window.XMLHttpRequest){ //非 IE 浏览器
            return new XMLHttpRequest();
        }
    }

function onLogin(){
        userName = document.f1.username.value;
        passWord = document.f1.password.value;

var url = "LoginServlet?username="+userName+"&password="+passWord+"";

//1.创建 XMLHttpRequest 组建
        xmlHttpRequest = createXmlHttpRequest();

//2.设置回调函数
        xmlHttpRequest.onreadystatechange = zswFun;

//3.初始化 XMLHttpRequest 组建
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
# Fetch

>

* [JavaScript Fetch API](http://www.tuicool.com/articles/QZBJ7zJ)
  >
* [fetch API](https://davidwalsh.name/fetch)

JavaScript 通过 XMLHttpRequest(XHR)来执行异步请求，这个方式已经存在了很长一段时间。虽说它很有用，但它不是最佳 API。它在设计上不符合职责分离原则，将输入、输出和用事件来跟踪的状态混杂在一个对象里。而且，基于事件的模型与最近 JavaScript 流行的 Promise 以及基于生成器的异步编程模型不太搭。新的 Fetch API 打算修正上面提到的那些缺陷。 它向 JS 中引入和 HTTP 协议中同样的原语。具体而言，它引入一个实用的函数 fetch() 用来简洁捕捉从网络上检索一个资源的意图。Fetch 规范 的 API 明确了用户代理获取资源的语义。它结合 ServiceWorkers，尝试达到以下优化：

* 改善离线体验

* 保持可扩展性

而与`jQuery`相比， `fetch` 方法与  `jQuery.ajax()` 的主要区别在于：

* `fetch()`方法返回的 Promise 对象并不会在 HTTP 状态码为`404`或者`500`的时候自动抛出异常，而需要用户进行手动处理
* 默认情况下，fetch 并不会发送任何的本地的 cookie 到服务端，注意，如果服务端依靠 Session 进行用户控制的话要默认开启 Cookie

## Installation & Polyfill

window.fetch 是基于 XMLHttpRequest 的浏览器的统一的封装，针对老的浏览器可以使用 Github 的这个[polypill](https://github.com/github/fetch)。fetch 基于 ES6 的 Promise，在旧的浏览器中首先需要引入 Promise 的 polypill，可以用这个:
```

$ bower install es6-promise

```
对于 fetch 的引入，可以用 bower 或者 npm：
```

$ bower install fetch
$ npm install whatwg-fetch --save

````
如果是基于 Webpack 的项目，可以直接在 Webpack 的 config 文件中引入这种 polyfill：

``` javascript
plugins: [
  new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  })
]
````

这个插件的配置主要依靠[`imports-loader`](https://github.com/webpack/imports-loader)与[`exports-loader`](https://github.com/webpack/exports-loader)，因此也需要导入它们：

```
$ npm i imports-loader exports-loader -S
```

如果感觉这种方式比较麻烦，也可以使用  [**isomorphic-fetch**](https://github.com/matthew-andrews/isomorphic-fetch)：

```
npm install --save isomorphic-fetch es6-promise
bower install --save isomorphic-fetch es6-promise
```

使用的时候也非常方便：

```
require('es6-promise').polyfill();
require('isomorphic-fetch');
fetch('//offline-news-api.herokuapp.com/stories')
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(stories) {
        console.log(stories);
    });
```

从笔者自己的体验中，还是非常推荐使用 isomorphic-fetch，其一大优势在于能够在 node 里直接进行单元测试与接口可用性测试。老实说笔者之前用 Mocha 进行带真实网络请求的测试时还是比较不方便的，往往需要在浏览器或者 phatomjs 中进行，并且需要额外的 HTML 代码。而在笔者的[model.test.js](https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/blob/master/src/model/model.test.js)文件中，只需要直接使用`babel-node model.test.js`即可以获取真实的网络请求，这样可以将网络测试部分与 UI 相剥离。

### Basic Usage:基本使用

假设`fetch`已经被挂载到了全局的 window 目录下。

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

Request 对象代表了一次`fetch`请求中的请求体部分，你可以自定义`Request`对象:
A `Request` instance represents the request piece of a `fetch` call. By passing`fetch` a `Request` you can make advanced and customized requests:

* `method` - 使用的 HTTP 动词，`GET`, `POST`, `PUT`, `DELETE`, `HEAD`
* `url` - 请求地址，URL of the request
* `headers` - 关联的 Header 对象
* `referrer` - referrer
* `mode` - 请求的模式，主要用于跨域设置，`cors`, `no-cors`, `same-origin`
* `credentials` - 是否发送 Cookie `omit`, `same-origin`
* `redirect` - 收到重定向请求之后的操作，`follow`, `error`, `manual`
* `integrity` - 完整性校验
* `cache` - 缓存模式(`default`, `reload`, `no-cache`)

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

注意，fetch 方法是自动会将 URI 中的双引号进行编码的，如果在 URI 中存入了部分 JSON，有时候会出现意想不到的问题，譬如我们以 GET 方法访问如下的 URI：

```
[GET] http://api.com?requestData={"p":"q"}
```

那么 fetch 会自动将双引号编码，变成：

```
[GET] http://api.com?requestData={%22p%22:%22q%22}
```

那么这样一个请求传入到 Spring MVC 中时是会引发错误的，即 URI 对象构造失败这个很恶心的错误。笔者没有看过源代码，不过猜想会不会是 Spring MVC 看到`{`这个字符没有被编码，因此默认没有进行解码，结果没想到后面的双引号被编码了，为了避免这个无厘头的错误，笔者建议是对 URI 的 Query Parameter 部分进行统一的 URI 编码：

```
//将requestData序列化为JSON
var requestDataString = encodeURIComponent(JSON.stringify(requestData).replace(/%22/g, "\""));
//将字符串链接
const packagedRequestURL = `${Model.BASE_URL}${path}?requestData=${requestDataString}&action=${action}`;
```

### Headers:自定义请求头

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

常见的请求方法有： `append`, `has`, `get`, `set`以及 `delete`

```
var request = new Request('/some-url', {
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
});


fetch(request).then(function() { /* handle response */ });
```

### POST & body:POST 请求

```
fetch('/users', {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
  })
})
```

### File Upload:文件上传

```
var input = document.querySelector('input[type="file"]')

var data = new FormData()
data.append('file', input.files[0])
data.append('user', 'hubot')

fetch('/avatars', {
  method: 'post',
  body: data
})
```

### Cookies

如果需要设置`fetch`自动地发送本地的 Cookie，需要将 credentials 设置为`same-origin`:

```
fetch('/users', {
  credentials: 'same-origin'
})
```

该选项会以类似于 XMLHttpRequest 的方式来处理 Cookie，否则，可能因为没有发送 Cookie 而导致基于 Session 的认证出错。可以将`credentials`的值设置为`include`来在 CORS 情况下发送请求。

```
fetch('https://example.com:1234/users', {
  credentials: 'include'
})
```

另外需要注意的是，根据[附带凭证信息的请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E9%99%84%E5%B8%A6%E5%87%AD%E8%AF%81%E4%BF%A1%E6%81%AF%E7%9A%84%E8%AF%B7%E6%B1%82)这里描述的，当你为了配置在 CORS 请求中附带 Cookie 等信息时，来自于服务器的响应中的 Access-Control-Allow-Origin 不可以再被设置为 \* ，必须设置为某个具体的域名,则响应会失败。

## Response:响应处理

在`fetch`的`then`函数中提供了一个`Response`对象，即代表着对于服务端返回值的封装，你也可以在 Mock 的时候自定义 Response 对象，譬如在你需要使用 Service Workers 的情况下，在`Response`中，你可以作如下配置:

* `type` - `basic`, `cors`
* `url`
* `useFinalURL` - 是否为最终地址
* `status` - 状态码 (ex: `200`, `404`, etc.)
* `ok` - 是否成功响应 (status in the range 200-299)
* `statusText` - status code (ex: `OK`)
* `headers` - 响应头

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

* `clone()` - Creates a clone of a Response object.
* `error()` - Returns a new Response object associated with a network error.
* `redirect()` - Creates a new response with a different URL.
* `arrayBuffer()` - Returns a promise that resolves with an ArrayBuffer.
* `blob()` - Returns a promise that resolves with a Blob.
* `formData()` - Returns a promise that resolves with a FormData object.
* `json()` - Returns a promise that resolves with a JSON object.
* `text()` - Returns a promise that resolves with a USVString (text).

### Handling HTTP error statuses:处理 HTTP 错误状态

```
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

fetch('/users')
  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    console.log('request succeeded with JSON response', data)
  }).catch(function(error) {
    console.log('request failed', error)
  })
```

### Handling JSON:处理 JSON 响应

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

如果你希望通过 fetch 方法来载入一些类似于图片等资源：

```js
fetch('flowers.jpg')
  .then(function(response) {
    return response.blob();
  })
  .then(function(imageBlob) {
    document.querySelector('img').src = URL.createObjectURL(imageBlob);
  });
```

`blob()`方法会接入一个响应流并且一直读入到结束。

## Transparent HTTP Proxy:透明 HTTP 代理

在上面的介绍中会发现，fetch 并没有在客户端实现 Cancelable Request 的功能，或者超时自动放弃功能，因此这一步骤往往是需要在代理层完成。笔者在自己的工作中还遇到另一个请求，就是需要在客户端抓取其他没有设置 CORS 响应或者 JSONP 响应的站点，而必须要进行中间代理层抓取。笔者为了尽可能小地影响逻辑层代码，因此在自己的封装中封装了如下方法:

```/**
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
