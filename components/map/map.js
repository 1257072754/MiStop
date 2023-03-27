// components/map/map.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js'); //自行根据文件放置
var qqmapsdk;
qqmapsdk = new QQMapWX({
  key: 'TQFBZ-3CJCP-4F7DN-VTH23-5N7CZ-24FNB'
});
Component({
  /**
   * 组件的属性列表
   */


  /**
   * 组件的初始数据
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
  pageLifetimes: {
    show: function () {
      // 页面被展示
      console.log('map');
  
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log('21312');
      this.getLocation();
      this.bindAuthLocation(); //授权位置
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      console.log('312312');
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    userAddr() {
      this.triggerEvent("setAddr", this.data.address)
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
    }
  }
})