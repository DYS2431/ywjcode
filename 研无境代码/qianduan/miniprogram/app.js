// app.js
App({
  globalData: {
    userInfo: null,
    cartItems: []
  },
  onLaunch: function () {
    // 初始化云开发环境
    wx.cloud.init({
      env: 'cloud1-0gztl0g53283cb49', // 替换为你的云环境 ID
      traceUser: true
    });
  }
});
