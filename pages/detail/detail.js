// pages/details/details.js
let {
  getDetailsData
} = require("../../api/home")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [
      // "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/877afeaefe26f7dab0fa73a1eb324c5e.jpg",
      // "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/877afeaefe26f7dab0fa73a1eb324c5e.jpg",
      // "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/877afeaefe26f7dab0fa73a1eb324c5e.jpg",
      // "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/877afeaefe26f7dab0fa73a1eb324c5e.jpg",
      // "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/877afeaefe26f7dab0fa73a1eb324c5e.jpg",

    ],
    swiperHeight: 200, //轮播图高度
    current: 1, //轮播图位置
    tabIndex: 1, //tab索引
    goods: null,
    // goods: {
    //     id: 10,
    //     imgs: [
    //         "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/877afeaefe26f7dab0fa73a1eb324c5e.jpg",
    //         "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/877afeaefe26f7dab0fa73a1eb324c5e.jpg",
    //     ],
    //     goodsImage: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/877afeaefe26f7dab0fa73a1eb324c5e.jpg",
    //     goodsName: "小米耳机",
    //     goodsPrice: "2000",
    //     goodsPriceOld: "4000",
    //     goodsDetails: "/images/IMG_0466.JPG",
    //     goodsContent: '<div class="dt">「至高优惠230元；10点、20点整点购机前150名赢小米定制T恤；享6期免息；信用卡分期至高优惠200元」</div><div class="dd">1.【天玑8100】狠强狠稳的性能新王</div><div class="dd">2.【天玑8100】狠强狠稳的性能新王</div><div class="dd">3.【天玑8100】狠强狠稳的性能新王</div>'
    // },

    num: 0, //商品数量
    goodsType: 0, //商品类型
    product_info: null, //商品信息
    goodsDetails: null, //商品详情
    collect: false //商品是否被收藏
  },

  // 获取图片信息
  bindloadFun(event) {
    console.log(event);
    let {
      height,
      width
    } = event.detail;
    // 获取硬件系统信息
    wx.getSystemInfo({
      success: (result) => {
        console.log(result);
        this.setData({
          swiperHeight: result.windowWidth / width * height
        })
      },
    })
  },

  // 轮播图切换
  bindchangeFun(event) {
    console.log(event);
    this.setData({
      current: event.detail.current += 1
    })
  },
  // 切换tab
  toggleTab(event) {
    console.log(event.target.dataset);
    this.setData({
      tabIndex: event.target.dataset.tagindex
    })
  },
  //判断是否登陆
  isLogin() {
    let islogin = wx.getStorageSync('userinfo')
    if (!islogin) {
      wx.showToast({
        title: '请先登陆',
        icon: 'none',
        duration: 2000,
        success() {
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }, 2000)
        }
      })
      return
    }
  },
  //加入/取消收藏
  setCollect() {
    this.isLogin()
    // 购物车数据结构
    let goodcollect = {
      id: this.data.goods.product_id,
      goodsImage: this.data.goods.img_url,
      goodsName: this.data.goods.name,
      goodsPrice: this.data.goods.price,
    }

    // 从缓存中获取缓存的收藏和商品
    let goodsCollectList = wx.getStorageSync('goodsCollectList')
    // 查看是否有该商品
    if (goodsCollectList) {
      let index = goodsCollectList.findIndex((good) => {
        return good.id == this.data.goods.product_id
      })
      if (index != -1) {
        // 如果商品已被收藏
        // 则该取消收藏
        goodsCollectList.splice(index, 1)
      } else {
        // 不存则添加到该列表中
        goodsCollectList.push(goodcollect)

      }
      // 最后又存到缓存中持久化
      wx.setStorageSync('goodsCollectList', goodsCollectList)
    } else {
      // 如果缓存中不存在该key,直接添加该key的value结构
      wx.setStorageSync('goodsCollectList', [goodcollect])

    }
    this.setData({
      collect: !this.data.collect
    })
  },
  //去购物车
  goCart() {
    let islogin = wx.getStorageSync('userinfo')
    if (!islogin) {
      wx.showToast({
        title: '请先登陆',
        icon: 'none',
        duration: 2000,
        success() {
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }, 2000)
        }
      })
      return
    } else {
      wx.reLaunch({
        url: '/pages/cart/cart',
      })
    }
  },
  //游览纪录
  setHistory() {
    let islogin = wx.getStorageSync('userinfo')
    if (!islogin) return
    // 购物车数据结构
    let goodHistory = {
      id: this.data.goods.product_id,
      goodsImage: this.data.goods.img_url,
      goodsName: this.data.goods.name,
      goodsPrice: this.data.goods.price,
    }

    // 从缓存中获取缓存的收藏和商品
    let goodsHistoryList = wx.getStorageSync('goodsHistoryList')
    // 查看是否有该商品
    if (goodsHistoryList) {
      let index = goodsHistoryList.findIndex((good) => {
        return good.id == this.data.goods.product_id
      })
      if (index != -1) {
        // 如果商品已被收藏
        // 则该取消收藏
        return
      } else {
        // 不存则添加到该列表中
        goodsHistoryList.push(goodHistory)

      }
      // 最后又存到缓存中持久化
      wx.setStorageSync('goodsHistoryList', goodsHistoryList)
    } else {
      // 如果缓存中不存在该key,直接添加该key的value结构
      wx.setStorageSync('goodsHistoryList', [goodHistory])
    }

  },

  imBuy() {
    this.isLogin()
    let imObj = {
      id: this.data.goods.product_id,
      goodsImage: this.data.goods.img_url,
      goodsName: this.data.goods.name,
      goodsPrice: this.data.goods.price,
      num: 1
    }

    wx.setStorageSync('immediateBuy', [imObj])
    wx.navigateTo({
      url: '../../pages/pay/pay',
    })
  },

  // 加入购物车
  setCarNum(event) {
    this.isLogin()
    // 购物车数据结构
    let cartLists = {
      id: this.data.goods.product_id,
      goodsImage: this.data.goods.img_url,
      goodsName: this.data.goods.name,
      goodsPrice: this.data.goods.price,
      num: 1,
      checked: false
    }

    // 从缓存中获取购物车数据
    let goodsCartList = wx.getStorageSync('goodsCartList')
    // 查看是否有该商品
    if (goodsCartList) {
      let index = goodsCartList.findIndex((good) => {
        return good.id == this.data.goods.product_id
      })
      console.log(index);
      if (index != -1) {
        // 如果商品存在
        // 则该商品数量+1
        goodsCartList[index].num += 1
      } else {
        // 不存则添加到该列表中
        goodsCartList.push(cartLists)

      }
      // 最后又存到缓存中持久化
      wx.setStorageSync('goodsCartList', goodsCartList)
    } else {
      // 如果缓存中不存在该key,直接添加该key的value结构
      wx.setStorageSync('goodsCartList', [cartLists])

    }
    this.setData({
      num: wx.getStorageSync('goodsCartList').length
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    getDetailsData({
      commodity_id: options.id
    }).then((data) => {
      console.log(data.data);
      // let goods_tpl_datas = data.data.goods_tpl_datas['23164'].sections;

      // let product_info_tab_index = goods_tpl_datas.findIndex(item=>item.view_type == "product_info_tab");//获取下标
      _this.setData({
        imgs: data.data.goods_share_datas.gallery_view.slice(0, 4),
        goods: data.data.goods_info[_this.data.goodsType],
        product_info: data.data.product_info,
        // goodsDetails:goods_tpl_datas[product_info_tab_index].body.items

      })
      let goodsCollectList = wx.getStorageSync('goodsCollectList')
      let index = goodsCollectList.findIndex((good) => {
        return good.id == _this.data.goods.product_id
      })
      console.log(index, '1111111111111111111111111111');
      _this.setData({
        collect: index != -1 ? true : false
      })
      _this.setHistory()
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let islogin = wx.getStorageSync('userinfo')
    if (!islogin) return
    

    this.setData({
      num: wx.getStorageSync('goodsCartList').length
    })
    ``
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})