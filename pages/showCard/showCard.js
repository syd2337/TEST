// pages/showCard/showCard.js
var QR = require("../../utils/qrcode.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuCourse:'',
    canvasHidden: false, 
    imagePath: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = options.index;
    var stuCourseList = wx.getStorageSync('stuCourseList')
    this.setData({
      stuCourse: stuCourseList[index]
    })
    var jiaoyanCode = stuCourseList[index].id;
    var size = this.setCanvasSize(); //动态设置画布大小    
    this.createQrCode(jiaoyanCode, "mycanvas", size.w, size.h);  
  },
  //适配不同屏幕大小的canvas  
  setCanvasSize: function() {    
    var size = {};    try {      
      var res = wx.getSystemInfoSync();      
      var scale = 750 / 686; //不同屏幕下canvas的适配比例；设计稿是750宽 686是因为样式wxss文件中设置的大小      
      var width = res.windowWidth / scale;      
      var height = width; //canvas画布为正方形      
      size.w = width;      
      size.h = height;    
      } catch (e) {      
        // Do something when catch error      
        console.log("获取设备信息失败" + e);    }    
        return size;  
        },
        /**  
         *  * 绘制二维码图片  
         *  */  
 createQrCode: function (url, canvasId, cavW, cavH) {   
            //调用插件中的draw方法，绘制二维码图片    
            QR.api.draw(url, canvasId, cavW, cavH);    
            setTimeout(() => {      
              this.canvasToTempImage();    
              }, 1000);  
              },
  /**   * 获取临时缓存照片路径，存入data中   */  
 canvasToTempImage: function () {
    var that = this;    
    //把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。    
    wx.canvasToTempFilePath({      
      canvasId: 'mycanvas',     
       success: function(res) {        
         var tempFilePath = res.tempFilePath;        
         //console.log(tempFilePath);        
         that.setData({         
            imagePath: tempFilePath,         
             // canvasHidden:true       
              });     
               },     
           fail: function(res) {       
             console.log(res);      
             }   
              }); 
               },
  /**   
   * * 点击图片进行预览   
   * */  
  previewImg: function (e) {
    var img = this.data.imagePath; 
    console.log(img); 
    wx.previewImage({
      current: img, // 当前显示图片的http链接      
      urls: [img] // 需要预览的图片http链接列表   
       });  
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