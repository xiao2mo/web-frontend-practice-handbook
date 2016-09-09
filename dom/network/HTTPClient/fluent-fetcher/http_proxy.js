/**
 * Created by apple on 16/9/9.
 */
var express = require('express');
var httpProxy = require('http-proxy');
var cors = require('cors');
var url = require('url');
//添加跨域支持
var app = express(cors());

//
// 构建一个包含自定义逻辑的代理服务器
//
var proxy = httpProxy.createProxyServer({ws: false});

// 添加某个错误处理机制以避免:https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

proxy.on('proxyReq', function (proxyReq, req, res, options) {

  //添加特殊的请求头支持
  proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');

});

proxy.on('proxyRes', function (proxyRes, req, res) {

  //添加跨域支持
  proxyRes.headers['Access-Control-Allow-Origin'] = '*';

});


//默认的返回值
app.all('/proxy', function (req, res) {

  //从header中获取target
  //这里考虑到代理服务器可能需要承接CORS请求,因此将真实的target放置在查询参数中
  //另外这里的targetUrl已经经过了URL编码

  if (!!req.query && !!req.query.targetUrl) {

    //这里需要从原始请求参数中去除targetUrl参数
    var proxiedUrl = req.baseUrl + "?";

    var target = decodeURIComponent(req.query.targetUrl);

    delete req.query.targetUrl;

    var url_parts = url.parse(req.url, true);

    //修改search部分
    if (url_parts.search !== null) {
      for (var key in url_parts.query) {
        if (key === "targetUrl") {
          continue;
        }
        proxiedUrl += `${key}=${url_parts.query[key]}&`
      }

      //删除最后一个&
      proxiedUrl = proxiedUrl.substr(0, proxiedUrl.length - 1);
    }

    req.url = proxiedUrl;

    //转发该请求
    proxy.web(req, res, {target});

  } else {

    var json = {error: 'proxy_error', reason: "invalid target url"};
    res.end(JSON.stringify(json));

  }

});

//启动服务器
var server = app.listen(499, '0.0.0.0', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});