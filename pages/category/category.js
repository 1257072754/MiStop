// pages/category/category.js
const category = require('../../api/category')
const {
    getCategoryV2Data
} = require('../../api/category')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftData: [
            "小米官网",
            "小米商城",
            "小米影像",
            "MIUI",
            "IoT",
            "云服务",
            "天星数科",
            "有品",
        ],
        categoryLists: null,
        num: 1, //左侧下标
        twoLevel: 0 //二级导航
    },
    // 切换左侧功能
    setNum(event) {
        console.log(event.target.dataset.id);
        let data_id = event.target.dataset.id
        let data_index = event.target.dataset.index
        if (!('category_list' in this.data.categoryLists[data_index])) {
            getCategoryV2Data({
                cat_id: data_id
            }).then((data) => {
                console.log(data, 123);

                let categoryList = 'categoryLists[' + data_index + ']'
                console.log(data.data[0]);
                this.setData({
                    num: data_index,
                    [categoryList]: data.data[0]
                })
            })
        } else {
            this.setData({
                num: data_index,
            })
        }
        // this.setData()使用方法,修改data数据,同步视图

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        getCategoryV2Data().then((data) => {
            console.log(data);
            this.setData({
                categoryLists: data.data
            })
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