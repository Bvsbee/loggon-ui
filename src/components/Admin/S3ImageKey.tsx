import {useEffect, useState } from 'react';

//For new products added by admin
const S3Image = ({ imageKey }: { imageKey: string }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      const response = await fetch(`/api/files/${imageKey}`); 
      const data = await response.json();
      setImageUrl(data.url);
    };

    fetchImageUrl();
  }, [imageKey]);

  return imageUrl ? (
    <img src={imageUrl} alt="S3 File" style={{ maxWidth: '100%' }} /> //Will be displayed on products page 
  ) : (
    <p>Loading image...</p>
  );
};

export default S3Image;
