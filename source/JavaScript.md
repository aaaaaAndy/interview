## `JavaScript`数据类型

### 1. `es6`之前数据类型

-   基础数据类型：`Stirng`、`Number`、`Boolean`、`Null`、`Undefined`
-   复杂数据类型：`Object`、`Array`、`Function`

### 2. `es6`新增数据类型

-   基础数据类型：`Symbol`、`BigInt`
-   复杂数据类型：`Set`、`Map`、`WeakSet`、`WeakMap`

## 四大判断数据类型的方法

### 1. `typeof` 基本判断

```javascript
typeof a;					// undefined
typeof (a = 1);			  // number
typeof (a = '1');			// string
typeof (a = true);		   // boolean
typeof (a = null);		   // object
typeof (a = [1, 2]);	     // object
typeof (a = { });			// object
typeof (a = Symbol());	   // symbol
typeof (a = function() {});  // function
```

​	可以看到，在对`null`类型的判断中返回了`object`，这是因为`typeof`只处理返回了处于原型链最顶端的`object`类型，它的返回没有错，但不是我们想要的结果。具体请看[<<为什么`typeof null`返回`object`>>](#为什么`typeof null`返回`object`)

​	`typeof`基本能判断大部分数据类型，但是有两点特殊：

-   对于基本数据类型，除`null`外，均可以返回正确结果；
-   对于引用数据类型，除`function`外，一律返回`object`类型。

### 2.  `instanceof` 原型检查

​	`instanceof` 是用来判断 A 是否为 B 的实例，表达式为：`A instanceof B`，如果 A 是 B 的实例，则返回 true,否则返回 false。 在这里需要特别注意的是：**`instanceof` 检测的是原型**。

​	**instanceof 只能用来判断两个对象是否属于实例关系， 而不能判断一个对象实例具体属于哪种类型。**

​	需要注意的是`instanceof`左侧只能是一个对象，例如`1 instanceof Number`会返回`false`。因为`1`是一个基本数据类型。

​	`instanceof`操作符的问题在于它假定只有一个全局执行环境，如果网页中包含多个框架，那实际上就存在两个以上的执行环境，从而存在两个以上不同版本的构造函数，如果你从一个框架向另一个框架传入一个数组，那么传入的数组与第二个框架中原生创建的数据分别具有各自不同的构造函数。

```javascript
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[0].Array;
var arr = new xArray(1,2,3); // [1,2,3]
arr instanceof Array; // false
```

​	针对数组这个问题，`ES5`提供了`Array.isArray()`这个方法用来判断某个对象本身是否为`Array`类型，而不区分在哪个环境中创建。`Array.isArray()`本质上就是检查对象的`[[Class]]`值，`[[Class]]` 是对象的一个内部属性，里面包含了对象的类型信息，其格式为 `[object Xxx]` ，`Xxx` 就是对应的具体类型 。对于数组而言，`[[Class]]` 的值就是 `[object Array]` 。

### 3. `constructor` 构造函数

​	`constructor`是原型`prototype`的一个属性，当函数被定义时候，`js`引擎会为函数添加原型`prototype`，并且这个`prototype`中`constructor`属性指向函数引用， 因此重写`prototype`会丢失原来的`constructor`。

​	不过这种方法有两个缺陷：

-   一是`null` 和 `undefined` 是无效的对象，也就不存在对应的`constructor`，这两种类型的数据需要通过其他方式判断。
-   二是如果自定义对象，开发者重写`prototype`之后，原有的`constructor`会丢失，因此，为了规范开发，在重写对象原型时一般都需要重新给 `constructor` 赋值，以保证对象实例的类型不被篡改。

```javascript
(a = 1).constructor === Number;			// true
(a = '1').constructor === String;		 // true
(a = true).constructor === Boolean;	  // true
(a = {}).constructor === Object;		 // true
(a = []).constructor === Array;			// true
(a = function() {}).constructor === Function; // true
document.constructor === HTMLDocument; // true
window.constructor === window;			// true
```

### 4. `toString`完美的方法

​	`toString()` 是 `Object` 的原型方法，调用该方法，默认返回当前对象的 `[[Class]]` 。这是一个内部属性，其格式为` [object Xxx]` ，其中 `Xxx` 就是对象的类型。

​	对于 `Object` 对象，直接调用 `toString()` 就能返回` [object Object]` 。而对于其他对象，则需要通过 `call / apply` 来调用才能返回正确的类型信息。

```javascript
Object.prototype.toString.call('');					// [object String]
Object.prototype.toString.call(1);					// [object Number]
Object.prototype.toString.call(true);				 // [object Boolean]
Object.prototype.toString.call(Symbol());		   // [object Symbol]
Object.prototype.toString.call(undefined);		 // [object Undefined]
Object.prototype.toString.call(null);				 // [object Null]
Object.prototype.toString.call(new Function());  // [object Function]
Object.prototype.toString.call(new Date());      // [object Date]
Object.prototype.toString.call([]);					// [object Array]
Object.prototype.toString.call(new RegExp());    // [object RegExp]
Object.prototype.toString.call(new Error());     // [object Error]
Object.prototype.toString.call(document);        // [object HTMLDocument]
Object.prototype.toString.call(window);          //[object global] window 是全局对象 global 的引用
```

### 5. 各种方式优缺点汇总

| 优缺点 |	typeof|	instanceof|	constructor	|Object.prototype.toString.call|
| :--: | :--- | ---- | ---- | ---- |
| &nbsp;&nbsp; 优点 &nbsp;&nbsp; |	使用简单|	能检测出引用类型|	基本能检测所有的类型（除了null和undefined）|	检测出所有的类型|
|缺点	|只能检测出基本类型（出null）|	不能检测出基本类型，且不能跨iframe|	constructor易被修改，也不能跨iframe|	IE6下，undefined和null均为Object|

## 为什么`typeof null`返回`object`

​	这是一个历史遗留问题，是一个不能修改的错误。在`JavaScript`的第一个版本实现中**，用32位存储一个值**，包括一个3位的用于表示类型的标识和实际的值。类型标记存储在低位上，一共有5种：

- `000`：对象
- `1`：整数
- `010`：浮点数
- `100`：字符串
- `110`：布尔

​	也就是说，最低位如果是1，那么类型标记只有1位长；如果是0，那么类型标记有3位长，为4种类型提供两个额外的位。有两个值是特殊的:

- `undefined` （JSVAL_VOID）是整数−2<sup>30</sup> （整数范围之外的数字）。
- `null` （JSVAL_NULL）是机器码空指针。或者：一个对象类型标签加上一个零的引用（0000）。
    现在我们很清楚为什么`typeof`为什么会认为`null`是一个对象了，它检查了`null`的类型标记，类型标记说`object`。

## 怎么进行类型转换

### 1. 显式/隐式类型转换

>   类型转换发生在静态类型语言的编译阶段，而强制类型转换则发生在动态类型语言的运行时(runtime)。然而在 JavaScript 中通常将它们统称为强制类型转换。

我个人则倾向于用“隐式强制类型转换”(implicit coercion)和“显式强制类型转换”(explicit coercion)来区分：

-   显式强制类型转换：手动地将一种类型的值转为另一种类型，常见的显式转换方法有：`Number`、`String`、`Boolean`、`parseInt`、`parseFloat`、`toString` 等等；
-   隐式强制类型转换：一般是在涉及运算符的时候才出现的情况，比如两个不同类型的变量相加减、取反等。

### 2. 转换为`string`

#### 2.1 `toString()`

这种方法可以将`number`、`boolean`和`object`类型转换为`string`，但是无法转换`null`和`undefined`。

```javascript
(1).toString()			 // '1'
true.toString()			// 'true'
({}).toString()			// '[object Object]'
([]).toString()			// ''
([1, 2, 3]).toString()	 // ‘1,2,3’
```

​	这里需要注意的是`{}`调用`toString()`是调用了原型链顶端的`toString()`方法，它返回`object`的`[[class]]`属性，而`[]`调用的`toString()`是`Array`重写过之后的方法，这个方法的功能是将数组里的每个值取出拼成一个字符串，并且每个值之间以`,`隔开，这里因为是空数组，所以返回`‘’`。

#### 2.2 `String()`

​	`string()`是一个全局函数，基本上能转换所有的数据类型为`string`。

```javascript
String(1)			    // "1"
String(null)			 // "null"
String(undefined)		// "undefined"
String(true)			 // "true"
String({})		 	  // "[object Object]"
String([])			   // ""
String([1, 2, 3])		// "1,2,3"
```

`String()`转换对象时与`toStirng()`逻辑相同。

#### 2.3 操作符：`+`

​	这是最简单便捷的一种方式，将其他类型的变量加上一个空字符串都可以转成一个字符串类型。

```javascript
1 + ''			    // "1"
null + ''			 // "null"
undefined + ''		// "undefined"
true + ''			 // "true"
{} + ''			   // 0
[] + ''			   // ""
[1, 2, 3] + ''		// "1,2,3"
```

### 3. 转换为`number`

#### 3.1 `Number()`

​	除了要转换的类型本来就是由数字组成之外，其他的转换一律变成`NaN`。

```javascript
Number('1')			 // 1
Number('+1')			// 1
Number('-1')			// -1
Number('s')			 // NaN
Number(null)			// 0
Number(undefined)	   // NaN
Number({})			  // NaN
Number([])			  // 0
Number([1, 2, 3])	   // NaN
```

#### 3.2 `parseInt(x, 10)`

将其他类型转换成整数类型，后面的10表示的是十进制，取值范围在`2 ~ 37`之间。一般都是进制之间的转换。

```javascript
parseInt('011',10)			// 11
parseInt('0x11',10)		   // 0
parseInt('011',36)			// 37
parseInt('0x11')			  // 17
parseInt('08')			    // 8
parseInt('011',2)			 // 3
```

#### 3.3 `x - 0`

这是一种最简单快捷的方式，字符串减去一个0可以转换成数字。

```javascript
'1' - 1			 // 0
1 - '1'			 // 0
'1' - '1'		   // 0
'1' - null		  // 1
1 - null		    // 1
null - '1'		  // -1
null - 1			// -1
'1' - undefined 	// NaN
'1' - {}			// NaN
{} - '1'			// -1
'1' - []			// 1
[] - '1'			// -1
```

#### 3.4 `+x`

在要转换的类型前面加上`+`可以转换成数字，并不是取绝对值。

```javascript
+'1'			// 1
+'-1'		   // -1
+{}			 // NaN
+[]			 // 0
```

### 4. 转换为`boolean`

#### 4.1 `Boolean()`

​	可以转换所有类型的值为布尔类型。

```javascript
Boolean(1)			 // true
Boolean(null)		  // false
Boolean(undefined)	 // false
Boolean({})			// true
Boolean([])			// true
Boolean('s')		   // true
```

#### 4.2 `!!`

​	这是一种最快最便捷的方式将其他类型的值转为布尔类型。

```javascript
!!1			  // true
!!null		   // false
!!undefined	  // false
!!obj			// true
!!'s'			// true
```

## `JavaScript`中`{} + []`与`[] + {}`的区别

​	在`JavaScript`的运算符中，`+`是很重要的一种运算符，不管是数组的运算还是字符串的拼接。在了解本题目之前需要先了解以下两个重点：

1.  加号`+`运算在`JavaScript`中，使用上的规定是什么；
2.  对象在`JavaScript`是怎么转换为原始数据类型的。

### 1. 加号运算符

​	在标准中转换的规则还有以下几个，要注意它的顺序：

```javascript
operand + operand = result
```

	1. 使用`ToPrimitive`运算转换左与右运算元为原始数据类型值(`primitive`)
	2. 在第`1`步转换后，如果有运算元出现原始数据类型是"字符串"类型值时，则另一运算元作强制转换为字符串，然后作字符串的连接运算(`concatenation`)
	3. 在其他情况时，所有运算元都会转换为原始数据类型的"数字"类型值，然后作数学的相加运算(`addition`)

### 2. `ToPrimitive`内部运算

​	加号运算符只能使用原始数据类型，那么对于对象类型的值就需要先转成原始数据类型。这种情况不止会出现在加号运算中，在关系比较或值相等比较的运算中也是如此。

```javascript
ToPrimitive(input, PreferredType?)
```

​	`input`代表代入的值，而`PreferredType`可以是数字(Number)或字符串(String)其中一种，这会代表"优先的"、"首选的"的要进行转换到哪一种原始类型，转换的步骤会依这里的值而有所不同。但如果没有提供这个值也就是预设情况，则会设置转换的`hint`值为`"default"`。这个首选的转换原始类型的指示(`hint`值)，是在作内部转换时由JS视情况自动加上的，一般情况就是预设值。

​	而在`JavaScript`的`Object`原型的设计中，都一定会有两个`valueOf`与`toString`方法，所以这两个方法在所有对象里面都会有，不过它们在转换有可能会交换被调用的顺序。

#### 2.1 当`PreferredType`为数字`(Number)`时

当`PreferredType`为数字(Number)时，`input`为要被转换的值，以下是转换这个`input`值的步骤:

1.  如果`input`是原始数据类型，则直接返回`input`。
2.  否则，如果`input`是个对象时，则调用对象的`valueOf()`方法，如果能得到原始数据类型的值，则返回这个值。
3.  否则，如果`input`是个对象时，调用对象的`toString()`方法，如果能得到原始数据类型的值，则返回这个值。
4.  否则，抛出TypeError错误。

#### 2.2 当`PreferredType`为字符串`(String)`时

上面的步骤2与3对调，如同下面所说:

1.  如果`input`是原始数据类型，则直接返回`input`。
2.  否则，如果`input`是个对象时，调用对象的`toString()`方法，如果能得到原始数据类型的值，则返回这个值。
3.  否则，如果`input`是个对象时，则调用对象的`valueOf()`方法，如果能得到原始数据类型的值，则返回这个值。
4.  否则，抛出TypeError错误。

#### 2.3 `PreferredType`没提供时，也就是`hint`为`"default"`时

​	与`PreferredType`为数字`(Number)`时的步骤相同。**数字**其实是预设的首选类型，也就是说在一般情况下，加号运算中的对象要作转型时，都是先调用`valueOf`再调用`toString`。

​	但这有两个异常，一个是`Date`对象，另一是`Symbol`对象，它们覆盖了原来的`PreferredType`行为，`Date`对象的预设首选类型是字符串`(String)`。因此你会看到在一些教程文件上会区分为两大类对象，一类是 `Date` 对象，另一类叫 非`Date(non-date)` 对象。因为这两大类的对象在进行转换为原始数据类型时，首选类型恰好相反。

### 3. `valueOf`与`toString`方法

​	在JS中所设计的`Object`纯对象类型的`valueOf`与`toString`方法，它们的返回如下:

-   `valueOf`方法返回值: 对象本身。
-   `toString`方法返回值:` "[object Object]"`字符串值，不同的内建对象的返回值是`"[object type]"`字符串，`"type"`指的是对象本身的类型识别，例如`Math`对象是返回`"[object Math]"`字符串。但有些内建对象因为覆盖了这个方法，所以直接调用时不是这种值。(注意: 这个返回字符串的前面的`"object"`开头英文是小写，后面开头英文是大写)

​	你有可能会看过，利用`Object`中的`toString`来进行各种不同对象的判断语法，这在以前JS能用的函数库或方法不多的年代经常看到，不过它需要配合使用函数中的`call`方法。

```javascript
Object.prototype.toString.call([])			// "[object Array]"
```

### 4. 实例

#### 4.1 字符串`+`其他原始类型

​	字符串在加号运算有最高的优先级，与字符串相加必定是字符串连接运算。

```javascript
'1' + 123			// "1123"
'1' + false			// "1false"
'1' + null			// "1null"
'1' + undefined			// "1undefined"
'1' + {}			// "1[object Object]"
'1' + []			// "1"
'1' + 'NaN'			// 1NaN
```

#### 4.2 数字`+`其他的非字符串的原始数据类型

​	数字与其他类型作相加时，除了字符串会优先使用字符串连接运算`(concatenation)`的，其他都要依照数字为优先，所以除了字符串之外的其他原始数据类型，都要转换为数字来进行数学的相加运算。

```javascript
1 + true			// 2
1 + null			// 1
1 + undefined		// NaN
1 + {}			// "1undefined"
1 + []			// "1"
```

#### 4.3 数字/字符串以外的原始数据类型作加法运算

​	当数字与字符串以外的，其他原始数据类型直接使用加号运算时，就是转为数字再运算，这与字符串完全无关。

```javascript
true + true			// 2
true + null			// 1
undefined + null			// NaN
```

#### 4.4 空数组与空对象

1.  `[] + []`

```javascript
[] + []			// ""
```

​	两个数组相加，依然按照`valueOf -> toString`的顺序，但因为`valueOf`是数组本身，所以会以`toString`的返回值才是原始数据类型，也就是空字符串，所以这个运算相当于两个空字符串在相加，依照加法运算规则第2步骤，是字符串连接运算(concatenation)，两个空字符串连接最后得出一个空字符串。

2.  `{} + {}`

```javascript
{} + {}			// "[object Object][object Object]"
```

​	两个空对象相加，依然按照`valueOf -> toString`的顺序，但因为`valueOf`是对象本身，所以会以`toString`的返回值才是原始数据类型，也就是"[object Object]"字符串，所以这个运算相当于两个"[object Object]"字符串在相加，依照加法运算规则第2步骤，是字符串连接运算(concatenation)，最后得出一个"object Object"字符串。

​	但是这个结果有异常，上面的结果只是在Chrome浏览器上的结果(v55)，怎么说呢？

​	有些浏览器例如`Firefox`、`Edge`浏览器会把`{} + {}`直译为相当于`+{}`语句，因为它们会认为以花括号开头(`{`)的，是一个区块语句的开头，而不是一个对象字面量，所以会认为略过第一个`{}`，把整个语句认为是个`+{}`的语句，也就是相当于强制求出数字值的`Number({})`函数调用运算，相当于`Number("[object Object]")`运算，最后得出的是`NaN`。

如果在第一个(前面)的空对象加上圆括号(`()`)，这样JS就会认为前面是个对象，就可以得出同样的结果:

```javascript
({}) + {}			// "[object Object][object Object]"
```

3.  `{} + []`

```javascript
{} + []			// 0
```

​	上面同样的把`{}`当作区块语句的情况又会发生，不过这次所有的浏览器都会有一致结果，如果`{}`(空对象)在前面，而`[]`(空数组)在后面时，前面(左边)那个运算元会被认为是区块语句而不是对象字面量。

​	所以`{} + []`相当于`+[]`语句，也就是相当于强制求出数字值的`Number([])`运算，相当于`Number("")`运算，最后得出的是`0`数字。

​	特别注意: 所以如果第一个(前面)是`{}`时，后面加上其他的像数组、数字或字符串，这时候加号运算会直接变为一元正号运算，也就是强制转为数字的运算。这是个陷阱要小心。

4.  `[] + {}`

```javascript
[] + {}			// "[object Object]"
```

​	`[]`转为`“”`，`{}`转为`“[object Object]”`

## 如何判断两个值相等

`JavaScript`提供三种不同值的比较操作：

### 1. 非严格相等`==`

​	相等操作符比较两个值是否相等，在比较前将两个被比较的值转换为相同类型。在转换后（等式的一边或两边都可能被转换），最终的比较方式等同于全等操作符 `===` 的比较方式。 相等操作符满足交换律。

```javascript
console.log([10] == 10);                //true
console.log('10' == 10);                //true
console.log([] == 0);                   //true
console.log(true == 1);                 //true
console.log([] == false);               //true
console.log(![] == false);              //true
console.log('' == 0);                   //true
console.log('' == false);               //true
console.log(null == false);             //false
console.log(!null == true);             //true
console.log(null == undefined);         //true

console.log(012==12);  // false
console.log(012==10);  // true
console.log(099==99);  // true 这种情况是因为八进制中不可能出现9，所以看成一个十进制
console.log(09==9);    // true 同上
```

它的比较规则如下：

-   如果Type(x)和Type(y)相同，返回x===y的结果
-   如果Type(x)和Type(y)不同
    -   如果x是null，y是undefined，返回true
    -   如果x是undefined，y是null，返回true
    -   如果Type(x)是Number，Type(y)是String，返回 x==ToNumber(y) 的结果
    -   如果Type(x)是String，Type(y)是Number，返回 ToNumber(x)==y 的结果
    -   如果Type(x)是Boolean，返回 ToNumber(x)==y 的结果
    -   如果Type(y)是Boolean，返回 x==ToNumber(y) 的结果
    -   如果Type(x)是String或Number或Symbol中的一种并且Type(y)是Object，返回 x==ToPrimitive(y) 的结果
    -   如果Type(x)是Object并且Type(y)是String或Number或Symbol中的一种，返回 ToPrimitive(x)==y 的结果
    -   其他返回false

### 2. 严格相等`===`

​	全等操作符比较两个值是否相等，两个被比较的值在比较前都不进行隐式转换。如果两个被比较的值具有不同的类型，这两个值是不全等的。否则，如果两个被比较的值类型相同，值也相同，并且都不是 number 类型时，两个值全等。最后，如果两个值都是 number 类型，当两个都不是 NaN，并且数值相同，或是两个值分别为 +0 和 -0 时，两个值被认为是全等的。

```javascript
+0 === -0			// true
NaN === NaN			// false
```

它的比较规则如下：

-   如果Type(x)和Type(y)不同，返回false

-   如果Type(x)和Type(y)相同
    -   如果Type(x)是Undefined，返回true
    -   如果Type(x)是Null，返回true
    -   如果Type(x)是String，当且仅当x,y字符序列完全相同（长度相同，每个位置上的字符也相同）时返回true，否则返回false
    -   如果Type(x)是Boolean，如果x,y都是true或x,y都是false返回true，否则返回false
    -   如果Type(x)是Symbol，如果x,y是相同的Symbol值，返回true,否则返回false
    -   如果Type(x)是Number类型
        -   如果x是NaN，返回false
        -   如果y是NaN，返回false
        -   如果x的数字值和y相等，返回true
        -   如果x是+0，y是-0，返回true
        -   如果x是-0，y是+0，返回true
        -   其他返回false



### 3. `Object.is()`

`Object`在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是+0和-0，NaN和NaN。 

```javascript
Object.is(0, -0);            // false
Object.is(+0, -0);           // false
Object.is(0, +0);            // true
Object.is(-0, -0);           // true
Object.is(NaN, 0/0);         // true
Object.is(NaN, NaN);				// true
```

### 4. 如何判断两个对象相等

#### 4.1. `JSON.stringify(obj)`

```javascript
JSON.stringify(obj) === JSON.stringify(otherObj)
```

这种方法简单，一行代码就搞定，但是有缺点，如下：

- 当对象里`key`值顺序不一样时，就会出错
- 一些特殊类型的值，比如`undefined`，`Date`，`RegExp`等会丢失或者变形

#### 4.2. 递归

实现思路如下：

1. 先判断两个对象的`key`值的长度。若长度不相等，则 `return false`
2. 遍历对象`obj1`，检查对象`obj2`中是否有对应的`key`值， 没有，则`return false`
3. 比较两个对象中这个`key`对应的值的类型是否相等，不相等，则`return false`
4. 如果值的类型是`undefined`、`number`、`string`、`boolean`的一种，直接两个值比较，不同，则`return false`
5. 如果值是`null`，那么 比较两个值是否相等。不等，则`return false`
6. 如果值是对象，调用自身
7. 如果值是数组，因为数组项可能是任意一种数据类型的，所以还是先比较长度，长度相等后再逐一比较数组的每一项。

### 5. 相等函数的封装

此代码包含了如何比较两个对象相等 ，具体也可查看[`codepen.io`](https://codesandbox.io/s/equal-iyvfu?file=/index.js)：

```javascript
const NUMBER_TAG = '[object Number]';
const STRING_TAG = '[object String]';
const BOOLEAN_TAG = '[object Boolean]';
const NULL_TAG = '[object Null]';
const UNDEFINED_TAG = '[object Undefined]';
const OBJECT_TAG = '[object Object]';
const ARRAY_TAG = '[object Array]';
const ERROR_TAG = '[object Error]';
const DATE_TAG = '[object Date]';
const REGEXP_TAG = '[object RegExp]';
const MAP_TAG = '[object Map]';
const SET_TAG = '[object Set]';

// 以下两种类型一般不比较相等性
const SYMBOL_TAG = '[object Symbol]';
const FUNCTION_TAG = '[object Function]';

const toString = Object.prototype.toString;
const getKeys = Object.keys;

// map转数组
function mapToArray(map) {
	let idx = -1;
	const result = new Array(map.size);

	map.forEach(function (value, key) {
		result[++idx] = [key, value];
	})

	return result;
}

// set转数组
function setToArray(set) {
	let idx = -1;
	const result = new Array(set.size);

	set.forEach(function(value) {
		result[++idx] = value;
	})

	return result;
}


function eq(value, other, vStack, oStack) {
	const valueType = toString.call(value);
	const otherType = toString.call(other);

	// 类型不同直接返回false
	if (valueType !== otherType) {
		return false;
	}

	// 这里直接进行一个简单粗暴的判断, 这里默认+0与-0相等，不再进行处理
	// 同样适用于基本类型和引用类型，如果是同一个引用也可返回true
	if (value === other) {
		return true;
	}

	// 处理NaN不相等情况
	if (value !== value && other !== other) {
		return true;
	}


	// 处理其他情况
	switch (valueType) {
		case NUMBER_TAG:
		case DATE_TAG:
		case BOOLEAN_TAG:
			return +value === +other;
		case STRING_TAG:
		case REGEXP_TAG:
		case NULL_TAG:
		case UNDEFINED_TAG:
			return '' + value === '' + other;
		case ERROR_TAG:
			return value.name === other.name
				&& value.message === other.message
		case MAP_TAG:
			const valueMapArr = mapToArray(value);
			const otherMapArr = mapToArray(other);

			if (!eq(valueMapArr, otherMapArr, vStack, oStack)) {
				return false;
			}
			break;
		case SET_TAG:
			const valueSetArr = setToArray(value);
			const otherSetArr = setToArray(other);

			if (!eq(valueSetArr, otherSetArr, vStack, oStack)) {
				return false;
			}
			break;
		case ARRAY_TAG:
		case OBJECT_TAG:
			// 首先对比是否为循环引用
			vStack = vStack || [];
			oStack = oStack || [];
			let vStackLength = vStack.length;

			while (vStackLength--) {
				if (
					vStack[vStackLength] === value
					&& oStack[vStackLength] === other
				) {
					return true;
				}
			}

			vStack.push(value);
			oStack.push(other);

			// 数组对比
			if (valueType === ARRAY_TAG) {
				let vLength = value.length;
				let oLength = other.length;

				if (vLength !== oLength) {
					return false;
				}

				while (vLength--) {
					if (!eq(value[vLength], other[vLength], vStack, oStack)) {
						return false;
					}
				}
			}

			// 对象对比
			if (valueType === OBJECT_TAG) {
				const vKeys = getKeys(value);
				const oKeys = getKeys(other);
				let vKeysLength = vKeys.length;

				if (vKeys.length !== oKeys.length) {
					return false;
				}

				while (vKeysLength--) {
          // 对象的key顺序可能不一样，但是对象仍然可能相等
          if (!oKeys.includes(vKeys[vKeysLength])) {
            return false;
          }

					let currentKey = vKeys[vKeysLength];
					if (!eq(value[currentKey], other[currentKey], vStack, oStack)) {
						return false;
					}
				}
			}
			break;
		default:
			return String(value) === String(other);
	}

	return true;
}
```



## 数组有哪些方法会改变自身，哪些不会

#### 1. 会改变原始数组的方法

-   `push`、`pop`、
-   `shift`、`unshift`、
-   `splice`、
-   `sort`、
-   `reverse`、
-   `forEach`、
-   `flat`、
-   `join`

#### 2. 不会改变原始数组的方法

-   `filter`、
-   `map`、
-   `concat`、
-   `slice`、
-   `every`、
-   `some`、



## 函数的`arguments`为什么不是数组

​		因为`arguments`本身并不能调用数组方法，它是一个另外一种对象类型，只不过属性从0开始排，依次为0，1，2...最后还有`callee`和`length`属性。我们也把这样的对象称为类数组。`arguments`对象除了`length`属性和索引元素之外没有任何`Array`属性，例如，它没有`pop`方法。但是它可以被转换为一个真正的`Array`。

​		常见的类数组：

- 用`getElementsByTagName/ClassName()`获得的`HTMLCollection`
- 用`querySelector`获得的`nodeList`
- 参数`arguments`

## 将类数组转换为数组的方法

### 1. `Array.prototype.slice.call()`

```javascript
function sum(a, b) {
  let args = Array.prototype.slice.call(arguments);
  console.log(args.reduce((sum, cur) => sum + cur));//args可以调用数组原生的方法啦
}
sum(1, 2);//3
```

### 2. `Array.prototype.concat.apply()`

```javascript
function sum(a, b) {
  let args = Array.prototype.concat.apply([], arguments);//apply方法会把第二个参数展开
  console.log(args.reduce((sum, cur) => sum + cur));//args可以调用数组原生的方法啦
}
sum(1, 2);//3
```

### 3. `Array.from()`

```javascript
function sum(a, b) {
  let args = Array.from(arguments);
  console.log(args.reduce((sum, cur) => sum + cur));//args可以调用数组原生的方法啦
}
sum(1, 2);//3
```

这种方法也可以用来转换Set和Map

### 4. `ES6`展开运算符

```javascript
function sum(a, b) {
  let args = [...arguments];
  console.log(args.reduce((sum, cur) => sum + cur));//args可以调用数组原生的方法啦
}
sum(1, 2);//3
```

### 5. 自力更生

当然，最原始的方法就是再创建一个数组，用for循环把类数组的每个属性值放在里面，过于简单，就不浪费篇幅了。

## 如何中断`forEach`循环

​	在`forEach`中用`return`不会返回，函数继续执行。可以通过下列方法来中断`forEach`的循环。

### 1. `try...catch...`

​	使用`try`监视代码块，在需要中断的地方抛出异常

```javascript
// try-catch方法跳出forEach循环
const aa = [1, 2, 3];

try {
	aa.forEach(function (item) {
		console.log(item);
		throw 'over';
	})
} catch (e) {
	console.log(e);
}

```

### 2. `every`或者`some`代替

官方推荐方法：用`every`和`some`替代`forEach`函数，`every`在碰到`return false`的时候，中止循环。`some`在碰到`return true`的时候，中止循环。

```javascript
const aa = [1, 2, 3];

// every
aa.every(function(x) {
	console.log(x);
	if (x === 2) {
		return false;
	}
	return true;
})

// some
aa.some(function (x) {
	console.log(x);

	if (x === 2) {
		return true;
	}
	return false;
})

```

## `JavaScript`判断数组中是否包含某个值

### 1. `array.indexOf`

​	此方法判断数组中是否存在某个值，如果存在，则返回数组元素的下标，否则返回-1。

```javascript
var aa = [1, 2, 3];
aa.indexOf(2);			// 1
aa.indexOf(4);			// -1
```

### 2. `array.includes`

​	此方法判断数组中是否存在某个值，如果存在返回`true`，否则返回`false`

```javascript
var aa = [1, 2, 3];
aa.includes(2);			// true
aa.includes(4);			// false
```

### 3. `array.find`

​	返回数组中满足条件的**第一个元素的值**，如果没有，返回`undefined`

```javascript
var aa = [1, 2, 2];
aa.find(v => v > 1);			// 2
aa.find(v => v > 2);			// undefined
```

### 4. `array.findIndex`

​	返回数组中满足条件的第一个元素的下标，如果没有找到，返回-1

```javascript
var aa = [1, 2, 2];
aa.findIndex(v => v > 1);			// 1
aa.findIndex(v => v > 2);			// -1
```

## 数组扁平化

### 1. 调用ES6中的`flat`方法

```javascript
const arr = [1, [2, [3, [4, 5]]], 6];
const newArr = arr.flat(Infinity); // [1, 2, 3, 4, 5, 6]
```

### 2. `replace` + `split`

```javascript
const arr = [1, [2, [3, [4, 5]]], 6];
const str = JSON.stringify(arr);
const newArr = str.replace(/(\[|\])/g, '').split(',')
console.log(newArr); // [1, 2, 3, 4, 5, 6]
```

### 3. `replace` + `JSON.parse`

```javascript
const arr = [1, [2, [3, [4, 5]]], 6];
const str = JSON.stringify(arr);
const newStr = str.replace(/(\[|\])/g, '');
const newArr = JSON.parse('[' + newStr + ']');
console.log(newArr); // [1, 2, 3, 4, 5, 6]
```

### 4. `reduce` + `concat`

```javascript
const arr = [1, 2, [3, 4], [5, [6, 7]]];

function flatten(arr) {
	return arr.reduce(function (acc, cur) {
		return acc.concat(Array.isArray(cur) ? flatten(cur) : cur);
	}, []);
}

console.log(flatten(arr)); // [ 1, 2, 3, 4, 5, 6, 7 ]
```

### 5. `while` + `concat`

```javascript
let arr = [1, 2, [3, 4], [5, [6, 7]]];

while (arr.some(Array.isArray)) {
	arr = [].concat(...arr);
}

console.log(arr); // [ 1, 2, 3, 4, 5, 6, 7 ]
```

### 6. 循环递归

```javascript
let arr = [1, 2, [3, 4], [5, [6, 7]]];
let result = [];

function flatten(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (Array.isArray(arr[i])) {
			flatten(arr[i]);
		} else {
			result.push(arr[i]);
		}
	}
}

flatten(arr)
console.log(result); // [ 1, 2, 3, 4, 5, 6, 7 ]
```

## 数组去重

### 1. 利用`ES6`中`set`去重

```javascript
// 方法1
function unique(arr) {
  return Array.from(new Set(arr));
}

// 方法2
function unique(arr) {
  return [...new Set(arr)]
}
```

不考虑兼容性，这种方法是最好的去重方式，但是这种方式无法去除重复的空对象。

### 2. `includes`去重

```javascript
function unique(arr) {
	var result = [];
  
	for (let i = 0; i < arr.length; i++) {
		if (!result.includes(arr[i])) {
			result.push(arr[i]);
		}
  }
  
	return result;
}
```

### 3. `indexOf`去重

```javascript
function unique(arr) {
	var result = [];

	for (let i = 0; i < arr.length; i++) {
		if (result.indexOf(arr[i]) === -1) {
			result.push(arr[i]);
		}
	}

	return result;
}
```

### 4. 双层循环，利用`splice`去重

```javascript
function unique(arr) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[i] === arr[j]) {
				arr.splice(j, 1);
				j--;
			}
		}
	}

	return arr;
}
```

### 5. `sort`排序去重

```javascript
function unique(arr) {
	var result = [];
	arr.sort();

	result.push(arr[0]);
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] !== arr[i - 1]) {
			result.push(arr[i]);
		}
	}

	return result;
}
```

### 6. 利用对象去重

```javascript
function unique(arr) {
	var result = [];
	var obj = {};

	for (let i = 0; i < arr.length; i++) {
		if (obj[arr[i]]) {
			obj[arr[i]]++;
		} else {
			result.push(arr[i]);
			obj[arr[i]] = 1;
		}
	}

	return result;
}
```

### 7. `map`去重

```javascript
function unique(arr) {
	var result = [];
	var map = new Map();

	for (let i = 0; i < arr.length; i++) {
		if (map.has(arr[i])) {
			map.set(arr[i], true);
		} else {
			map.set(arr[i], false);
			result.push(arr[i]);
		}
	}

	return result;
}
```

### 8. `filter`去重

```javascript
function unique(arr) {
	return arr.filter((item, index) => arr.indexOf(item, 0) === index);
}
```

### 9. `reduce`去重

```javascript
function unique(arr) {
	return arr.reduce((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], []);
}
```

## 事件机制

### 1. JavaScript单线程机制

​		首先我们都知道，`JavaScript`是一门单线程的语言，所谓单线程指的是在`JavaScript`引擎中负责解释和执行代码的线程只有一个，通常称为主线程。那么为什么`JavaScript`必须是单线程的语言，而不能像他的老大哥`Java`一样，手动开启多个线程呢？

​		因为这是由于`JavaScript`所运行的浏览器环境决定，他只能是单线程的。试想一下，如果`JavaScript`能开启多个线程，页面上有一个`div`，我们同时在多个线程中来改变这个`div`中的内容，那么最终这个`div`会变成什么样子谁也确定不了，最后只能听天由命，看哪个线程是最后一个运行结束的。

​		其实`JavaScript`也可以通过`Web Worker`开启多线程是的，但是这个新开线程的功能被限制了，只能做一些消耗`CPU`的逻辑运算等，数据传输也是通过回调的方式来进行，不会阻塞主线程的执行；而且最最重要的是，`Web Worker`不能来操作`dom`，笔者经过尝试发现，在新开的线程中甚至都不能获取到`document`和`window`对象。

### 2. 同步任务和异步任务

​		因为`JavaScript`是单线程运行的，所有的任务只能在主线程上排队执行；但是如果某个任务特别耗时，比如`Ajax`请求一个接口，可能1s返回结果，也可能10s才返回，有很多的不确定因素（网络延迟等）；如果这些任务也放到主线程中去，那么会阻塞浏览器（用户除了等，不能进行其他操作）。于是，浏览器就把这些任务分派到异步任务队列中去。

### 3. 什么是事件循环

​		事件循环的流程大致如下：

1. 所有任务都在主线程上执行，形成一个执行栈。
2. 主线程发现有异步任务，就在“任务队列”之中加入一个任务事件。
3. 一旦“执行栈”中的所有同步任务执行完毕，系统就会读取“任务队列”（先进先出原则）。那些对应的异步任务，结束等待状态，进入执行栈并开始执行。
4. 主线程不断重复上面的第三步，这样的一个循环称为事件循环。

### 4. 宏任务与微任务

​		如果任务队列中有多个异步任务，那么先执行哪个任务呢？于是在异步任务中，也进行了等级划分，分为宏任务`（macrotask）`和微任务`（microtask）`；不同的API注册的任务会依次进入自身对应的队列中，然后等待事件循环将它们依次压入执行栈中执行。

​		宏任务包括：

-  *script(整体代码)*
-  setTimeout,
-  setInterval,
-  setImmediate,
- requestAnimationFrame
- postMessage
-  *I/O*
-  UI rendering

​		微任务包括：

- process.nextTick
- Promise
- Object.observe(已废弃)
- MutationObserver(html5新特性)

我们可以把整体的JS代码也看成是一个宏任务，主线程也是从宏任务开始的。我们把上面事件循环的步骤更新一下：

1. 执行一个宏任务
2. 执行过程中如果遇到微任务就加入微任务队列，遇到宏任务就加入宏任务队列
3. 宏任务执行完毕后，检查当前微任务队列，如果有，就依次执行（一轮事件循环结束）
4. 开始下一个宏任务

`process.nextTick` 是一个独立于 `eventLoop` 的任务队列。
 在每一个 `eventLoop` 阶段完成后会去检查 `nextTick` 队列，如果里面有任务，会让这部分任务优先于微任务执行。
 是所有异步任务中最快执行的。

### 5. Node和浏览器事件循环机制有何不同

#### 5.1 线程与进程

> **进程是 CPU资源分配的最小单位；线程是 CPU调度的最小单位**

![168333c14c85d794](https://raw.githubusercontent.com/aaaaaAndy/picture/main/images/20210129135856.png)

- 进程好比图中的工厂，有单独的专属自己的工厂资源。

- 线程好比图中的工人，多个工人在一个工厂中协作工作，工厂与工人是 1:n的关系。也就是说**一个进程由一个或多个线程组成，线程是一个进程中代码的不同执行路线**；

- 工厂的空间是工人们共享的，这象征**一个进程的内存空间是共享的，每个线程都可用这些共享内存**。

- 多个工厂之间独立存在。

​		以Chrome浏览器中为例，当你打开一个 Tab 页时，其实就是创建了一个进程，一个进程中可以有多个线程，比如渲染线程、JS 引擎线程、HTTP 请求线程等等。当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁。

​		浏览器内核是多线程，在内核控制下各线程相互配合以保持同步，一个浏览器通常由以下常驻线程组成：

- GUI 渲染线程
- JavaScript引擎线程
- 定时触发器线程
- 事件触发线程
- 异步http请求线程

#### 5.2 浏览器中的Event Loop

<img src="https://raw.githubusercontent.com/aaaaaAndy/picture/main/images/20210129140631.png" alt="image-20201015163630762" style="zoom:50%;" />

- 一开始执行栈空,我们可以把**执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则**。micro 队列空，macro 队列里有且只有一个 script 脚本（整体代码）。

- 全局上下文（script 标签）被推入执行栈，同步代码执行。在执行的过程中，会判断是同步任务还是异步任务，通过对一些接口的调用，可以产生新的 macro-task 与 micro-task，它们会分别被推入各自的任务队列里。同步代码执行完了，script 脚本会被移出 macro 队列，这个过程本质上是队列的 macro-task 的执行和出队的过程。

- 上一步我们出队的是一个 macro-task，这一步我们处理的是 micro-task。但需要注意的是：当 macro-task 出队时，任务是**一个一个**执行的；而 micro-task 出队时，任务是**一队一队**执行的。因此，我们处理 micro 队列这一步，会逐个执行队列中的任务并把它出队，直到队列被清空。

- **执行渲染操作，更新界面**

- 检查是否存在 Web worker 任务，如果有，则对其进行处理

- 上述过程循环往复，直到两个队列都清空

#### 5.3 Node中的Event Loop

​		`Node` 中的 `Event Loop` 和浏览器中的是完全不相同的东西。Node.js采用V8作为js的解析引擎，而I/O处理方面使用了自己设计的`libuv`，`libuv`是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的API，事件循环机制也是它里面的实现（下文会详细介绍）

Node.js的运行机制如下:

- V8引擎解析`JavaScript`脚本。
- 解析后的代码，调用Node API。
- `libuv`库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
- V8引擎再将结果返回给用户。

![16841bd9860c1ee9](https://raw.githubusercontent.com/aaaaaAndy/picture/main/images/20210129135644.png)

从上图中，大致看出node中的事件循环的顺序：

外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->I/O事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)-->轮询阶段（按照该顺序反复运行）...

- timers 阶段：这个阶段执行timer（setTimeout、setInterval）的回调
- I/O callbacks 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
- idle, prepare 阶段：仅node内部使用
- poll 阶段：获取新的I/O事件, 适当的条件下node将阻塞在这里
- check 阶段：执行 setImmediate() 的回调
- close callbacks 阶段：执行 socket 的 close 事件回调

#### 5.4 Node与浏览器的 Event Loop 差异

​		**浏览器环境下，microtask的任务队列是每个macrotask执行完之后执行。而在Node.js中，microtask会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行microtask队列的任务**。

## `JavaScript`原型与原型链

​		原型模式是JS实现继承的一种方式。**所有的函数都有一个`prototype`属性，通过`new`生成一个对象时，`prototype`会被实例化为对象的属性。**所有的引用类型都有一个`__proto__`指向其构造函数的`prototype`。原型链的话，指的就是当访问一个引用类型时，如果本身没有这个属性或方法，就会通过`__proto__`属性在父级的原型中找，一级一级往上，直到最顶层为止。

## 原型

### 1. 原型

​	`Father.prototype` 就是原型，它是一个对象，我们也称它为原型对象。

#### 1.1. 原型的作用是什么

​	原型的作用，就是共享方法。我们通过 `Father.prototype.method` 可以共享方法，不会反应开辟空间存储方法。

#### 1.2. 原型中的this指的是什么

​	原型中this的指向是实例。

### 2. 原型链

#### 2.1 什么是原型链

​		原型与原型层层相连的过程即为原型链。

#### 2.2 原型链的应用

​		对象可以使用构造函数prototype原型对象的属性和方法，就是因为对象有\_\_proto\_\_原型的存在。每个对象都有\_\_proto\_\_原型的存在。

```javascript
function Person(name,age) {
    this.name = name;
    this.age = age;
}

Person.prototype.coding = function(){
    console.log('我在搬砖',this.name);
};

let per = new Person('andy',18);
console.log(per.__proto__ === Person.prototype); //true
```

### 3. `new`操作符的执行过程

1. 创建一个空对象。
2. 将这个空对象的`__proto__`指向构造函数的`prototype`。
3. 将构造函数的`this`指向这个对象。
4. 执行构造函数中的代码。

实现一个`new`操作符，需要注意构造函数是可以有返回值的，而且当返回值是基本数据类型的时候，通过`new`操作符获取到的是构造函数的实例，但是如果返回值是一个新对象的时候，通过`new`操作符获取到的就不再是其对应的实例，而是`return`出来的这个对象。

```javascript
// 实现1
function objectFactory() {
  let Constructor = [].shift.call(arguments);
  const obj = new Object();  
  obj.__proto__ = Conctructor.prototype;
  const result = Constructor.call(obj,...arguments);
  return typeof result === 'object' ? result : obj;
}

// 实现2
function myNew(Obj,...args){
  var obj = Object.create(Obj.prototype);//使用指定的原型对象及其属性去创建一个新的对象
  const result = Obj.apply(obj,args); // 绑定 this 到obj, 设置 obj 的属性
  return typeof result === 'object' ? result : obj; // 返回实例
}
```

### 4. 为什么原型链的尽头是`null`

原型链是指**对象的**原型链，所以原型链上的所有节点都是对象，不能是字符串、数字、布尔值等原始类型。

另外，规范要求原型链必须是**有限长度**的(从任一节点出发，经过有限步骤后必须到达一个终点。显然也不能有环。)

那么，应该用什么对象作为终点呢？很显然应该用一个特殊的对象。

好吧，`Object.prototype`确实是个特殊对象，我们先假设用它做终点。那么考虑一下，当你取它的原型时应该怎么办？即

```javascript
Object.prototype.__proto__;
```

应该返回什么？

取一个对象的属性时，可能发生三种情况：

1.  如果属性存在，那么返回属性的值。
2.  如果属性不存在，那么返回undefined。
3.  不管属性存在还是不存在，有可能抛异常。

我们已经假设`Object.prototype`是终点了，所以看起来不能是情况1。另外，抛出异常也不是好的设计，所以也不是情况3。那么情况2呢，它不存在原型属性，返回undefined怎么样？也不好，因为返回undefined一种解释是原型不存在，但是也相当于原型就是undefined。这样，在原型链上就会存在一个非对象的值。

所以，最佳选择就是null。一方面，你没法访问null的属性，所以起到了终止原型链的作用；另一方面，null在某种意义上也是一种对象，即空对象，因为null一开始就是为表示一个“空”的对象存在的。这样一来，就不会违反“原型链上只能有对象”的约定。

所以，“原型链的终点是null”虽然不是必须不可的，但是却是最合理的。

## `JavaScript`继承的几种方式，各有什么优缺点

#### 1. 构造函数继承

```javascript
function Animal() {
  this.species = 'animal';
}

function Cat(name) {
  Animal.apply(this, arguments);
  
  this.name = name
}
```

​		借用构造函数问题： 方法都在构造函数中定义，因此函数复用就无从谈起了。而且，在超类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式

### 2. `prototype`实现继承

```javascript
function Animal() {
  this.species = 'animal';
}

Animal.prototype.getSpecies = function () {
  return this.species;
}

function Cat(name) {
  this.name = name;
}

Cat.prototype = new Animal();
Cat.prototype.getName = function() {
  return this.name;
}
```

​	原型链的问题 原型链虽然很强大，可以用它来实现继承，但它也存在一些问题。其中，最主要的问题来自包含引用类型值的原型。

​	原型链的第二个问题是：在创建子类型的实例时，不能向超类型的构造函数中传递参数。实际上，应该说是没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数。有鉴于此，再加上前面刚刚讨论过的由于原型中包含引用类型值所带来的问题，实践中很少会单独使用原型链。

### 3. 构造函数与`prototype`组合继承

```javascript
function Animal(species) {
  this.species = species;
}

Animal.prototype.getSpecies = function () {
  return this.species;
}

function Cat(name, species) {
  Animal.call(this, species);
  this.name = name
}

Cat.prototype = new Animal();
Cat.prototype.getName = function() {
  return this.name;
}
```

​		无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部

### 4. 原型式继承

​		这种方法并没有使用严格意义上的构造函数。借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。

```javascript
function object(o) {
  function F(){};
  F.prototype = o;
  return new F();
}
```

​		`ECMAScript 5`通过新增`Object.create()`方法规范化了原型式继承。这个方法接收两个参数：一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象。在传入一个参数的情况下，`Object.create()`与`object()`方法的行为相同。

​		在没有必要兴师动众地创建构造函数，而只想让一个对象与另一个对象保持类似的情况下，原型式继承是完全可以胜任的。不过别忘了，包含引用类型值的属性始终都会共享相应的值，就像使用原型模式一样

### 5. 寄生式继承

​		创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真的是它做了所有工作一样返回对象。

```javascript
function createAnother(original) {
  var clone = object(original);
  
  clone.sayHi = function() {
    console.log('hi');
  }
  
  return clone;
}
```

​		使用寄生式继承来为对象添加函数，会由于不能做到函数复用而降低效率；这一点与构造函数模式类似。

### 6. 寄生组合式继承

​		所谓寄生组合式继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。

​	其背后的基本思路是：不必为了指定子类型的原型而调用超类型的构造函数，**我们所需要的无非就是超类型原型的一个副本而已**。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。寄生组合式继承的基本模式如下所示

```javascript
function inheritPrototype(subType, superType) {
  var prototype = object(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}

function Animal(species) {
  this.species = species;
}

Animal.prototype.getSpecies = function () {
  return this.species;
}

function Cat(name, species) {
  Animal.call(this, species);
  this.name = name
}

inheritPrototype(Cat, Animal);
Cat.prototype.getName = function() {
  return this.name;
}
```

​		这个例子的高效率体现在它只调用了一次`SuperType`构造函数，并且因此避免了在`SubType.prototype`上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用`instanceof`和`isPrototypeOf()`。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。

## 深拷贝和浅拷贝

### 1. 堆与栈

> 栈（stack）为自动分配的内存空间，它由系统自动释放；而堆（heap）则是动态分配的内存，大小不定也不会自动释放。

### 2. 基本数据类型

基本数据类型主要是：`undefined，boolean，number，string，null`。基本数据类型存放在栈中，存放在栈内存中的简单数据段，数据大小确定，内存空间大小可以分配，是直接按值存放的，所以可以直接访问。

***基本数据类型的值不可改变***

> javascript中的原始值（undefined、null、布尔值、数字和字符串）与对象（包括数组和函数）有着根本区别。原始值是不可更改的：任何方法都无法更改（或“突变”）一个原始值。对数字和布尔值来说显然如此 —— 改变数字的值本身就说不通，而对字符串来说就不那么明显了，因为字符串看起来像由字符组成的数组，我们期望可以通过指定索引来假改字符串中的字符。实际上，javascript 是禁止这样做的。**字符串中所有的方法看上去返回了一个修改后的字符串，实际上返回的是一个新的字符串值**。

```javascript
// 基本数据类型的值不可改变
var str = '123';
str[1] = 4;
console.log(str); // 123
```

### 3. 引用类型

​	引用类型（`object`）是存放在堆内存中的，变量实际上是一个存放在栈内存的指针，这个指针指向堆内存中的地址。每个空间大小不一样，要根据情况开进行特定的分配，例如。

​	引用类型的赋值是传址。只是改变指针的指向，例如，也就是说引用类型的赋值是对象保存在栈中的地址的赋值，这样的话两个变量就指向同一个对象，因此两者之间操作互相有影响。

### 4. 赋值

​		引用类型的赋值只能算得上是“引用”，并不算真正的浅

### 5 浅拷贝

#### 5.1 `Object.assign`

`Object.assign`实现的还是一个浅拷贝

```javascript
const person = {
  name: 'andy',
  age: 12
}

const newPerson = Object.assign({}, person);
```

#### 5.2 循环复制

##### 浅拷贝只复制一层对象的属性，并不包括对象里面的为引用类型的数据。

```javascript
function shallowCopy(obj) {
	const result = {};

	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			result[key] = obj[key];
		}
	}

	return result;
}
```

### 6 深拷贝

#### 

深拷贝是对对象以及对象的所有子对象进行拷贝。

```javascript
const slice = Array.prototype.slice;
const isArray = arr => Object.prototype.toString.call(arr) === '[object Array]';
const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

function clone(target, source) {
	for (let key in source) {
		if (isArray(source[key]) || isObject(source[key])) {
			if (isArray(source[key]) && !isArray(target[key])) {
				target[key] = [];
			}
			if (isObject(source[key]) && !isObject(target[key])) {
				target[key] = {};
			}

			clone(target[key], source[key]);
		} else if (source[key] !== undefined) {
			target[key] = source[key];
		}
	}
}

/**
 * 深度拷贝
 */
function deepClone() {
	const args = slice.call(arguments);
	const target = isArray(args[0]) ? [] : {};

	args.forEach(function(arg) {
		clone(target, arg);
	})

	return target;
}

```



## `ES6`

#### 6.1 Promise(基本上要求可以手写Promise.all方法)



#### 6.2 箭头函数和普通函数有什么区别

##### 6.2.1 箭头函数语法更加简洁清晰

```javascript
// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});

// 箭头函数写法
[1,2,3].map(x => x * x);

// 正常函数写法
var result = [2, 5, 1, 4, 3].sort(function (a, b) {
  return a - b;
});

// 箭头函数写法
var result = [2, 5, 1, 4, 3].sort((a, b) => a - b);
```

##### 6.2.2 箭头函数不会创建自己的`this`

> 箭头函数不会创建自己的`this`，所以它没有自己的`this`，它只会从自己的作用域链的上一层继承`this`。

​		箭头函数没有自己的`this`， 定义时**（注意，是定义时，不是调用时）所处的**外层执行环境的`this`**，并继承这个`this`值。所以，箭头函数中`this`的指向在它被定义的时候就已经确定了，之后永远不会改变。

##### 6.2.3 箭头函数继承而来的this指向永远不变

```javascript
var id = 'GLOBAL';
var obj = {
  id: 'OBJ',
  a: function(){
    console.log(this.id);
  },
  b: () => {
    console.log(this.id);
  }
};

obj.a();    // 'OBJ'
obj.b();    // 'GLOBAL'
```

​		上面的例子，就完全可以说明箭头函数继承而来的`this`指向永远不变。对象`obj`的方法`b`是使用箭头函数定义的，这个函数中的`this`就**永远指向**它定义时所处的全局执行环境中的`this`，即便这个函数是作为对象`obj`的方法调用，`this`依旧指向`Window`对象。

##### 6.2.4 .call()/.apply()/.bind()无法改变箭头函数中this的指向

```javascript
var id = 'Global';
// 箭头函数定义在全局作用域
let fun1 = () => {
    console.log(this.id)
};

fun1();     // 'Global'
// this的指向不会改变，永远指向Window对象
fun1.call({id: 'Obj'});     // 'Global'
fun1.apply({id: 'Obj'});    // 'Global'
fun1.bind({id: 'Obj'})();   // 'Global'
```

##### 6.2.5 箭头函数不能作为构造函数使用

​		因为箭头函数没有自己的`this`，它的`this`其实是继承了外层执行环境中的`this`，且`this`指向永远不会随在哪里调用、被谁调用而改变，所以箭头函数不能作为构造函数使用，或者说构造函数不能定义成箭头函数，否则用`new`调用时会报错！

##### 6.2.6 箭头函数没有自己的arguments

##### 6.2.7 箭头函数没有原型prototype

##### 6.2.8 箭头函数不能用作Generator函数，不能使用yeild关键字

#### 6.3 Map

Map的键和值可以是任何数据类型，键值对按照插入顺序排列，如果插入重复的键值，后面的键值会覆盖前者，

| 对比项                       | 映射对象Map | Object对象 |
| ---------------------------- | ----------- | ---------- |
| 存储键值对                   | √           | √          |
| 遍历所有的键值对             | √           | √          |
| 检查是否包含指定的键值对     | √           | √          |
| 使用字符串作为键             | √           | √          |
| 使用Symbol作为键             | √           | √          |
| 使用任意对象作为键           | √           |            |
| 可以很方便的得知键值对的数量 | √           |            |



#### 6.4 Set

在一些业务场景中，我们并不需要集合维护一个有序的状态，甚至有些场景需要无序集合，因此ES6里加入了无序集合Set和其的Weak版本WeakSet。

| 对比项     | Array      | Set          |
| ---------- | ---------- | ------------ |
| 元素序列   | 有序       | 无序         |
| 元素重复性 | 元素可重复 | 元素不可重复 |

### 7. 实现一个call/apply/bind

#### 7.1 apply

```javascript
Function.prototype.apply = function(context, arr) {
  var context = context || window;
  context.fn = this;
  var result;
  
  if (!arr) {
      result = context.fn();        // 没有传入参数，直接执行
  } else {
    	var args = [];
    	for(var i = 0; i < arr.length; i++) {
        args.push('arr[' + i + ']');
      }
      result = eval("context.fn(" + args + ")"); // 默认调用arr.toString()方法
  }
  
  delete context.fn;        // 将this指向销毁
  return result;
}
```

#### 7.2 call

```javascript
Function.prototype.call = function(context) {
  var context = context || window;      // 第一个参数为调用call方法的函数中的this指向
  context.fn = this;        // 此处this是指调用call的function
  
  var arr = [];
  for (var i = 1; i < arguments.length; i++) {
      arr.push("arguments[" + i + "]");
  }
  
  //执行函数，并返回结果，其中 arr 默认会调用toString()，此处可作参数
  var result = eval("context.fn(" + arr + ")");
  delete context.fn;        // 将this指向销毁
  return result;
}
```

#### 7.3 bind

```javascript
Function.prototype.bind = function() {
  var _this = this;
  var context = [].shift.call(arguments);       // 保存需要绑定的this上下文
  var args = [].slice.call(arguments);          // 剩下参数转为数组
  
  return function() {
    return _this.apply(context, [].concat.call(args, [].slice.call(arguments)));
  }
}
```

## 防抖和节流

### 1. 防抖

```javascript
let timer;

function debounce(fn, delay) {
	const _this = this;

	return function() {
		const args = Array.prototype.slice.call(arguments);

		clearTimeout(timer);
		timer = setTimeout(function () {
			fn.apply(_this, args);
		}, delay);
	}
}

```

### 2. 节流

```javascript
let timer;

function throttle(fn, delay) {
	const _this = this;
	let running = false;

	return function() {
		const args = Array.prototype.slice.call(arguments);
		running = true;

		if (!running) {
			timer = setTimeout(function () {
				fn.apply(_this, args);
				running = false;
			}, delay);
		}
	}
}
```





## 函数`function`

函数实际上是对象，每个函数实际上都是`Function`类型的实例，而且与其他引用类型一样具有属性和方法。函数名实际上是一个指向内存堆中某个函数对象的指针。

### 1. 函数类别

1.  `function`创建
2.  函数字面量：函数后`function`也可以跟函数名，但是没有意义
3.  `new`一个`Function`,创建`Fcuntion`的实例
4.  自执行函数：没有函数名，只能执行一次；
5.  `ES6`箭头函数

>   函数定义时候写在括号里的参数是形参,函数执行时传进去的参数是实参,形参和实参是一一对应的,arguments 实参集合 类数组（元素集合） return 决定函数的返回值 打断函数执行 this 函数的执行主体(非严格模式下,形参和arguments有映射关系,但在严格模式下却没有)

### 2. 函数存储

`JavaScript`中的函数属于引用数据类型，因此，函数存储是开一个16进制的堆内存，把函数体内的代码当字符串存进去。

### 3. 函数执行

函数执行是开一个私有作用域（栈内存），把堆内存的代码字符串拿出来执行，先形参赋值，再变量提升，然后代码从上到下执行（执行上下文），函数执行完，变量销毁，作用域销毁。

### 4. 变量提升

在代码执行之前`JavaScript`会把代码中带的`var`和`function`的提前声明，带`var`的只声明不定义，带`function`的声明又定义。变量提升，只提升等号左边的内容，对于条件语句来说，无论条件是否成立，都会进行变量提升，在条件句和循环句中的`function`是只声明不定义的。

需要注意只有`var`声明的变量才存在变量提升，`let`和`const`声明的都不会。

### 5. 作用域

作用域是代码执行时作用的区域，作用域就是一块栈内存（栈内存是用来存储值类型数据的，还有就是提供代码运行环境）。

### 6. 没有重载

ECMAScript函数不能像传统意义上那样实现重载，而在其他语言中（Java），可以为一个函数编写两个定义，只要这两个定义的签名（接收参数的类型和数量）不同即可。

ECMAScript函数没有签名，因为其参数是由包含零个或多个值的数组来表示的。没有函数签名，真正的重载是不可能做到的。在ECMAScript中定义两个名字相同的的函数，则该名字只属于后定义的函数。如何实现类似于Java中的重载呢，其实可以通过判断传入函数的参数类型和个数来做出不同响应。





##  H5拉起App，如果没有安装跳转应用市场

## Object.defineProperties都有哪些参数，以及参数解释

## requestAnimation

## 如何遍历对象，有何不同



## 原生实现insertAfter

## 实现一个EventEmitter

## node怎么起一个服务

## node中body-parse有什么作用













## 最近在看什么新技术





## TODO

-   [ ] `symbol`、`bigInt` 详情
-   [ ] `Set`、`map`、`weakSet`、`weakMap`详情
-   [ ] 字符串1加上数字1、字符串1减去数字1
