//index.js
var LAST_TYPE_KEY = 'lastType';

var app = getApp()
Page({
  data: {
    currentType: null,
    gameTypes: [{
      key: 'NBA',
      name: 'NBA'
    }, {
      key: '世界杯',
      name: '世界杯'
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
    lives: [],
    liveMap: {}
  },

  onLoad: function (options) {
    var lastType = wx.getStorageSync(LAST_TYPE_KEY);
    this.setData({
      currentType: lastType || this.data.gameTypes[0]
    });

    this.fetchData();
  },

  onPullDownRefresh: function() {
    this.fetchData(function() {
      wx.stopPullDownRefresh();
    });
  },

  onTypeChange: function(e) {
    var gameType = e.detail;
    this.setData({
      currentType: gameType
    });
    wx.setStorageSync(LAST_TYPE_KEY, gameType);
  },

  onGameTap: function(e) {
    console.log('on game tap: ', e.currentTarget.dataset.url);
  },

  fetchData: function(cb) {
    var self = this;
    
    wx.request({
      url: 'https://120.55.23.46/json/zhibo/saishi.htm?device=iPhone%206s%20Plus&_only_care=3&version_code=4.6.7&os=iOS&UDID=caa6e30097c2067f4d67217f332486d19ce54a27&platform=ios&os_version=11.3.1&appname=zhibo8&_platform=ios&IDFA=EA95F362-3E46-4B71-BB16-E4E20F7A2C7B&pk=com.zhibo8.pro', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        self.extract(res.data);

        typeof cb === 'function' && cb();
      }
    })
  },

  extract(data) {
    var self = this;
    var map = {};    
    var gameTypes = this.data.gameTypes;

    gameTypes.forEach(function(gameType) {
      map[gameType.key] = self.extractByType(data, gameType);
    });

    console.log('map: %o', map);
    this.setData({
      livesMap: map
    });
  },

  extractByType(data, gameType) {
    var typeData = [];

    if (Array.isArray(data)) {
      data.forEach(function(item) {
        var live = {
          formatDate: item.formatDate,
          date: item.date,
          list: []
        };

        item.list.forEach(function(game) {
          if ([game.type, game.label].join().indexOf(gameType.key) > -1) {
            live.list.push(game)
          }
        })

        if (live.list.length > 0) {
          typeData.push(live);
        }
      })
    }

    return typeData;
  }
})
