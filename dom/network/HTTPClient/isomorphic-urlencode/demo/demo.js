/**
 * Created by apple on 16/9/8.
 */

var urlencode = require("../dom-urlencode");

urlencode("王下邀月熊").then(function (data) {
  console.log(data);
});

urlencode("王下邀月熊", "gbk").then(function (data) {
  console.log(data);
});