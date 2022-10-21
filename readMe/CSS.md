CSS:

1:img标签

```html
<img src="" alt=""> 
img标签内最好不要加类名，设置会不生效
```

2:span标签是一个内联元素，只能容纳文本或者其他内联元素，给span标签设置高height、宽width、上下内边距(padding-top/bottom)、上下外边距([margin](https://so.csdn.net/so/search?q=margin&spm=1001.2101.3001.7020)-top/bottom)都是不起作用的。给span标签设置左右内边距(padding-left/right)、左右外边距(margin-left/right)、行高(line-height)是有效的。（若需要能够设置padding和margin的宽高，将span转换为块级标签即可）

3:letter-spacing属性：增加或减少字符间的空白（字符间距）----属性值{1默认--normal,2length--定义字符间的固定空间(允许使用负值),3inherit---规定应该从父元素继承letter-spacing属性的值}

4：CSS属性white-space （属性值：normal默认值。pre空白会被浏览器保留--其行为与HTML中的pre标签类似。nowrap：文字不会换行，文本会在同一行上继续，直到遇到br标签为止。prewrap：保留空白符序列，但是正常地进行换行。pre-line：合并空白符序列，但是保留换行符。inherit：规定应该从父元素继承white-space属性的值）

5：column-count属性：将文本分为多少列（默认值auto（列数取决于其他属性，例如:"column-width"），不能继承。number(列的最佳数目将其中的元素的内容无法流出)）

```html
<div class="num1">
</div>
.num1{
column-count:3;
-moz-column-count:3; /* Firefox */
-webkit-column-count:3; /* Safari and Chrome */
}
```

6:如果需要更改input表单中placeholder文字的位置，可以使用input::-webkit-input-placeholder{} 

```html
<input type="text" placeholder id="btn4">
#btn4::-webkit-input-placeholder{
//设置此属性可以更改placeholder的位置，若是只改变文字颜色大小，直接在input表单上设置即可
  position: absolute;
  left: .5333rem; //40px
  bottom: .32rem; //24px
}

```

（使用定位的方式改变placeholder的位置）

7:font-family外部字体引入,不需要在系统中安装(因为客户的电脑里面也没有这种字体，会导致样式出不来，所以直接在CSS中引入)

```css
//在font目录下，放置字体样式
//在全局css中引入样式
//例:
  @font-face{
    font-family: KoseFont-SC;
    src: url('KoseFont-SC.ttf');
  }
```

