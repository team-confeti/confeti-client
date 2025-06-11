import { useEffect, useState } from 'react';

interface UseImagePreviewReturn {
  file: File | null;
  preview: string | null;
  setFile: (file: File | null) => void;
  handleFileChange: (file: File | null) => void;
}

export const useImagePreview = (
  initialFile?: File | null,
): UseImagePreviewReturn => {
  const [file, setFile] = useState<File | null>(initialFile ?? null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
  };

  return {
    file,
    preview,
    setFile,
    handleFileChange,
  };
};
