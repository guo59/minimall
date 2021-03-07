// components/tab-control/tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    itemClick(event) {
      const index = event.currentTarget.dataset.index
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('itemClick', {index, title:this.properties.titles[index]}, {})
    }
  }
})
