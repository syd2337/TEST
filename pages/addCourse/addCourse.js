// pages/addCourse/addCourse.js
var app = getApp()
var servsers = app.data.servsers;//服务器连接
var util = require('../../utils/md5.js');
var md5 = require('../../utils/md5_1.js');
var timest = require('../../utils/timestamp.js');
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  student:'',
  courseList:[],
  course:'',
  animationData: {},//动画事件 
  showModalStatus: false,
  courseIdList:[]
  },
  checkboxChange:function(e){
    this.setData({
      courseIdList:e.detail.value
    })
    
  },
  addStuCourse:function(){
    var studentId = this.data.student.id;
    var courseList = this.data.courseIdList;
    console.log(courseList.length)
    if (courseList.length>0){
      wx.request({
        url: servsers + 'addAppStuCourse.html',
        method: 'post',
        data: {
          studentId: studentId,
          courseList: courseList
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        success: function (res) {
          console.log(res)
          if (res.data == "") {
            wx.showModal({
              title: '提示',
              content: "不要重复添加课程",
              showCancel: false,
            })
          } else {
            var stuCourseList = res.data;
            for (var i = 0; i < stuCourseList.length; i++) {//用for循环把所有的时间戳都转换程时间格式，这里调用的是小程序官方demo中带的方法，
              stuCourseList[i].course["startTime"] = time.formatTime(new Date(stuCourseList[i].course["startTime"]))
              stuCourseList[i].course["endTime"] = time.formatTime(new Date(stuCourseList[i].course["endTime"]))
            }
            wx.setStorage({
              key: 'stuCourseList',
              data: stuCourseList,
              success: function (res) {
                //console.log(res+'异步保存成功')
              }
            });
            //跳转页面
            wx.switchTab({
              url: '../myCourse/myCourse',
            })
          }
        },
        fail: function () {
          wx.showModal({
            title: '提示',
            content: "添加课程失败",
            showCancel: false,
          })
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: "请至少选择一门课程",
        showCancel: false,
      })
    }
   
  },
  clickCourse:function(e){
    var index = e.currentTarget.dataset.index;//题目的下标
    var that=this;
    var course = this.data.courseList[index]
    that.powerDrawer();
    that.setData({
      course: course
    })
  },
  powerDrawer: function (e) {
    var currentStatu = 'open';
    this.util(currentStatu)
  },
  //选择回评试题后
  powerDrawerClose: function (e) {
    var that = this;
    console.log(e)
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu);
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var student = wx.getStorageSync('student')
    this.setData({
      student: student
    })
    wx.request({
      url: servsers + 'toAddAppStuCourse.html',
      method: 'post',
      data: {
        gradeName: student.gradeName
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      success: function (res) {
        console.log(res)
        if (res.data != "error") {
          var courseList = res.data;
          for (var i = 0; i < courseList.length; i++) {//用for循环把所有的时间戳都转换程时间格式，这里调用的是小程序官方demo中带的方法，
            courseList[i]["startTime"] = time.formatTime(new Date(courseList[i]["startTime"]))
            courseList[i]["endTime"] = time.formatTime(new Date(courseList[i]["endTime"]))
          }
          that.setData({
            courseList:res.data
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