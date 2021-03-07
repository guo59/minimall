// pages/category/category.js
import {getCategory, getSubCategory, getCategoryDetail} from '../../service/category'

Page({
  data: {
    menuList: [],
    currentIndex: 0,
    categoryData: {}
  },
  onLoad() {
    this._getCategory()
  },
  // 请求页面左侧数据
  _getCategory() {
    getCategory().then(res => {
      const menuList = res.data.data.category.list

      const categoryData = {}
      for(let i = 0; i< menuList.length; i++) {
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
        }
      }
      this.setData({
        menuList,
        categoryData
      })
      this._getSubCategory(0)
      this._getCategoryDetail(0)
    })
  },
  _getSubCategory(currentIndex) {
    const maitKey = this.data.menuList[currentIndex].maitKey
    getSubCategory(maitKey).then(res => {
      const tempCategoryData = this.data.categoryData
      tempCategoryData[currentIndex].subcategories = res.data.data.list
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex) {
    const miniWallkey = this.data.menuList[currentIndex].miniWallkey
    this._getRealCategoryDetail(currentIndex, miniWallkey, 'pop')
    
  },
  _getRealCategoryDetail(index, miniWallkey, type) {
    getCategoryDetail(miniWallkey, type).then(res => {
      console.log(res)
      const tempCategoryData = this.data.categoryData
      tempCategoryData[index].categoryDetail = res.data
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  handleMenuClick(event) {
    const currentIndex = event.detail.currentIndex
    this.setData({
      currentIndex
    })
    this._getSubCategory(currentIndex)
    this._getCategoryDetail(currentIndex)
  }
})