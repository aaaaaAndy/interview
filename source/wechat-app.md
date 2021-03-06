# 微信小程序

## 1. 请谈谈微信小程序各个文件的作用

-   project.config.json 项目配置文件，用得最多的就是配置是否开启https校验；
-   App.js 设置一些全局的基础数据等；
-   App.json 底部tab, 标题栏和路由等设置；
-   App.wxss 公共样式，引入iconfont等；
-   pages 里面包含一个个具体的页面；
-   index.json (配置当前页面标题和引入组件等)；
-   index.wxml (页面结构)；
-   index.wxss (页面样式表)；
-   index.js (页面的逻辑，请求和数据处理等)；

## 2. 简单描述下微信小程序的相关文件类型

1.  wxml 模板文件，是框架设计的一套标签语言，结合基础组件、事件系统、可以构建出页面的结构
2.  wxss 样式文件，是一套样式语言，用于描述WXML的组件样式
3.  js 脚本逻辑文件，逻辑处理网络请求
4.  json 配置文件，小程序设置，如页面注册，页面标题及tabBar
5.  app.json 整个小程序的全局配置，包括：
    -   pages:[所有页面路径]
    -   网络设置（网络超时时间）
    -   界面表现（页面注册）
    -   window:{背景色、导航样式、默认标题}
    -   底部tab等
6.  app.js 监听并处理小程序的生命周期函数、声明全局变量
7.  app.wxss 全局配置的样式文件

## 3. 请谈谈wxml与标准的html的异同？

-   都是用来描述页面的结构；
-   都由标签、属性等构成；
-   标签名字不一样，且小程序标签更少，单一标签更多；
-   多了一些 wx:if 这样的属性以及 {{ }} 这样的表达式
-   WXML仅能在微信小程序开发者工具中预览，而HTML可以在浏览器内预览
-   组件封装不同， WXML对组件进行了重新封装，
-   小程序运行在JS Core内，没有DOM树和window对象，小程序中无法使用window对象和document对象。

## 4. 请谈谈WXSS和CSS的异同？

-   都是用来描述页面的样子；
-   WXSS 具有 CSS 大部分的特性，也做了一些扩充和修改；
-   WXSS新增了尺寸单位，WXSS 在底层支持新的尺寸单位 rpx；
-   WXSS 仅支持部分 CSS 选择器；
-   WXSS 提供全局样式与局部样式
-   WXSS 不支持window和dom 文档流

## 5. 小程序页面间有哪些传递数据的方法？

1.  给html元素添加data-*属性来传递值，然后通过e.currentTarget.dataset或onload的param参数获取。注：data-名称不能有大写字母、不可以存放对象
2.  设置id的方法标识来传值，通过e.currentTarget.id获取设置的id的值，然后通过设置全局对象的方式来传递数值
3.  在navigator中添加参数数值

或

1.  使用全局变量实现数据传递
2.  页面跳转或重定向时，使用url带参数传递数据
3.  使用组件模板template传递参数
4.  使用缓存传递参数
5.  使用数据库传递参数

## 6. 请谈谈小程序的双向绑定和vue的异同？

大体相同，但小程序直接this.data的属性是不可以同步到视图的，必须调用this.setData()方法！

1.  双向绑定：vue默认支持双向绑定，微信小程序需要借助data。 
2.  取值：vue中，通过this.reason取值。小程序中，通过this.data.reason取值。 
3.  定义方法：小程序使用 在app.js中定义即可，vue的方法通过写在method中进行定义。



1.  去变量的时候：   - 小程序  wx:for = "lists"   - Vue是  v-for = "item in lists" 
2.  调用data模型（赋值）的时候：   - 小程序：this.data.item //调用  this.setData({item:1}) //赋值   - vue: this.item //调用  this.item =1 //赋值     小程序的双向绑定实际上并不是双向绑定 如果在小程序.js文件中改变了某个变量的值 那么页面上的值并不会跟着改变 如果想要页面上的值也跟着改变的话 需要通过setData来操作 而Vue默认就是双向绑定 只改变了某个变量的值 页面上也会跟着改变

## 7. 分析微信小程序的优劣势？

-   优势：
    1.  容易上手，基础组件库比较全，基本上不需要考虑兼容问题；
    2.  开发文档比较完善，开发社区比较活跃，支持插件式开发；
    3.  良好的用户体验：无需下载，通过搜索和扫一扫就可以打开，打开速度快，安卓上可以添加到桌面，与原生APP差不多；
    4.  开发成本比APP要低；
    5.  为用户提供良好的安全保障（小程序发布 严格的审查流程）
-   劣势：
    1.  限制较多，页面大小不能超过1M，不能打开超过5个层级的页面；
    2.  样式单一，部分组件已经是成型了的，样式不可修改，例如：幻灯片、导航
    3.  推广面窄，不能分享朋友圈，只能通过分享给朋友，附近小程序推广
    4.  依托于微信，无法开发后台管理功能
    5.  后台调试麻烦，因为api接口必须https请求且公网地址
    6.  真机测试，个别功能安卓和苹果表现迥异，例如安卓的定位功能加载很慢