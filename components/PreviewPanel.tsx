
import React from 'react';
import { Film, Loader2, Download } from './icons';
import { useVideoGenerator } from '../hooks/useVideoGenerator';

type PreviewPanelProps = Pick<ReturnType<typeof useVideoGenerator>, 'loading' | 'videoUrl' | 'loadingMessage'>;

const PreviewPanel: React.FC<PreviewPanelProps> = ({ loading, videoUrl, loadingMessage }) => {
  const downloadVideo = () => {
    if (videoUrl) {
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = `veo-video-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Film className="w-6 h-6 text-sky-300" />
        Xem trước
      </h2>

      <div className="aspect-video bg-black/30 rounded-lg overflow-hidden mb-4 flex items-center justify-center ">
        {loading ? (
          <div className="text-center p-4">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-pink-300" />
            <p className="text-indigo-200 font-semibold text-lg">Đang tạo video...</p>
            <p className="text-sm text-indigo-300 mt-2 animate-pulse">{loadingMessage}</p>
          </div>
        ) : videoUrl ? (
          <video
            key={videoUrl}
            src={videoUrl}
            controls
            className="w-full h-full object-contain animate-fade-in"
            autoPlay
            loop
            muted
          />
        ) : (
          <div className="text-center text-indigo-300 ">
            <Film className="w-16 h-16 mx-auto mb-4 opacity-40 placeholder-pulse" />
            <p>Video sẽ hiển thị tại đây</p>
          </div>
        )}
      </div>

      {videoUrl && !loading && (
        <div className="animate-fade-in">
            <button
            onClick={downloadVideo}
            className="w-full py-3 bg-sky-500 hover:bg-sky-600 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2"
            >
            <Download className="w-5 h-5" />
            Tải xuống video
            </button>
        </div>
      )}
    </div>
  );
};

export default PreviewPanel;
