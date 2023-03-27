// components/tabBar/tabBar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 父组件向子组件传属性
        index:{
            type:Number,//类型 必填 String Number Boolean Object Array Null Function
            value:0 //默认值
        }
    },
    // 组件内生命周期
    pageLifetimes: {
        show: function() {
          // 页面被展示
        },
        hide: function() {
          // 页面被隐藏
        },
        resize: function(size) {
          // 页面尺寸变化
        }
      },
    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        getDataAA(){
            console.log("子组件方法");
            // 调用父组件方法triggerEvent()
            var myEventDetail = {data:"子组件数据666"} // detail对象，提供给事件监听函数
            this.triggerEvent("setIndex",myEventDetail)
        }
    }
})


