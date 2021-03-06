
var app = getApp()
var servsers = app.data.servsers;//服务器连接
var util = require('../../utils/md5.js');
var md5 = require('../../utils/md5_1.js');
var timest = require('../../utils/timestamp.js');
Page({
  data: {
    schoolList: [],
    schoolIndex: 0,
    campusList: [],
    campusIndex: 0,
    gradeList: [],
    gradeIndex: 0,
    student:'',
    checkBoy:false,
    checkGirl:false,
    sex:'男',
    showInputStatus: true,
    //showBtnStatus2:false,
    inputValue: '',//点击结果项之后替换到文本框的值
    //adapterSource: '',
    bindSource: [],//绑定到页面的数据，根据用户输入动态变化
  },
  bindKeyInput: function (e) {
    //console.log(e)
    var currentInputStatu = e.currentTarget.dataset.statu;
    var prefix = e.detail.value//用户实时输入值
    var newSource = []//匹配的结果
    if (prefix != "") {
      this.setData(
        {
          showBtnStatus1: false,
          showBtnStatus2: true
        }
      );
      this.data.schoolList.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {//返回某个指定的字符串值在字符串中首次出现的位置,如果要检索的字符串值没有出现，则该方法返回 -1        
          newSource.push(e)
        }
      })
    } else {
      currentInputStatu = "close";
      this.setData(
        {
          isScroll: true,
          showBtnStatus1: true,
          showBtnStatus2: false
        }
      );
    } if (newSource.length != 0) {
      this.setData({
        bindSource: newSource
      })
    } else {
      this.setData({
        bindSource: []
      })
      currentInputStatu = "close"; this.setData(
        {
          isScroll: "{{false}}"
        }
      );
    }    //关闭 
    if (currentInputStatu == "close") {
      this.setData(
        {
          showInputStatus: false,
          isScroll: true
        }
      );
    }    // 显示 
    if (currentInputStatu == "open") {
      this.setData(
        {
          showInputStatus: true,
          isScroll: "{{false}}"
        }
      );
    }
  },//点击选型确定input值
  itemtap: function (e) {
    var currentInputStatu = e.currentTarget.dataset.statu; this.setData({
      inputValue: e.target.id,
      bindSource: []
    })    //关闭 
    if (currentInputStatu == "close") {
      this.setData(
        {
          showInputStatus: false,
          isScroll: true
        }
      );
    }    // 显示 
    if (currentInputStatu == "open") {
      this.setData(
        {
          showInputStatus: true,
          isScroll: "{{false}}"
        }
      );
    }
  },
  /**
   * 提交登录
   */
  formSubmit: function (e) {
    console.log(e)
    var name = e.detail.value.name;
    var parentName = e.detail.value.parentName;
    var phoneNumOne = e.detail.value.phoneNumOne;
    var sex = this.data.sex;
    var schoolName = this.data.inputValue;
    var campusName = this.data.campusList[this.data.campusIndex].campusName;
    var gradeName = this.data.gradeList[this.data.gradeIndex].name;
    var id= this.data.student.id;
    
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
    if (parentName == '') {
      wx.showModal({
        title: '提示',
        content: '家长姓名不能为空',
        showCancel: false,
      })
      //alert("家长姓名不能为空");
      //$('#name_msg').empty().append("不能空");
      return;
    }
    if (!reg.test(parentName)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的家长姓名',
        showCancel: false,
      })
      //alert("请输入正确的家长姓名");
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
      url: servsers + 'updateAppStudent.html',
      method: 'post',
      data: {
        name: name,
        parentName: parentName,
        phoneNumOne: phoneNumOne,
        sex: sex,
        schoolName: schoolName,
        campusName: campusName,
        gradeName: gradeName,
        id:id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      success: function (res) {
        console.log(res)
        //console.log(res.data.RespInfo.Id)
        if (res.data != "error") {
          // console.log(res.data.RespInfo.id)
          //console.log(res.data.RespInfo.schoolId)
          //将数据存入本地中
          wx.setStorage({
            key: 'student',
            data: res.data,
            success: function (res) {
              //console.log(res+'异步保存成功')
            }
          });
          //跳转页面
          wx.switchTab({
            url: '../myInfo/myInfo',
          })
        } else {
          wx.showModal({
            title: '提示',
            content: "修改信息失败",
            showCancel: false,
          })
        }


      }
    })


  },
  /**
   * 选择性别
   */
  radioChange: function (e) {
    var that = this;
    console.log(e + "fafgfagfgfagf")
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
  returnTheIndex:function(theList,theName){
    var theIndex=0;
    for (var i = 0; i < theList.length; i++) {
      if (theList[i].name == theName){
        theIndex=i;        
      }
    }
    return theIndex;
  },
  returnTheCampusIndex: function (theList, theName) {
    var theIndex = 0;
    for (var i = 0; i < theList.length; i++) {
      if (theList[i].campusName == theName) {
        theIndex = i;
      }

    }
    return theIndex;
  },
  onLoad: function () {
    var that = this;
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
    var schoolList = wx.getStorageSync('schoolList')
    this.setData({
      schoolList: schoolList
    })
    var campusList = wx.getStorageSync('campusList')
    this.setData({
      campusList: campusList
    })
    var gradeList = wx.getStorageSync('gradeList')
    this.setData({
      gradeList: gradeList
    })
    var student = wx.getStorageSync('student')
    this.setData({
      student: student
    })
    var schoolIndex = that.returnTheIndex(schoolList,student.schoolName)
    this.setData({
      inputValue: student.schoolName
    })
    var campusIndex = that.returnTheCampusIndex(campusList,student.campusName)
    this.setData({
      campusIndex: campusIndex
    })
    var gradeIndex = that.returnTheIndex(gradeList, student.gradeName)
    this.setData({
      gradeIndex: gradeIndex
    })
    if(student.sex=='男'){
      this.setData({
        checkBoy: true
      })
    }else{
      this.setData({
        checkGirl: true
      })
    }
  }
})