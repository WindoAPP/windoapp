import { useEffect, useState, useRef } from "react";
import styles from './spinWheel.module.scss';
import { forwardRef } from "react";
import { useImperativeHandle } from "react";

const WheelComponent = forwardRef(({
  segments,
  segColors,
  winningSegment,
  onFinished,
  onRotate,
  onRotatefinish,
  primaryColor,
  primaryColoraround,
  contrastColor,
  buttonText,
  isOnlyOnce = true,
  size = 290,
  upDuration = 1000,
  downDuration = 100,
  fontFamily = "proxima-nova",
  width = 100,
  height = 100,
}, ref) => {
  let currentSegment = "";
  let isStarted = false;
  const [isFinished, setFinished] = useState(false);
  let timerHandle = useRef(0);
  const timerDelay = segments.length;
  let angleCurrent = useRef(0);
  let angleDelta = useRef(0);
  let canvasContext = useRef(null);
  let maxSpeed = Math.PI / segments.length;
  const upTime = 6* upDuration;
  const downTime = 6* downDuration;
  let spinStart = useRef(0);
  let frames = useRef(0);
  const centerX = 300;
  const centerY = 300;



  useEffect(() => {
    wheelInit();
    // setTimeout(() => {
    //   window.scrollTo(0, 1);
    // }, 0);
  }, []);

  const audioRef = useRef(null);

  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const initCanvas = () => {
    const canvas = document.getElementById("canvas");
    if (navigator.appVersion.indexOf("MSIE") !== -1) {
      const newCanvas = document.createElement("canvas");
      newCanvas.setAttribute("width", width);
      newCanvas.setAttribute("height", height);
      newCanvas.setAttribute("id", "canvas");
      document.getElementById("wheel").appendChild(newCanvas);
      canvasContext.current = newCanvas.getContext("2d");
    } else {
      canvasContext.current = canvas.getContext("2d");
    }
    canvas.addEventListener("click", spin, false);
  };

  const spin = () => {

    audioRef.current.play()
    isStarted = true;
    // onRotate();
    if (timerHandle.current === 0) {
      spinStart.current = new Date().getTime();
      maxSpeed = Math.PI / segments.length;
      frames.current = 0;
      timerHandle.current = setInterval(onTimerTick, timerDelay);
    }
  };

  const onTimerTick = () => {
    frames.current++;
    draw();
    const duration = new Date().getTime() - spinStart.current;
    let progress = 0;
    let finished = false;
    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta.current = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      if (winningSegment) {
        if (
          currentSegment === winningSegment &&
          frames.current > segments.length
        ) {
          progress = duration / upTime;
          angleDelta.current =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          progress = duration / downTime;
          angleDelta.current =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        if (progress >= 0.8) {
          angleDelta.current =
            (maxSpeed / 1.2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        } else if (progress >= 0.98) {
          angleDelta.current =
            (maxSpeed / 2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        } else {
          angleDelta.current =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      }
      if (progress >= 1) finished = true;
    }

    angleCurrent.current += angleDelta.current;
    while (angleCurrent.current >= Math.PI * 2)
      angleCurrent.current -= Math.PI * 2;
    if (finished) {
      setFinished(true);
      onFinished(currentSegment);
      clearInterval(timerHandle.current);
      timerHandle.current = 0;
      angleDelta.current = 0;
    }
  };

  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const drawSegment = (key, lastAngle, angle) => {
    const ctx = canvasContext.current;
    const value = segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segColors[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor || "black";
    ctx.font = "bold 1em " + fontFamily;
    ctx.fillText(value.substr(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasContext.current;
    let lastAngle = angleCurrent.current;
    const len = segments.length;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor || "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em " + fontFamily;
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent.current;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw a center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = primaryColor || "black";
    ctx.lineWidth = 5;
    ctx.strokeStyle = contrastColor || "black";
    ctx.fill();
    ctx.font = "bold 2em " + fontFamily;
    ctx.fillStyle = contrastColor || "black";
    ctx.textAlign = "center";
    ctx.fillText(buttonText || "", centerX, centerY + 3);
    ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();
    ctx.lineWidth = 15;
    ctx.strokeStyle =  "black";
    ctx.stroke();
  };

  const drawNeedle = () => {
    const ctx = canvasContext.current;
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor || "#C2DBFE";
    ctx.fileStyle = contrastColor || "black";
    ctx.beginPath();
    ctx.moveTo(centerX + 10, centerY - 25);
    ctx.lineTo(centerX - 10, centerY - 25);
    ctx.lineTo(centerX, centerY - 50);
    ctx.closePath();
    ctx.fill();
    const change = angleCurrent.current + Math.PI / 2;
    let i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1;
    if (i < 0) i = i + segments.length;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "transparent";
    ctx.font = "bold 1.5em " + fontFamily;
    currentSegment = segments[i];
    isStarted &&
      ctx.fillText(currentSegment, centerX + 10, centerY + size + 50);
  };

  const clear = () => {
    const ctx = canvasContext.current;
    ctx.clearRect(0, 0, 1000, 800);
  };

  useImperativeHandle(ref, () => ({
    spin,
  }));

 

  return (<div id="wheel">
  <canvas
  className={styles.wheel}
    id="canvas"
    width="560"
    height="560"
    style={{
      pointerEvents: isFinished && isOnlyOnce ? "none" : "auto"
    }}
  />
   <audio ref={audioRef} src="/wheelmp3.m4a" />
</div>);
});


// const WheelComponent = forwardRef({
//   segments,
//   segColors,
//   winningSegment,
//   onFinished,
//   onRotate,
//   onRotatefinish,
//   primaryColor,
//   primaryColoraround,
//   contrastColor,
//   buttonText,
//   isOnlyOnce = true,
//   size = 290,
//   upDuration = 1000,
//   downDuration = 100,
//   fontFamily = "proxima-nova",
//   width = 100,
//   height = 100,
// },ref) => {
//   let currentSegment = "";
//   let isStarted = false;
//   const [isFinished, setFinished] = useState(false);
//   let timerHandle = useRef(0);
//   const timerDelay = segments.length;
//   let angleCurrent = useRef(0);
//   let angleDelta = useRef(0);
//   let canvasContext = useRef(null);
//   let maxSpeed = Math.PI / segments.length;
//   const upTime = segments.length * upDuration;
//   const downTime = segments.length * downDuration;
//   let spinStart = useRef(0);
//   let frames = useRef(0);
//   const centerX = 300;
//   const centerY = 300;



//   useEffect(() => {
//     wheelInit();
//     setTimeout(() => {
//       window.scrollTo(0, 1);
//     }, 0);
//   }, []);

//   const audioRef = useRef(null);

//   const wheelInit = () => {
//     initCanvas();
//     wheelDraw();
//   };

//   const initCanvas = () => {
//     const canvas = document.getElementById("canvas");
//     if (navigator.appVersion.indexOf("MSIE") !== -1) {
//       const newCanvas = document.createElement("canvas");
//       newCanvas.setAttribute("width", width);
//       newCanvas.setAttribute("height", height);
//       newCanvas.setAttribute("id", "canvas");
//       document.getElementById("wheel").appendChild(newCanvas);
//       canvasContext.current = newCanvas.getContext("2d");
//     } else {
//       canvasContext.current = canvas.getContext("2d");
//     }
//     canvas.addEventListener("click", spin, false);
//   };

//   const spin = () => {

//     audioRef.current.play()
//     isStarted = true;
//     // onRotate();
//     if (timerHandle.current === 0) {
//       spinStart.current = new Date().getTime();
//       maxSpeed = Math.PI / segments.length;
//       frames.current = 0;
//       timerHandle.current = setInterval(onTimerTick, timerDelay);
//     }
//   };

//   const onTimerTick = () => {
//     frames.current++;
//     draw();
//     const duration = new Date().getTime() - spinStart.current;
//     let progress = 0;
//     let finished = false;
//     if (duration < upTime) {
//       progress = duration / upTime;
//       angleDelta.current = maxSpeed * Math.sin((progress * Math.PI) / 2);
//     } else {
//       if (winningSegment) {
//         if (
//           currentSegment === winningSegment &&
//           frames.current > segments.length
//         ) {
//           progress = duration / upTime;
//           angleDelta.current =
//             maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
//           progress = 1;
//         } else {
//           progress = duration / downTime;
//           angleDelta.current =
//             maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
//         }
//       } else {
//         progress = duration / downTime;
//         if (progress >= 0.8) {
//           angleDelta.current =
//             (maxSpeed / 1.2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
//         } else if (progress >= 0.98) {
//           angleDelta.current =
//             (maxSpeed / 2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
//         } else {
//           angleDelta.current =
//             maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
//         }
//       }
//       if (progress >= 1) finished = true;
//     }

//     angleCurrent.current += angleDelta.current;
//     while (angleCurrent.current >= Math.PI * 2)
//       angleCurrent.current -= Math.PI * 2;
//     if (finished) {
//       setFinished(true);
//       onFinished(currentSegment);
//       clearInterval(timerHandle.current);
//       timerHandle.current = 0;
//       angleDelta.current = 0;
//     }
//   };

//   const wheelDraw = () => {
//     clear();
//     drawWheel();
//     drawNeedle();
//   };

//   const draw = () => {
//     clear();
//     drawWheel();
//     drawNeedle();
//   };

//   const drawSegment = (key, lastAngle, angle) => {
//     const ctx = canvasContext.current;
//     const value = segments[key];
//     ctx.save();
//     ctx.beginPath();
//     ctx.moveTo(centerX, centerY);
//     ctx.arc(centerX, centerY, size, lastAngle, angle, false);
//     ctx.lineTo(centerX, centerY);
//     ctx.closePath();
//     ctx.fillStyle = segColors[key];
//     ctx.fill();
//     ctx.stroke();
//     ctx.save();
//     ctx.translate(centerX, centerY);
//     ctx.rotate((lastAngle + angle) / 2);
//     ctx.fillStyle = contrastColor || "black";
//     ctx.font = "bold 1em " + fontFamily;
//     ctx.fillText(value.substr(0, 21), size / 2 + 20, 0);
//     ctx.restore();
//   };

//   const drawWheel = () => {
//     const ctx = canvasContext.current;
//     let lastAngle = angleCurrent.current;
//     const len = segments.length;
//     const PI2 = Math.PI * 2;
//     ctx.lineWidth = 1;
//     ctx.strokeStyle = primaryColor || "black";
//     ctx.textBaseline = "middle";
//     ctx.textAlign = "center";
//     ctx.font = "1em " + fontFamily;
//     for (let i = 1; i <= len; i++) {
//       const angle = PI2 * (i / len) + angleCurrent.current;
//       drawSegment(i - 1, lastAngle, angle);
//       lastAngle = angle;
//     }

//     // Draw a center circle
//     ctx.beginPath();
//     ctx.arc(centerX, centerY, 25, 0, PI2, false);
//     ctx.closePath();
//     ctx.fillStyle = primaryColor || "black";
//     ctx.lineWidth = 5;
//     ctx.strokeStyle = contrastColor || "black";
//     ctx.fill();
//     ctx.font = "bold 2em " + fontFamily;
//     ctx.fillStyle = contrastColor || "black";
//     ctx.textAlign = "center";
//     ctx.fillText(buttonText || "", centerX, centerY + 3);
//     ctx.stroke();

//     // Draw outer circle
//     ctx.beginPath();
//     ctx.arc(centerX, centerY, size, 0, PI2, false);
//     ctx.closePath();
//     ctx.lineWidth = 15;
//     ctx.strokeStyle =  "black";
//     ctx.stroke();
//   };

//   const drawNeedle = () => {
//     const ctx = canvasContext.current;
//     ctx.lineWidth = 1;
//     ctx.strokeStyle = contrastColor || "#C2DBFE";
//     ctx.fileStyle = contrastColor || "black";
//     ctx.beginPath();
//     ctx.moveTo(centerX + 10, centerY - 25);
//     ctx.lineTo(centerX - 10, centerY - 25);
//     ctx.lineTo(centerX, centerY - 50);
//     ctx.closePath();
//     ctx.fill();
//     const change = angleCurrent.current + Math.PI / 2;
//     let i =
//       segments.length -
//       Math.floor((change / (Math.PI * 2)) * segments.length) -
//       1;
//     if (i < 0) i = i + segments.length;
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillStyle = "transparent";
//     ctx.font = "bold 1.5em " + fontFamily;
//     currentSegment = segments[i];
//     isStarted &&
//       ctx.fillText(currentSegment, centerX + 10, centerY + size + 50);
//   };

//   const clear = () => {
//     const ctx = canvasContext.current;
//     ctx.clearRect(0, 0, 1000, 800);
//   };

//   return (
//     <div id="wheel">
//       <canvas
//       className={styles.wheel}
//         id="canvas"
//         width="560"
//         height="560"
//         style={{
//           pointerEvents: isFinished && isOnlyOnce ? "none" : "auto"
//         }}
//       />
//        <audio ref={audioRef} src="/wheelmp3.m4a" />
//     </div>
//   );
// });

export default WheelComponent;
