// pages/cart/cart.js

const app = getApp()

Page({
  data: {
    cartList: [],
    isSelectedAll: true,
    totalPrice: 0,
    totalCounter: 0
  },
  onLoad: function (options) {
    this.setData({
      cartList: app.globalData.cartList
    })

    app.addCartCallBack = () => {
      this.setData({
        cartList: app.globalData.cartList
      })

      this.changeData()
    }

    // 修改某个商品的回调
    app.changeGoodsState = (index, goods) => {
      this.setData({
        [`cartList[${index}]`]: goods
      })

      const isSelectedAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectedAll
      })

      this.changeData()
    }
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`
    })

    this.changeData()
  },
  changeData() {
    let totalPrice = 0
    let totalCounter = 0
    for(let item of this.data.cartList) {
      if(item.checked) {
        totalPrice += item.price * item.count
        totalCounter ++
      }
    }
    totalPrice = totalPrice.toFixed(2)
    this.setData({
      totalPrice,
      totalCounter
    })
  },
  onSelectedAll() {
    if(this.data.isSelectedAll) {
      this.data.cartList.forEach(item => {
        item.checked = false
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectedAll: false
      })
    } else {
      this.data.cartList.forEach(item => {
        item.checked = true
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectedAll: true
      })
    }

    this.changeData()
  }
})