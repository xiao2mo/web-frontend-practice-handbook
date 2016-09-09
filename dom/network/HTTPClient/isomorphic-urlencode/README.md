# Isomorphic Urlencode

> [Here is English Version For README](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/dom/network/HTTPClient/isomorphic-urlencode/README.en.md)

核心的出发点为
- 对于浏览器中版本使用纯粹的前端代码实现GBK编码
- 保证能够在Node与Browser环境下实现无缝对切

# Usage

Node版本使用了 [node-urlencode](https://www.npmjs.com/package/urlencode)，基本的接口风格类似于它,不过考虑到浏览器版本是异步返回,因此统一使用了Promise作为异步返回对象:

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


浏览器版本主要基于iframe与form实现,详细原理参考[这篇博客](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/dom/network/HTTPClient/DOM-URLEncode.md)

# Test
使用`node node-urlencode.test.js`来测试Node环境下转码。
使用`webpack demo/demo.js demo/demo.dist.js`,然后在浏览器中打开`demo.html`,在Console中可以查看运行结果