const cloud = require('wx-server-sdk');
cloud.init();

exports.main = async (event, context) => {
  try {
    const db = cloud.database();
    await db.collection('Chemical_Experiments').doc(event.experimentId).remove();
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
};
