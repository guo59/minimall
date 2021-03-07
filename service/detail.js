import request from './network'

export function getDetail(iid) {
  return request({
    url: '/detail',
    data: {
      iid
    }
  })
}

export function getRecommends() {
  return request({
    url: '/recommend'
  })
}

export class GoodsBaseInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title,
    this.price = itemInfo.price,
    this.oldPrice = itemInfo.oldPrice,
    this.discount = itemInfo.discountDesc,
    this.discountBgColor = itemInfo.discountBgColor,

    this.columns = columns
    this.services = services

    this.realPrice = itemInfo.lowNowPrice
  }
}

export class ShopInfo {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.sells = shopInfo.cSells
    this.goods = shopInfo.cGoods
    this.score = shopInfo.score
  }
}

export class ParamInfo {
  constructor(info, rule) {
    this.infoImages = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}