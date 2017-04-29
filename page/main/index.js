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
      .notEqualTo('name', '')
      .notEqualTo('undergraduateSchool','')
      .notEqualTo('nowInstitution','')
      .notEqualTo('name', null)
      .find()
      .then(list => this.setData({ list }))
      .catch(console.error);
  },

  showInfo: function (e) {
    var objectId = e.currentTarget.id;
    
    //通过全局变量传参
    //app.globalData.targetId = objectId;
    
    //通过options传参
    console.log('pages/template-message/template-message?objectId=' + objectId);
    wx.navigateTo({
      url: 'pages/template-message/template-message?objectId=' + objectId
      })
  }

})

