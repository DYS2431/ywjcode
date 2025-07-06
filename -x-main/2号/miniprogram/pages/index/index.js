// index.js
Page({
  navigateToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },
  navigateToRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    });
  },
  navigateToMall() {
    wx.navigateTo({
      url: '/pages/mall/mall'
    });
  },
  navigateToVR() {
    wx.navigateTo({
      url: '/pages/vr/vr'
    });
  },
  navigateToDatabase() {
    wx.navigateTo({
      url: '/pages/database/database'
    });
  }
});
