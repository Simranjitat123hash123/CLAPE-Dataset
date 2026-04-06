// Pupil Detection Module (Extracted from student.html)

function irisData(lm, ids, width, height){
  const xs=[], ys=[];
  ids.forEach(i=>{
    if(lm[i]){
      xs.push(lm[i].x * width);
      ys.push(lm[i].y * height);
    }
  });

  if(xs.length < 3) return null;

  const cx = xs.reduce((a,b)=>a+b)/xs.length;
  const cy = ys.reduce((a,b)=>a+b)/ys.length;
  const r = (Math.max(...xs) - Math.min(...xs)) / 2;

  return {cx, cy, r};
}

function detectPupil(canvas, data){
  if(!data || !data.r) return null;

  const size = Math.round(data.r * 3.8);
  if(size < 25) return null;

  const x = Math.max(0, Math.min(canvas.width - size, Math.round(data.cx - size/2)));
  const y = Math.max(0, Math.min(canvas.height - size, Math.round(data.cy - size/2)));

  const src = cv.imread(canvas);
  const roi = src.roi(new cv.Rect(x, y, size, size));

  const gray = new cv.Mat();
  cv.cvtColor(roi, gray, cv.COLOR_RGBA2GRAY);

  const clahe = new cv.CLAHE(3.0, new cv.Size(8,8));
  clahe.apply(gray, gray);

  cv.GaussianBlur(gray, gray, new cv.Size(3,3), 0);

  const thresh = new cv.Mat();
  cv.adaptiveThreshold(gray, thresh, 255,
    cv.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv.THRESH_BINARY_INV, 15, 2);

  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();

  cv.findContours(thresh, contours, hierarchy,
    cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

  let best = null, maxArea = 0;

  for(let i=0;i<contours.size();i++){
    const cnt = contours.get(i);
    const area = cv.contourArea(cnt);

    if(area > maxArea){
      const circle = cv.minEnclosingCircle(cnt);

      if(circle.radius < data.r*1.5 && circle.radius > data.r*0.1){
        maxArea = area;
        best = {
          r: circle.radius,
          cx: circle.center.x + x,
          cy: circle.center.y + y
        };
      }
    }
    cnt.delete();
  }

  roi.delete(); gray.delete(); thresh.delete();
  contours.delete(); hierarchy.delete(); src.delete();

  return best;
}