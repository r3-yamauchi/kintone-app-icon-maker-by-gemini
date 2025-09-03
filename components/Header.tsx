import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight relative inline-block">
        kintone アプリアイコン Maker
        <i className="fa-solid fa-magic-wand-sparkles text-yellow-300 absolute -top-2 -right-8 text-2xl md:text-3xl transform-gpu animate-[spin_4s_ease-in-out_infinite]"></i>
      </h1>
      <p className="mt-3 text-base sm:text-lg text-indigo-200">
        AIで4種類のデザインバリエーションを生成
      </p>
    </header>
  );
};

export default Header;