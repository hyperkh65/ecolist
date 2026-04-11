'use client';
import { useState } from 'react';

interface CloudinaryUploadProps {
  onSuccess: (url: string) => void;
  folder?: string;
  label?: string;
  accept?: string;
}

export default function CloudinaryUpload({
  onSuccess,
  folder = 'led-products',
  label = '파일 업로드',
  accept = 'image/*,application/pdf',
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName    = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      alert('Cloudinary 설정 누락\nVercel 환경변수를 확인하세요:\n- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME\n- NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', folder);

    try {
      const res  = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.secure_url) {
        onSuccess(data.secure_url);
      } else {
        alert('업로드 실패: ' + (data.error?.message || JSON.stringify(data)));
      }
    } catch (err) {
      alert('네트워크 오류: ' + String(err));
    } finally {
      setUploading(false);
      e.target.value = '';  // 같은 파일 재선택 가능
    }
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <label style={{
        cursor: uploading ? 'not-allowed' : 'pointer',
        padding: '10px 16px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 8, color: '#fff', fontSize: 13,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        opacity: uploading ? 0.6 : 1,
      }}>
        {uploading ? '⏳ 업로드 중...' : `☁️ ${label}`}
        <input type="file" style={{ display: 'none' }} onChange={handleUpload} disabled={uploading} accept={accept} />
      </label>
    </div>
  );
}
