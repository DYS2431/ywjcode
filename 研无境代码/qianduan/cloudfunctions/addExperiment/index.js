const cloud = require('wx-server-sdk');
cloud.init();

exports.main = async (event, context) => {
  try {
    const db = cloud.database();
    await db.collection('Chemical_Experiments').add({
      data: {
        name: event.name,
        category: event.category,
        steps: event.steps,
        materials: event.materials,
        userId: event.userId,
        createTime: new Date().toISOString()
      }
    });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
};
