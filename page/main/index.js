const AV = require('../../libs/av-weapp-min.js');

var app = getApp()

Page({

  data: {
    list: [],
  },

  onShow: function () {
    
    console.log("component/index onShow");
    new AV.Query('_User')
      .descending('createdAt')
      .find()
      .then(list => this.setData({ list }))
      .catch(console.error);

  },

  showInfo: function (e) {
    var objectId = e.currentTarget.id;
    app.globalData.targetId = objectId;
    console.log(objectId);
    console.log('pages/template-message/template-message?objectId=' + objectId);
    wx.navigateTo({
      url: 'pages/template-message/template-message?objectId=' + objectId
      })
  }

})

