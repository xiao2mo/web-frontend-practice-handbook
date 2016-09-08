/**
 * Created by apple on 16/9/8.
 */
var urlencode = require("./node-urlencode");

urlencode("王下邀月熊").then((data)=> {
  console.log(data);
});

urlencode("王下邀月熊", "gbk").then((data)=> {
  console.log(data);
});