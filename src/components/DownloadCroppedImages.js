import React, { useState } from 'react';
import { saveAs } from 'file-saver';

const DownloadCroppedImages = ({ croppedImages }) => {
  const [downloading, setDownloading] = useState(false);

  const downloadCroppedImages = async () => {
    setDownloading(true);

    const zip = new JSZip();
    const folder = zip.folder('cropped-images');

    croppedImages.forEach(({ dataUrl, label }, index) => {
      const fileName = label ? `${label}_${index + 1}.png` : `image_${index + 1}.png`;
      const base64Data = dataUrl.split(',')[1];
      folder.file(fileName, base64Data, { base64: true });
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'cropped-images.zip');
    setDownloading(false);
  };

  return (
    <div>
      {croppedImages.length > 0 && (
        <button onClick={downloadCroppedImages} disabled={downloading}>
          {downloading ? 'Downloading...' : 'Download Cropped Images'}
        </button>
      )}
    </div>
  );
};

export default DownloadCroppedImages;