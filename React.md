## React

### 1. 什么是react

>   React - A JavaScript library for building user interface.

`React`是`Facebook`在2011年开发的用于构建用户界面的`JavaScript`库，它官网的首页有三大特点：

1.  声明式：以声明式编写`UI`，让你的代码更可靠([什么是声明式](https://zhuanlan.zhihu.com/p/26085755))；
2.  组件化：可以创建高可复用组件；
3.  一次学习，处处编写：支持`Node`端渲染，支持`React Native`开发跨平台应用；

### 2. 虚拟DOM

#### 2.1 基本定义

​	虚拟`DOM (VDOM)`是真实`DOM`在内存中的表示。`UI`的表示形式保存在内存中，并与实际的`DOM`同步。这是一个发生在渲染函数被调用和元素在屏幕上显示之间的步骤，整个过程被称为调和。

​	`Virtual DOM` 是一个轻量级的 `JavaScript` 对象，它最初只是`real DOM`的副本。它是一个节点树，它将元素、它们的属性和内容作为对象及其属性。`React`的渲染函数从`React`组件中创建一个节点树。然后它响应数据模型中的变化来更新该树，该变化是由用户或系统完成的各种动作引起的。

#### 2.2 虚拟`DOM`优劣

1.  优点:

- 保证性能下限: 虚拟DOM可以经过diff找出最小差异,然后批量进行patch,这种操作虽然比不上手动优化,但是比起粗暴的DOM操作性能要好很多,因此虚拟DOM可以保证性能下限
- 无需手动操作DOM: 虚拟DOM的diff和patch都是在一次更新中自动进行的,我们无需手动操作DOM,极大提高开发效率
- 跨平台: 虚拟DOM本质上是JavaScript对象,而DOM与平台强相关,相比之下虚拟DOM可以进行更方便地跨平台操作,例如服务器渲染、移动端开发等等

2.  缺点:

- 无法进行极致优化: 在一些性能要求极高的应用中虚拟DOM无法进行针对性的极致优化,比如VScode采用直接手动操作DOM的方式进行极端的性能优化。首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比innerHTML插入慢。

#### 2.3 与真实`DOM`对比

| **Real DOM**                   | **Virtual  DOM**               |
| ------------------------------ | ------------------------------ |
| 1. 更新缓慢。                  | 1. 更新更快。                  |
| 2. 可以直接更新 HTML。         | 2. 无法直接更新 HTML。         |
| 3. 如果元素更新，则创建新DOM。 | 3. 如果元素更新，则更新 JSX 。 |
| 4. DOM操作代价很高。           | 4. DOM 操作非常简单。          |
| 5. 消耗的内存较多。            | 5. 很少的内存消耗。            |

### 3. react有哪些优缺点

1. 优点

-   它提高了应用的性能

-   可以方便地在客户端和服务器端使用

-   由于 JSX，代码的可读性很好

-   React 很容易与 Meteor，Angular 等其他框架集成

-   使用React，编写UI测试用例变得非常容易

2.  缺点

-   React 只是一个库，而不是一个完整的框架

-   它的库非常庞大，需要时间来理解

-   新手程序员可能很难理解

-   编码变得复杂，因为它使用内联模板和 JSX

3.  特点

-   它使用**虚拟DOM **而不是真正的DOM。

-   它可以用**服务器端渲染**。

-   它遵循**单向数据流**或数据绑定。

### 4. `JSX`

​	当`Facebook`第一次发布`React`时，他们还引入了一种新的`JavaScript`方言`JSX`，它不能被浏览器读取，必须使用`Babel`和`webpack`等工具将其转换为传统的`JS`。

​	`JSX` 是`JavaScript XML`的简写，它利用`JavaScript`的表现力和类似`HTML`的模板语法。这使得`HTML`文件非常容易理解。此文件能使应用非常可靠，并能够提高其性能。

### 5. `react`与`angular`有何不同

| **主题**      | **React**          | **Angular**   |
| ------------- | ------------------ | ------------- |
| *1. 体系结构* | 只有 MVC 中的 View | 完整的 MVC    |
| *2. 渲染*     | 可以在服务器端渲染 | 客户端渲染    |
| *3. DOM*      | 使用 virtual DOM   | 使用 real DOM |
| *4. 数据绑定* | 单向数据绑定       | 双向数据绑定  |
| *5. 调试*     | 编译时调试         | 运行时调试    |
| *6. 作者*     | Facebook           | Google        |

### 6. `render()`

​	每个React组件强制要求必须有一个`render()`。它返回一个`React`元素，是原生`DOM`组件的表示。如果需要渲染多个`HTML`元素，则必须将它们组合在一个封闭标记内，例如 `<form>`、`<group>`、`<div>` 等。此函数必须保持纯净，即必须每次调用时都返回相同的结果。

### 7. `state`与`props`

#### 7.1 什么是`state`

​	状态是`React`组件的核心，是数据的来源，必须尽可能简单。基本上状态是确定组件呈现和行为的对象。与`props`不同，它们是可变的，并创建动态和交互式组件。可以通过 `this.state` 访问它们。

#### 7.2 什么是`props`

​	`Props`是`React`中属性的简写。它们是只读组件，必须保持纯，即不可变。它们总是在整个应用中从父组件传递到子组件。子组件永远不能将`prop`送回父组件。这有助于维护单向数据流，通常用于呈现动态生成的数据。

#### 7.3 `state`和`props`区别

`props`和`state`是普通的`JavaScript`对象，虽然他们都包含影响渲染输出的信息，但是他们在组件方面的功能是不同的，即：

-   `state`是组件自己管理数据，控制自己的状态，可变；
-   `props`是外部传入的数据参数，不可变；
-   没有`state`的叫做无状态组件，有`state`的叫做有状态组件；
-   多用`props`,少用`state`，也就是多写无状态组件。

#### 7.4 区分有状态和无状态组件

| **有状态组件**                                               | **无状态组件**                                  |
| ------------------------------------------------------------ | ----------------------------------------------- |
| 1. 在内存中存储有关组件状态变化的信息                        | 1. 计算组件的内部的状态                         |
| 2. 有权改变状态                                              | 2. 无权改变状态                                 |
| 3. 包含过去、现在和未来可能的状态变化情况                    | 3. 不包含过去，现在和未来可能发生的状态变化情况 |
| 4. 接受无状态组件状态变化要求的通知，然后将 `props`发送给他们。 | 4.从有状态组件接收`props`并将其视为回调函数。   |

### 8. `refs`

#### 8.1 基础定义

​	`Refs`是`React`中引用的简写。它是一个有助于存储对特定的`React`元素或组件的引用的属性，它将由组件渲染配置函数返回。用于对`render()`返回的特定元素或组件的引用。当需要进行`DOM`测量或向组件添加方法时，它们会派上用场。以下是应该使用`refs`的情况：

- 需要管理焦点、选择文本或媒体播放时;
- 触发式动画,一些极致的动画处理，需要操作`DOM`时；
- 与第三方`DOM`库集成

​	经常被误解的只有在类组件中才能使用`refs`，但是`refs`也可以通过利用`JavaScript`中的闭包与函数组件一起使用：

```jsx
function CustomForm({ handleSubmit }) {
  let inputElement;
  
  return (
  	 <form onSubmit={() => handleSubmit(inputElement.value)}>
      <input
        type='text'
        ref={(input) => inputElement = input} />
      <button type='submit'>Submit</button>
    </form>
  )
}
```

#### 8.4 如何创建`refs`

古往今来有四种方法可以创建`refs`：

1.  字符串

    ```jsx
    import React from 'react';
    
    class App extends React.Component {
      inputRef = null;
    
    	render() {
        return (
        	<input ref="inputRef" />
        )
      }
    }
    ```

    

2.  回调函数

    ```jsx
    import React from 'react';
    
    function App() {
      let inputRef = null;
      
      return (
      	<input ref={(ref) => { inputRef = ref; }} />
      )
    }
    ```

3.  `createRef()`

    ```jsx
    import React, { createRef } from 'react';
    
    class App extends React.Component {
      inputRef = createRef();
    
    	render() {
        return (
        	<input ref={this.inputRef} />
        )
      }
    }
    ```

    

4.  `useRef()`

    ```jsx
    import React, { useRef } from 'react';
    
    function App() {
      let inputRef = useRef();
      
      return (
      	<input ref={inputRef} />
      )
    }
    ```

#### 8.5 为什么要废除字符串方法

-   由于无法知道`this`，所以需要`react`去跟踪当前组件，这就会拖慢`react`的效率；
-   无法在一个子元素上放置多个`ref`,即无法对`ref`进行组合，回调函数可以对`ref`进行操作；
-   `String ref`不能使用`Flow`之类的静态分析，`Flow`不能猜测框架使用的`ref`的神奇效果和类型，回调引用比静态分析更更友好；

### 9. `key`

​	`key`用于识别唯一的`Virtual DOM`元素及其驱动`UI`的相应数据。它们通过回收`DOM`中当前所有的元素来帮助`React`优化渲染。这些`key`必须是唯一的数字或字符串,`React`只是重新排序元素而不是重新渲染它们。这可以提高应用程序的性能。

### 10. 生命周期

16.3之前生命周期：

![lifecycle-old](https://raw.githubusercontent.com/aaaaaAndy/picture/main/images/lifecycle-old.jpg)

![16ea6f5e9424c2a2](https://raw.githubusercontent.com/aaaaaAndy/picture/main/images/16ea6f5e9424c2a2.png)





16.3之后生命周期：

其中16.3与16.4之后的声明周期也有些许不同，具体可看：[生命周期图谱](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

![lifecyclt-new](https://raw.githubusercontent.com/aaaaaAndy/picture/main/images/20210129135428.jpg)



### 11. 高阶组件
>   译注：永远不要在 `React render()` 方法中定义 `React` 组件（甚至是无状态组件）。`React` 在每次更新状态的时候，都会废弃旧的 `html DOM` 元素并将其替换为全新的元素。比如在 `render()` 函数中定义一个输入组件，元素被替换之后就会失去焦点，每次只能输入一个字符。

#### 1. 参考文档

1.  [深入理解React高阶组件](https://zhuanlan.zhihu.com/p/24776678)

2.  [React高阶组件入门](https://juejin.cn/post/6844904050236850184#heading-11)

#### 2. 基础

高阶组件`HOC`是`react`中用于组件复用逻辑的一种高级技巧，它并不是一个新的`API`，而是一种基于`React`组件特性的一种设计模式。

需要注意的是：组件是将`props`转化为`UI`，而高阶组件是将组件转化为另一种组件。

高阶组件`（HOC）`是接收一个组件并返回一个组建的函数。基本上，这是一种模式，从`React`的组合特性中衍生出来。

```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

#### 3. 适用情况

高阶组件可用于以下情况：

-   属性代理`(props proxy)`
    -   操作`props`
    -   抽象`state`
    -   获取`refs`引用
    -   获取原组件的`static`方法
    -   通过`props`实现条件渲染
    -   用其他元素包裹传入组件
-   反向继承
    -   渲染劫持
    -   劫持原组件生命周期方法
    -   读取/操作原组件state

#### 4. 属性代理和反向继承的对比

属性代理是从“组合”的角度出发，这样有利于从外部去操作 `WrappedComponent`，可以操作的对象是 `props`，或者在 `WrappedComponent` 外面加一些拦截器，控制器等。

反向继承则是从“继承”的角度出发，是从内部去操作 `WrappedComponent`，也就是可以操作组件内部的 `state` ，生命周期，`render`函数等等。

### 12. `super`

在调用`super()`方法之前，子类构造函数无法使用`this`引用，`ES6`子类也是如此。将`props`参数传递给`super()`调用的主要原因是在子构造函数中能够通过`this.props`来获取传入的`props`。

```jsx
class App extends Component{
  constructor(props) {
    super(props);
    
    console.log(this.props);
  }
}
```

### 13. `StrictMode`

`React`的`StrictMode`是一种辅助组件，可以使用`<StrictMode />`包装一组组件，并且可以帮我们检查：

-   验证组件内部是否遵循某些推荐做法，如果没有，会在控制台给出警告；
-   验证是否使用已经废弃的方法，如果有，给出警告；
-   通过识别潜在的风险预防一些副作用。

### 14. `prop drilling`

在构建 React 应用程序时，在多层嵌套组件来使用另一个嵌套组件提供的数据。最简单的方法是将一个 `prop` 从每个组件一层层的传递下去，从源组件传递到深层嵌套组件，这叫做**prop drilling**。

`prop drilling`的主要缺点是原本不需要数据的组件变得不必要地复杂，并且难以维护。

为了避免`prop drilling`，一种常用的方法是使用**React Context**。通过定义提供数据的`Provider`组件，并允许嵌套的组件通过`Consumer`组件或`useContext` Hook 使用上下文数据



### 15. 什么是fiber

`React Fiber` 是一种基于浏览器的**单线程调度算法**.

`React 16`之前，`reconcilation` 算法实际上是递归，想要中断递归是很困难的，`React 16`开始使用了循环来代替之前的递归.

`Fiber` 是`React 16`中新的协调引擎或重新实现核心算法。它的主要目标是支持虚拟DOM的增量渲染。`React Fiber`的目标是提高其在动画、布局、手势、暂停、中止或重用等方面的适用性，并为不同类型的更新分配优先级，以及新的并发原语。

`React Fiber`的目标是增强其在动画、布局和手势等领域的适用性。它的主要特性是增量渲染:能够将渲染工作分割成块，并将其分散到多个帧中。

### 16. 如何避免组件重新渲染

`React`中最常见的问题之一是组件不必要的重新渲染，`React`提供了两种方法，在这些情况下非常有用：

-   `React.memo()`：这可以防止不必要地重新渲染函数组件
-   `PureComponent`：这可以防止不必要地重新渲染类组件

这两种方法都依赖于对传递给组件的`props`的浅比较，如果`props`没有改变，那么组件不会重新渲染。虽然这两种工具都非常有用，但是浅比较会带来额外的性能损失，因此如果使用不当，这两种方法都会对性能产生负面影响。

### 17. 纯函数

纯函数是不依赖并且不会再其作用域之外修改变量状态的函数。本质上，纯函数时钟在给定相同参数的情况下返回相同的结果。



### 为什么使用框架

1.  框架的好处:

-   组件化: 其中以 React 的组件化最为彻底,甚至可以到函数级别的原子组件,高度的组件化可以是我们的工程易于维护、易于组合拓展。

-   天然分层: JQuery 时代的代码大部分情况下是面条代码,耦合严重,现代框架不管是 MVC、MVP还是MVVM 模式都能帮助我们进行分层，代码解耦更易于读写。

-   生态: 现在主流前端框架都自带生态,不管是数据流管理架构还是 UI 库都有成熟的解决方案。

-   开发效率: 现代前端框架都默认自动更新DOM,而非我们手动操作,解放了开发者的手动DOM成本,提高开发效率,从根本上解决了UI 与状态同步问题.



-   [什么时候使用状态管理器？](https://github.com/haizlin/fe-interview/issues/953)
-   [render函数中return如果没有使用()会有什么问题？](https://github.com/haizlin/fe-interview/issues/952)
-   [componentWillUpdate可以直接修改state的值吗？](https://github.com/haizlin/fe-interview/issues/951)
-   [说说你对React的渲染原理的理解](https://github.com/haizlin/fe-interview/issues/950)
-   [什么渲染劫持？](https://github.com/haizlin/fe-interview/issues/949)
-   [React Intl是什么原理？](https://github.com/haizlin/fe-interview/issues/948)
-   [你有使用过React Intl吗？](https://github.com/haizlin/fe-interview/issues/947)
-   [怎么实现React组件的国际化呢？](https://github.com/haizlin/fe-interview/issues/946)
-   [说说Context有哪些属性？](https://github.com/haizlin/fe-interview/issues/945)
-   [怎么使用Context开发组件？](https://github.com/haizlin/fe-interview/issues/944)
-   [为什么React并不推荐我们优先考虑使用Context？](https://github.com/haizlin/fe-interview/issues/943)
-   [除了实例的属性可以获取Context外哪些地方还能直接获取Context呢？](https://github.com/haizlin/fe-interview/issues/942)
-   [childContextTypes是什么？它有什么用？](https://github.com/haizlin/fe-interview/issues/941)
-   [contextType是什么？它有什么用？](https://github.com/haizlin/fe-interview/issues/940)
-   [Consumer向上找不到Provider的时候怎么办？](https://github.com/haizlin/fe-interview/issues/939)
-   [有使用过Consumer吗？](https://github.com/haizlin/fe-interview/issues/938)
-   [在React怎么使用Context？](https://github.com/haizlin/fe-interview/issues/937)
-   [React15和16别支持IE几以上？](https://github.com/haizlin/fe-interview/issues/936)
-   [说说你对windowing的了解](https://github.com/haizlin/fe-interview/issues/935)
-   [举例说明React的插槽有哪些运用场景？](https://github.com/haizlin/fe-interview/issues/934)
-   [你有用过React的插槽(Portals)吗？怎么用？](https://github.com/haizlin/fe-interview/issues/933)
-   [React的严格模式有什么用处？](https://github.com/haizlin/fe-interview/issues/932)
-   [React如何进行代码拆分？拆分的原则是什么？](https://github.com/haizlin/fe-interview/issues/931)
-   [React组件的构造函数有什么作用？](https://github.com/haizlin/fe-interview/issues/930)
-   [React组件的构造函数是必须的吗？](https://github.com/haizlin/fe-interview/issues/929)
-   [React中在哪捕获错误？](https://github.com/haizlin/fe-interview/issues/928)
-   [React怎样引入svg的文件？](https://github.com/haizlin/fe-interview/issues/927)
-   [说说你对Relay的理解](https://github.com/haizlin/fe-interview/issues/926)
-   [在React中你有经常使用常量吗？](https://github.com/haizlin/fe-interview/issues/925)
-   [为什么说React中的props是只读的？](https://github.com/haizlin/fe-interview/issues/924)
-   [你有使用过formik库吗？说说它的优缺点](https://github.com/haizlin/fe-interview/issues/923)
-   [你有用过哪些React的表单库吗？说说它们的优缺点](https://github.com/haizlin/fe-interview/issues/901)
-   [如果组件的属性没有传值，那么它的默认值是什么？](https://github.com/haizlin/fe-interview/issues/900)
-   [可以使用TypeScript写React应用吗？怎么操作？](https://github.com/haizlin/fe-interview/issues/899)
-   [`super()`和`super(props)`有什么区别？](https://github.com/haizlin/fe-interview/issues/898)
-   [你有使用过loadable组件吗？它帮我们解决了什么问题？](https://github.com/haizlin/fe-interview/issues/897)
-   [你有使用过suspense组件吗？它帮我们解决了什么问题？](https://github.com/haizlin/fe-interview/issues/896)
-   [怎样动态导入组件？](https://github.com/haizlin/fe-interview/issues/895)
-   [如何给非控组件设置默认的值？](https://github.com/haizlin/fe-interview/issues/894)
-   [怎么在React中引入其它的UI库，例如Bootstrap](https://github.com/haizlin/fe-interview/issues/893)
-   [怎样将事件传递给子组件？](https://github.com/haizlin/fe-interview/issues/892)
-   [怎样使用Hooks获取服务端数据？](https://github.com/haizlin/fe-interview/issues/891)
-   [使用Hooks要遵守哪些原则？](https://github.com/haizlin/fe-interview/issues/890)
-   [render方法的原理你有了解吗？它返回的数据类型是什么？](https://github.com/haizlin/fe-interview/issues/889)
-   [useEffect和useLayoutEffect有什么区别？](https://github.com/haizlin/fe-interview/issues/888)
-   [在React项目中你用过哪些动画的包？](https://github.com/haizlin/fe-interview/issues/887)
-   [React必须使用JSX吗？](https://github.com/haizlin/fe-interview/issues/886)
-   [自定义组件时render是可选的吗？为什么？](https://github.com/haizlin/fe-interview/issues/885)
-   [需要把keys设置为全局唯一吗？](https://github.com/haizlin/fe-interview/issues/884)
-   [怎么定时更新一个组件？](https://github.com/haizlin/fe-interview/issues/883)
-   [React根据不同的环境打包不同的域名？](https://github.com/haizlin/fe-interview/issues/882)
-   [使用webpack打包React项目，怎么减小生成的js大小？](https://github.com/haizlin/fe-interview/issues/881)
-   [在React中怎么使用async/await？](https://github.com/haizlin/fe-interview/issues/880)
-   [你阅读了几遍React的源码？都有哪些收获？你是怎么阅读的？](https://github.com/haizlin/fe-interview/issues/879)
-   [什么是React.forwardRef？它有什么作用？](https://github.com/haizlin/fe-interview/issues/878)
-   [写个例子说明什么是JSX的内联条件渲染](https://github.com/haizlin/fe-interview/issues/877)
-   [在React中怎么将参数传递给事件？](https://github.com/haizlin/fe-interview/issues/876)
-   [React的事件和普通的HTML事件有什么不同？](https://github.com/haizlin/fe-interview/issues/875)
-   [在React中怎么阻止事件的默认行为？](https://github.com/haizlin/fe-interview/issues/874)
-   [你最喜欢React的哪一个特性（说一个就好）？](https://github.com/haizlin/fe-interview/issues/873)
-   [在React中什么时候使用箭头函数更方便呢？](https://github.com/haizlin/fe-interview/issues/872)
-   [你最不喜欢React的哪一个特性（说一个就好）？](https://github.com/haizlin/fe-interview/issues/871)
-   [说说你对React的reconciliation（一致化算法）的理解](https://github.com/haizlin/fe-interview/issues/870)
-   [使用PropTypes和Flow有什么区别？](https://github.com/haizlin/fe-interview/issues/869)
-   [怎样有条件地渲染组件？](https://github.com/haizlin/fe-interview/issues/868)
-   [在JSX中如何写注释？](https://github.com/haizlin/fe-interview/issues/867)
-   [constructor和getInitialState有不同？](https://github.com/haizlin/fe-interview/issues/866)
-   [写例子说明React如何在JSX中实现for循环](https://github.com/haizlin/fe-interview/issues/865)
-   [为什么建议Fragment包裹元素？它的简写是什么？](https://github.com/haizlin/fe-interview/issues/864)
-   [你有用过React.Fragment吗？说说它有什么用途？](https://github.com/haizlin/fe-interview/issues/863)
-   [在React中你有遇到过安全问题吗？怎么解决？](https://github.com/haizlin/fe-interview/issues/862)
-   [React中如何监听state的变化？](https://github.com/haizlin/fe-interview/issues/861)
-   [React什么是有状态组件？](https://github.com/haizlin/fe-interview/issues/860)
-   [React v15中怎么处理错误边界？](https://github.com/haizlin/fe-interview/issues/859)
-   [React Fiber它的目的是解决什么问题？](https://github.com/haizlin/fe-interview/issues/858)
-   [React为什么不要直接修改state？如果想修改怎么做？](https://github.com/haizlin/fe-interview/issues/857)
-   [create-react-app有什么好处？](https://github.com/haizlin/fe-interview/issues/856)
-   [装饰器(Decorator)在React中有什么应用？](https://github.com/haizlin/fe-interview/issues/855)
-   [使用高阶组件(HOC)实现一个loading组件](https://github.com/haizlin/fe-interview/issues/854)
-   [如何用React实现滚动动画？](https://github.com/haizlin/fe-interview/issues/853)
-   [说出几点你认为的React最佳实践](https://github.com/haizlin/fe-interview/issues/852)
-   [你是如何划分React组件的？](https://github.com/haizlin/fe-interview/issues/851)
-   [举例说明如何在React创建一个事件](https://github.com/haizlin/fe-interview/issues/850)
-   [如何更新组件的状态？](https://github.com/haizlin/fe-interview/issues/849)
-   [怎样将多个组件嵌入到一个组件中？](https://github.com/haizlin/fe-interview/issues/848)
-   [React的render中可以写{if else}这样的判断吗？](https://github.com/haizlin/fe-interview/issues/847)
-   [React为什么要搞一个Hooks？](https://github.com/haizlin/fe-interview/issues/846)
-   [React Hooks帮我们解决了哪些问题？](https://github.com/haizlin/fe-interview/issues/845)
-   [使用React的memo和forwardRef包装的组件为什么提示children类型不对？](https://github.com/haizlin/fe-interview/issues/844)
-   [有在项目中使用过Antd吗？说说它的好处](https://github.com/haizlin/fe-interview/issues/843)
-   [在React中如果去除生产环境上的sourcemap？](https://github.com/haizlin/fe-interview/issues/842)
-   [在React中怎么引用sass或less？](https://github.com/haizlin/fe-interview/issues/841)
-   [组件卸载前，加在DOM元素的监听事件和定时器要不要手动清除？为什么？](https://github.com/haizlin/fe-interview/issues/840)
-   [为什么标签里的for要写成htmlFor呢？](https://github.com/haizlin/fe-interview/issues/839)
-   [状态管理器解决了什么问题？什么时候用状态管理器？](https://github.com/haizlin/fe-interview/issues/838)
-   [状态管理器它精髓是什么？](https://github.com/haizlin/fe-interview/issues/837)
-   [函数式组件有没有生命周期？为什么？](https://github.com/haizlin/fe-interview/issues/836)
-   [在React中怎么引用第三方插件？比如说jQuery等](https://github.com/haizlin/fe-interview/issues/835)
-   [React的触摸事件有哪几种？](https://github.com/haizlin/fe-interview/issues/834)
-   [路由切换时同一组件无法重新渲染的有什么方法可以解决？](https://github.com/haizlin/fe-interview/issues/833)
-   [React16新特性有哪些？](https://github.com/haizlin/fe-interview/issues/832)
-   [你有用过哪些React的UI库？它们的优缺点分别是什么？](https://github.com/haizlin/fe-interview/issues/831)
-   [`单击`和`单击`有什么区别？](https://github.com/haizlin/fe-interview/issues/830)
-   [在React中如何引入图片？哪种方式更好？](https://github.com/haizlin/fe-interview/issues/829)
-   [在React中怎么使用字体图标？](https://github.com/haizlin/fe-interview/issues/828)
-   [React的应用如何打包发布？它的步骤是什么？](https://github.com/haizlin/fe-interview/issues/827)
-   [ES6的语法'...'在React中有哪些应用？](https://github.com/haizlin/fe-interview/issues/826)
-   [如何封装一个React的全局公共组件？](https://github.com/haizlin/fe-interview/issues/825)
-   [在React中组件的props改变时更新组件的有哪些方法？](https://github.com/haizlin/fe-interview/issues/824)
-   [immutable的原理是什么？](https://github.com/haizlin/fe-interview/issues/823)
-   [你对immutable有了解吗？它有什么作用？](https://github.com/haizlin/fe-interview/issues/822)
-   [如何提高组件的渲染效率呢？](https://github.com/haizlin/fe-interview/issues/821)
-   [在React中如何避免不必要的render？](https://github.com/haizlin/fe-interview/issues/820)
-   [render在什么时候会被触发？](https://github.com/haizlin/fe-interview/issues/819)
-   [写出React动态改变class切换组件样式](https://github.com/haizlin/fe-interview/issues/818)
-   [React中怎么操作虚拟DOM的Class属性？](https://github.com/haizlin/fe-interview/issues/817)
-   [为什么属性使用className而不是class呢？](https://github.com/haizlin/fe-interview/issues/816)
-   [请说下react组件更新的机制是什么？](https://github.com/haizlin/fe-interview/issues/815)
-   [怎么在JSX里属性可以被覆盖吗？覆盖的原则是什么？](https://github.com/haizlin/fe-interview/issues/814)
-   [怎么在JSX里使用自定义属性？](https://github.com/haizlin/fe-interview/issues/813)
-   [怎么防止HTML被转义？](https://github.com/haizlin/fe-interview/issues/812)
-   [经常用React，你知道React的核心思想是什么吗？](https://github.com/haizlin/fe-interview/issues/811)
-   [在React中我们怎么做静态类型检测？都有哪些方法可以做到？](https://github.com/haizlin/fe-interview/issues/810)
-   [在React中组件的state和setState有什么区别？](https://github.com/haizlin/fe-interview/issues/809)
-   [React怎样跳过重新渲染？](https://github.com/haizlin/fe-interview/issues/808)
-   [React怎么判断什么时候重新渲染组件呢？](https://github.com/haizlin/fe-interview/issues/807)
-   [什么是React的实例？函数式组件有没有实例？](https://github.com/haizlin/fe-interview/issues/806)
-   [在React中如何判断点击元素属于哪一个组件？](https://github.com/haizlin/fe-interview/issues/805)
-   [在React中组件和元素有什么区别？](https://github.com/haizlin/fe-interview/issues/804)
-   [在React中声明组件时组件名的第一个字母必须是大写吗？为什么？](https://github.com/haizlin/fe-interview/issues/803)
-   [举例说明什么是高阶组件(HOC)的反向继承？](https://github.com/haizlin/fe-interview/issues/802)
-   [有用过React Devtools吗？说说它的优缺点分别是什么？](https://github.com/haizlin/fe-interview/issues/801)
-   [举例说明什么是高阶组件(HOC)的属性代理？](https://github.com/haizlin/fe-interview/issues/800)
-   [React的isMounted有什么作用？](https://github.com/haizlin/fe-interview/issues/799)
-   [React组件命名推荐的方式是哪个？为什么不推荐使用displayName？](https://github.com/haizlin/fe-interview/issues/798)
-   [React的displayName有什么作用？](https://github.com/haizlin/fe-interview/issues/797)
-   [说说你对React的组件命名规范的理解](https://github.com/haizlin/fe-interview/issues/796)
-   [说说你对React的项目结构的理解](https://github.com/haizlin/fe-interview/issues/795)
-   [React16废弃了哪些生命周期？为什么？](https://github.com/haizlin/fe-interview/issues/794)
-   [怎样在React中开启生产模式？](https://github.com/haizlin/fe-interview/issues/793)
-   [React中getInitialState方法的作用是什么？](https://github.com/haizlin/fe-interview/issues/792)
-   [React中你知道creatClass的原理吗？](https://github.com/haizlin/fe-interview/issues/791)
-   [React中验证props的目的是什么？](https://github.com/haizlin/fe-interview/issues/790)
-   [React中你有使用过getDefaultProps吗？它有什么作用？](https://github.com/haizlin/fe-interview/issues/789)
-   [React中你有使用过propType吗？它有什么作用？](https://github.com/haizlin/fe-interview/issues/788)
-   [React中怎么检验props？](https://github.com/haizlin/fe-interview/issues/787)
-   [React.createClass和extends Component的区别有哪些？](https://github.com/haizlin/fe-interview/issues/786)
-   [高阶组件(HOC)有哪些优点和缺点？](https://github.com/haizlin/fe-interview/issues/785)
-   [给组件设置很多属性时不想一个个去设置有什么办法可以解决这问题呢？](https://github.com/haizlin/fe-interview/issues/784)
-   [React16跟之前的版本生命周期有哪些变化？](https://github.com/haizlin/fe-interview/issues/756)
-   [怎样实现React组件的记忆？原理是什么？](https://github.com/haizlin/fe-interview/issues/755)
-   [创建React动画有哪些方式？](https://github.com/haizlin/fe-interview/issues/754)
-   [为什么建议不要过渡使用Refs？](https://github.com/haizlin/fe-interview/issues/753)
-   [在React使用高阶组件(HOC)有遇到过哪些问题？如何解决？](https://github.com/haizlin/fe-interview/issues/752)
-   [在使用React过程中什么时候用高阶组件(HOC)？](https://github.com/haizlin/fe-interview/issues/751)
-   [说说React diff的原理是什么？](https://github.com/haizlin/fe-interview/issues/724)
-   [React怎么提高列表渲染的性能？](https://github.com/haizlin/fe-interview/issues/723)
-   [使用ES6的class定义的组件不支持mixins了，那用什么可以替代呢？](https://github.com/haizlin/fe-interview/issues/722)
-   [为何说虚拟DOM会提高性能？](https://github.com/haizlin/fe-interview/issues/720)
-   [React的性能优化在哪个生命周期？它优化的原理是什么？](https://github.com/haizlin/fe-interview/issues/719)
-   [你知道的React性能优化有哪些方法？](https://github.com/haizlin/fe-interview/issues/718)
-   [举例说明在React中怎么使用样式？](https://github.com/haizlin/fe-interview/issues/717)
-   [React有哪几种方法来处理表单输入？](https://github.com/haizlin/fe-interview/issues/716)
-   [什么是浅层渲染？](https://github.com/haizlin/fe-interview/issues/715)
-   [你有做过React的单元测试吗？如果有，用的是哪些工具？怎么做的？](https://github.com/haizlin/fe-interview/issues/714)
-   [在React中什么是合成事件？有什么用？](https://github.com/haizlin/fe-interview/issues/713)
-   [使用React写一个todo应用，说说你的思路](https://github.com/haizlin/fe-interview/issues/712)
-   [React16的reconciliation和commit分别是什么？](https://github.com/haizlin/fe-interview/issues/711)
-   [React的函数式组件有没有生命周期？](https://github.com/haizlin/fe-interview/issues/710)
-   [useState和this.state的区别是什么？](https://github.com/haizlin/fe-interview/issues/709)
-   [请说说什么是useImperativeHandle？](https://github.com/haizlin/fe-interview/issues/708)
-   [请说说什么是useReducer？](https://github.com/haizlin/fe-interview/issues/707)
-   [请说说什么是useRef？](https://github.com/haizlin/fe-interview/issues/706)
-   [请说说什么是useEffect？](https://github.com/haizlin/fe-interview/issues/705)
-   [举例说明useState](https://github.com/haizlin/fe-interview/issues/704)
-   [请说说什么是useState？为什么要使用useState？](https://github.com/haizlin/fe-interview/issues/703)
-   [请描述下你对React的新特性Hooks的理解？它有哪些应用场景？](https://github.com/haizlin/fe-interview/issues/702)
-   [说说你对Error Boundaries的理解](https://github.com/haizlin/fe-interview/issues/701)
-   [说说你对Fiber架构的理解](https://github.com/haizlin/fe-interview/issues/700)
-   [说说你是怎么理解React的业务组件和技术组件的？](https://github.com/haizlin/fe-interview/issues/699)
-   [为什么建议setState的第一个参数是callback而不是一个对象呢？](https://github.com/haizlin/fe-interview/issues/698)
-   [展示组件和容器组件有什么区别？](https://github.com/haizlin/fe-interview/issues/697)
-   [Mern和Yeoman脚手架有什么区别？](https://github.com/haizlin/fe-interview/issues/696)
-   [你有在项目中使用过Yeoman脚手架吗？](https://github.com/haizlin/fe-interview/issues/695)
-   [你有在项目中使用过Mern脚手架吗？](https://github.com/haizlin/fe-interview/issues/694)
-   [shouldComponentUpdate方法是做什么的？](https://github.com/haizlin/fe-interview/issues/693)
-   [怎样在React中使用innerHTML？](https://github.com/haizlin/fe-interview/issues/692)
-   [你有写过React的中间件插件吗？](https://github.com/haizlin/fe-interview/issues/691)
-   [React的中间件机制是怎么样的？这种机制有什么作用？](https://github.com/haizlin/fe-interview/issues/690)
-   [React中你用过哪些第三方的中间件？](https://github.com/haizlin/fe-interview/issues/689)
-   [不用脚手架，你会手动搭建React项目吗？](https://github.com/haizlin/fe-interview/issues/688)
-   [请说说React中Portal是什么？](https://github.com/haizlin/fe-interview/issues/687)
-   [React中修改prop引发的生命周期有哪几个？](https://github.com/haizlin/fe-interview/issues/686)
-   [React多个setState调用的原理是什么？](https://github.com/haizlin/fe-interview/issues/685)
-   [React中调用setState会更新的生命周期有哪几个？](https://github.com/haizlin/fe-interview/issues/684)
-   [React中setState的第二个参数作用是什么呢？](https://github.com/haizlin/fe-interview/issues/683)
-   [React中的setState是同步还是异步的呢？为什么state并不一定会同步更新？](https://github.com/haizlin/fe-interview/issues/682)
-   [React中的setState批量更新的过程是什么？](https://github.com/haizlin/fe-interview/issues/681)
-   [React中的setState执行机制是什么呢？](https://github.com/haizlin/fe-interview/issues/680)
-   [在React中遍历的方法有哪些？它们有什么区别呢？](https://github.com/haizlin/fe-interview/issues/679)
-   [请说说你对React的render方法的理解](https://github.com/haizlin/fe-interview/issues/678)
-   [props.children.map和js的map有什么区别？为什么优先选择React的？](https://github.com/haizlin/fe-interview/issues/677)
-   [有用过React的严格模式吗？](https://github.com/haizlin/fe-interview/issues/676)
-   [React中的setState和replaceState的区别是什么？](https://github.com/haizlin/fe-interview/issues/675)
-   [React中的setState缺点是什么呢？](https://github.com/haizlin/fe-interview/issues/674)
-   [有用过React的Fragment吗？它的运用场景是什么？](https://github.com/haizlin/fe-interview/issues/673)
-   [React组件间共享数据方法有哪些？](https://github.com/haizlin/fe-interview/issues/672)
-   [React的状态提升是什么？使用场景有哪些？](https://github.com/haizlin/fe-interview/issues/671)
-   [简单描述下你有做过哪些React项目？](https://github.com/haizlin/fe-interview/issues/670)
-   [在构造函数中调用super(props)的目的是什么？](https://github.com/haizlin/fe-interview/issues/669)
-   [你是如何学习React的？](https://github.com/haizlin/fe-interview/issues/668)
-   [从旧版本的React升级到新版本的React有做过吗？有遇到过什么坑？](https://github.com/haizlin/fe-interview/issues/667)
-   [你用过React版本有哪些？](https://github.com/haizlin/fe-interview/issues/666)
-   [有用过React的服务端渲染吗？怎么做的？](https://github.com/haizlin/fe-interview/issues/665)
-   [React的mixins有什么作用？适用于什么场景？](https://github.com/haizlin/fe-interview/issues/664)
-   [React怎么拿到组件对应的DOM元素？](https://github.com/haizlin/fe-interview/issues/663)
-   [请描述下事件在React中的处理方式是什么？](https://github.com/haizlin/fe-interview/issues/662)
-   [JSX和HTML有什么区别？](https://github.com/haizlin/fe-interview/issues/661)
-   [React的书写规范有哪些？](https://github.com/haizlin/fe-interview/issues/660)
-   [create-react-app创建新运用怎么解决卡的问题？](https://github.com/haizlin/fe-interview/issues/659)
-   [使用React的方式有哪几种？](https://github.com/haizlin/fe-interview/issues/658)
-   [说说你对reader的context的理解](https://github.com/haizlin/fe-interview/issues/657)
-   [同时引用这三个库React.js、React-dom.js和babel.js它们都有什么作用？](https://github.com/haizlin/fe-interview/issues/656)
-   [你知道Virtual DOM的工作原理吗？](https://github.com/haizlin/fe-interview/issues/655)
-   [你阅读过React的源码吗？简要说下它的执行流程](https://github.com/haizlin/fe-interview/issues/654)
-   [React中怎样阻止组件渲染？](https://github.com/haizlin/fe-interview/issues/653)
-   [React非兄弟组件如何通信？](https://github.com/haizlin/fe-interview/issues/652)
-   [React兄弟组件如何通信？](https://github.com/haizlin/fe-interview/issues/651)
-   [React非父子组件如何通信？](https://github.com/haizlin/fe-interview/issues/650)
-   [React父子组件如何通信？](https://github.com/haizlin/fe-interview/issues/649)
-   [React组件间的通信有哪些？](https://github.com/haizlin/fe-interview/issues/648)
-   [类组件和函数式组件有什么区别？](https://github.com/haizlin/fe-interview/issues/647)
-   [React自定义组件你写过吗？说说看都写过哪些？](https://github.com/haizlin/fe-interview/issues/646)
-   [React组件的state和props两者有什么区别？](https://github.com/haizlin/fe-interview/issues/645)
-   [React有几种构建组件的方式？可以写出来吗？](https://github.com/haizlin/fe-interview/issues/644)
-   [React中遍历时为什么不用索引作为唯一的key值？](https://github.com/haizlin/fe-interview/issues/643)
-   [React中的key有什么作用？](https://github.com/haizlin/fe-interview/issues/642)
-   [React中除了在构造函数中绑定this,还有别的方式吗？](https://github.com/haizlin/fe-interview/issues/641)
-   [在React中页面重新加载时怎样保留数据？](https://github.com/haizlin/fe-interview/issues/640)
-   [请描述下React的事件机制](https://github.com/haizlin/fe-interview/issues/639)
-   [怎样在React中创建一个事件？](https://github.com/haizlin/fe-interview/issues/638)
-   [在React中无状态组件有什么运用场景？](https://github.com/haizlin/fe-interview/issues/637)
-   [描述下在React中无状态组件和有状态组件的区别是什么？](https://github.com/haizlin/fe-interview/issues/636)
-   [写一个React的高阶组件(HOC)并说明你对它的理解](https://github.com/haizlin/fe-interview/issues/635)
-   [React中可以在render访问refs吗？为什么？](https://github.com/haizlin/fe-interview/issues/634)
-   [React中refs的作用是什么？有哪些应用场景？](https://github.com/haizlin/fe-interview/issues/633)
-   [请描述你对纯函数的理解？](https://github.com/haizlin/fe-interview/issues/632)
-   [受控组件和非受控组件有什么区别？](https://github.com/haizlin/fe-interview/issues/631)
-   [React中什么是非控组件？](https://github.com/haizlin/fe-interview/issues/630)
-   [React中什么是受控组件？](https://github.com/haizlin/fe-interview/issues/629)
-   [React中发起网络请求应该在哪个生命周期中进行？为什么？](https://github.com/haizlin/fe-interview/issues/628)
-   [说说React的生命周期有哪些？](https://github.com/haizlin/fe-interview/issues/627)
-   [说说你对“在React中，一切都是组件”的理解](https://github.com/haizlin/fe-interview/issues/626)
-   [写React你是用es6还是es5的语法？有什么区别？](https://github.com/haizlin/fe-interview/issues/625)
-   [浏览器为什么无法直接JSX？怎么解决呢？](https://github.com/haizlin/fe-interview/issues/624)
-   [在使用React过程中你都踩过哪些坑？你是怎么填坑的？](https://github.com/haizlin/fe-interview/issues/623)
-   [说说你喜欢React的原因是什么？它有什么优缺点？](https://github.com/haizlin/fe-interview/issues/622)
-   [如何解决引用类型在pureComponent下修改值的时候，页面不渲染的问题？](https://github.com/haizlin/fe-interview/issues/621)
-   [createElement与cloneElement两者有什么区别？](https://github.com/haizlin/fe-interview/issues/620)
-   [解释下React中Element 和Component两者的区别是什么？](https://github.com/haizlin/fe-interview/issues/619)
-   [解释下React中component和pureComponent两者的区别是什么？](https://github.com/haizlin/fe-interview/issues/618)
-   [React的虚拟DOM和vue的虚拟DOM有什么区别？](https://github.com/haizlin/fe-interview/issues/617)
-   [你觉得React上手快不快？它有哪些限制？](https://github.com/haizlin/fe-interview/issues/616)
-   [说说你对声明式编程的理解？](https://github.com/haizlin/fe-interview/issues/615)
-   [React与angular、vue有什么区别？](https://github.com/haizlin/fe-interview/issues/614)
-   [React是哪个公司开发的？](https://github.com/haizlin/fe-interview/issues/613)
-   [React是什么？它的主要特点是什么？](https://github.com/haizlin/fe-interview/issues/612)
-   [简要描述下你知道的React工作原理是什么？](https://github.com/haizlin/fe-interview/issues/611)
-   [在React中怎样改变组件状态，以及状态改变的过程是什么？](https://github.com/haizlin/fe-interview/issues/606)
-   [在React中你是怎么进行状态管理的？](https://github.com/haizlin/fe-interview/issues/605)
-   [React声明组件有哪几种方法，各有什么不同？](https://github.com/haizlin/fe-interview/issues/604)





## Redux

### 1. redux遵循的三个原则

1. ***单一事实来源：***整个应用的状态存储在单个 store 中的对象/状态树里。单一状态树可以更容易地跟踪随时间的变化，并调试或检查应用程序。
2. ***状态是只读的：***改变状态的唯一方法是去触发一个动作。动作是描述变化的普通 JS 对象。就像 state 是数据的最小表示一样，该操作是对数据更改的最小表示。
3. ***使用纯函数进行更改：***为了指定状态树如何通过操作进行转换，你需要纯函数。纯函数是那些返回值仅取决于其参数值的函数。

### 2. **Store 在 Redux 中的意义是什么？**

​		Store 是一个 JavaScript 对象，它可以保存程序的状态，并提供一些方法来访问状态、调度操作和注册侦听器。应用程序的整个状态/对象树保存在单一存储中。因此，Redux 非常简单且是可预测的。我们可以将中间件传递到 store 来处理数据，并记录改变存储状态的各种操作。所有操作都通过 reducer 返回一个新状态。

## React-router

### 1. react-router的优点

1. 就像 React 基于组件一样，在 React Router v4 中，API 是 *'All About Components'*。可以将 Router 可视化为单个根组件（**`<BrowserRouter>`**），其中我们将特定的子路由（**`<route>`**）包起来。
2. 无需手动设置历史值：在 React Router v4 中，我们要做的就是将路由包装在 **`<BrowserRouter>`** 组件中。
3. 包是分开的：共有三个包，分别用于 Web、Native 和 Core。这使我们应用更加紧凑。基于类似的编码风格很容易进行切换。