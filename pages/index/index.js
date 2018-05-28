//index.js
var app = getApp()
Page({
  data: {
    currentType: null,
    gameTypes: [{
      key: 'nba',
      name: 'NBA'
    }, {
      key: 'basketball',
      name: '篮球'
    }, {
      key: 'football',
      name: '足球'
    }, {
      key: 'all',
      name: '全部'
    }],
    games: []
  },
  onLoad: function (options) {
    var self = this;
    this.setData({
      currentType: this.data.gameTypes[0]
    });
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: 'https://120.55.23.46/json/zhibo/saishi.htm?device=iPhone%206s%20Plus&_only_care=3&version_code=4.6.7&os=iOS&UDID=caa6e30097c2067f4d67217f332486d19ce54a27&platform=ios&os_version=11.3.1&appname=zhibo8&_platform=ios&IDFA=EA95F362-3E46-4B71-BB16-E4E20F7A2C7B&pk=com.zhibo8.pro', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        self.setData({
          games: res.data
        })
      }
    })
  },
  onTypeChange: function(e) {
    var gameType = e.detail;
    console.log('gameType: %o', gameType);
  }
})
