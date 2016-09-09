/**
 * Created by apple on 16/9/9.
 */
import FluentFetcher from './fluent_fetcher';

let fluentFetcher = new FluentFetcher({host: "ggzy.njzwfw.gov.cn", responseContentType: "text"});

//测试直接发起请求
fluentFetcher
  .parameter({infoid: "5521bfec-e4aa-465d-be77-e503227dec58", "categoryNum": "005"})
  .get({path: "/njggzy/infodetail/"})
  .build()
  .then((data)=> {
    // console.log(data);
  }).catch((error)=> {
  console.log(error);
});

fluentFetcher = new FluentFetcher({host: "ggzy.njzwfw.gov.cn", responseContentType: "text"});


//测试以代理模式发起请求
fluentFetcher
  .parameter({infoid: "5521bfec-e4aa-465d-be77-e503227dec58", "categoryNum": "005"})
  .get({path: "/njggzy/infodetail/"})
  .proxy({proxyUrl: "http://app.truelore.cn:11499/proxy"})
  .build()
  .then((data)=> {
    // console.log(data);
  }).catch((error)=> {
  console.log(error);
});

//测试需要以GBK编码方式发起的请求
var urlencode = require("isomorphic-urlencode");

urlencode("左盼", "gbk").then((data)=> {
  fluentFetcher = new FluentFetcher({host: "ggzy.njzwfw.gov.cn", responseContentType: "text"});

  //http://ggzy.njzwfw.gov.cn/njggzy/consultant/showresault.aspx?ShowLsh=0&Mlsh=123456&Name=%D7%F3%C5%CE
  //测试以代理模式发起请求
  fluentFetcher
    .parameter({ShowLsh: "0", Mlsh: "123456", Name: data})
    .get({path: "/njggzy/consultant/showresault.aspx"})
    .proxy({proxyUrl: "http://app.truelore.cn:11499/proxy"})
    .build()
    .then((data)=> {
      console.log(data);
    }).catch((error)=> {
    console.log(error);
  });

});