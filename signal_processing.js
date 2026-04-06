// Signal Processing Module

const SMOOTH_FACTOR = 0.95;
const CHANGE_THRESHOLD = 2.0;

let smoothRatio = null;
let ratioBuffer = [];
let baseline = null;
let calibrated = false;
let samples = [];

function computeNormalizedRatio(L, R){
  return ((L.pupil.r / L.iris.r) + (R.pupil.r / R.iris.r)) / 2;
}

function smoothSignal(ratio){
  if(smoothRatio === null) smoothRatio = ratio;
  smoothRatio = SMOOTH_FACTOR * smoothRatio + (1 - SMOOTH_FACTOR) * ratio;

  ratioBuffer.push(smoothRatio);
  if(ratioBuffer.length > 10) ratioBuffer.shift();

  return ratioBuffer.reduce((a,b)=>a+b)/ratioBuffer.length;
}

function calibrateBaseline(value){
  if(!calibrated){
    samples.push(value);
    if(samples.length > 40){
      baseline = samples.reduce((a,b)=>a+b)/samples.length;
      calibrated = true;
    }
  }
  return baseline;
}

function computeChange(value){
  if(!calibrated) return 0;

  let change = ((value - baseline) / baseline) * 100;

  if(Math.abs(change) < CHANGE_THRESHOLD) change = 0;

  return change;
}