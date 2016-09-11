/**
 * Created by apple on 16/9/11.
 */
var redis = require("redis");

/**
 * @function Node的服务端缓存,优先使用Redis,若指定的Redis无法连接则使用node-cache
 * @description 缓存的存储方式是 key => subKey => value 这种方式进行处理
 */
export default class WXCache {

  /**
   * @function 默认构造函数
   */
  constructor() {

    //尝试构造出Redis客户端
    this.client = redis.createClient();

    //监听Redis客户端创建错误
    this.client.on("error", (err) => {
      this.client = null;
      console.log("Redis Client Error " + err);
    });
  }

  /**
   * @function 从缓存中获取数据
   * @param hashKey
   * @param url
   * @returns {Promise}
   */
  get(hashKey = "hashKey", url = "url") {

    return new Promise((resolve, reject)=> {

      if (!!this.client) {
        //从Redis中获取数据
        this.client.hget(hashKey, url, function (err, replies) {

          //如果存在数据
          if (!!replies) {
            resolve(replies);
          } else {
            reject(err);
          }

        });
      } else {
        reject(new Error("Invalid Client"));
      }


    });

  }


  /**
   * @function 默认将数据放置到缓存中
   * @param hashKey 存入的键
   * @param url 存入的域URL
   * @param data 存入的数据
   * @param expire 第一次存入时候的过期时间 ,这里的单位是秒
   * @result 如果设置失败,则返回null
   */
  put(hashKey = "hashKey", url = "url", data = "data", expire = 60 * 60) {

    //判断客户端是否有效
    if (!this.client) {
      //如果客户端无效,直接返回null
      return null;
    }

    //第一次设置的时候判断ggzy是否存在,如果不存在则设置初始值
    this.client.hlen(hashKey, (err, replies) => {

      //获取键值长度,第一次获取时候长度为0
      if (replies == 0) {

        //12小时之后删除数据
        this.client.expire(hashKey, expire);
      }

    });

    //设置数据
    this.client.hset(hashKey, url, data);

  }

}