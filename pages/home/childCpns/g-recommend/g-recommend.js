// pages/home/childCpns/g-recommend/g-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommends: {
      type: Array,
      value: []
    }
  },
  data: {
    isLoad: false
  },
  methods: {
    imgLoad() {
      if(!this.data.isLoad) {
        this.triggerEvent('imageLoad')
        this.data.isLoad = true
      }
    }
  }
})
