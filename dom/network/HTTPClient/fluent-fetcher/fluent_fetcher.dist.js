'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by apple on 16/9/8.
 */

//自动进行全局的ES6 Promise的Polyfill
require('es6-promise').polyfill();
require('isomorphic-fetch');

/**
 *    HttpUrl url = HttpUrl.parse("http://who-let-the-dogs.out").newBuilder()
 .addPathSegment("_Who?_")
 .query("_Who?_")
 .fragment("_Who?_")
 .build();
 System.out.println(url);

 This prints:


 http://who-let-the-dogs.out/_Who%3F_?_Who?_#_Who?_
 */

/**
 * @author 王下邀月熊
 * @function Fluent, Super Agent Style Wrapper For Fetch
 * @features Fluent API、Cache Strategy、Timeout Strategy、Retry Strategy
 */

var FluentFetcher = function () {

  /**
   * @默认构造函数
   */
  function FluentFetcher(_ref) {
    var _ref$scheme = _ref.scheme;
    var scheme = _ref$scheme === undefined ? "http" : _ref$scheme;
    var _ref$host = _ref.host;
    var host = _ref$host === undefined ? "api.com" : _ref$host;
    var _ref$encode = _ref.encode;
    var encode = _ref$encode === undefined ? "utf8" : _ref$encode;
    var _ref$responseContentT = _ref.responseContentType;
    var responseContentType = _ref$responseContentT === undefined ? "json" : _ref$responseContentT;

    _classCallCheck(this, FluentFetcher);

    /**
     * @region 请求相关控制
     */
    this.scheme = scheme;

    this.host = host;

    //用于存放请求路径
    this.path = "";

    //用于存放所有的请求参数
    this.params = {};

    //设置请求内容类型
    this.contentType = "form-urlencoded";

    //用于存放封装好的查询参数 即 ? 之后的内容
    this.packagedQueryString = "";

    //请求的选项设置
    this.option = {};

    /**
     * @function 编码与响应属性控制
     */

    //注意,对于非utf8编码,请输入编码之后的字符串
    this.encode = encode;

    this.responseContentType = responseContentType;

    //设置当前的请求状态,默认为初始化,还有 wait、finish
    this.state = "initialize";
  }

  /**
   * @region 公用方法定义区域
   */

  /**
   * @region 基本请求方法定义
   */

  /**
   * @function 设定本次请求的所有的请求参数,务必在选定方法之前调用
   * @description 先强制设定好全部的请求参数,这样分别在get、post、put、delete中就可以进行参数封装了
   * @param params
   */


  _createClass(FluentFetcher, [{
    key: 'parameter',
    value: function parameter(params) {

      //判断是否已经封装过了请求方法
      if (!params) {
        throw new Error("请设置有效请求参数");
      }

      this.params = params;

      return this;
    }

    //这里输入的path是不会进行编码的,因此不要输入一些动态参数

  }, {
    key: 'get',
    value: function get(_ref2) {
      var _ref2$path = _ref2.path;
      var path = _ref2$path === undefined ? "/" : _ref2$path;


      //设置请求方式
      this.option.method = "get";

      //设置请求路径
      this.path = '' + path;

      return this;
    }

    /**
     * @function 以POST形式发起请求
     * @param path
     * @param contentType
     * @return {FluentModel}
     */

  }, {
    key: 'post',
    value: function post(_ref3) {
      var _ref3$path = _ref3.path;
      var path = _ref3$path === undefined ? "/" : _ref3$path;
      var _ref3$contentType = _ref3.contentType;
      var contentType = _ref3$contentType === undefined ? "form-urlencoded" : _ref3$contentType;


      //设置请求方式
      this.option.method = "post";

      this.contentType = contentType;

      //设置请求路径
      this.path = '' + path;

      return this;
    }
  }, {
    key: 'put',
    value: function put() {

      //设置请求方式
      this.option.method = "put";

      this.contentType = contentType;

      //设置请求路径
      this.path = '' + path;

      return this;
    }
  }, {
    key: 'del',
    value: function del() {
      return this;
    }

    /**
     * @function 请求头设置
     * @key 请求键名
     * @value 请求值名
     */

  }, {
    key: 'header',
    value: function header(_ref4) {
      var _ref4$key = _ref4.key;
      var key = _ref4$key === undefined ? "Accept" : _ref4$key;
      var _ref4$value = _ref4.value;
      var value = _ref4$value === undefined ? "application/json" : _ref4$value;

      if (!this.option.headers) {
        this.option.headers = {};
      }

      this.option.headers[key] = value;
    }

    /**
     * @function 设置本次请求为CORS
     */

  }, {
    key: 'cors',
    value: function cors() {

      this.option.mode = "cors";

      this.header({ key: "Origin", value: "*" });

      return this;
    }

    /**
     * @function 请求路径封装
     * @param segment
     * @return {FluentModel}
     */

  }, {
    key: 'pathSegment',
    value: function pathSegment(_ref5) {
      var _ref5$segment = _ref5.segment;
      var segment = _ref5$segment === undefined ? "" : _ref5$segment;


      if (!!segment) {

        //当segment有意义值时
        this.path = this.path + '/' + this._encode(segment);
      }

      //返回当前对象
      return this;
    }

    /**
     * @function #之后的地址封装
     * @return {FluentModel}
     */

  }, {
    key: 'fragment',
    value: function fragment(_ref6) {
      _objectDestructuringEmpty(_ref6);

      return this;
    }

    /**
     * @region 请求体构造与请求策略构造
     */

  }, {
    key: 'cookie',
    value: function cookie() {

      return this;
    }
  }, {
    key: 'timeout',
    value: function timeout(_ref7) {
      var _ref7$time = _ref7.time;
      var time = _ref7$time === undefined ? 0 : _ref7$time;
    }

    /**
     * @function 仅允许对于GET动作进行缓存
     * @return {FluentModel}
     */

  }, {
    key: 'cache',
    value: function cache(_ref8) {
      var _ref8$cacheControl = _ref8.cacheControl;
      var cacheControl = _ref8$cacheControl === undefined ? "no-cache" : _ref8$cacheControl;
      var _ref8$maxAge = _ref8.maxAge;
      var maxAge = _ref8$maxAge === undefined ? "0" : _ref8$maxAge;


      return this;
    }

    /**
     * @function 失败重试策略
     * @return {FluentModel}
     */

  }, {
    key: 'retry',
    value: function retry() {

      return this;
    }

    /**
     * @function 将本次请求设置为需要通过Proxy进行请求
     * @param proxyUrl 完整的代理服务器的请求路径
     * @return {FluentModel}
     */

  }, {
    key: 'proxy',
    value: function proxy(_ref9) {
      var _ref9$proxyUrl = _ref9.proxyUrl;
      var proxyUrl = _ref9$proxyUrl === undefined ? "" : _ref9$proxyUrl;


      //如果设置为空,则跳过设置
      if (!proxyUrl) {
        this.proxyUrl = "";
        return this;
      }

      //调用proxy方法时,this.packagedQueryString本来为空字符串
      this.proxyUrl = proxyUrl + '?targetUrl=' + this._encode(this.scheme + '://' + this.host + this.path) + '&';

      return this;
    }

    /**
     * @function 进行最后的构建工作,一旦调用该函数即不可以再修改之前的配置
     * @return {Promise}
     */

  }, {
    key: 'build',
    value: function build() {

      //构造请求路径
      var packagedPath = this.scheme + '://' + this.host + this.path;

      //封装请求参数
      this._setParams();

      //构造查询字符串
      var packagedQueryString = this.option.method === "get" ? '' + this.packagedQueryString : "";

      //检查是否已经存在了代理地址,如果存在有代理地址则使用代理地址
      var url = this.proxyUrl ||
      //判断是否为get请求,如果是get请求则将查询字符串添加到URL中
      packagedPath + '?';

      //构建fetch请求
      return fetch('' + url + packagedQueryString, this.option).then(this._checkStatus, function (error) {
        throw error;
      }).then(this.responseContentType === "json" ? this._parseJSON : this._parseText, function (error) {
        throw error;
      });
    }

    /**
     * @region 私有方法定义区域
     * @param method 请求方法
     * @param contentType 请求类型
     */

  }, {
    key: '_setParams',
    value: function _setParams() {

      //重置封装好的packagedQueryString
      this.packagedQueryString = "";

      //判断当前是否已经设置了请求方法
      if (!this.option.method) {
        throw new Error("请设置请求方法");
      }

      //将请求参数封装到查询参数中
      for (var key in this.params) {
        this.packagedQueryString += key + '=' + this._encode(this.params[key]) + '&';
      }

      //删除最后一个无效的`&`,以避免被误认为SQL Injection
      this.packagedQueryString = this.packagedQueryString.substr(0, this.packagedQueryString.length - 1);

      //判断是否为GET
      if (this.option.method === "get") {

        //如果是GET,则将请求数据添加到URL中

      } else if (this.contentType === "form-urlencoded") {

        //根据不同的编码格式设置不同的body内容
        //将构造好的查询字符串添加到body中
        this.option.body = this.packagedQueryString;
      } else {

        this.option.body = JSON.stringify(this.params);
      }
    }

    /**
     * @function 检测返回值的状态
     * @param response
     * @returns {*}
     */

  }, {
    key: '_checkStatus',
    value: function _checkStatus(response) {

      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }

    /**
     * @function 解析返回值中的Response为JSON形式
     * @param response
     * @returns {*}
     */

  }, {
    key: '_parseJSON',
    value: function _parseJSON(response) {

      if (!!response) {

        return response.json();
      } else {

        return {};
      }
    }

    /**
     * @function 解析TEXT性质的返回
     * @param response
     * @returns {*}
     */

  }, {
    key: '_parseText',
    value: function _parseText(response) {

      if (!!response) {

        return response.text();
      } else {

        return "";
      }
    }

    /**
     * @function 对于本次请求进行签名,主要是封装好的请求的URL
     * @private
     */

  }, {
    key: '_signature',
    value: function _signature() {}

    /**
     * @function 利用设置好的编码格式进行编码
     * @param str
     * @private
     */

  }, {
    key: '_encode',
    value: function _encode(str) {

      if (this.encode === "utf8") {
        return encodeURIComponent(str);
      } else {
        return str;
      }
    }
  }]);

  return FluentFetcher;
}();

exports.default = FluentFetcher;
