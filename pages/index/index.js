//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    gameIndex: 0,
    games: ['NBA', '篮球', '足球'],
  },
  bindGameChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      gameIndex: e.detail.value
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.request({
      url: 'https://120.55.23.46/json/zhibo/saishi.htm?device=iPhone%206s%20Plus&_only_care=3&version_code=4.6.7&os=iOS&UDID=caa6e30097c2067f4d67217f332486d19ce54a27&platform=ios&os_version=11.3.1&appname=zhibo8&_platform=ios&IDFA=EA95F362-3E46-4B71-BB16-E4E20F7A2C7B&pk=com.zhibo8.pro', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
