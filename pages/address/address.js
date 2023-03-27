// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: null
  },
  del: function (event) {
    let addressList = wx.getStorageSync('userAddress');
    console.log(event);

    let uuid = event.target.dataset.uuid;
    let index = addressList.findIndex((item) => {
      return item.uuid == uuid
    })
    console.log(index);
    // splice() 删除数组方法
    if (index == -1) {
      return
    } else if (index == 0) {
      addressList.shift()
    } else {
      addressList.splice(index, 1)

    }
    this.setData({
      addressList: addressList

    })
    wx.setStorageSync('userAddress', addressList);



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let addressList = wx.getStorageSync('userAddress');
    this.setData({
      addressList: addressList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})