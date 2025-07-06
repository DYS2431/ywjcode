// pages/register/register.js
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

  register() {
    const { username, password } = this.data;

    if (!username || !password) {
      wx.showToast({
        icon: 'none',
        title: '请填写所有字段',
      });
      return;
    }

    wx.cloud.callFunction({
      name: 'registerUser',
      data: {
        username: username,
        password: password
      }
    }).then(res => {
      if (res.result.success) {
        wx.showToast({
          title: '注册成功',
        });
        wx.navigateBack();
      } else {
        wx.showToast({
          icon: 'none',
          title: '注册失败: ' + (res.result.error || '未知错误'),
        });
      }
    }).catch(err => {
      console.error(err);
      wx.showToast({
        icon: 'none',
        title: '注册失败: ' + (err.errMsg || '未知错误'),
      });
    });
  }
});
