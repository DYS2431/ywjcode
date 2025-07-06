// pages/mall/mall.js
Page({
  data: {
    experiments: [],
    filteredExperiments: [],
    searchText: ''
  },

  onLoad: function () {
    this.getExperiments();
  },

  // 从数据库获取实验数据
  getExperiments: function () {
    const db = wx.cloud.database();
    db.collection('Chemical_Experiments').get().then(res => {
      this.setData({
        experiments: res.data,
        filteredExperiments: res.data
      });
    }).catch(err => {
      console.error(err);
      wx.showToast({
        icon: 'none',
        title: '获取实验数据失败'
      });
    });
  },

  // 搜索</view>功能
  onSearchInput: function (e) {
    this.setData({
      searchText: e.detail.value
    });
    this.filterExperiments();
  },

  performSearch: function () {
    this.filterExperiments();
  },

  // 过滤实验数据
  filterExperiments: function () {
    const { searchText, experiments } = this.data;
    if (!searchText.trim()) {
      this.setData({
        filteredExperiments: experiments
      });
      return;
    }
    const filtered = experiments.filter(exp =>
      exp.name.toLowerCase().includes(searchText.toLowerCase())
    );
    this.setData({
      filteredExperiments: filtered
    });
  },

  // 查看实验详情
  viewDetails: function (e) {
    const experimentId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/experimentDetail/experimentDetail?id=${experimentId}`
    });
  }
});
