
var app = getApp()
var servsers = app.data.servsers;//服务器连接
var time = require('../../utils/util.js');
Page({
  data: {
    name:'',
    phoneNum:'',
    student:'',
    stuCourseList:[]
  },
  /**
   * 提交登录
   */
  formSubmit: function (e) {
    //console.log(e.detail.value.username + e.detail.value.password)
    var payCondition = e.detail.value.payCondition;
    var stuCourseList = wx.getStorageSync('stuCourseList')
    if (payCondition == '已缴费') {
      wx.showModal({
        title: '提示',
        content: '您已缴费，不能修改信息，如需修改请联系老师',
        showCancel: false,
      })
      //$('#name_msg').empty().append("不能空");
      return;
    }
    if (stuCourseList.length>0) {
      wx.showModal({
        title: '提示',
        content: '您已添加课程，不能修改信息，如需修改请删除课程信息',
        showCancel: false,
      })
      //$('#name_msg').empty().append("不能空");
      return;
    }
    wx.navigateTo({
      url: '../updateMyInfo/updateMyInfo',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
    })
  },
  /**
   * 选择性别
   */
  radioChangeSex: function (e) {
    var that = this;
    this.setData({
      sex: e.detail.value
    })
  },
  /**
   * 选择学校
   */
  bindPickerChangeSchool: function (e) {
    var that = this;
    this.setData({
      schoolIndex: e.detail.value
    })
  },
  /**
   * 选择校区
   */
  bindPickerChangeCampus: function (e) {
    var that = this;
    this.setData({
      campusIndex: e.detail.value
    })
  },
  /**
   * 选择年级
   */
  bindPickerChangeGrade: function (e) {
    var that = this;
    this.setData({
      gradeIndex: e.detail.value
    })
  },
  onLoad: function () {
    var that = this;
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
   /* var name = wx.getStorageSync('name')
    this.setData({
      name: name
    })
    var phoneNumOne = wx.getStorageSync('phoneNumOne')
    this.setData({
      phoneNum: phoneNumOne
    })
      wx.request({
        url: servsers + 'studentNameAndPhone.html',
        method: 'post',
        data: {
          name:name,
          phoneNum: phoneNumOne
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        success: function (res) {
          //console.log(res)
          var stuCourseList = res.data.stuCourseList;
          if (stuCourseList.length > 0) {
            for (var i = 0; i < stuCourseList.length; i++) {//用for循环把所有的时间戳都转换程时间格式，这里调用的是小程序官方demo中带的方法，
              stuCourseList[i].course["startTime"] = time.formatTime(new Date(stuCourseList[i].course["startTime"]))
              stuCourseList[i].course["endTime"] = time.formatTime(new Date(stuCourseList[i].course["endTime"]))
            }
            }
          
          that.setData({
            student: res.data.student,
            stuCourseList: stuCourseList
          })
          wx.setStorage({
            key: 'student',
            data: res.data.student,
            success: function (res) {
              //console.log(res+'异步保存成功')
            }
          });
          wx.setStorage({
            key: 'stuCourseList',
            data: stuCourseList,
            success: function (res) {
              //console.log(res+'异步保存成功')
            }
          });
        }
      })*/
  },
  onShow:function(){
    var student = wx.getStorageSync('student')
    this.setData({
      student: student
    })
  }
})