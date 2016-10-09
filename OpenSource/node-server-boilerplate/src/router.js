import { get_user } from './controller/user_controller';
/**
 * Created by apple on 16/10/9.
 */
var router = require('koa-router')();
var serve = require('./controller/static_controller');

//定义默认的根路由
router.get('/', function *(next) {
  this.body = {msg: "Node Server Boilerplate"}
});

//定义用户处理路由
router.get('/user/:id', get_user);

//定义全局静态文件支持路由
router.get('/static/*', serve('./static'));

//默认导出路由配置
export default router;