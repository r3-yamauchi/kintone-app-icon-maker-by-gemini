import React, { useRef, useEffect } from 'react';
import type { GeneratedImage } from '../types';
import { ICON_DISPLAY_SIZE } from '../constants';

interface ResultDisplayProps {
  images: GeneratedImage[] | null;
  onDownload: (index: number) => void;
  isLoading: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ images, onDownload, isLoading }) => {
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (images && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [images]);

  if (!images && !isLoading) return null;

  const SkeletonLoader: React.FC = () => (
    <div className="w-full bg-white/20 p-2 sm:p-3 rounded-xl shadow-lg animate-pulse">
      <div
        className="w-full bg-white/30 rounded-lg"
        style={{ height: ICON_DISPLAY_SIZE }}
      ></div>
      <div className="mt-2 h-8 w-3/4 bg-white/30 rounded-md mx-auto"></div>
    </div>
  );

  return (
    <div ref={resultRef} className="mt-8">
      {isLoading && !images ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonLoader key={i} />)}
        </div>
      ) : images ? (
        <div className="bg-white/90 p-4 rounded-xl shadow-2xl animate-[fadeInUp_0.5s_ease-out]">
           <h3 className="text-xl font-bold text-gray-800 text-center mb-4">アイコンが完成しました！</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <img
                  src={`data:image/png;base64,${image.base64}`}
                  alt={`Generated kintone icon ${index + 1}`}
                  className="rounded-lg shadow-md mb-2"
                  style={{ width: ICON_DISPLAY_SIZE, height: ICON_DISPLAY_SIZE }}
                />
                <button
                  onClick={() => onDownload(index)}
                  className="w-full flex items-center justify-center gap-x-2 text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-lg px-3 py-2 text-sm font-semibold transform-gpu hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-green-500/40"
                >
                  <i className="fa-solid fa-download"></i>
                  <span>ダウンロード</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ResultDisplay;