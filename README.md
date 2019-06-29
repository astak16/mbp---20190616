# 旧岛开发实战
## 20190616 `like`组件开发
### 知识点：
1. `display: inline-flex`动态自适应
2. 消除不必要的空白，特别是字体，`font-size`和`line-height`设置一样大小
3. 开发组件形成自己的风格，比如：`v-like`，`v`是法语`vent`的首字母，表示林间有风

## 20190616 组件的封装
1. 封装性，开放性。那些是要封装在内部，哪些是要开放出来的
2. 粒度（组件封装的难点）
3. 非常简单的功能 非常复杂的功能

## 20190617 路径导入文件
1. `import`导入文件不能使用绝对路径，只能使用相对路径
2. `component`中注册组件可以使用绝对路径，也可以使用相对路径

## 20190618 自定义事件

### 组件内部
```
this.triggerEvent('like',{ behavior },{})
```
第一个参数是事件名，第二个参数在`event.detail`中可以访问到，通过这个参数可以做一些自己做一些自定事件

### `wxml`页面中使用组件
组件中使用`bind:like="onLike"`就可以绑定自定义事件了。

### `js`中监听自定义事件
```
onLike () {
  ...
}
```

### 小技巧
一个表达式在条件为`true`时才会被执行，可以简化成下面这种
```
1 && 2    //2，当第 1 个表达式为 true 时，执行第 2 个表达式
0 && 2    //1，当第 1 个表达式为 false 时，不执行第 2 个表达式
```

## 20190619 `observer`
自定义组件需要对传外部传进来的数据进行处理，数据发生改变时`obserber`会被触发

正常这样设置的话，`08`会被渲染成`8`，前面的`0`会自动被去掉
```
properties{
  index{
    type: Number,
    observer (newVal) {
      let val = newVal > 10 ? '0' + newVal : newVal
      this.setData({
        index: val
      })
    }
  }
}
```
如果是这样设置的话，会进入死循环，因为在用`setData`设置`index`时是`Number`类型。

那么在在`properties`中的`index`如果设置为`Number`，`08`会变成`8`相对于之前传进来的`8`没有发生改变，所有不会触发`obserber`，但是将`properties`中的`index`设置为`String`，那么就会无限在`Number`和`String`之间不停切换了。
```
properties{
  index{
    type: String,
    observer (newVal) {
      let val = newVal > 10 ? '0' + newVal : newVal
      this.setData({
        index: val
      })
    }
  }
}
```

解决这个问题有两种方式
1. 在`data`中设置一个变量`_index`，通过`setData`去改变`_index`
```
properties{
  index{
    type: String,
    observer (newVal) {
      let val = newVal > 10 ? '0' + newVal : newVal
      this.setData({
        _index: val
      })
    }
  }
}
data: {
  _index: 0
}
```

## 20190620 `behaviors`

新建一个`classic-beh.js`文件用来定义`behavior`，写代码的时候使用`Behavior`这个关键字，其他的和写`Component`一样

`behaviors`是一个多继承的关系，如果出现了重名的`properties`和`data`最后一个的的属性会被继承，但生命周期函数不会被覆盖，都会被执行一遍。

## 20190620 获取`currentIndex`和`latestIndex`
`getLatest()`获取到的是最新一期期刊，通过`localStorage`存储到本地。在切换下一张期刊时，通过比较`currentIndex`和`latestIndex`，来控制左边一个箭头是否可以点击。

说明：
> currentIndex 是最新一期期刊的 index
> latestIndex 是通过 getLatest() 获取到的最新 index
