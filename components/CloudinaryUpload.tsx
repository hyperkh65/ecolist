'use client';
import { useState } from 'react';

interface CloudinaryUploadProps {
  onSuccess: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function CloudinaryUpload({ onSuccess, folder = 'led-products', label = '파일 업로드' }: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    // Cloud Name & Upload Preset should be configured in your Cloudinary Dashboard
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'unsigned_preset';
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', folder);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        onSuccess(data.secure_url);
      } else {
        alert('업로드 실패');
      }
    } catch (err) {
      console.error(err);
      alert('업로드 중 오류 발생');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <label style={{
        cursor: uploading ? 'not-allowed' : 'pointer',
        padding: '10px 16px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 8,
        color: '#fff',
        fontSize: 13,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        transition: 'all 0.2s',
        opacity: uploading ? 0.6 : 1
      }}>
        {uploading ? '업로드 중...' : `☁️ ${label}`}
        <input 
          type="file" 
          style={{ display: 'none' }} 
          onChange={handleUpload}
          disabled={uploading}
          accept="image/*, application/pdf"
        />
      </label>
    </div>
  );
}
