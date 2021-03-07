// pages/category/childCpns/g-menu/g-menu.js
Component({
  properties: {
    menuList: {
      type: Array,
      value: []
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    // 监听左侧菜单栏item点击
    handleMenuClick(event) {
      const currentIndex  = event.currentTarget.dataset.index
      this.setData({
        currentIndex
      })
      this.triggerEvent('menuClick', {currentIndex}, {})
    }
  }
})
