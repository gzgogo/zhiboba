//index.js
var LAST_TYPE_KEY = 'lastType';

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
    lives: []
  },
  onLoad: function (options) {
    var self = this;
    var lastType = wx.getStorageSync(LAST_TYPE_KEY);
    this.setData({
      currentType: lastType || this.data.gameTypes[0]
    });

    // wx.getStorage('lastType');
    console.log('last type:', ); 
    console.log('current type:', this.data.currentType.key); 

    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: 'https://120.55.23.46/json/zhibo/saishi.htm?device=iPhone%206s%20Plus&_only_care=3&version_code=4.6.7&os=iOS&UDID=caa6e30097c2067f4d67217f332486d19ce54a27&platform=ios&os_version=11.3.1&appname=zhibo8&_platform=ios&IDFA=EA95F362-3E46-4B71-BB16-E4E20F7A2C7B&pk=com.zhibo8.pro', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        self.setData({
          lives: res.data
        })
      }
    })
  },
  onTypeChange: function(e) {
    var gameType = e.detail;
    wx.setStorageSync(LAST_TYPE_KEY, gameType);
    console.log('gameType: %o', gameType);
  },

  onGameTap: function(e) {
    console.log('on game tap: ', e.currentTarget.dataset.url);
  }
})
