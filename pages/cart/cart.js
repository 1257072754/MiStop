Page({

  /**
   * 页面的初始数据
   */

  data: {
    totalData: 0,
    goodsList: [],
    select_all: false
  },

  reduce: function (options) {
    console.log(options)
    let index = options.target.dataset.index; //数据下标
    // 获取this中data数据
    let num = this.data.goodsList[index].num; //数值
    let key = "goodsList[" + index + "].num";
    let obj = {};
    if (num <= 1) {
      // 如果值小于等于1，让值等于1
      obj[key] = 1;
    } else {
      obj[key] = num - 1; //值减一
    }
    this.setData(obj); //更新页面数据
    this.getTotal()
  },
  add: function (options) {
    // console.log("获取数据",options.target.dataset.index);
    // 获取修改数据下标
    let index = options.target.dataset.index;
    // 获取this中值
    // console.log(this.data.goodsList[0].num);
    let num = this.data.goodsList[index].num;
    let key = "goodsList[" + index + "].num";
    let obj = {};
    obj[key] = num + 1;

    this.setData(obj)
    this.getTotal()
  },




  del: function (event) {
    console.log(event.currentTarget.dataset.index);
    console.log(event.target.dataset.index);
    let index = event.currentTarget.dataset.index;
    console.log(index)
    // splice() 删除数组方法
    this.data.goodsList.splice(index, 1);
    this.setData({
      goodsList: this.data.goodsList

    })
    this.getTotal()
  },
  getTotal: function () {
    // 获取数据
    let goodsList = this.data.goodsList;
    // reduce(function(total,item){},默认值) 计算总价格方法
    let data = goodsList.reduce(function (total, item) {
      if (item.checked == true) {
        total = total + item.num * item.goodsPrice;
        return total;
      } else {
        return total;
      }
    }, 0)
    this.setData({
      totalData: data
    })

  },
  // 去下单
  goOrder() {
    let islogin = wx.getStorageSync('userinfo')
    if (islogin) {
      wx.navigateTo({
        url: '/pages/pay/pay',
      })
    } else {
      wx.showToast({
        title: '请先登陆',
        icon: 'none',
        duration: 2000,
        complete() {
          setTimeout(() => {
            // 这里不要自定义导航中不要使用switch,不然会报错
            wx.switchTab({
              url: '/pages/my/my',
            })
          }, 2000)

        }
      })
    }
  },
  //单选
  selectSingle(e) {
    let id = e.target.dataset.id;
    let checked = e.detail.value;
    let goodsList = this.data.goodsList
    let index = goodsList.findIndex((item) => {
      return item.id == id
    })
    console.log(index, e.target.dataset.id, e.detail.value);
    // this.data.goodsList[index].checked = checked
    goodsList[index].checked = checked
    // wx.setStorageSync('goodsCartList', goodsList)
    let allchecked = goodsList.every((goods) => {
      return goods.checked;

    })
    this.setData({
      goodsList: goodsList,
      select_all: allchecked
    })
    this.getTotal()
  },
  // 全选
  allSelect: function (e) {
    console.log(e);
    let select_all = e.detail.value;
    let arr = []; //存放选中id的数组
    let goodsList = this.data.goodsList
    for (let i = 0; i < goodsList.length; i++) {
      goodsList[i].checked = select_all
    }
    this.setData({
      goodsList: goodsList,
      select_all: select_all,
    })
    this.getTotal()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTotal()
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
    // 获取缓存数据
    // var getCartData = wx.getStorageSync('goodsCartList');
    // this.setData({
    //     goodsList: getCartData
    // })
    // 页面加载完毕后，执行总价格
    let goodsList = wx.getStorageSync('goodsCartList')
    // if (goodsList.length == 0) {
    //   this.setData({
    //     select_all: false
    //   })
    //   return
    // }
    let allSeclect = goodsList.every((item) => item.checked === true)
    this.setData({
      goodsList: goodsList,
      select_all: allSeclect
    })
    this.getTotal()
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.setStorageSync('goodsCartList', this.data.goodsList)
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