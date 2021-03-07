// pages/cart/childCpns/bottom-bar/bottom-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Boolean,
      value: true
    },
    price: {
      type: Number
    },
    counter: {
      type: Number
    }
  },
  methods: {
    selectedAll() {
      this.triggerEvent('selectedAll', {}, {})
    }
  }
})
