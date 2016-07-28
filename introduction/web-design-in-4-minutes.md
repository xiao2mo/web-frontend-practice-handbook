> 本文从属于笔者的[Web前端入门与最佳实践系列文章](https://github.com/wxyyxc1992/web-frontend-practice-handbook),本文只是文字化的归纳,
请前往[这里](http://wxyyxc1992.github.io/web-design-in-4-minutes.html)交互式的浏览整个文档与查看效果。
> 重要的事情说三遍,请移步[这里](http://wxyyxc1992.github.io/web-design-in-4-minutes.html)
> 重要的事情说三遍,请移步[这里](http://wxyyxc1992.github.io/web-design-in-4-minutes.html)
> 重要的事情说三遍,请移步[这里](http://wxyyxc1992.github.io/web-design-in-4-minutes.html)


当你希望分享一些产品、文件或者一个新的想法在你 *自己的* 网站上时,在你正式的发布网站之前,你需要把它打扮的漂漂亮亮,充满吸引力,不一定专业,但是至少要*得体* .        

那么我们应该从 [哪里](http://wxyyxc1992.github.io/web-design-in-4-minutes.html#content) 启动呢?如果你想了解我是怎么做的,那么请点击左边的链接

## 内容

别忘了, **设计** 是为了更好地展示内容. 貌似这是一句废话,不过还是要强调网站中 **首要** 的元素正是内容, 而不应该置若罔闻,放到最后.        

我们正在编写的内容,就好像你看到的这段话,占据了一个网站90%以上的部分,为文本内容添加合适的样式任重而道远.

假设你已经决定好了要展示的内容,然后创建了一个空白的 `style.css` 文件,那么 [第一条自定义样式规则](http://wxyyxc1992.github.io/web-design-in-4-minutes.html#centering) 会是啥呢?

## 居中

在单行中放置过长的文本会难以解析,并且难以 **阅读**. 为每行的单词数目设置一个上限有助于提升整体的可读性,让读者好像为文本建立了一个笆篱

```
    body {
        margin: 0 auto;
        max-width: 50em;
    }
```

我们已经为 *文本块*设置了样式, 那么应该如何为 [文本本身](http://wxyyxc1992.github.io/web-design-in-4-minutes.html#font-family)添加样式呢?

## Font family

浏览器默认的字体是 `"Times"`, 有时候看上去是如此的枯燥无味. 尝试使用 **无衬线字体**譬如 `"Helvetica"` 或者 `"Arial"` 能够提升你整个界面的感官        

```
    body {
        font-family:
        "Helvetica",
        "Arial", sans-serif;
    }
```

*如果你打算使用衬线字体,试试 "Georgia".*

我们选择一些有趣的字体,能够让网站更有 *吸引力*, 下一步,就让我们再 [提高可读性](http://wxyyxc1992.github.io/web-design-in-4-minutes.html#spacing).        

王下邀月熊:这里原作者是为英文字体样式做了说明,我没有修改为中文样式,大概是懒吧,不过因为中文字体往往都比较大,建议使用font-spider等类似工具来抽取你所需要的字体

## 间隔

有时候用户会抱怨网站好像坏掉了,往往都是 **间隔** 的问题. 在你文档的 *四周* 与 *内部*都添加些间隔也能够美化你的网站.        

```
body {
  line-height: 1.5;
  padding: 4em 1em;
}

  h2 {
  margin-top: 1em;
  padding-top: 1em;
}
```

​ 现在网站看上去好了不少了,布局方面提升了很多,下一步我们进行些 [细节的美化](http://wxyyxc1992.github.io/web-design-in-4-minutes.html#color-contrast).        

## 颜色 & 反差

白底黑字有时候会看起来很刺眼. 为body选择一个阴影较浅的字体会带来 **舒适的** 阅读体验.

```
body {
  color: #555;
}
```

同时为了保证较好地 **反差**, 我们会为 **重要的** 单词选择使用深色的字体颜色

```
h1,
h2,
strong {
  color: #333;
}
```

现在页面可视化感受已经提升了不少, 而一些特殊的文本,譬如代码的显示 [还是不太合适](http://wxyyxc1992.github.io/web-design-in-4-minutes.html#balance).

## 和谐

只需要一些小小的操作就能让整个页面更加地和谐:

```
code,
pre {
  background: #eee;
}

code {
  padding: 2px 4px;
  vertical-align: text-bottom;
}

pre {
  padding: 1em;
}
```

到这里你的页面已经达到了平均水平,我们下面希望给它一些独特的 [标志](http://wxyyxc1992.github.io/web-design-in-4-minutes.html#primary-color).        

## 原色

很多的品牌都会选用某个 **primary color** 作为其独特的标志,而在网站中,我们往往在某些交互地元素,譬如**链接上**设置一些醒目的颜色.

```
a {
  color: #e81c4f;
}
```

同样是为了和偕,我们需要添加 [额外的色彩](http://wxyyxc1992.github.io/web-design-in-4-minutes.html#secondary-colors).

## 二次色

我们可以为边、背景乃至于body字体颜色设置更多的个性化显示.

```
body {
  color: #566b78;
}

code,
pre {
  background: #f5f7f9;
  border-bottom: 1px solid #d8dee9;
  color: #a7adba;
}

pre {
  border-left: 2px solid #69c;
}
```

下面,我们考虑来改造下字体的 [形状](http://wxyyxc1992.github.io/web-design-in-4-minutes.html#custom-font)...        

## 自定义字体

上文中也提到过,文本是网站的主要内容,那么我们设置一个 **自定义的字体** 会为页面添加更多明显的标志.

你可以选择使用类似于 [Typekit](https://typekit.com/)这样的在线服务或者自定义些webfont, 我们这里使用来自于 免费的 [Google Fonts](https://fonts.google.com/) 服务的: `"Roboto"`

```
@import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500';

body {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
}
```

我们已经为 *文本*做了很多改造, 那么应该如何添加 [其他元素呢?](http://wxyyxc1992.github.io/web-design-in-4-minutes.html#images)...        

## ![Spongebob rainbow meme saying 'Images'](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/7/3/images.png)

Graphics 与 icons 也是不错的网站装饰物,能够提升你文本的感染力,或者更积极地传递你在文本中包含的内容

我们首先为页首设置 **背景图** ,这张图片选自 [Unsplash](https://unsplash.com/photos/qH36EgNjPJY)

```
header {
  background-color: #263d36;
  background-image: url("header.jpg");
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  line-height: 1.2;
  padding: 10vw 2em;
  text-align: center;
}
```

然后添加一个 **logo**

```
header img {
  display: inline-block;
  height: 120px;
  vertical-align: top;
  width: 120px;
}
```

再改进下文本的样式.

```
header h1 {
  color: white;
  font-size: 2.5em;
  font-weight: 300;
}

header a {
  border: 1px solid #e81c4f;
  border-radius: 290486px;
  color: white;
  font-size: 0.6em;
  letter-spacing: 0.2em;
  padding: 1em 2em;
  text-transform: uppercase;
  text-decoration: none;
  transition: none 200ms ease-out;
  transition-property: color, background;
}

header a:hover {
  background:  #e81c4f;
  color: white;
}
```

[And voilà](http://wxyyxc1992.github.io/web-design-in-4-minutes.html#header)!

我们已经在短短几分钟之内设计了个得体的页面,这些都是遵循基本的网站设计原则,那么,还有 [最后一件事](http://wxyyxc1992.github.io/web-design-in-4-minutes.html#share) 等着我们去做~