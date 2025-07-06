// pages/experimentDetail/experimentDetail.js
Page({
  data: {
    experiment: {}
  },

  onLoad: function (options) {
    const { id } = options;
    this.getExperimentDetails(id);
  },

  // 获取实验详情
  getExperimentDetails: function (id) {
    const db = wx.cloud.database();
    db.collection('Chemical_Experiments').doc(id).get().then(res => {
      this.setData({
        experiment: res.data
      });
    }).catch(err => {
      console.error(err);
      wx.showToast({
        icon: 'none',
        title: '获取实验详情失败'
      });
    });
  },

  // 返回商城页面
  navigateBack: function () {
    wx.navigateBack();
  }
});
