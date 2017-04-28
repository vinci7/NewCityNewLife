const AV = require('../../../../libs/av-weapp-min.js');

var app = getApp()
var formData = {}

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

  onShow: function() {
    // 从 LeanCloud 获取用户信息
    var objectId = app.globalData.user.objectId;
    console.log('objectId = ', objectId);

    //数据绑定
    new AV.Query('_User').get(objectId).then(user => this.setData({ user })).catch(console.error);
    
  },

  deleteInfo: function(event) {
    console.log('delete?');

    wx.showModal({
    title: '警告',
    content: '确定要删除信息吗？',
    confirmColor: 'red',
    success: function(res) {
      if (res.confirm) {
        console.log('删除')
        console.log(app.globalData.user.objectId);
        var objectId = app.globalData.user.objectId;
        var info = AV.Object.createWithoutData('_User', objectId);
        
        info.set('name', '');
        info.set('highSchool', 2);
        info.set('contact', '');
        info.set('highSchool', '2');

        info.set('undergraduateSchool', '');
        info.set('undergraduateMajor', '');
        info.set('undergraduateSchoolCity', '');

        info.set('nowInstitution', '');
        info.set('nowCity', '');

        info.set('BBS', '');

        info.save().then(function (res) {

          console.log('objectId is ' + res.id);

          //删除成功提醒
          wx.showModal({
            title: '删除成功',
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

        }, function (error){
          console.error(error);
        });
      } else if (res.cancel) {
        console.log('取消')
      }
    }})
    
    },

})


