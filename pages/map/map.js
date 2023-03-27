var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js'); //自行根据文件放置
var qqmapsdk;
qqmapsdk = new QQMapWX({
  key: 'TQFBZ-3CJCP-4F7DN-VTH23-5N7CZ-24FNB'
});
// import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lat: '', //纬度
    lng: '', //经度
    latitude: '',
    longitude: '',
    keyword: '',
    scale: 16, //5-18
    markersStatus: false,
    datatlist: {},
    address: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation();
    this.bindAuthLocation(); //授权位置
  },

  //授权位置按钮
  bindAuthLocation() {
    //获取授权结果查看是否已授权位置
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] == undefined && !res.authSetting['scope.userLocation']) //未授权位置（首次进来页面）
          this.getLocation(); //获取当前位置信息
        else if (res.authSetting['scope.userLocation'] === false) //未授权位置(点击官方授权弹框取消按钮后)
          // Dialog.confirm({
          //     title: '提示',
          //     message: '需要获取你的地理位置,你的位置信息将用于位置显示',
          // })
          // .then(() => {
          //     this.bindConfirmLocation()
          //     // on confirm
          // })
          // .catch(() => {
          //     // on cancel
          // });
          console.log(111);
        else //已授权
          this.getLocation(); //获取当前位置信息
      }
    })
  },
  //定位授权框确认按钮
  bindConfirmLocation(e) {
    //打开设置页面进行授权设置
    wx.openSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          //获取当前位置信息
          this.getLocation(); //获取当前位置信息
        }
      }
    });
  },
  //获取位置
  getLocation() {
    let that = this
    this.mapCtx = wx.createMapContext('myMap')
    // 调用接口
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        // console.log("res", res)
        if (res) {
          this.data.lat = res.latitude;
          this.data.lng = res.longitude;
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success(res) {
              console.log("res", res)
              let address = res.result.address
              that.setData({
                address: address
              })
            }
          })
          this.setData({
            latitude: this.data.lat,
            longitude: this.data.lng,
            markersStatus: true,

          })
        } else {
          wx.showToast({
            title: '定位失败',
            icon: 'none',
            duration: 1500
          })
        }
        qqmapsdk.reverseGeocoder({
          success: (res) => {
            console.log('=============', res)
          },
        });
        // this.getFood(res.longitude, res.latitude)

        this.setData({
          markersStatus: true
        })
      },
      fail(err) {
        wx.hideLoading({});
        console.log("asafasfs", err)
        // wx.showToast({
        //     title: '定位失败',
        //     icon: 'none',
        //     duration: 1500
        // })
        setTimeout(function () {
          // wx.navigateBack({
          //     delta: 1
          // })
        }, 1500)
      }
    })
  },
  //点击回到初始位置
  getCenterLocation: function () {
    var that = this;
    that.mapCtx.moveToLocation()
  },
  //滑动获取周围的店铺
  mapChange(e) {
    if (e.type === 'end') {
      this.mapCtx.getCenterLocation({
        success: res => {
          console.log(res);
          this.getFood(res.longitude, res.latitude)
        }
      })
    }
  },
  //搜索附近的店铺
  // getFood(longitude, latitude) {
  //   qqmapsdk.search({
  //     location: {
  //       latitude: latitude,
  //       longitude: longitude,
  //     },
  //     keyword: '',
  //     success: (res) => {
  //       console.log('地理位置:', res);
  //       var mark = []
  //       for (let i in res.data) {
  //         mark.push({
  //           iconPath: '/images/adr.png', //周边的图标    根据自己需要换
  //           alpha: 1,
  //           title: res.data[i].title,
  //           id: Number(i),
  //           longitude: res.data[i].location.lng,
  //           latitude: res.data[i].location.lat,
  //           width: parseInt(31.91) + 'px', //设置图标的大小
  //           height: parseInt(31.91) + 'px',
  //         })
  //       }
  //       mark.push({
  //         iconPath: '/images/address.png', //中心的图标     根据自己需要换
  //         id: Number(res.data.length),
  //         alpha: 1,
  //         longitude: longitude,
  //         latitude: latitude,
  //         width: parseInt(43.87) + 'px',
  //         height: parseInt(43.87) + 'px',
  //       })
  //       this.setData({
  //         datatlist: mark,
  //       })
  //     },
  //     fail: function (res) {
  //       console.log(res);
  //     },
  //     complete: function (res) {
  //       // console.log(res);
  //     }
  //   });
  // },
})