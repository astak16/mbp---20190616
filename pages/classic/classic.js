import { ClassicModel } from '../../modles/classic.js'
import { LikeModel } from '../../modles/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({
  data:{
    classic: null
  },
  onLoad(options){
    classicModel.getLatest(res => {
      this.setData({
        classic: res
      })
    })
  },
  onLike (event) {
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id,this.data.classic.type)
  }
})
