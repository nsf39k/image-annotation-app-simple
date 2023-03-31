import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import ImageCropper from './ImageCropper/ImageCropper';

const ImageAnnotation = ({ uploadedImage }) => {
  const [annotations, setAnnotations] = useState([]);
  const [currentAnnotation, setCurrentAnnotation] = useState(null);

  const stageRef = useRef();

  const handleMouseDown = (e) => {
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    setCurrentAnnotation({
      x: pointerPosition.x,
      y: pointerPosition.y,
      width: 0,
      height: 0,
      name: '',
    });
  };

  const handleMouseMove = (e) => {
    if (!currentAnnotation) return;
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const newWidth = pointerPosition.x - currentAnnotation.x;
    const newHeight = pointerPosition.y - currentAnnotation.y;
    setCurrentAnnotation({
      ...currentAnnotation,
      width: newWidth,
      height: newHeight,
    });
  };

  const handleMouseUp = () => {
    if (!currentAnnotation) return;
    setAnnotations([...annotations, currentAnnotation]);
    setCurrentAnnotation(null);
  };

  const handleNameChange = (e, index) => {
    const newAnnotations = annotations.map((annotation, idx) => {
      if (index === idx) {
        return { ...annotation, name: e.target.value };
      }
      return annotation;
    });
    setAnnotations(newAnnotations);
  };

  return (
    <div>
      <Stage
        ref={stageRef}
        width={uploadedImage.width}
        height={uploadedImage.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <ImageCropper
            uploadedImage={uploadedImage}
            annotations={annotations}
          />
          {annotations.map((annotation, index) => (
            <React.Fragment key={index}>
              <Rect
                x={annotation.x}
                y={annotation.y}
                width={annotation.width}
                height={annotation.height}
                stroke="red"
                draggable
              />
              <Text
                x={annotation.x}
                y={annotation.y - 20}
                text={annotation.name}
                fontSize={14}
                fill="white"
                fontStyle="bold"
              />
            </React.Fragment>
          ))}
          {currentAnnotation && (
            <Rect
              x={currentAnnotation.x}
              y={currentAnnotation.y}
              width={currentAnnotation.width}
              height={currentAnnotation.height}
              stroke="red"
            />
          )}
        </Layer>
      </Stage>
      <div>
        {annotations.map((annotation, index) => (
          <div key={index}>
            <label>
              Annotation {index + 1}:{' '}
              <input
                type="text"
                value={annotation.name}
                onChange={(e) => handleNameChange(e, index)}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageAnnotation;