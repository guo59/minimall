// app.js
App({
  globalData: {
    cartList: []
  },
  addToCart(obj) {
    const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid)
    if(oldInfo) {
      oldInfo.count += 1
    } else {
      obj.count = 1
      obj.checked = true
      this.globalData.cartList.push(obj)
    }

    if(this.addCartCallBack) {
      this.addCartCallBack()
    }
  }
})
