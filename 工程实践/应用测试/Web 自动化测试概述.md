[![返回目录](https://parg.co/UYp)](https://github.com/wxyyxc1992/Web-Series/) 
﻿

# Web 自动化测试概述


当我们谈论 Web 测试时，我们会
在 Web 测试当中我们经常
自动化测试(Automated Test)即指利用一系列自动化测试工具自动执行测试脚本、生成输出结果以及进行结果的回归对比。用户验收测试(User Acceptance Test, UAT)又被成为 Beta 测试、应用测试或者终端用户测试，其类似于端到端测试，即在真实环境中以真实的用户逻辑对应用进行完整地测试。黑盒/白盒测试



而笔者


单元测试、端到端测试与集成测试，在单元测试中我们应该尽可能地独立于副作用；在集成测试中，我们应该尽可能地独立于数据。


端到端测试(End-to-end Test)旨在完全真实的用户运行环境中模拟用户交互逻辑对于单元功能或某条用户逻辑线。



在笔者看来，目前我们基于 Mocha、Jest、Karma 这些测试框架一次编码多次运行的测试应该都是自动化测试，自动化测试与手动测试的区别在于自动化测试不会依赖于测试数据。在早期的测试，特别是需要依赖于外部数据的测试中，我们往往需要根据外部数据来修改测试用例以保证测试的准确性。譬如我们在测试。端到端测试侧重于介绍所谓的自动化浏览器相关的技术与框架，而集成测试则偏重于介绍测试用例的构建理念。


对于纯 JavaScript 相关的代码我们可以运行在 Node 环境中，
往往从测试耗时与可操作性上来看会好上很多。
笔者个人是比较推荐尽可能地编写同构(Isomorphic)代码，即可以同时运行在 Node.js 环境与浏览器环境中的代码。譬如我们推荐使用 fetch 函数来进行数据抓取，如果我们直接在代码中使用浏览器自带的 fetch 或者 whatwg-fetch 这样强耦合于浏览器环境的 Polyfill，就会限制我们的代码必须运行在，其代码并不复杂，其只是在 package.json 进行了不同环境的入口声明：
```
// package.json
"browser": "fetch-npm-browserify.js",

"main": "fetch-npm-node.js",
// fetch-npm-node.js
"use strict";


var realFetch = require('node-fetch');
module.exports = function(url, options) {
	if (/^\/\//.test(url)) {
		url = 'https:' + url;
	}
	return realFetch.call(this, url, options);
};


if (!global.fetch) {
	global.fetch = module.exports;
	global.Response = realFetch.Response;
	global.Headers = realFetch.Headers;
	global.Request = realFetch.Request;
}
// fetch-npm-browserify.js
require('whatwg-fetch');

module.exports = self.fetch.bind(self);
```


这三者之间并没有明显地界限，笔者在将常见的 Web 测试技术划分到这三大类中也是为了更好地进行组织而并非形式化地强制分割；对于技术的分类与组织也是见仁见智，建议读者建立自己的体系为佳。
单元测试更多的是从测试目标粒度的角度，尽可能地对于细粒度地模块进行隔离测试；在测试过程中应该忽略副作用或者其他关联模块的影响。
譬如如果我们在浏览器中运行 Mocha 测试脚本，或者


首先是单元测试，包括对于函数、类与组件的测试
然后是集成测试，集成测试介于单元测试与端到端测试之间，笔者对于集成测试的定义在于其能够在整体可用性测试的基础上着重测试某些模块的准确性。
最后是端到端测试，端到端测试本身是为了尽可能地模拟用户环境与用户使用，测试应用整体的表现。
Web 中的端到端测试我们往往利用浏览器自动化技术(Browser Automation)将测试脚本运行于 Chrome / Firefox 这些现代浏览器之内，或者也可以是 JSDom、PhantomJS 这样的模拟 DOM 环境或者无界面浏览器(Headless Browser)中。
我们在下文中介绍的 Mocha、Jest、TestCafe 虽然在不同语境下有不同的称谓或者定位，但是笔者认为它们都可以看做测试驱动器(TestRunner)。



- [should.js](https://github.com/shouldjs/should.js) - BDD style shown throughout these docs

- [chai](http://chaijs.com/) - expect(), assert() and should style assertions

- [expect.js](https://github.com/LearnBoost/expect.js) - expect() style assertions

- [expectations](https://github.com/spmason/expectations) - Jasmine-style expect()

- [unit.js](https://github.com/unitjs/unit.js) - simple, fluent assertions

- [unexpected](https://unexpectedjs.github.io/) - extensible BDD assertion toolkit


```
var should = require('should');


var user = {
    name: 'tj'
  , pets: ['tobi', 'loki', 'jane', 'bandit']
};


user.should.have.property('name', 'tj');
user.should.have.property('pets').with.lengthOf(4);


// If the object was created with Object.create(null)
// then it doesn't inherit `Object.prototype`, so it will not have `.should` getter
// so you can do:
should(user).have.property('name', 'tj');


// also you can test in that way for null's
should(null).not.be.ok();


someAsyncTask(foo, function(err, result){
  should.not.exist(err);
  should.exist(result);
  result.bar.should.equal(foo);
});
```



到这里我们主要讨论的是功能与用户体验测试，在将网站部署到生产环境之前，我们还需要进行其他类型的测试，譬如跨浏览器测试与性能测试。在端到端测试中我们已经在真实运行的浏览器中测试了应用的可用性，不过鉴于目前 Web 平台严重的碎片化与浏览器特性的不一致性，我们还需要在尽可能多地版本地浏览器内进行应用测试，这种类型的测试也就是所谓的跨浏览器测试。[Browsershots](http://browsershots.org/) 是非常简单易用的免费在线跨浏览器测试工具，其能够为指定的网站生成在不同浏览器下运行的效果截图。不过其免费功能并不支持自定义测试脚本或者重定向测试，报告生成速度也是差强人意；如果是企业级用户可以尝试其商业版本或者其他商业工具。[BrowserStack](https://www.browserstack.com/) 则是非常优秀的商业工具，其不仅仅支持 700 多的桌面浏览器，对于移动端测试还具备非常好的支持(可以在真实设备上进行测试)。 其他的跨浏览器测试工具还包括 [Browser Sandbox](https://turbo.net/browsers)、IETester、[WebShot](http://mrsnapshots.cloudapp.net/)、[Browsera](http://www.browsera.com/)、[CrossBrowserTesting](https://crossbrowsertesting.com/) 等。


跨浏览器测试
我们使用 Chrome Dev Tool 即可以方便地查看应用的加载、脚本解析与执行以及渲染、重渲染等耗时，有效地衡量了首屏可见时延、用户可交互时延等关键页面性能度量指标。[PageSpeed](https://developers.google.com/speed/pagespeed/insights/)

[Sitespeed.io](https://github.com/sitespeedio/sitespeed.io)。而 [LightHouse](https://github.com/GoogleChrome/lighthouse) 则是面向 Progressive Web Apps 的专用检测与性能评测工具，其能够检测应用的离线可用、响应式支持程度等等指标。


侧重于用户体验，可以使用 、、此外，对于性能测试与


# 单元测试


[Jasmine](https://jasmine.github.io/) 就是典型的 BDD 测试框架，而 Mocha 则同时支持 BDD 与 TDD 风格的测试语法。




在测试中我们


所谓"断言"，就是判断源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误。
测试驱动，譬如 [Mocha]()、[Jasmine]()、[]()
编写单元测试的时候语法本身可能并不复杂，而是如何保证将测试代码分割为合理的可进行单元测试的部分。所谓可单元测试的代码应该尽可能少地包含外部依赖并且不会进行 I/O 等副作用。在前端开发中我们常常会将逻辑代码与界面代码混写在一起，譬如有时候我们需要为表单添加数据校验功能；直接将校验函数写在组件内往往会使得你即使想单独测试校验函数(譬如检测用户名是否合法)也不得不编写冗余的渲染组件的代码，我们应该将这些校验函数提取出来成为纯函数，从而降低整个测试的成本，使得这部分代码成为可单元测试的代码。
像 Redux 这样的函数式状态管理框架能够将业务逻辑独立于组件，保证


在单元测试中




在单元测试中我们往往也关注于测试的覆盖率
在 Jest 中已经内建支持了 is，：
```jest --coverage
```


```
function jsonOk (body) {
  var mockResponse = new window.Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-type': 'application/json'
    }
  });


  return new Promise.resolve(mockResponse);
}


function jsonError (status, body) {
  var mockResponse = new window.Response(JSON.stringify(body), {
    status: status,
    headers: {
      'Content-type': 'application/json'
    }
  });


  return new Promise.reject(mockResponse);
}


```


```
beforeEach(() => {
  window.fetch.returns(jsonOk({
    hello: 'world'
  }));
});
```


# 端到端测试


Nightmare 是来自 [Segment](https://segment.com/) 的提供了高阶接口的自动化浏览器库，其构建于 Electron 之上提供了类似于 PhantomJS 无界面浏览器的功能；但是其速度相较于 PhantomJS 会快上许多。严格来说 Nightmare 不算是 Web 测试库，不过我们往往将其与 Mocha / Jest 等测试驱动协同使用来进行端到端测试。我们也可以利用 [Daydream](https://github.com/segmentio/daydream) 这个 Chrome 扩展程序自动将用户的交互行为记录为 Nightmare 脚本，能够方便于测试人员快速地录制脚本。
```
var Nightmare = require('nightmare');
var expect = require('chai').expect; // jshint ignore:line


describe('test duckduckgo search results', function() {
  it('should find the nightmare github link first', function(done) {
    var nightmare = Nightmare()
    nightmare
      .goto('https://duckduckgo.com')
      .type('#search_form_input_homepage', 'github nightmare')
      .click('#search_button_homepage')
      .wait('#zero_click_wrapper .c-info__title a')
      .evaluate(function () {
        return document.querySelector('#zero_click_wrapper .c-info__title a').href
      })
      .end()
      .then(function(link) {
        expect(link).to.equal('https://github.com/segmentio/nightmare');
        done();
      })
  });
});
```
```
{
  "src_folders" : ["tests"],
  "output_folder" : "reports",


  "selenium" : {
    "start_process" : true,
    "server_path" : "./bin/selenium-server-standalone-3.3.1.jar",
    "log_path" : "",
    "port" : 4444,
    "cli_args" : {
      "webdriver.chrome.driver" : "./bin/chromedriver"
    }
  },


  "test_settings" : {
    "default" : {
      "launch_url" : "http://localhost",
      "selenium_port"  : 4444,
      "selenium_host"  : "localhost",
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    }
  }
}
```
```
module.exports = {  
  'Demo test Google' : function (client) {
    client
      .url('http://www.google.com')
      .waitForElementVisible('body', 1000)
      .assert.title('Google')
      .assert.visible('input[type=text]')
      .setValue('input[type=text]', 'rembrandt van rijn')
      .waitForElementVisible('button[name=btnG]', 1000)
      .click('button[name=btnG]')
      .pause(1000)
      .assert.containsText('ol#rso li:first-child',
        'Rembrandt - Wikipedia')
      .end()
  }
}
```
```
fixture `Example page`
    .page `https://devexpress.github.io/testcafe/example`;


test('Emulate user actions and perform a verification', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#populate')
        .click('#submit-button');


    const location = await t.eval(() => window.location);


    await t.expect(location.pathname).eql('/testcafe/example/thank-you.html');
});
```


除了这里介绍的能够用于端到端测试框架与库之外，其他的流行的端到端测试库还包括：

- [Zombie](https://github.com/assaf/zombie)：基于无界面浏览器的



# 集成测试


