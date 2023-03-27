// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [
      // {
      //     id:1,
      //     goodsImage:"/images/goods01.jpg",
      //     goodsName:"商品名称",
      //     goodsPrice:"200",
      //     num:1,
      // },            
      // {
      //     id:2,
      //     goodsImage:"/images/goods01.jpg",
      //     goodsName:"商品名称",
      //     goodsPrice:"200",
      //     num:1,
      // },
    ],
    addressInfo: null,
    addrArr: null,
    totalData: 0, //总价格
    showAddress: false
  },
  // 计算总价格
  getTotal() {
    // 获取数据
    let goodsList = this.data.goodsList;
    if (!goodsList) { //没有数据
      return;
    }
    // 总价格
    let data = goodsList.reduce((total, item) => {
      return total + item.num * item.goodsPrice
    }, 0)
    this.setData({
      totalData: data
    })
  },
  goAddress() {
    this.setData({
      showAddress: true
    })
  },
  useAddr(event) {
    let addressInfo = event.detail
    console.log('false');
    this.setData({
      showAddress: false,
      addressInfo: addressInfo
    })
  },
  goOrder() {
    this.setOrderLists(2);
    wx.navigateTo({
      url: '/pages/order/order',
    })

  },
  setOrderLists(type) {
    let orderData = {
      orderId: new Date().getTime(),
      orderList: null,
      type: type,
      total: this.data.totalData
    }
    let goodsOrderList = wx.getStorageSync('goodsOrderList')
    let good = wx.getStorageSync('immediateBuy')
    if (good.length!=0) {
      orderData.orderList = good
      goodsOrderList.unshift(orderData)

      wx.setStorageSync('goodsOrderList', goodsOrderList)
      wx.navigateTo({
        url: '/pages/order/order',
      })
      return
    }

    // 获取购物车的信息
    // 获取到选择为ture的数据
    let goodsCartList = wx.getStorageSync('goodsCartList');
    let selecedCartList = goodsCartList.filter((item) => {
      return item.checked == true
    })
    if (!selecedCartList) {
      return;
    }
    // 构造订单数据

    orderData.orderList = selecedCartList
    if (goodsOrderList) {
      goodsOrderList.unshift(orderData)
      wx.setStorageSync('goodsOrderList', goodsOrderList)
    } else {
      // 设置订单内容
      wx.setStorageSync('goodsOrderList', [orderData])
    }
    // 删除购物车内容
    goodsCartList = goodsCartList.filter((item) => {
      return item.checked == false
    })
    wx.setStorageSync('goodsCartList', goodsCartList)
  },
  closeMk(event) {

    this.setData({
      showAddress: event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let good = wx.getStorageSync('immediateBuy')
    let userAddress = wx.getStorageSync('userAddress');
    console.log(good.length != 0);
    if (good.length != 0) {
      console.log(333);
      this.setData({
        goodsList: good,
        addrArr: userAddress,
        addressInfo: userAddress[0]
      })
      this.getTotal(); //计算总价格
      return
    }
    // 获取缓存数据
    let goodsCarList = wx.getStorageSync('goodsCartList');
    goodsCarList = goodsCarList.filter((item) => {
      return item.checked == true
    })
    this.setData({
      goodsList: goodsCarList,
      addrArr: userAddress,
      addressInfo: userAddress[0]
    })
    this.getTotal(); //计算总价格
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log(1);
    wx.setStorageSync('immediateBuy', [])
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log(2);
    wx.setStorageSync("immediateBuy", [])
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