import React, { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import ImageAnnotation from "./components/ImageAnnotation";
import DownloadCroppedImages from "./components/DownloadCroppedImages";
import ImageCropper from "./components/ImageCropper/ImageCropper";

const App = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [croppedImages, setCroppedImages] = useState([]);

  const handleUploadedImage = (image) => {
    setUploadedImage(image);
  };

  const handleAnnotations = (updatedAnnotations) => {
    setAnnotations(updatedAnnotations);
  };

  const handleCroppedImages = (images) => {
    setCroppedImages(images);
  };

  return (
    <div className="App">
      <h1>Image Annotation App</h1>
      <ImageUpload onUpload={handleUploadedImage} />
      {uploadedImage && (
        <>
          <ImageAnnotation
            image={uploadedImage}
            onAnnotations={handleAnnotations}
          />
          <ImageCropper
            imageSrc={uploadedImage}
            onCroppedImages={handleCroppedImages}
          />
        </>
      )}
      {annotations.length > 0 && (
        <DownloadCroppedImages
          image={uploadedImage}
          annotations={annotations}
          croppedImages={croppedImages}
        />
      )}
    </div>
  );
};

export default App;