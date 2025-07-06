// pages/login/login.js
Page({
  data: {
    username: '',
    password: ''
  },
  onUsernameInput(e) {
    this.setData({
      username: e.detail.value
    });
  },
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },
  login() {
    const { username, password } = this.data;
    console.log('登录请求', { username, password });
    wx.showToast({
      title: '登录成功',
      icon: 'success'
    });
    const app = getApp();
    app.globalData.userInfo = {
      avatarUrl: 'https://example.com/default-avatar.png',
      nickName: username,
      username: username,
      createTime: new Date().toISOString(),
      role: 'user'
    };
    wx.navigateBack();
  },
  navigateToRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    });
  }
});
