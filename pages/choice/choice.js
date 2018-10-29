
var app = getApp()
var servsers = app.data.servsers;//服务器连接
var util = require('../../utils/md5.js');
var md5 = require('../../utils/md5_1.js');
var timest = require('../../utils/timestamp.js');
Page({
  data: {
    phone: '',
    password: '',
    image_bg: '../../image/login_bg.png',
    image_r: '../../image/bohan_logo.png',
    image_l: '../../image/login_hanpingzhineng_logo.png',
    image_b: '../../image/xiaoti_logo_all.png'
  },
  /**
   * 已报名
   */
  singUp: function(){
    wx.navigateTo({
      url: '../sing/sing',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
    })
  },
  /**
   * 未报名
   */
  noSingUp: function () {
    wx.navigateTo({
        url: '../singup/singup',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
  })
   },
  onLoad: function () {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
  }
})