1数组方法：Array.prototype.findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1.

例：
```const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber)); //3

第一个参数：element:当前元素

第二个参数：index当前元素的索引

第三个参数：array调用findIndex的数组```

2对象方法：object.keys() 该方法会返回一个由给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致。

语法：Object.keys(obj) -------参数obj要返回其枚举自身属性的对象，返回值一个给定对象的所有可枚举属性的字符串数组。

```js
//给定对象为对象时，返回键名数组
let person = {name:"张三",age:25,address:"厦门",getName:function(){}}

console.log(Object.keys(person))  // ['name', 'age', 'address', 'getName']

//给定对象为数组，返回索引数组
let arr = ['ww','wx','zhangsan','lisi','wangwu']

console.log(Object.keys(arr)) // ['0', '1', '2', '3', '4']

//给定对象为字符串，返回索引数组
let str = 'dsafhlsafhas'

console.log(Object.keys(str)) // ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
```

Object.values:与Object.keys相对，返回的是值，而object.keys返回的是键位

```js
//给定对象为对象，返回键值数组
let person = {name:"张三",age:25,address:"厦门",getName:function(){}}

console.log(Object.values(person)) // ['张三', 25, '厦门', ƒ]

//给定对象为字符串，返回索引数组
let str = 'dsafhlsafhas'

console.log(Object.values(str)) // ['d', 's', 'a', 'f', 'h', 'l', 's', 'a', 'f', 'h', 'a', 's'] 
//也可以用 str.split('')直接实现 
```

3:数组方法 every ：**`every()`** 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

例：const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// expected output: true

语法：every((element, index, array) => { /* … */ } )

参数1：用于测试的当前值

参数2：用于测试当前值的索引

参数3：调用array当前数组

4：数组方法map  **`map()`** 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。

例：const array1 = [1, 4, 9, 16];
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]

语法：map((element, index, array) => { /* … */ })

参数array：map方法调用的数组

参数index：callbackFn数组中正在处理的当前元素的索引

返回值（返回一个新数组，每个元素都是回调函数的返回值）

5：number方法：toFixed() 该方法使用定点表示法来格式化一个数值

语法：numObj.toFixed(digits)

参数digtis：为小数点后数字的个数；取值范围介于0~20之间，如果忽略该参数，默认为0，返回值使用定点表示法表示给定数字的字符串。

6：Array.prototype.indexOf()方法：

indexOf()方法返回在数组中可以找到给定元素的第一个索引，如果不存在，则返回-1

```js
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
// expected output: 1

// start from index 2
console.log(beasts.indexOf('bison', 2));
// expected output: 4

console.log(beasts.indexOf('giraffe'));
// expected output: -1

//语法：indexOf(searchElement)
//indexOf(searvhElement,fromIndex)
//参数1：要查找的元素
//参数2开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回 -1。如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即 -1 表示从最后一个元素开始查找，-2 表示从倒数第二个元素开始查找，以此类推。注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。如果抵消后的索引值仍小于 0，则整个数组都将会被查询。其默认值为 0。
```

7:内置对象Math

```html
random：生成0-1之间的随机数（包含0不包括1）
ceil：向上取整
floor：向下取整
max：找最大数
min：找最小数
pow：幂运算
abs：绝对值
生成0-10的随机数：Math.floor(Math.random()*(10+1))
生成5-10的随机数：Math.floor(Math.random()*(5+1))+5
生成N-M之间的随机数:Math.floor(Math.random()*(M - N + 1)) + N
```

8:对象取值

```js
let obj = {
    uname=:'andy',
    age:18,
    sex:'男'
}
for(let k in obj){
    console.log(k)
    console.log(obj[k])
    //k是获得对象的属性名，对象名[k]是获得属性值
}
```

9:string.prototype.split():该方法使用指定的分割符字符串将一个string对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。

```javascript
const str = 'The quick brown fox jumps over the lazy dog.';

const words = str.split(' ');
console.log(words[3]);
// expected output: "fox"

const chars = str.split('');
console.log(chars[8]);
// expected output: "k"

const strCopy = str.split();
console.log(strCopy);
// expected output: Array ["The quick brown fox jumps over the lazy dog."]

//语法：str.split([separator[, limit]])
//参数1：separator：指定表示每个拆分应发生的点的字符串。它可以是一个字符串或正则表达式。如果纯文本分隔符包含多个字符，则必须找到整个字符串来表示分割点如果在 str 中省略或不出现分隔符，则返回的数组包含一个由整个字符串组成的元素。如果分隔符为空字符串，则将 str 原字符串中每个字符的数组形式返回。
//参数2：limit：一个整数，限定返回的分割片段数量。当提供此参数时，split 方法会在指定分隔符的每次出现时分割该字符串，但在限制条目已放入数组时停止。如果在达到指定限制之前达到字符串的末尾，它可能仍然包含少于限制的条目。新数组中不返回剩下的文本。
//返回值：如果split方法里面未放内容，返回源字符串以分隔符出现位置分隔而成的一个Array
```

10:Object.values(obj)