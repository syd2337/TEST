//app.js
App({
  data: {
    //servsers: "http://192.168.20.153/StudentApply/",
    //servsers: "http://127.0.0.1:8080/StudentApply/",
    //servsers: "http://192.168.20.167:8090/,"
    //servsers:"http://sanbox-wechatapi2.xiaotiyun.com/"
    servsers: "https://zhirenxuetang.com/",
     
  },  
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //this.getUserInfo();
    var that =this;
    /*wx.login({
      success: function (res) { 
        console.log(res)
        wx.setStorage({
          key: 'code',
          data: res.code,
          success: function (res) {
            //console.log(res+'异步保存成功')
          }
        });
          } 
        });*/
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              console.log(res)
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    isIphoneX: false,
  },
  onHide: function () {
    //wx.clearStorage();
    console.log('App onHide');

  },
  onShow: function () {
    let that = this;
    wx.getSystemInfo({
      success: res => {
        // console.log('手机信息res'+res.model)  
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          that.globalData.isIphoneX = true
        }

      }
    }) 
  } 
})