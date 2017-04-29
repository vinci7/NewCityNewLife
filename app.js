const appId = require('./config').appId
const appKey = require('./config').appKey

const AV = require('./libs/av-weapp-min.js');

// LeanCloud 应用的 ID 和 Key
AV.init({ 
 appId: appId, 
 appKey: appKey, 
});

App({
  onShow: function () {
    console.log('App show')

    //LeanCloud 微信小程序一键登录
    AV.User.loginWithWeapp().then(user => {
      this.globalData.user = user.toJSON();
      this.globalData.hasLogin = true;
      console.log(this.globalData.user.objectId);
      console.log(this.globalData.user);
    }).catch(console.error);

  },
  onLaunch: function () {
    console.log('App Launch')
  },
  onHide: function () {
    console.log('App Hide')
  },

  globalData:{
    user: null,
    hasLogin: false,
    openid: null,
    objectId: null
  }
})
