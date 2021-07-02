# webpack

## 1. webpack的基本功能和工作原理？

- 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等等

- 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等

- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载

- 模块合并：在采用模块化的项目有很多模块和文件，需要构建功能把模块分类合并成一个文件

- 自动刷新：监听本地源代码的变化，自动构建，刷新浏览器

- 代码校验：在代码被提交到仓库前需要检测代码是否符合规范，以及单元测试是否通过

- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

## 2. webpack构建过程

1. 从entry里配置的module开始递归解析entry依赖的所有module

2. 每找到一个module，就会根据配置的loader去找对应的转换规则

3. 对module进行转换后，再解析出当前module依赖的module

4. 这些模块会以entry为单位分组，一个entry和其所有依赖的module被分到一个组Chunk

5. 最后webpack会把所有Chunk转换成文件输出

6. 在整个流程中webpack会在恰当的时机执行plugin里定义的逻辑

## 3. webpack打包原理

将所有依赖打包成一个bundle.js，通过代码分割成单元片段按需加载

## 4. 什么是loader，plugins?

- loader是用来告诉webpack如何转换某一类型的文件，并且引入到打包出的文件中。
- plugins(插件)作用更大，可以打包优化，资源管理和注入环境变量

## 5. 什么是bundle,chunk,module?

bundle是webpack打包出来的文件，chunk是webpack在进行模块的依赖分析的时候，代码分割出来的代码块。module是开发中的单个模块

## 6. webpack-dev-server和http服务器如nginx有什么区别？

webpack-dev-server使用内存来存储webpack开发环境下的打包文件，并且可以使用模块热更新，相比传统http服务器开发更加简单高效

## 7. 什么是Tree-shaking？CSS可以Tree-shaking？

Tree-shaking是指在打包中取出那些引入了但在代码中没有被用到的死代码。webpack中通过uglifysPlugin来Tree-shaking JS。CSS需要使用purify-CSS

## 8. dev-server是怎么跑起来的

webpack-dev-server支持两种模式来自动刷新页面

- iframe模式（页面放在iframe中，当发送改变时重载） 无需额外配置，只要以这种格式url访问即可。`http://localhost:8080/webpack-dev-server/index.html`
- inline模式（将webpack-dev-server的客户端入口添加到bundle中） inline模式下url不用发生变化，但启动inline模式分两种情况

```javascript
// 以命令行启动webpack-dev-server有两种方式
// 方式1 在命令行中添加--inline命令
// 方式2 在webpack-config.js添加devServer:{inline: true}
// 以node.js API启动有两种方式
// 方式1 添加webpack-dev-server/client?http://localhost:8080/到webpack配置的entry入口点
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
// 将<script src="http://localhost:8080/webpack-dev-server.js"></script>添加到html文件中
```