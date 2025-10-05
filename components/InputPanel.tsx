import React from 'react';
import { Mode } from '../types';
import { Sparkles, Image, Upload, X, Camera, Loader2, AlertCircle, RectangleHorizontal, RectangleVertical, Square } from './icons';
import { useVideoGenerator } from '../hooks/useVideoGenerator';

type InputPanelProps = ReturnType<typeof useVideoGenerator> & {
  mode: Mode;
};

const ImageUpload: React.FC<InputPanelProps> = ({ handleImageUpload, imagePreview, removeImage }) => (
  <div>
    <label className="block text-sm font-medium mb-2 text-indigo-200">
      Upload ảnh
    </label>
    {!imagePreview ? (
      <label className="block w-full cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <div className="aspect-square w-full border-2 border-dashed border-white/20 rounded-lg p-4 flex flex-col items-center justify-center text-center hover:border-pink-400 hover:bg-black/20 transition-all">
          <Upload className="w-8 h-8 mx-auto mb-2 text-indigo-300" />
          <p className="text-xs text-indigo-200 leading-tight">Click hoặc kéo & thả</p>
        </div>
      </label>
    ) : (
      <div className="relative rounded-lg overflow-hidden aspect-square w-full">
        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg bg-black/20" />
        <button
          onClick={removeImage}
          aria-label="Remove image"
          className="absolute top-1.5 right-1.5 p-1.5 bg-red-500/80 hover:bg-red-600 rounded-full transition-all backdrop-blur-sm"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    )}
  </div>
);

const InputPanel: React.FC<InputPanelProps> = (props) => {
  const { mode, prompt, setPrompt, loading, error, generateVideo, aspectRatio, setAspectRatio, quality, setQuality } = props;

  const aspectRatios = [
    { value: '16:9', icon: RectangleHorizontal },
    { value: '9:16', icon: RectangleVertical },
    { value: '1:1', icon: Square },
  ];

  return (
    <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 transition-all hover:shadow-pink-500/20">
      <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
        {mode === Mode.TEXT ? <Sparkles className="w-6 h-6 text-yellow-300" /> : <Image className="w-6 h-6 text-sky-300" />}
        {mode === Mode.TEXT ? 'Tạo từ văn bản' : 'Tạo từ ảnh'}
      </h2>

      {mode === Mode.IMAGE ? (
        <div className="flex gap-6 mb-6 items-stretch">
          <div className="w-32 flex-shrink-0">
            <ImageUpload {...props} />
          </div>
          <div className="flex-grow flex flex-col">
            <label htmlFor="prompt-input" className="block text-sm font-medium mb-2 text-indigo-200">
              Mô tả chuyển động (tùy chọn)
            </label>
            <textarea
              id="prompt-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="VD: Camera zoom in chậm, ánh sáng lung linh, slow motion..."
              className="w-full flex-grow px-4 py-3 bg-black/20 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-white placeholder-white/40 resize-none"
            />
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <label htmlFor="prompt-input" className="block text-sm font-medium mb-2 text-indigo-200">
            Mô tả video của bạn
          </label>
          <textarea
            id="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="VD: Một chiếc drone bay qua thành phố Tokyo về đêm, đèn neon rực rỡ..."
            rows={6}
            className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-white placeholder-white/40 resize-none"
          />
        </div>
      )}


      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-indigo-200">
            Tỷ lệ khung hình
          </label>
          <div className="flex justify-between gap-2 bg-black/20 p-1 rounded-xl">
            {aspectRatios.map(({ value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setAspectRatio(value)}
                title={`Aspect Ratio ${value}`}
                className={`flex-1 py-2 px-2 rounded-lg transition-all text-sm flex items-center justify-center ${
                  aspectRatio === value
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                    : 'bg-transparent hover:bg-white/10 text-indigo-200'
                }`}
              >
                <Icon className="w-6 h-6" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-indigo-200">
            Chất lượng &amp; Model
          </label>
          <div className="relative flex items-center bg-black/20 p-1 rounded-xl">
             <span
                className="absolute top-1 bottom-1 h-auto w-1/2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg shadow-lg transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(${quality === 'fast' ? '0%' : '100%'})` }}
            />
             <button
                onClick={() => setQuality('fast')}
                className={`relative z-10 flex-1 py-2 px-2 rounded-lg transition-all text-sm ${
                  quality === 'fast' ? 'text-white' : 'text-indigo-200'
                }`}
              >
                Nhanh
              </button>
              <button
                onClick={() => setQuality('high')}
                className={`relative z-10 flex-1 py-2 px-2 rounded-lg transition-all text-sm ${
                  quality === 'high' ? 'text-white' : 'text-indigo-200'
                }`}
              >
                Cao
              </button>
          </div>
           <p className="text-xs text-indigo-300/80 mt-2">
            Chất lượng cao sẽ sẵn sàng cho âm thanh trên VEO-3.
          </p>
        </div>
      </div>

      <button
        onClick={() => generateVideo(mode)}
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Đang tạo video...
          </>
        ) : (
          <>
            <Camera className="w-5 h-5" />
            Tạo Video
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}
    </div>
  );
};

export default InputPanel;