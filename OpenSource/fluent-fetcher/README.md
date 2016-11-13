> 本项目从属于笔者的[Web开发入门与最佳实践](https://github.com/wxyyxc1992/Web-Develop-Introduction-And-Best-Practices)之[前端开源项目](https://github.com/wxyyxc1992/Web-Develop-Introduction-And-Best-Practices#frontend-1)系列。如果对于HTTP协议与规范尚不掌握的建议阅读[HTTP 基础与变迁](https://segmentfault.com/a/1190000006689489)一文。如果对于REST尚不掌握的推荐阅读[来自微软的接口设计指南](https://segmentfault.com/a/1190000006037478)以及[来自于PayPal的RESTful API标准](https://segmentfault.com/a/1190000005924733)

# [Fluent Fetcher:兼容Weapp的流式网络请求库](https://github.com/wxyyxc1992/Web-Develop-Introduction-And-Best-Practices/blob/master/OpenSource/fluent-fetcher/README.md)

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/11/2/REST_api_d56810391e9851fade45e40804ad40fd.png)

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/11/2/fetch-api-1050x360.jpg)

笔者一直比较喜欢使用标准的[Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)来进行浏览器端的网络请求，同时使用的是[isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)保证接口类的可测试性。而本项目则是笔者借鉴了[SuperAgent](https://github.com/visionmedia/superagent) API的风格基于Fetch进行的二次封装，主要是提供了流式风格的构造与使用方法，同时对常见功能进行了扩展。另外，fluent-fetcher还原生支持Weapp，基于fluent-fetcher构造的接口类可以直接在Weapp环境下使用。


# Basic Usage

## Installation

可以使用`npm install fluent-fetcher --save`安装本项目，或者使用`yarn add fluent-fetcher`安装使用。

## Instantiate:实例化

直接在需要使用的地方以`import`导入即可:

```
//@flow
import FluentFetcher from 'fluent-fetcher';
```

我们可以直接以实例化方式创建请求实例:

```
const host = "jsonplaceholder.typicode.com";
let fluentFetcher = new FluentFetcher({scheme: "http", host});
```

其中可选的构造参数有:

```
constructor(
	{
        scheme = "http", //请求协议
        host = "api.com",  //域名
        encoding = "utf8",  //编码
        acceptType = "json" //接收的返回数据类型
	} = {}
)
{...}
```

而如果在项目中我们存在多个数据源，建议是在接口公共父类中创建多个数据源实例，这样具体的接口实现类皆可以使用使用`this.xxxClient`方式进行请求。

```
// @flow
//E路数据的服务端地址
const edataHost = 'api.edata.com';

//公共资源的服务端地址
const ggzyHost = 'api.ggzy.com';

export default class API {

  //用于抓取公共资源数据的API
  ggzyAPIClient: FluentFetcher = null;

  //EDATA，用于抓取E路数据的API
  edataAPIClient: FluentFetcher = null;

  /**
   * @function 默认构造函数
   */
  constructor() {

    //构造请求体
    this.ggzyAPIClient = new FluentFetcher({
      scheme: 'http',
      host: ggzyHost,
      responseContentType: "json"
    }).header({
      key: 'UserAgent',
      value: 'wap'
    }).header({
      key: 'Content-Type',
      value: 'application/json'
    });

    this.edataAPIClient = new FluentFetcher({
      scheme: 'http',
      host: edataHost,
      responseContentType: "json"
    }).header({
      key: 'UserAgent',
      value: 'wap'
    }).header({
      key: 'Content-Type',
      value: 'application/json'
    });

  }

}
```

注意，如果你是在Weapp环境下，那么FluentFetcher会自动使用`wx.request`作为请求载体。

## GET

```
//测试GET类型请求
describe('GET请求测试', function () {

  //https://jsonplaceholder.typicode.com/posts?userId=1
  it('获取博文', function (done) {
    fluentFetcher
      .parameter({"userId": "1"})
      .get("/posts")
      .build()
      .then((data) => {
        expect(data).to.be.a('array');
        expect(data.length).to.be.above(0);
        done();
      }).catch((error) => {
      done(error);
    });
  });


});
```

## POST

```

//测试POST类型请求
describe('POST请求测试', function () {

  //https://jsonplaceholder.typicode.com/posts?userId=1
  it('创建博文@表单编码格式', function (done) {
    fluentFetcher
      .parameter({
        title: 'foo',
        body: 'bar',
        userId: 1
      })
      .post("/posts", 'x-www-form-urlencoded')
      .build()
      .then((data) => {
        expect(data).to.be.a('object');
        expect(data.id).to.equal(101);
        expect(data.title).to.equal('foo');
        expect(data.body).to.equal('bar');
        expect(data.userId).to.equal(1);

        done();
      }).catch((error) => {
      done(error);
    });
  });

  //https://jsonplaceholder.typicode.com/posts?userId=1
  it('创建博文@JSON格式', function (done) {
    fluentFetcher
      .parameter({
        title: 'foo',
        body: 'bar',
        userId: 1
      })
      .post("/posts")
      .build()
      .then((data) => {
        expect(data).to.be.a('object');
        expect(data.id).to.equal(101);
        expect(data.title).to.equal('foo');
        expect(data.body).to.equal('bar');
        expect(data.userId).to.equal(1);

        done();
      }).catch((error) => {
      done(error);
    });
  });


});

```

## PUT/DELETE

类似于POST请求方法。

# Advanced Usage

## Encode:编码

项目使用了[isomorphic-urlencode](https://github.com/wxyyxc1992/Web-Develop-Introduction-And-Best-Practices/blob/master/OpenSource/isomorphic-urlencode/README.md)作为通用的编解码工具，正常的会支持UTF8与GBK两种编码方案。当我们以`x-www-form-urlencoded`格式发起POST/PUT/DELETE请求时，会自动会请求体进行编码工作。另外，如果我们使用`pathSegment`添加请求路径时候，也会自动进行编码操作。

## Mock

在实际的项目中，譬如微信小程序里，可能我们的服务端尚未准备好或者域名没有审核通过，我们需要在前端进行Mock操作以模拟正常业务流程的返回。笔者在这里选定的Mock方案个人感觉还是比较轻量级的，即直接在构造实例时将你需要的Mock地址对应的数据传入即可。

```
//测试MOCK
describe('MOCK请求测试', function () {

  it('对于MOCK数据应该正常返回本地值', function (done) {


    fluentFetcher.get('/mock').mock({'/mock': {test: 'data'}}).build().then((data) => {

      expect(data).to.be.a('object');

      expect(data.test).to.equal('data');

      done();

    });

  });

});
```

## CORS:跨域请求

> - [浏览器跨域方法与基于Fetch的Web请求最佳实践 ](https://segmentfault.com/a/1190000006095018)

直接使用`cors()`函数添加CORS支持即可。

## Error:异常处理

异常处理是我们项目中常见的操作，在Fluent Fetch中对于所有非200或者300系列的请求皆会抛出异常:

```
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error
    }
```

笔者是推荐使用`async/await`加上`try-catch`语法进行异常处理:

```
    try {
      //发起数据请求
      let result = await this.post(`/quotation/bom/${bom.id}`, data);

      return successResponse;

    } catch (err) {

      return internalServerErrorResponse;

    }
```



# RoadMap

- Cache:缓存

- Retry:失败重试

- Timeout:超时