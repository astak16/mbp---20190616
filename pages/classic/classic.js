import { ClassicModel } from '../../modles/classic.js'
import { LikeModel } from '../../modles/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({
  data:{
    classic: null,
    first: false,
    latest: true,
    likeCount: 0,
    likeStatus: false
  },
  onLoad(){
    classicModel.getLatest(res => {
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },
  onLike (event) {
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id,this.data.classic.type)
  },
  onNext () {
    this._updateClassic('next')
  },
  onPrevious () {
    this._updateClassic('previous')
  },
  _updateClassic (nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, res => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },
  _getLikeStatus (artID, category) {
    likeModel.getClassicLikeStatus(artID, category, res => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  }
})
