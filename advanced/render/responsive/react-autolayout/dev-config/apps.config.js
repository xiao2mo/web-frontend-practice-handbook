/**
 * Created by apple on 16/6/8.
 */
module.exports = {
    apps: [
        {
            //required
            id: "index",//编号
            title: "Index",//HTML文件标题
            entry: {
                name: "index",//该应用的入口名
                src: "./src/index.js",//该应用对应的入口文件
            },//入口文件
            indexPage: "./src/index.html",//主页文件
            compiled: true//判斷當前是否加入编译,默认为true
        }
    ],

    //开发服务器配置
    devServer: {
        appEntrySrc: "./widgets/components/scalable/demo/swiper.js", //当前待调试的APP的编号
        port: 3000 //监听的Server端口
    },

    //如果是生成的依赖库的配置项
    library: {
        name: "service_portal",//依赖项入口名
        entry: "./service/service_portal.js",//依赖库的入口,
        library: "edata",//生成的挂载在全局依赖项下面的名称
        libraryTarget: "var"//挂载的全局变量名
    }
};