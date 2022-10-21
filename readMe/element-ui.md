element-ui使用：

1：el-select下拉菜单，下拉菜单中的每一项用el-option

为el-select（下拉选择器）设置clearable属性可以将选择器清空。注：clearable属性仅适用于单选。

在el-option中，设定disabled值为true，即可禁用该选项。

参数：popper-append-to-body:是否将弹出框插入至body元素。在弹出框的定位出现问题时，可将该属性设这位false。（该参数的取值为Boolean，且默认值为true）

参数：reserve-keyword:多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词（取值Boolean，默认值为false）

参数：multiple 是否多选，collapse-tags多选时是否将选中值按文字的形式展示，filterable是否可搜索（这三个参数的默认值都为false，取值为Boolean）

参数：绑定在el-option上的value：每一选项的值（取值string/number/object），label选择的标签，若不设置则默认与value相同（取值string/number），disabled 是否禁用该选项（取值为Boolean）

2：（form表单）表单域model字段,el-form-item的prop属性，在使用validate(校验)、resetFieds（对整个表单进行重置，将所有字段值重置为初始值并移除校验结果）方法的情况下，该属性是必填的。可选值（传入Form组件的model中的字段）

3：el-tooltip：组件本身就是悬浮提示功能，但是我们需要给超出的文本加提示，没超出的不加提示（做提示信息的组件）

例：其中content为提示文字信息的区域，placement为提示信息的位置信息[方向-对齐位置]（默认为空需要自己设置），effect为主题样式，取值为Dark和Light

<el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
      <el-button>上左</el-button>
 </el-tooltip>

4:el-row布局的标签项，例：

<el-row>  

<el-col :span="24">

//<div class="grid-content bg-purple-dark"></div>

</el-col> 

</el-row>

el-row的gutter参数（栅格间隔 参数number 默认值为0 没有间距 写法 :gutter="number"）

el-col     设置：span的值可以方便的给页面按列分割，但是span默认是分成24列的。分成两列中间没有间隔，不满足。

![image-20221010190346579](C:\Users\an\AppData\Roaming\Typora\typora-user-images\image-20221010190346579.png)



5：el-button  参数：

![image-20221011130940454](C:\Users\an\AppData\Roaming\Typora\typora-user-images\image-20221011130940454.png)



6：el-radio-group单选框组el-radio为单选框组中的每一项。

在el-radio-group中绑定v-model，在el-radio中设置好label即可，无需再给每一个el-radio绑定变量，另外还提供了一个change事件来响应变化，他会传入一个参数value。

7：el-date-picker ：基本单位由type指定。快捷选项需配置picker-options对象中的shortcuts，禁用日期通过disabledDate设置，传入函数。

如果是在选择日期范围时，默认情况下左右面板会联动。如果希望两个面板各自独立切换当前月份，可以使用unlink-panels属性解除联动。且在选择日期范围时，type的值为deterange。

range-separator为中间间隔词段：range-separator="至" （

![image-20221011164214812](C:\Users\an\AppData\Roaming\Typora\typora-user-images\image-20221011164214812.png)

）

value-format参数：可选参数，绑定值的格式。不指定为绑定值的Date对象（类型为string）例：value-format=“yyyy-MM-dd”（就是日期格式）

picker-options参数：当前事件日期选择器特有的选项（类型为object）