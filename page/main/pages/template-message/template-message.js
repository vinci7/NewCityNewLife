const AV = require('../../../../libs/av-weapp-min.js');

var app = getApp()

Page({

  onLoad: function(options) {
    console.log('onLoad')
    
    //通过全局变量传参
    //var objectId = app.globalData.targetId;
    
    // 从 url参数 获取用户信息
    var objectId = options.objectId;
    console.log('objectId = ', objectId);

    //数据绑定
    new AV.Query('_User').get(objectId).then(user => this.setData({ user })).catch(console.error);

    //调用应用实例的方法获取全局数据
    const user = AV.User.current();
    //更新数据
    this.setData({
      userInfo:user
    })
  },

})


