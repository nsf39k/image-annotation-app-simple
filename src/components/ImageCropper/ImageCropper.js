import React, { useState, useRef } from "react";
import "./ImageCropper.css";

const ImageCropper = ({ imageSrc, onCroppedImages }) => {
  const [cropBoxes, setCropBoxes] = useState([]);
  const [currentBox, setCurrentBox] = useState(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentBox({ x, y, width: 0, height: 0 });
  };

  const handleMouseUp = () => {
    if (currentBox) {
      setCropBoxes([...cropBoxes, currentBox]);
      setCurrentBox(null);
    }
  };

  const handleMouseMove = (e) => {
    if (currentBox) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCurrentBox({
        ...currentBox,
        width: x - currentBox.x,
        height: y - currentBox.y,
      });
    }
  };

  const cropImages = () => {
    const croppedImages = cropBoxes.map((box) => {
      const canvas = document.createElement("canvas");
      canvas.width = box.width;
      canvas.height = box.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        imageRef.current,
        box.x,
        box.y,
        box.width,
        box.height,
        0,
        0,
        box.width,
        box.height
      );
      return canvas.toDataURL();
    });
    onCroppedImages(croppedImages);
  };

  return (
    <div className="image-cropper">
      <div
        className="image-cropper-canvas"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <img src={imageSrc} alt="Uploaded" ref={imageRef} />
        {cropBoxes.map((box, index) => (
          <div
            key={index}
            className="crop-box"
            style={{
              left: box.x,
              top: box.y,
              width: box.width,
              height: box.height,
            }}
          >
            <div className="crop-box-label">{index + 1}</div>
          </div>
        ))}
        {currentBox && (
          <div
            className="crop-box"
            style={{
              left: currentBox.x,
              top: currentBox.y,
              width: currentBox.width,
              height: currentBox.height,
            }}
          ></div>
        )}
      </div>
      <div className="image-cropper-controls">
        <button onClick={cropImages}>Crop Images</button>
      </div>
    </div>
  );
};

export default ImageCropper;