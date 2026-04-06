// Dataset Generation (Firebase Storage)

function storeData(db, studentId, features){

  db.ref("pupilData/" + studentId + "/" + Date.now()).set({
    studentId: studentId,
    normalizedRatio: features.normalizedRatio,
    baseline: features.baseline,
    changePercent: features.changePercent,
    timeRemaining: features.timeRemaining,
    timestamp: features.timestamp
  });

}