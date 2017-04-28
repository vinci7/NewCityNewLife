const AV = require('../../../../libs/av-weapp-min.js');

var app = getApp()

Page({
  onLoad: function() {
    console.log('onLoad')

    //调用应用实例的方法获取全局数据
    const user = AV.User.current();
    //更新数据
    this.setData({
      userInfo:user
    })
  },

  onReady: function() {
    // 从 LeanCloud 获取用户信息
    var objectId = app.globalData.user.objectId;
    console.log('objectId = ', objectId);

    //数据绑定
    new AV.Query('_User').get(objectId).then(user => this.setData({ user })).catch(console.error);
    
  },


  navigateTo: function () {
    wx.navigateTo({ url: '../update/update' })
  },

  data: {
    genderArray: ['男', '女', '保密'],
    genderObjectArray: [
      {
        id: 0,
        name: '男'
      },
      {
        id: 1,
        name: '女'
      },
      {
        id: 2,
        name: '保密'
      }
    ],
    genderIndex: null, 

    highSchoolArray: ['昌邑一中', '文山中学', '其他'],
    highSchoolObjectArray: [
        {
            id: 0,
            name: '昌邑一中'
        },
        {
            id: 1,
            name: '文山中学'
        },
        {
            id: 2,
            name: '其他'
        }
    ],
    highSchoolIndex: null, 

  },
  bindGenderChange: function(e) {
    console.log('genderPicker发送选择改变，携带值为', e.detail.value)
    this.setData({
      genderIndex: e.detail.value
    })
  },

  bindHighSchoolChange: function(e) {
    console.log('highSchoolPicker发送选择改变，携带值为', e.detail.value)
    this.setData({
      highSchoolIndex: e.detail.value
    })
  },

  submitForm: function(e) {
    var self = this
    var form_id = e.detail.formId
    var formData = e.detail.value

    console.log('form_id is:', form_id)
    console.log(formData);

    self.setData({
      loading: true
    })

    // LeanCloud insert
    console.log(app.globalData.user.objectId);
    var objectId = app.globalData.user.objectId;

    var info = AV.Object.createWithoutData('_User', objectId);
    
    info.set('name', formData.name);
    info.set('gender', formData.gender == '男'?0:formData.gender == '女'?1:2);
    info.set('contact', formData.contact);
    info.set('highSchool', formData.highSchool);

    info.set('undergraduateSchool', formData.undergraduateSchool);
    info.set('undergraduateMajor', formData.undergraduateMajor);
    info.set('undergraduateSchoolCity', formData.undergraduateSchoolCity);

    info.set('nowInstitution', formData.nowInstitution);
    info.set('nowCity', formData.nowCity);

    info.set('BBS', formData.BBS);

    info.save().then(function (res) {
      
      //删除成功提醒
      wx.showModal({
        title: '提交成功',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            //关闭当前页返回上一层
            wx.navigateBack({
            })
          }
        }
      })

      console.log('objectId is ' + res.id);
    }, function (error){
      console.error(error);
    });


  }
})


