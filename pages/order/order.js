// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      orderLists:null,
      index:0,
    },
    // 修改下标
    setIndex(event){
      let index = event.target.dataset.index;
      this.setData({
        index:index
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
      let orderLists = wx.getStorageSync('goodsOrderList')
      this.setData({
        orderLists:orderLists
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
        // 关闭所有页面，打开到应用内的某个页面
        wx.reLaunch({
          url: '/pages/my/my',
        })
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