module.exports = function HTTP(objAll) {
    let {
        url,
        ...obj
    } = objAll
    return new Promise(function (resolve, reject) {
        wx.request({
            url: 'https://apis.netstart.cn/xmsc' + url,
            ...obj,
            success(data) {
                resolve(data.data)
            },
            fail(err) {
                reject(err)
                console.log(err);
            },
            //接口回调结束
            complete() {

            }
        })
    })
}