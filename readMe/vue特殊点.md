.sync 修饰符其实是个双向绑定的语法糖，一般用于“双向绑定”props的时候，类似v-model

.native修饰符，将原生事件绑定到组件

v-model:在组件上是处理为value和input的语法糖

子向父传值，触发的不是自定义事件名而是自定义事件名里面的名称：例：父：@自定义事件名="父methods里的函数名"

子：this.$emit('父组件内自定义事件名，值')    //如果需要接收多个参数，使用$event进行占位

v-loading实现加载效果： 使用v-loading在接口未请求到数据之前，显示加载中，知道请求数据后消失。

全局loading

<template>   
    <div v-loading="loading"> </div> 
</template>

在`data` 中定义初始化， `loading: false`，同时在`mounted()`中将 `this.loading`设置为`true`,再去请求接口.,

在接口的回调函数中，将 `this.loading` 设为`false`，到达加载动画效果。

局部loading：如果写在templete下的顶层元素上的话，就不会触发全屏loading。

<template>    
    <div>         
        <section v-loading="loading"></section>   
    </div> 
</template>
具名插槽(v-slot：（#）只能在templete标签上使用)：在需要多个插槽的情况下，<slot>元素会有一个name属性。这个属性可以用来定义额外的插槽。例： <slot name="header"></slot>。如果一个不带name的<slot>出口会带有隐含的名字"default"



向具名插槽提供内容的时候，可以在一个templete元素上使用v-slot指令，并以v-slot的参数的形式提供其名称。此时，templete元素中所有的内容都会被传入相应的插槽。任何没有被包裹在带有v-slot的templete中的内容都会被视为默认插槽的内容。

然而仍然可以在一个<templete>中包裹默认插槽的内容。

例：

具名插槽的缩写：v-slot（即把参数之前的所<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>

会被渲染出：

//<div class="container">
  //<header>
    //<h1>Here might be a page title</h1>
  //</header>
  //<main>
    //<p>A paragraph for the main content.</p>
    //<p>And another one.</p>
  //</main>
  //<footer>
    //<p>Here's some contact info</p>
  //</footer>
//</div>

有内容（v-slot：）替换为字符#。例v-slot：header可以替换写为#header）注：该缩写只有在具有参数的时候才可用。

例：<current-user #="{ user }">这种写法会抛出一个警告。如果需要使用缩写的时候，必须明确插槽名取而代之。<current-user #default="{ user }">

例：正确写法：

<current-user #default="{ user }">
  {{ user.firstName }}
</current-user>

3过滤器：常用于一些常见的文本格式化。可以使用在两个地方v-bind表达式和双花括号插值

4: .native修饰符如果想在某个组件的根元素上绑定事件，直接使用@click="function"是不生效的，可以添加.native修饰符 @click.native="function"(官方解释：如果想在某个组件的根元素上监听一个原生事件，可以使用.native修饰符)

5:templete标签的使用：

例：需求下图用v-for做了列表循环，现在想要span也一起循环，有几种方式

```vue
<div>
    <div>
        <div v-for="(item,index) in list" :key="item.id">
            {{item.text}}----{{index}}
        </div>
        <span>{{item.text}}</span>
    </div>
</div>
```

实现方法：1直接用v-for对span标签循环一次（不建议）

```vue
<span v-for="(item,index) in list" :key="item.id">{{item.text}}</span>
```

2在外层包裹一个div标签，给这个p加循环（但会有一个bug，会额外增加p标签，不利于布局）

```vue
<div id="app">
    <div v-for="(item,index) in list" :key="item.id">
        <div>
          {{item.text}}----{{index}}
        </div>
        <span>
        {{item.text}}
        </span>
    </div>
</div>
```

3如果不想让p标签重复出现，此时就应该用templete来实现（推荐）

```vue
<templete v-for="(item,index) in list" :key="item.id"v-for="(item,index) in list" :key="item.id">
        <div>
          {{item.text}}----{{index}}
        </div>
        <span>
        {{item.text}}
        </span>
</templete>
```

注：templete的作用是模板占位符，可帮助我们包裹元素，但在循环过程中，templete不会被渲染到页面上

4:v-model于v-bind:value(:value)的区别：

v-model实现了视图和data中数据的双向绑定，两者其一改变均改变

v-bind:value只是将初始化时data中的数据绑定到input上，修改input的值并不会改变data中的数据

v-model其实是一个语法糖，背后本质时v-bind:value和v-on:input两个操作，父组件将值通过:value传给子组件，当值改变的时候，子组件通过@input通知父组件值发生了改变，形成单向数据流。

$attrs 和 inheritAttrs

4$attrs用于储存props之外的内容（例：父组件通过:value给子组件传值，但是父组件中设置了type="password"，并未通过props传给子组件，此时，值就存在$attrs中）

设置inheritAttrs:false 可以避免顶层容器继承属性

5：name属性的作用-----1递归组件2移除keep-alive状态下组件自动缓存功能->exclud="name"

```vue
<div class="app">
    <keep-alive exclude="Detail">
    <router-view/>
    </keep-alive>
</div>
```

3可在浏览器使用vue-tools调试时使用

6:在做判断条件时，可以用1和0来表示boolean值，以展示效果。

7:computed计算属性

computed简写形式

```vue
<template>
  <div>
    <div>姓：<input type="text" v-model="surname"></div>
    <div>名：<input type="text" v-model="name"></div>
    <div>姓名：<input type="text" v-model="fullName"></div>
  </div>
</template>
 
<script>
export default {
  computed:{
    fullName(){
      return this.surname+'~'+this.name
    }
  },
  data(){
    return{
      surname:'勇敢',
      name:'小陈',
    }
  }
}
</script>
 
<style>
 
</style>
```

computed完整形式:computed的简写形式只是单独的完成了读的功能，而没法去改变值，例：

```vue
<template>
  <div>
    <div>姓：<input type="text" v-model="surname"></div>
    <div>名：<input type="text" v-model="name"></div>
    <div>姓名：<input type="text" v-model="fullName"></div>
  </div>
</template>
 
<script>
export default {
  computed:{
    fullName:{
      get(){
        return this.surname+'~'+this.name
      },
      set(value){
        var arr=value.split('~')
        this.surname=arr[0]
        this.name=arr[1]
      }
    }
  },
  data(){
    return{
      surname:'勇敢',
      name:'小陈',
    }
  }
}
</script>
 
<style>
 
</style>
```

8:v-if与v-show的区别

共同点：v-if和v-show都能实现元素的显示隐藏

```html
区别：    
1. v-show 只是简单的控制元素的 display 属性，而 v-if 才是条件渲染（条件为真，元素将会被渲染，条件 为假，元素会被销毁）；

2.  v-show 有更高的首次渲染开销，而 v-if 的首次渲染开销要小的多；

3. v-if 有更高的切换开销，v-show 切换开销小；

4. v-if 有配套的 v-else-if 和 v-else，而 v-show 没有

5. v-if 可以搭配 template 使用，而 v-show 不行
```
```html
使用场景：
v-if 与 v-show 都能控制dom元素在页面的显示

v-if 相比 v-show 开销更大的（直接操作dom节点增加与删除）

如果需要非常频繁地切换，则使用 v-show 较好

如果在运行时条件很少改变，则使用 v-if 较好
```

9:watch监听器：

```vue
<templete>
<div>
    <input type="text" v-model="ability">
    <input type="text" v-model="cityName.name" />
 </div>
</templete>
<script>
export default {
    data(){
        return{
            ability:"",
            cityname:{name:"北京"}
        }
    }，
    watch:{
    //1普通数据类型
     // 监听属性的简易用法
      // ability(newname,oldname){
      //   console.log(newname,oldname)
      // }
    //深度监听
    //需要配上handler实现，immediate可选参数
      //  ability:{
      //    handler(newname,oldname){
      //      console.log(newname,oldname)
      //    },
      //    immediate:true   //是否在页面开启时就开始侦听
      //  }
    //缺点只有一个缺点 就是当值第一次绑定的时候 不会执行监听函数，只有当值改变的时候 才会执行如果我们想在第一次绑定的时候执行此监听函数 则需要 设置immediate为true
    
    //2对象类型：当需要监听对象的改变时，此时就需要设置deep为true
    cityname:{
    handler(newname,oldname){
        console.log(newname)
    },
        immediate:true,
        deep:true     //是否开启深度监听
}
    //注：如果对象的属性较多，可以只监听某一个属性 例:'cityName.name'
}
u
//3数组类型：
//注：在watch中不要用箭头函数，因为箭头函数的this是指向当前作用域
</script>


```

10:this.$set(obj,key,value)

```vue
<template>
  <div class="hello">
    <button @click="setMessage">添加属性</button>
    {{ student.name }}
    <input type="text" v-model="student.age">
  </div>
</template>
<script>
export default {
  data() {
    return {
      student: {
        name: '张三',
      }
    }
  },
  methods: {
    setMessage() {
      this.student.age = 15
      console.log(this.student)
    }
  }
}
</script>
//此时点击按钮，虽然对象身上已经有了该属性，但是视图层并没有更新该数据，这时候就需要用到this.$set方法
```

产生原因:由于受到JS限制，vue.js不能监听对象属性的添加和删除，因为在vue组件初始化的过程中，会调用gettter和setter方法，所以该属性必须是存放在data中，视图层才会响应该数据的变化。

解决思路：1使用this.$set(obj,key,value)  /  vue.use(obj,key,value)

```vue
<script>
export default {
 data() {
   return {
     student: {
       name: '张三',
     }
   }
 },
 methods: {
   setMessage() {
     this.$set(this.student, 'age', 15)
     console.log(this.student)
   }
 }
}
</script>

```

2.通过Object.assign(target,sources)方法

```vue
<script>
export default {
  data() {
    return {
      student: {
        name: '张三',
      }
    }
  },
  methods: {
    setMessage() {
      this.student.age = 15
      this.student = Object.assign({}, this.student)
      console.log(this.student)
    }
  }
}
</script>

```

这两种方式为对象添加属性之后，他们的对象身上就多了get和set方法，所以再次执行操作的时候，就会引起视图的更新

11：让整个页面重新刷新

```vue
//方法1
location.reload()

```

