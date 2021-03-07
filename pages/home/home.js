// pages/home/home.js
import {getMultiData, getGoodsData} from '../../service/home'

const types = ['pop', 'new', 'sell']
const TOP_DISTANCE = 1000

Page({
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      pop: {page: 0, list: []},
      new: {page: 0, list: []},
      sell: {page: 0, list: []}
    },
    currentType: 'pop',
    isShowBack: false,
    isTabFixed: false,
    tabScrollTop: 0
  },
  onLoad: function (options) {
    this._getMultiData()
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },
  _getMultiData() {
    getMultiData().then((res) => {
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type) {
    const page = this.data.goods[type].page + 1

    getGoodsData(type, page).then((res) => {
      const list = res.data.data.list
      const oldList = this.data.goods[type].list
      oldList.push(...list)

      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey] : oldList,
        [pageKey] : page
      })
    })
  },
  handleTabClick(event) {
    const index = event.detail.index
    this.setData({
      currentType: types[index]
    })
  },
  handleBackTop() {
    wx.pageScrollTo({
      duration: 600,
      scrollTop: 0
    })
  },
  handleImgLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
  },
  onReachBottom() {
    this._getGoodsData(this.data.currentType)
  },
  onPageScroll(options) {
    const top = options.scrollTop
    const flag1 = top >= TOP_DISTANCE
    if(flag1 != this.data.isShowBack) {
      this.setData({
        isShowBack: flag1
      })
    }

    const flag2 = top > this.data.tabScrollTop
    if(flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }
  }
})