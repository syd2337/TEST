
var app = getApp()
var servsers = app.data.servsers;//服务器连接
var util = require('../../utils/md5.js');
var md5 = require('../../utils/md5_1.js');
var timest = require('../../utils/timestamp.js');
var time = require('../../utils/util.js');
Page({
  data: {
    student:'',
    stuCourseList:[],
  },
  addCourse:function(){
    wx.navigateTo({
      url: '../addCourse/addCourse',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
    })
  },
  showCard:function(e){
    console.log(e)
    var fromId=e.detail.fromId;//表单id
    var index = e.detail.target.dataset.index;//题目的下标
    wx.navigateTo({
      url: '../showCard/showCard?index='+index,  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
    })
  },
  deleteCourse:function(e){
    var that=this;
    console.log(e);
    var index = e.currentTarget.dataset.index;//题目的下标
    var ifNotPay=this.data.student.payCondition;
    var studentId = this.data.student.id;
    var id = this.data.stuCourseList[index].id;
    if (ifNotPay=="已缴费"){
      wx.showModal({
        title: '提示',
        content: "您已缴费，不能删除课程",
        showCancel: false,
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '确定删除该课程吗',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: servsers + 'deleteAppStCourse.html',
              method: 'post',
              data: {
                id: id,
                studentId: studentId
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
              },
              success: function (res) {
                console.log(res)
                if (res.data != "error") {
                  var stuCourseList = res.data;
                  for (var i = 0; i < stuCourseList.length; i++) {//用for循环把所有的时间戳都转换程时间格式，这里调用的是小程序官方demo中带的方法，
                    stuCourseList[i].course["startTime"] = time.formatTime(new Date(stuCourseList[i].course["startTime"]))
                    stuCourseList[i].course["endTime"] = time.formatTime(new Date(stuCourseList[i].course["endTime"]))
                  }
                  that.setData({
                    stuCourseList: stuCourseList
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: "获取信息失败",
                    showCancel: false,
                  })
                }


              }
            })
          } else {
            console.log('用户点击取消')
          }

        }
      })
    }
    
    
  },
  onLoad: function () {
   
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
    var student = wx.getStorageSync('student')
    this.setData({
      student: student
    })
    var stuCourseList = wx.getStorageSync('stuCourseList')
    for (var i = 0; i < stuCourseList.length; i++) {//用for循环把所有的时间戳都转换程时间格式，这里调用的是小程序官方demo中带的方法，
      stuCourseList[i]["startTime"] = time.formatTime(new Date(stuCourseList[i]["startTime"]))
      stuCourseList[i]["endTime"] = time.formatTime(new Date(stuCourseList[i]["endTime"]))
    }
    this.setData({
      stuCourseList: stuCourseList
    })
  },
  onShow:function(){
    var student = wx.getStorageSync('student')
    this.setData({
      student: student
    })
    var stuCourseList = wx.getStorageSync('stuCourseList')
   
    this.setData({
      stuCourseList: stuCourseList
    })
  }
})