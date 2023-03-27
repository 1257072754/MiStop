// components/tabBar/tabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 父组件向子组件传属性
    userAddress: {
      type: Array, //类型 必填 String Number Boolean Object Array Null Function
      value: [] //默认值
    }
  },
  // 组件内生命周期
  pageLifetimes: {
    show: function () {
      // 页面被展示
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    choiceAddr(event) {
      let uuid = event.target.dataset.uuid
      let userAddress = this.properties.userAddress
      let userAddrInfo = userAddress.find((item) => {
        return item.uuid == uuid
      })
    
      this.triggerEvent("getAddress", userAddrInfo)
    },
    closeMk() {
      console.log(111);
      this.triggerEvent("closeMask", false)
    }
  },
})