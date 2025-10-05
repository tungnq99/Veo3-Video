import { useState, useCallback } from 'react';
import { generateVideo as generateVideoApi } from '../services/geminiService';
import { Mode } from '../types';

const POLLING_MESSAGES = [
  'Warming up the AI model...',
  'Analyzing the prompt...',
  'Composing initial scenes...',
  'Rendering video frames...',
  'Enhancing video quality...',
  'Almost there, finalizing the video...',
];

export const useVideoGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [quality, setQuality] = useState('high');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('Kích thước ảnh quá lớn. Vui lòng chọn ảnh dưới 10MB.');
        return;
      }
      
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview('');
  };

  const generateVideo = useCallback(async (mode: Mode) => {
    if (mode === Mode.TEXT && !prompt.trim()) {
      setError('Vui lòng nhập mô tả video');
      return;
    }
    if (mode === Mode.IMAGE && !uploadedImage) {
      setError('Vui lòng upload ảnh');
      return;
    }

    // Revoke previous object URL if it exists to prevent memory leaks
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setLoading(true);
    setError('');
    setVideoUrl('');
    setLoadingMessage('Initializing video generation...');

    let messageInterval: number | undefined;

    try {
      let messageIndex = 0;
      messageInterval = window.setInterval(() => {
        setLoadingMessage(POLLING_MESSAGES[messageIndex % POLLING_MESSAGES.length]);
        messageIndex++;
      }, 8000);

      const generatedUrl = await generateVideoApi(prompt, mode === Mode.IMAGE ? uploadedImage : undefined, aspectRatio, quality);
      
      setVideoUrl(generatedUrl);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      console.error('Error generating video:', err);
    } finally {
      if (messageInterval) {
        clearInterval(messageInterval);
      }
      setLoading(false);
      setLoadingMessage('');
    }
  }, [prompt, uploadedImage, videoUrl, aspectRatio, quality]);

  return {
    prompt,
    setPrompt,
    loading,
    error,
    videoUrl,
    uploadedImage,
    imagePreview,
    loadingMessage,
    aspectRatio,
    setAspectRatio,
    quality,
    setQuality,
    handleImageUpload,
    removeImage,
    generateVideo,
  };
};