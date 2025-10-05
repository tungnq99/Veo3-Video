
import React from 'react';
import { Mode } from '../types';

interface ExamplesProps {
  mode: Mode;
  setPrompt: (prompt: string) => void;
}

const TEXT_EXAMPLES = [
  "Một chiếc drone bay qua thành phố Tokyo về đêm, đèn neon rực rỡ, phong cách cinematic",
  "Sóng biển xanh trong đập vào bãi cát trắng, bình minh, góc quay chậm",
  "Một chú chó Golden Retriever chạy trên đồng cỏ xanh, ánh sáng mặt trời chiều, slow motion",
  "Giọt nước rơi vào mặt hồ tạo gợn sóng, góc quay macro, màu sắc tươi sáng"
];

const IMAGE_EXAMPLES = [
  "Camera zoom in chậm rãi, ánh sáng lung linh, cinematic",
  "Chuyển động mượt mà từ trái sang phải, slow motion",
  "Pan 360 độ xung quanh subject, dramatic lighting",
  "Zoom out để reveal toàn cảnh, golden hour lighting"
];

const Examples: React.FC<ExamplesProps> = ({ mode, setPrompt }) => {
  const examples = mode === Mode.TEXT ? TEXT_EXAMPLES : IMAGE_EXAMPLES;

  return (
    <div className="mt-12 bg-black/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <h3 className="text-xl font-semibold mb-4 text-indigo-200">
        Ví dụ Prompt ({mode === 'text' ? 'Text to Video' : 'Image to Video'}):
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {examples.map((example, idx) => (
          <button
            key={idx}
            onClick={() => setPrompt(example)}
            className="group relative text-left p-3 bg-black/20 hover:bg-white/10 rounded-lg transition-all border border-white/10 text-sm text-indigo-100"
          >
            {example}
            <span className="absolute -inset-px rounded-lg border border-transparent transition-all group-hover:border-pink-400"></span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Examples;
