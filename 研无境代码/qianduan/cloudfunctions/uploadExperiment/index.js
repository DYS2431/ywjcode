const cloud = require('wx-server-sdk');
cloud.init();

exports.main = async (event, context) => {
  try {
    const db = cloud.database();
    await db.collection('files').add({
      data: {
        name: event.name,
        category: event.category,
        steps: event.steps,
        materials: event.materials,
        uploadTime: new Date().toISOString(),
        userId: event.userInfo._id
      }
    });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
};
