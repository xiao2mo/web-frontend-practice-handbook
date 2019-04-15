# Fetch

JavaScript 通过 XMLHttpRequest(XHR)来执行异步请求，这个方式已经存在了很长一段时间。虽说它很有用，但它不是最佳 API。它在设计上不符合职责分离原则，将输入、输出和用事件来跟踪的状态混杂在一个对象里。而且，基于事件的模型与最近 JavaScript 流行的 Promise 以及基于生成器的异步编程模型不太搭。新的 Fetch API 打算修正上面提到的那些缺陷。 它向 JS 中引入和 HTTP 协议中同样的原语。具体而言，它引入一个实用的函数 fetch() 用来简洁捕捉从网络上检索一个资源的意图。Fetch 规范 的 API 明确了用户代理获取资源的语义。它结合 ServiceWorkers，尝试达到以下优化：

- 改善离线体验
- 保持可扩展性

而与 `jQuery` 相比，`fetch` 方法与 `jQuery.ajax()` 的主要区别在于：

- `fetch()`方法返回的 Promise 对象并不会在 HTTP 状态码为`404`或者`500`的时候自动抛出异常，而需要用户进行手动处理
- 默认情况下，fetch 并不会发送任何的本地的 cookie 到服务端，注意，如果服务端依靠 Session 进行用户控制的话要默认开启 Cookie

# 请求构建

假设 `fetch` 已经被挂载到了全局的 window 目录下。

```js
// Simple response handling
fetch('/some/url')
  .then(function(response) {})
  .catch(function(err) {
    // Error :(
  });
// Chaining for more "advanced" handling
fetch('/some/url')
  .then(function(response) {
    return; //...
  })
  .then(function(returnedValue) {
    // ...
  })
  .catch(function(err) {
    // Error :(
  });
```

## Request:请求构造

Request 对象代表了一次`fetch`请求中的请求体部分，你可以自定义`Request`对象:
A `Request` instance represents the request piece of a `fetch` call. By passing`fetch` a `Request` you can make advanced and customized requests:

- `method` - 使用的 HTTP 动词，`GET`, `POST`, `PUT`, `DELETE`, `HEAD`
- `url` - 请求地址，URL of the request
- `headers` - 关联的 Header 对象
- `referrer` - referrer
- `mode` - 请求的模式，主要用于跨域设置，`cors`, `no-cors`, `same-origin`
- `credentials` - 是否发送 Cookie `omit`, `same-origin`
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

## URI Encode

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

## Headers:自定义请求头

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

## POST & body:POST 请求

```js
fetch('/users', {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot'
  })
});
```

## Cookies

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

# Response | 响应处理

在`fetch`的`then`函数中提供了一个`Response`对象，即代表着对于服务端返回值的封装，你也可以在 Mock 的时候自定义 Response 对象，譬如在你需要使用 Service Workers 的情况下，在`Response`中，你可以作如下配置:

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

### Handling HTTP error statuses:处理 HTTP 错误状态

```js
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

fetch('/users')
  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    console.log('request succeeded with JSON response', data);
  })
  .catch(function(error) {
    console.log('request failed', error);
  });
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

在上面的介绍中会发现，fetch 并没有在客户端实现 Cancelable Request 的功能，或者超时自动放弃功能，因此这一步骤往往是需要在代理层完成。笔者在自己的工作中还遇到另一个请求，就是需要在客户端抓取其他没有设置 CORS 响应或者 JSONP 响应的站点，而必须要进行中间代理层抓取。笔者为了尽可能小地影响逻辑层代码，因此在自己的封装中封装了如下方法:

```js
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
