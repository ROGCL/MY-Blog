Vue-Router

1引入,注册

```javascript
import VueRouter from 'vue-router'
vue.use(VueRouter)
```



router-link:不用使用a标签的href属性来进行跳转。使用router-link来创建链接（使用to属性），这样就可以使得Vue-Router在不重新加载页面的情况下更改URL，处理URL的生成以及编码。

```javascript
HTML的用法：
<router-link to="/">
    //使用router-link来进行导航
    //通过to属性来指定连接
    //<router-link>将渲染出来一个带有正确href属性的a标签
</router-link>
<router-view>
//路由出口
//路由匹配到的组件将会渲染到这里（router-view将显示与url对应的组件。可以把他放在任何地方，以适应布局。）
</router-view>
```

```javascript
JavaScript用法（常用）：
//1.定义路由组件
//也可以从其他文件导入
const home = {templete:'<div>Home</div>'}
const About = {templete:'<div>About</div>'}
//2.定义一些路由
//每个路由都需要映射到一个组件
const routes = [
    {path:'/',component:Home},
    {path:'/about',component:About},
]
//3.创建路由实例并传递·routes·配置
//可以在这里输入一些配置项
const router = VueRouter.createRouter({
    //4.内部提供了history模式的实现
    history:VueRouter.createWebHashHistory(),
    routes, //`routes:routes的缩写`
})
//5.创建并挂载根实例
const app = Vue.createApp({})
//确保_use_路由实例使整个应用支持路由
app.use(router)
app.mount('#app')
```

再创建好路由之后，通过调用app.use(router)，我们可以在任意组件以this.$router的形式访问它，并以this.$route的形式访问当前路由

```javascript
//Home.vue
export default{
    computed:{
        username(){
            return this.$route.params.username
        }
    },
},
methods:{
    goToDashboard(){
        if(isAuthenticated){
            this.$router.push('/dashboard')
        }else{
            this.$router.push('/login')
        }
    }
}
```

如果要在setup函数中访问路由，调用useRouter或useRoute函数。

this.$router 与直接通过createRouter创建的router实例完全相同。(使用this.$router的原因是，不需要在每个需要操作路由的组件中都导入路由---------起到简化流程的作用)

带参数的动态路由匹配（路径参数）

```javascript
const User = {
    templete:'<div>User</div>'
}
//这些都会传递给createRouter
const routes = [
    //动态字段以冒号开始
    {path:'/user/:id,component:User'},
]
```

现在像/users/johnny和/users/jolyne这样的url都会映射到同一个路由。

路径参数用冒号 ``:``来表示。当一个路由被匹配时，它的params的值将在每个组件以this.$route.params的形式爆露出来。此时就可以通过更新User的模板来呈现当前用户的ID

```javascript
const User = {
    templete:`<div>User {{$route.params.id}}</div>`
}
```

同时也可以在同一个路由中设置有多个路径参数，它们会映射到$route.params上的相应字段。

|  匹配模式  |  匹配路径  |  $route.params

||  /users/:username  ||  /users/edurado  ||  { username: 'eduardo' }

||  /users/:username/posts/:postId  ||  /users/eduardo/posts/123  ||  { username: 'eduardo', postId: '123' }

响应路由参数的变化:使用带有参数的路由时需要注意的是，当用户从/users/johnny导航到/users/jolyne时，相同的组件实例将被重复使用。因为两个路由都渲染同个组件，比起销毁在创建，复用时显得更加高效。（但组建的生命周期钩子不会被调用）

若要对同一个组件中参数的变化做出响应的话，可以简单地watch ``$route``对象上的任意属性，在这个场景中，就是``$route.params``

```javascript
const User = {
    templete:'...'
    created(){
        this.$watch(
        ()=>this.$route.params,
            (toParams,previousParams)=>{
                //对路由变化做出响应...
            }
        )
    }
}
```

或者可以直接使用``beforeRouteUpdate``导航守卫，它也可以取消导航

```javascript
const User = {
    templete:'...',
    async beforeRouteUpdate(to,from){
        //对路由变化做出响应...
        this.userData = await fetchUser(to.params.id)
    }
}
```

