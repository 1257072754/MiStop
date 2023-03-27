// pages/home/home.js
const {
    getHomePage
} = require('../../api/home')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgs: [],
        category: [{
                image: '../../images/icon-qiandao.png',
                text: '签到'
            },
            {
                image: '../../images/icon-fujin.png',
                text: '附近'
            },
            {
                image: '../../images/icon-zhanhui.png',
                text: '展会'
            },
            {
                image: '../../images/icon-fuli.png',
                text: '福利'
            },
            {
                image: '../../images/icon-muma.png',
                text: '玩乐'
            },
            {
                image: '../../images/icon-tiyu.png',
                text: '体育'
            },
            {
                image: '../../images/icon-xingxing.png',
                text: '周边'
            },
            {
                image: '../../images/icon-qinzi.png',
                text: '亲子'
            }
        ],
        goodsList: [
            //     {
            //     image: '/../../images/lists01.webp',
            //     title: '显瘦中长款系带风衣',
            //     describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸、不易皱好打理。',
            //     count: '888',
            //     delCount: '666'
            // }

        ],
        swiperHeight: 200,
        hot: null, //热门爆款
    },
    // 获取图片信息
    bindloadFun(event) {
        console.log(event);
        let {
            height,
            width
        } = event.detail;
        // 获取硬件系统信息
        wx.getSystemInfo({
            success: (result) => {
                console.log(result);
                this.setData({
                    swiperHeight: result.windowWidth / width * height
                })
            },
        })
    },
    getFather(event){
        console.log(event,'fuzujian')
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        getHomePage().then((data) => {
            console.log(data);
            let sections = data.data.data.sections;
            var hot_lists = [];

            sections.forEach((item) => {
                if (item.view_type == "list_two_type13") {
                    hot_lists = hot_lists.concat(item.body.items)
                }
            })
            this.setData({
                imgs: sections[0].body.items,
                category: sections[1].body.items.concat(sections[2].body.items),
                hot: sections[6].body.items[0],
                goodsList: hot_lists
            })
            wx.lin.renderWaterFlow(this.data.goodsList, false, () => {
                console.log('渲染成功')
            })
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