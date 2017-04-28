const AV = require('../../libs/av-weapp-min.js');

var app = getApp()
Page({
  data: {
    list: [
      {
        id: 'api',
        name: '查看信息',
        open: false,
        url: 'template-message/template-message',
        img: 'media'
      }, {
        id: 'page',
        name: '完善信息',
        open: false,
        url: 'update/update',
        img: 'media'
      }, 
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        if(list[i].url){
          wx.navigateTo({
            url: 'pages/' + list[i].url
          })
          return
        }
      }

    }
    this.setData({
      list: list
    });
  },
  
  onLaunch: function () {
    console.log('onLoad')
    
    // 假设已经通过 AV.User.loginWithWeapp() 登录
    // 获得当前登录用户
    const user = AV.User.current();
    // 调用小程序 API，得到用户信息
    wx.getUserInfo({
      success: ({userInfo}) => {
        // 更新当前用户的信息
        user.set(userInfo).save().then(user => {
          // 成功，此时可在控制台中看到更新后的用户信息
          this.globalData.user = user.toJSON();
        }).catch(console.error);
      }
    });

    //更新数据
    this.setData({
      userInfo:user
    })

  },

  onShow: function() {
    console.log("API/index.js onShow");
    const user = AV.User.current();
    if (user.avatarUrl == null) {
      wx.getUserInfo({
        success: ({userInfo}) => {
          // 更新当前用户的信息
          user.set(userInfo).save().catch(console.error);
        }
      });

      //更新数据
      this.setData({
        userInfo:user
      })
      
    }

  }
})
