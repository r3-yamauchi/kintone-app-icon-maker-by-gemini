
import React, { useRef, useEffect } from 'react';
import type { GeneratedImage } from '../types';
import { ICON_DISPLAY_SIZE } from '../constants';

interface ResultDisplayProps {
  image: GeneratedImage | null;
  onDownload: () => void;
  isLoading: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ image, onDownload, isLoading }) => {
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (image && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [image]);

  if (!image && !isLoading) return null;

  return (
    <div
      ref={resultRef}
      className={`mt-8 transition-opacity duration-700 ease-in-out ${image ? 'opacity-100' : 'opacity-0'}`}
    >
      {image && (
        <div className="bg-white/90 p-4 rounded-xl shadow-2xl animate-[fadeInUp_0.5s_ease-out]">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              src={`data:image/png;base64,${image.base64}`}
              alt="Generated kintone icon"
              className="rounded-lg shadow-md"
              style={{ width: ICON_DISPLAY_SIZE, height: ICON_DISPLAY_SIZE }}
            />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-gray-800">Your Icon is Ready!</h3>
              <p className="text-gray-600 text-sm mt-1">
                You can now download your generated icon.
              </p>
              <button
                onClick={onDownload}
                className="mt-3 w-full sm:w-auto flex items-center justify-center gap-x-2 text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-lg px-5 py-2.5 font-semibold transform-gpu hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-green-500/40"
              >
                <i className="fa-solid fa-download"></i>
                ダウンロード
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
