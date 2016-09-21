// /**
//  * Created by apple on 16/9/9.
//  */
import FluentFetcher from './fluent_fetcher';

const host = "jsonplaceholder.typicode.com";

const proxyUrl = "http://localhost:499/proxy";

let fluentFetcher = new FluentFetcher({scheme: "http", host, responseContentType: "json"});

//测试GET类型请求
//https://jsonplaceholder.typicode.com/posts?userId=1
fluentFetcher
  .parameter({"userId": "1"})
  .get({path: "/posts"})
  .build()
  .then((data)=> {
    console.log("GET:" + data.length);
  }).catch((error)=> {
  console.log(error);
});

//测试以代理模式发起请求
fluentFetcher
  .proxy({proxyUrl})
  .build()
  .then((data)=> {
    console.log("GET By Proxy:" + data.length);
  }).catch((error)=> {
  console.log(error);
});

fluentFetcher
  .parameter({"userId": "1"})
  .get({path: "/posts"})
  .build()
  .then((data)=> {
    console.log("GET:" + data.length);
  }).catch((error)=> {
  console.log(error);
});

//测试CORS
fluentFetcher
  .proxy({proxyUrl})
  .cors()
  .build()
  .then((data)=> {
    console.log("GET By CORS:" + data.length);
  }).catch((error)=> {
  console.log(error);
});


//测试POST类型请求
fluentFetcher
  .parameter({
    title: 'foo',
    body: 'bar',
    userId: 1
  })
  .post({path: "/posts"})
  .proxy({}) //设置不走代理
  .build()
  .then((data)=> {
    console.log("POST:");
    console.log(data)
  }).catch((error)=> {
  console.log(error);
});

fluentFetcher
  .proxy({proxyUrl})
  .build()
  .then((data)=> {
    console.log("POST By Proxy:");
    console.log(data)

  }).catch((error)=> {
  console.log(error);
});


//测试PUT类型请求
fluentFetcher
  .parameter({
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1
  })
  .put({path: "/posts/1"})
  .proxy({}) //设置不走代理
  .build()
  .then((data)=> {
    console.log("PUT:");
    console.log(data)
  }).catch((error)=> {
  console.log(error);
});

fluentFetcher
  .proxy({proxyUrl})
  .build()
  .then((data)=> {
    console.log("PUT By Proxy:");
    console.log(data)

  }).catch((error)=> {
  console.log(error);
});