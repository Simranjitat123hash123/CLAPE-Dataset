// Teacher Aggregation Logic

function computeEngagement(entries){

  entries.sort((a,b)=>a.t - b.t);

  let engaged = 0;
  let lessEngaged = 0;

  for(let i=1;i<entries.length;i++){

    const diff = entries[i].t - entries[i-1].t;

    if(diff <= 0 || diff > 2000) continue;

    if(entries[i].c >= 23){
      engaged += diff;
    } else {
      lessEngaged += diff;
    }
  }

  return {
    engagedMinutes: (engaged/60000).toFixed(2),
    lessEngagedMinutes: (lessEngaged/60000).toFixed(2)
  };
}