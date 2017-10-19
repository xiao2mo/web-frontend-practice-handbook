
# Web 应用运行机制


![](https://hacks.mozilla.org/files/2017/10/01-768x459.png)


Client (What happens when you click Order Now?)

Networking (How does information travel across internet?)

Security (How do we prevent hackers from stealing our passwords?)

Server (What does “the cloud” mean exactly?)

Application (What are web servers and web frameworks?)

Database (How do applications retrieve data? SQL vs NoSQL?)

Scaling (How do applications handle millions of requests?)

Rendering (How do browsers work? Basics of JavaScript.)



![](https://cdn-images-1.medium.com/max/2000/1*FjnCt0TCWaxY91E0WQq2DQ.png)



当我们在浏览器内输入某个地址后，经历了如下的步骤网页才最终呈现在我们面前：
（1）URL解析
浏览器会首先判断你输入的是否为有效的URL，还是属于需要传输给搜索引擎的默认搜索关键字。并且浏览器还会检查自带的“预加载 HSTS（HTTP严格传输安全）”列表，这个列表里包含了那些请求浏览器只使用HTTPS进行连接的网站。如果网站在这个列表里，浏览器会使用 HTTPS 而不是 HTTP 协议，否则，最初的请求会使用HTTP协议发送。
接下来，浏览器会检查你的输入字符是否含有特殊非ASCII关键字，如果含有特殊的字符会进行UTF8编码，部分特殊的网站会要求进行GBK编码。


（2）DNS解析
在URL解析完成之后，浏览器会根据本地的hosts文件或者向本机/网关设置的DNS服务器发起域名解析请求。DNS的解析过程中，浏览器会首先检查本机是否有域名缓存，如果没有的话会向DNS服务器发起请求，如果子DNS服务器不存在该记录则会递归向父层级的DNS发起请求。我之前在进行iOS开发的时候还碰到IPV6的问题，即苹果要求iOS应用能够在IPV6环境下正常运行，那么这个时候DNS服务器发现如果你请求的是IPV6的地址，对于仅有IPV4地址的服务器其会提供一个NAT64的功能，即保证客户端虽然为IPV6地址，也能和IPV4的服务器正常通信。


（3）TCP/IP协议传输

当浏览器得到了目标服务器的 IP 地址，以及 URL 中给出来端口号（http 协议默认端口号是 80， https 默认端口号是 443），它会调用系统库函数 socket ，请求一个 TCP流套接字，对应的参数是 AF_INET/AF_INET6 和 SOCK_STREAM 。TCP的建立连接与关闭连接分别是三次握手与四次握手，概述如下:

1.第一次握手：Client将标志位SYN置为1，随机产生一个值seq=J，并将该数据包发送给Server，Client进入SYN_SENT状态，等待Server确认。
2.第二次握手：Server收到数据包后由标志位SYN=1知道Client请求建立连接，Server将标志位SYN和ACK都置为 1，ack=J+1，随机产生一个值seq=K，并将该数据包发送给Client以确认连接请求，Server进入SYN_RCVD状态。
3.第三次握手：Client收到确认后，检查ack是否为J+1，ACK是否为1，如果正确则将标志位ACK置为1，ack=K+1，并将该数据包发 送给Server，Server检查ack是否为K+1，ACK是否为1，如果正确则连接建立成功，Client和Server进入 ESTABLISHED状态，完成三次握手，随后Client与Server之间可以开始传输数据了。



关闭连接时:
1.第一次挥手：Client发送一个FIN，用来关闭Client到Server的数据传送，Client进入FIN_WAIT_1状态。
2.第二次挥手：Server收到FIN后，发送一个ACK给Client，确认序号为收到序号+1（与SYN相同，一个FIN占用一个序号），Server进入CLOSE_WAIT状态。
3.第三次挥手：Server发送一个FIN，用来关闭Server到Client的数据传送，Server进入LAST_ACK状态。
4.第四次挥手：Client收到FIN后，Client进入TIME_WAIT状态，接着发送一个ACK给Server，确认序号为收到序号+1，Server进入CLOSED状态，完成四次挥手。





（4）HTTP请求封装


通常HTTP消息包括客户机向服务器的请求消息和服务器向客户机的响应消息。这两种类型的消息由一个起始行，一个或者多个头域，一个只是头域结束的空行和可选的消息体组成。HTTP的头域包括**通用头，请求头，响应头和实体头**四个部分。每个头域由一个域名，冒号（:）和域值三部分组成。域名是大小写无关的，域值前可以添加任何数量的空格符，头域可以被扩展为多行，在每行开始处，使用至少一个空格或制表符。

我们在正常的开发中主要会遵循RESTful风格，即主要以GET、POST、PUT、DELETE这四个动词进行请求，每个动词表征不同的含义，同时会将资源名与资源编号放在URL中增加可读性。


（5）Nginx/Apache中间件服务器
在Nginx、Apache服务器中，可以配置Virtual Host，即根据不同的域名指向不同的目录。而对于PHP这样需要动态处理的请求，会考虑使用FastCGI进行处理。同时，在服务器中我们也往往需要进行XSS/SQLInjection/CSRF等常见的网络攻击手段的防护。


（6）前端页面渲染
在浏览器接收到服务器返回的前端页面之后，即开始服务器的渲染过程。渲染主要包含了HTML DOM解析与CSS解析以及最终的页面渲染这几个部分。HTML 解析器的主要工作是对 HTML 文档进行解析，生成解析树。解析树是以 DOM 元素以及属性为节点的树。DOM是文档对象模型(Document Object Model)的缩写，它是 HTML 文档的对象表示，同时也是 HTML 元素面向外部(如Javascript)的接口。树的根部是"Document"对象。整个 DOM 和 HTML 文档几乎是一对一的关系。

1.通过遍历DOM节点树创建一个“Frame 树”或“渲染树”，并计算每个节点的各个CSS样式值
2.通过累加子节点的宽度，该节点的水平内边距(padding)、边框(border)和外边距(margin)，自底向上的计算"Frame 树"中每个节点首的选(preferred)宽度
3.通过自顶向下的给每个节点的子节点分配可行宽度，计算每个节点的实际宽度
4.通过应用文字折行、累加子节点的高度和此节点的内边距(padding)、边框(border)和外边距(margin)，自底向上的计算每个节点的高度
5.使用上面的计算结果构建每个节点的坐标
6.当存在元素使用 floated，位置有 absolutely 或 relatively 属性的时候，会有更多复杂的计算，详见http://dev.w3.org/csswg/css2/ 和 http://www.w3.org/Style/CSS/current-work
创建layer(层)来表示页面中的哪些部分可以成组的被绘制，而不用被重新栅格化处理。每个帧对象都被分配给一个层
页面上的每个层都被分配了纹理(?)
7.每个层的帧对象都会被遍历，计算机执行绘图命令绘制各个层，此过程可能由CPU执行栅格化处理，或者直接通过D2D/SkiaGL在GPU上绘制
8.上面所有步骤都可能利用到最近一次页面渲染时计算出来的各个值，这样可以减少不少计算量
计算出各个层的最终位置，一组命令由 Direct3D/OpenGL发出，GPU命令缓冲区清空，命令传至GPU并异步渲染，帧被送到Window Server。




（7）Ajax数据获取
我在前端开发中是习惯使用fetch库进行数据抓取，同时如果涉及到跨域数据抓取，还会使用JSONP跨域或者CORS跨域请求协议。




# Rendering
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/6/4/56A2BDBE-4ABE-4269-B961-2BB1EA253F48.png)




![](http://delai.me/code/content/images/2016/01/render-tree-construction.png)


## Create/Update DOM
## Request Resources
## Create/Update Render CSSOM(CSS Object Model)
## Create/Update Render Tree

## Layout
布局，就是浏览器计算DOM元素的几何信息的过程：元素大小和在页面中的位置。每个元素都有一个显式或隐式的大小信息，决定于其CSS属性的设置、或是元素本身内容的大小、抑或是其父元素的大小。在Blink/WebKit内核的浏览器和IE中，这个过程称为布局。在基于Gecko的浏览器（比如Firefox）中，这个过程称为Reflow。虽然称呼不一样，但二者在本质上是一样的。
## Painting





 