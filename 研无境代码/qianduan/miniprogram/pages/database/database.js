// pages/database/database.js
Page({
  data: {
    experimentName: '',
    experimentCategory: '',
    experimentSteps: '',
    experimentMaterials: '',
    experimentList: []
  },

  onNameInput(e) {
    this.setData({
      experimentName: e.detail.value
    });
  },

  onCategoryInput(e) {
    this.setData({
      experimentCategory: e.detail.value
    });
  },

  onStepsInput(e) {
    this.setData({
      experimentSteps: e.detail.value
    });
  },

  onMaterialsInput(e) {
    this.setData({
      experimentMaterials: e.detail.value
    });
  },

  uploadExperiment() {
    const app = getApp();
    if (!app.globalData.userInfo) {
      wx.showToast({
        icon: 'none',
        title: '请先登录',
      });
      return;
    }

    const { experimentName, experimentCategory, experimentSteps, experimentMaterials } = this.data;

    if (!experimentName || !experimentCategory || !experimentSteps || !experimentMaterials) {
      wx.showToast({
        icon: 'none',
        title: '请填写所有字段',
      });
      return;
    }

    wx.cloud.callFunction({
      name: 'addExperiment',
      data: {
        name: experimentName,
        category: experimentCategory,
        steps: experimentSteps,
        materials: experimentMaterials.split(',').map(item => item.trim()),
        userId: app.globalData.userInfo.openId
      }
    }).then(res => {
      wx.showToast({
        title: '上传成功',
      });
      this.setData({
        experimentName: '',
        experimentCategory: '',
        experimentSteps: '',
        experimentMaterials: ''
      });
      this.getExperiments();
    }).catch(err => {
      console.error(err);
      wx.showToast({
        icon: 'none',
        title: '上传失败',
      });
    });
  },

  getExperiments() {
    const db = wx.cloud.database();
    db.collection('Chemical_Experiments').get().then(res => {
      this.setData({
        experimentList: res.data
      });
    }).catch(err => {
      console.error(err);
    });
  },

  onLoad() {
    this.getExperiments();
  },

  deleteExperiment(e) {
    const app = getApp();
    if (!app.globalData.userInfo) {
      wx.showToast({
        icon: 'none',
        title: '请先登录',
      });
      return;
    }

    const experimentId = e.currentTarget.dataset.id;
    const experiment = this.data.experimentList.find(item => item._id === experimentId);

    if (!experiment) {
      wx.showToast({
        icon: 'none',
        title: '实验不存在',
      });
      return;
    }

    if (app.globalData.userInfo.role !== 'admin' && app.globalData.userInfo.openId !== experiment.userId) {
      wx.showToast({
        icon: 'none',
        title: '无权限删除此实验',
      });
      return;
    }

    wx.cloud.callFunction({
      name: 'deleteExperiment',
      data: {
        experimentId: experimentId
      }
    }).then(res => {
      wx.showToast({
        title: '删除成功',
      });
      this.getExperiments();
    }).catch(err => {
      console.error(err);
      wx.showToast({
        icon: 'none',
        title: '删除失败',
      });
    });
  }
});
