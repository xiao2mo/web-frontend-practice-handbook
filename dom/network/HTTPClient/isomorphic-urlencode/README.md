# Isomorphic Urlencode

> [Here is English Version For README]()

Main motivation for building this Repo is that:
- Enable GBK Encoding by Pure Client-Side JavaScript
- Guarantee isomorphic and seamless migration between test in node and production in browser for fetch

# Usage

The Node implementation is based on [node-urlencode](https://www.npmjs.com/package/urlencode)，so api style is as same as node-urlencode. But the encode in browser is async,so i use Promise as return;

use npm to install:
```
npm install --save isomorphic-urlencode
```

如果你是在浏览器环境中使用,请在HTML文件头部添加:
```
if (parent._urlEncode_iframe_callback) {

    parent._urlEncode_iframe_callback(location.search.split('=')[1]);

    //直接关闭当前子窗口
    window.close();
}
```
注意,上面一段代码是将自身作为iframe的加载地址,因此务必放在HTML文件首部。然后在JS代码中使用:
```
var urlencode = require("isomorphic-urlencode");

urlencode("王下邀月熊").then(function (data) {
  console.log(data);
});

urlencode("王下邀月熊", "gbk").then(function (data) {
  console.log(data);
});

```

The Browser Version is built on iframe and form, you can refer to this [blog]() for more details;


# Test
使用`node node-urlencode.test.js`来测试Node环境下转码。
使用`webpack demo/demo.js demo/demo.dist.js`,然后在浏览器中打开`demo.html`,在Console中可以查看运行结果