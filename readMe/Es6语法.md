ES6对象解构用法:

1使用解构从对象中获取值:对象解构最基本的用法是从对象中检索属性键的值。

```vue
const User = {
name:'123',
age:18
}
//传统方式上，可以直接使用点(.)表示法或下标([])表示法从对象中检索值。
const name = User['name']
const age = User.age
//解构赋值方法
const {name,age} =User
```

2使用解构从嵌套对象中获取值

```vue
const User = {
  name: '21314',
  age: '18',
  contact:{
    phone:'110',
  }
}
//使用点语法的取值
const phone = User.contact.phone
//使用解构赋值的方法
const {contact:{phone}} = User
console.log(phone)  // output 10
```

3使用对象解构定义一个新变量以及默认值

```vue
//在日常开发中的极端情况
//1后端传回来的对象，可能会缺失某些字段
const User = {
  name: '搞前端的半夏',
}
//2或者属性没有具体的值
const User = {
  name: '搞前端的半夏',
  age: ''
}
//当我们使用解构赋值的话：无论是否存在age属性的话，都会创建age变量。
const { name, age } = employee;
//当User.age没有具体值得话，我们则可以使用,给age一个默认值
const { name, age=18 } = employee;
```

4新变量，如果想输出User属性的组合值

```vue
const { name,age,detail = `${name} 今年 ${age} `} = User ;
console.log(detail); // 输出：搞前端的半夏 今年 18 
```

5使用对象解构处理动态名称属性

```vue
//我们经常将 API 响应数据作为 JavaScript 对象处理。这些对象可能包含动态数据，因此作为客户端，我们甚至可能事先不知道属性键名称。
const User = {
  name: '搞前端的半夏',
  age: ''
}
//当我们将键作为参数传递时，我们可以编写一个返回User对象属性值的函数。这里我们使用了[],来接受参数，js会根据这个键对从对象中检索！
function getPropertyValue(key) {
    const { [key]: returnValue } = User;   
    return returnValue;
}
const contact = getPropertyValue('contact');
const name = getPropertyValue('name');

console.log(contact, name);
```









