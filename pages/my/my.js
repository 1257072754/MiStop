// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: null
  },

  // 获取头像按钮
  getUserProfile() {

    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        wx.setStorageSync('userinfo', res.userInfo)
        this.setData({
          userinfo: res.userInfo
        })
      }
    })


  },
  golist(event) {

    let islogin = wx.getStorageSync('userinfo')
    if (islogin) {
      switch (event.target.dataset.type) {
        case "order":
          wx.navigateTo({
            url: '/pages/order/order',
          })
          break;
        case "address":
          wx.navigateTo({
            url: '/pages/address/address',
          })
          break;
        case "collect":
          wx.navigateTo({
            url: '/pages/collect/collect',
          })
          break;

        default:
          break;
      }
    } else {
      wx.showToast({
        title: '请先登陆',
        icon: 'none',
        duration: 2000
      })
    }
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

    this.setData({
      userinfo: wx.getStorageSync('userinfo')
    })
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