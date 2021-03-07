// pages/detail/detail.js
import {
  getDetail,
  getRecommends,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo
} from '../../service/detail.js'

const app = getApp()

Page({
  data: {
    iid: '',
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: []
  },
  onLoad: function (options) {
    this.setData({
      iid: options.iid
    })
    this._getDetail(this.data.iid)
    this._getRecommends()
  },
  _getDetail(iid) {
    getDetail(iid).then(res => {
      const data = res.data.result
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)
      const shopInfo = new ShopInfo(data.shopInfo)
      const detailInfo = data.detailInfo
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)

      let commentInfo = {}
      if(data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }
      this.setData({
        topImages: data.itemInfo.topImages,
        baseInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo
      })
    })
  },
  _getRecommends() {
    getRecommends().then(res => {
      this.setData({
        recommends: res.data.data.list
      })
    })
  },
  onAddCart() {
    const obj = {}
    obj.iid = this.data.iid
    obj.image = this.data.topImages[0]
    obj.title = this.data.baseInfo.title
    obj.desc = this.data.detailInfo.desc
    obj.price = this.data.baseInfo.realPrice

    app.addToCart(obj)
    
    wx.showToast({
      title: '加入购物车成功',
    })
  }
})