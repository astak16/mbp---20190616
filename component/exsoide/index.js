// component/exsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer (newVal) {
        let val = newVal < 10 ? '0' + newVal : newVal
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    year: 0,
    month:'',
    _index: 0
  },
  attached(){
    const data = new Date()
    const year = data.getFullYear()
    const month = this.data.months[data.getMonth()]
    this.setData({
      year,month
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
