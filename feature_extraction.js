// Feature Extraction Module

function extractFeatures(avgRatio, baseline, change, remainingTime){

  return {
    normalizedRatio: avgRatio,
    baseline: baseline,
    changePercent: change,
    timeRemaining: remainingTime,
    timestamp: Date.now()
  };

}