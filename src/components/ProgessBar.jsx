import React from "react";

function getColor(progress) {
  if (progress < 20) return "#1517acff"; 
  if (progress < 40) return "#1517acff"; 
  if(progress < 60) return "#1517acff"
  return " #1517acff"; 
}

function ProgressBar({progress}){
     const color = progress === 100 ? "#1517acff" : getColor(progress);
    return(
        <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{width: `${progress}%`,  backgroundColor: color}}></div>
        </div>
    )
}

export default ProgressBar;