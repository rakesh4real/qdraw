import React, {useState, useEffect} from 'react';

function SketchPad({canvasRef, contextRef, setCurB64}) {

  const [isDrawing, setIsDrawing] = useState(false)
  
  useEffect(() => {
    const canvas = canvasRef.current;
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // canvas.style.width = `${window.innerWidth}px`;
    // canvas.style.height = `${window.innerHeight}px`;
    canvas.width = 350;
    canvas.height = 350;
    canvas.style.width = `${350}px`;
    canvas.style.height = `${350}px`;

    const context = canvas.getContext("2d")
    //context.scale(2,2)
    //context.fillStyle = "rgb(255,255,255)";
    //context.fillRect(0,0,window.innerWidth, window.innerHeight);
    context.lineCap = "round"
    context.strokeStyle = "rgb(1,1,1)"
    context.lineWidth = 5
    contextRef.current = context;
  }, [canvasRef, contextRef])

  const startDrawing = ({nativeEvent}) => {
    nativeEvent.preventDefault()
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = ({nativeEvent}) => {
    nativeEvent.preventDefault()
    contextRef.current.closePath()
    setIsDrawing(false)
    // update cur image on screen
    setCurB64(canvasRef.current.toDataURL("image/jpeg"))
  }

  const draw = ({nativeEvent}) => {
    nativeEvent.preventDefault()
    if(!isDrawing){
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    // for touch screen
    if (offsetX === undefined){
      var rect = nativeEvent.target.getBoundingClientRect();
      var x = nativeEvent.targetTouches[0].pageX - rect.left;
      var y = nativeEvent.targetTouches[0].pageY - rect.top;
      contextRef.current.lineTo(x, y)
      contextRef.current.stroke()
      return
    }

    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }
  
  return (
    <div className="CanvasContainer">
      <canvas
          className="canvas"
          
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          
          onTouchStart={startDrawing}
          onTouchEnd={finishDrawing}
          onTouchMove={draw}
          
          ref={canvasRef}
      />
    </div>
  )
}

export default SketchPad;