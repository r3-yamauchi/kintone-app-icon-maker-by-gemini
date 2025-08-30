
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight relative inline-block">
        <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
          kintone アプリアイコン Maker
        </span>
        <i className="fa-solid fa-magic-wand-sparkles text-yellow-300 absolute -top-2 -right-8 text-2xl md:text-3xl transform-gpu animate-[spin_4s_ease-in-out_infinite]"></i>
      </h1>
      <p className="mt-3 text-base sm:text-lg text-indigo-200">
        AIで楽しい手書き風アイコンを生成
      </p>
    </header>
  );
};

export default Header;
