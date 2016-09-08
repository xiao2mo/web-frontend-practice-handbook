/*
 * @Author: wxyyxc1992
 * @Date:   2016-09-08 20:26:06
 * @Last Modified by:   wxyyxc1992
 * @Last Modified time: 2016-09-08 20:27:15
 */

'use strict';

var nodeUrlencode = require('urlencode');

function urlencode(url, encode) {

  //判断是否存在输入
  if (!encode) {
    encode = "utf8";
  }

  return new Promise((resolve, reject)=> {
    resolve(nodeUrlencode(url, encode));
  });

}

module.exports = urlencode;