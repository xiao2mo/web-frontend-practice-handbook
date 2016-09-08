# Isomorphic Urlencode

Main motivation for building this Repo is that:
- Enable GBK Encoding by Pure Client-Side JavaScript
- Guarantee isomorphic and seamless migration between test in node and production in browser for fetch

# Usage

The Node implementation is based on [node-urlencode](https://www.npmjs.com/package/urlencode)，so api style is as same as node-urlencode. But the encode in browser is async,so i use Promise as return;

use npm to install:
```
npm install --save isomorphic-urlencode
```

```

var urlencode = require("isomorphic-urlencode");

console.log(urlencode('苏千')); // default is utf8 
console.log(urlencode('苏千', 'gbk')); // '%CB%D5%C7%A7' 

```

The Browser Version is built on iframe and form, you can refer to this [blog]() for more details;