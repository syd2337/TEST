
var app = getApp()
var servsers = app.data.servsers;//服务器连接
var time = require('../../utils/util.js');
Page({
  data: {
    name:'',
    phoneNum:'',
    code:''
  },
  /**
   * 提交登录
   */
  formSubmit: function (e) {
    //console.log(e.detail.value.username + e.detail.value.password)
    // 获取表单id
    var code = this.data.code;
    console.log(code);
    var formId = e.detail.formId;
    var name = e.detail.value.name;
    var phoneNumOne = e.detail.value.phoneNumOne;
    if (name == '') {
      wx.showModal({
        title: '提示',
        content: '学生姓名为空',
        showCancel: false,
      })
      //$('#name_msg').empty().append("不能空");
      return;
    }
    var reg = /^[\u4e00-\u9fa5 ]{2,10}$/;
    if (!reg.test(name)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的学生姓名',
        showCancel: false,
      })

      return;
    }
    if (phoneNumOne == '') {
      wx.showModal({
        title: '提示',
        content: '联系电话不为空',
        showCancel: false,
      })
      //alert("联系电话不为空");
      //$('#ID_msg').empty().append("不能空");
      return;
    }
    var reg = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|18[0-9]|17[0-9]|19[0-9])\d{8}$/;
    if (!reg.test(phoneNumOne)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的联系电话',
        showCancel: false,
      })
      //alert("请输入正确的联系电话");
      //$('#ID_msg').empty().append("请输入正确的手机号");
      return;
    }
    wx.request({
      url: servsers + 'studentNameAndPhone.html',
      method: 'post',
      data: {
        name: name,
        phoneNum: phoneNumOne,
        code:code,
        formId:formId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      success: function (res) {
        console.log(res)
        //console.log(res.data.RespInfo.Id)
        if (res.data != "error" && res.data!="") {
          var stuCourseList = res.data.stuCourseList;
          if (stuCourseList.length > 0) {
            for (var i = 0; i < stuCourseList.length; i++) {//用for循环把所有的时间戳都转换程时间格式，这里调用的是小程序官方demo中带的方法，
              stuCourseList[i].course["startTime"] = time.formatTime(new Date(stuCourseList[i].course["startTime"]))
              stuCourseList[i].course["endTime"] = time.formatTime(new Date(stuCourseList[i].course["endTime"]))
            }
          }
          wx.setStorage({
            key: 'stuCourseList',
            data: stuCourseList,
            success: function (res) {
              //console.log(res+'异步保存成功')
            }
          });
          wx.setStorage({
            key: 'student',
            data: res.data.student,
            success: function (res) {
              //console.log(res+'异步保存成功')
            }
          });
          // console.log(res.data.RespInfo.id)
          //console.log(res.data.RespInfo.schoolId)
          //将数据存入本地中
          wx.setStorage({
            key: 'name',
            data: res.data.student.name,
            success: function (res) {
              //console.log(res+'异步保存成功')
            }
          });
          wx.setStorage({
            key: 'phoneNumOne',
            data: res.data.student.phoneNumOne

          });
        
          //跳转页面
          wx.switchTab({
            url: '../myInfo/myInfo',
          })
        } else {
          wx.showModal({
            title: '提示',
            content: "登录失败",
            showCancel: false,
          })
        }


      }
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
    wx.login({
      success: function (res) {
        that.setData({
          code: res.code
        })
      }
    });
    
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
  }
})