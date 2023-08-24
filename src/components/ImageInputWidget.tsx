import React, { useState } from 'react';
import { Button } from '@mui/material';

const ImageInputWidget: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>("");

  const handleStartEdit = () => {
    setIsEditMode(true);
  };

  const handleStopEdit = () => {
    setIsEditMode(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {isEditMode && (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'end' }}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <Button sx={{ bottom: '0', right: '0' }} onClick={handleStopEdit}>완료</Button>
        </div>
      )}
      {!isEditMode && (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'end' }}>
          {imageSrc && <img src={imageSrc.toString()} alt="Preview" style={{ width: '100%', height: "240px", objectFit: "contain" }} />}
          <Button sx={{ bottom: '0', right: '0' }} onClick={handleStartEdit}>수정</Button>
        </div>
      )}
    </div>
  );
};

export default ImageInputWidget;
