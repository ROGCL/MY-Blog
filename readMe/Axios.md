Axios:

1请求拦截器：请求拦截器的作用是在请求发送前进行一些操作，例如在每个请求体里加上token，统一做了处理如果以后要改也非常容易。

```javascript
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么，例如加入token
    .......
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
```

2响应拦截器:响应拦截器的作用是在接收到响应后进行一些操作，例如在服务器返回登录状态失效，需要重新登录的时候，跳转到登录页。

```axios.interceptors.response.use(function (response) {
    // 在接收响应做些什么，例如跳转到登录页
    ......
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });```
```

3移除拦截器:

```var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor); ```var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

4为axios实例添加拦截器

```javascript
var instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```

5axios的基础用法:（axios函数调用原地结果是一个promise对象，通过.then/.catch方法拿到promise里面ajax的成功或失败的结果）

使用axios传参（get请求）：通过v-model绑定后，在params项中进行声明并传参

使用axios新增（post请求）：v-model绑定数据，发起请求，传递参数在data中进行拼接（可以使用...的方式获取v-model绑定的所有对象）

```javascript
import axios from 'axios'
axios({
    method:'请求方式',
    url:"请求地址",
    data:{
        //拼接到请求体的参数，POST请求到参数
        xxx:xxx
    },
    params:{
        //拼接到请求行的参数，get请求到参数
        xxx:xxx
    }
}).then(res => {
console.log(res.data) //后台返回的正确结果
}).catch(err => {
console.log(err) //后台捕获到的错误信息    
})
```

6axios的全局配置地址：axios.defaults.baseURL=""

7如果想要配置特定的标识符，作为发请求的标识

```vue
//VUE2中，使用prototype的方式（记得在axios封装完成之后，export default axios出来）
//在main.js中配置
Vue.prototype.$http = axios

//VUE3中，使用createApp
//main.js中
import {createApp} from 'vue'
import axios from '@/axios'
let app = createApp(App)
app.config.globalProperties.$http = axios
```

