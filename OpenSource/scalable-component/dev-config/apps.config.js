/**
 * Created by apple on 16/6/8.
 */
module.exports = {
  apps: [
    {
      //required
      id: "ScalableComponent",//编号
      title: "ScalableComponent",//HTML文件标题
      entry: {
        name: "scalable",//该应用的入口名
        src: "./scalable.js",//该应用对应的入口文件
      },//入口文件
      indexPage: "./dev-config/template.html",//主页文件
      compiled: true//判斷當前是否加入编译,默认为true
    }
  ],

  //开发服务器配置
  devServer: {
    appEntrySrc: "./demo/demo.js", //当前待调试的APP的编号
    port: 3000 //监听的Server端口
  }
};