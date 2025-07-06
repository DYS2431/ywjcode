// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();

exports.main = async (event, context) => {
  try {
    const { username, password } = event;

    if (!username || !password) {
      return { success: false, error: '用户名和密码不能为空' };
    }

    const db = cloud.database();
    const usersCollection = db.collection('Users');

    // 检查用户是否已存在
    const existingUser = await usersCollection.where({
      username: username
    }).get();

    if (existingUser.data.length > 0) {
      return { success: false, error: '用户名已存在' };
    }

    // 插入新用户
    await usersCollection.add({
      data: {
        username: username,
        password: password,
        nickName: username,
        avatarUrl: 'https://example.com/default-avatar.png',
        createTime: new Date().toISOString(),
        role: 'user'
      }
    });

    return { success: true };

  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
};
