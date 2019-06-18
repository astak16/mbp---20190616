import { HTTP } from '../../utils/http.js'

let http = new HTTP()

Component({
  properties: {
    like: {
      type: Boolean
    },
    count: {
      type: Number
    }
  },
  data: {
    yesSrc:'images/like.png',
    noSrc: 'images/unLike.png'
  },
  methods: {
    onLike(event) {
      let like = this.properties.like
      let count = this.properties.count

      //初始值 like 为 false，当我点击的时候，like 为 false，此时 count 要加 1，然后在设置 like 为 true
      count = like ? count-1 : count+1

      this.setData({
        count: count,
        like: !like
      })
      let behavior = this.properties.like ? 'like' : 'cancel'
      this.triggerEvent('like',{ behavior },{})
    }
  }
})
