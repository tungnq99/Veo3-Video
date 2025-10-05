
import React from 'react';
import { Film } from './icons';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Film className="w-12 h-12 text-indigo-300" />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-300 to-sky-300 bg-clip-text text-transparent">
          VEO Video Generator
        </h1>
      </div>
      <p className="text-indigo-200 text-lg">
        Tạo video AI từ văn bản hoặc ảnh với công nghệ VEO
      </p>
    </header>
  );
};

export default Header;