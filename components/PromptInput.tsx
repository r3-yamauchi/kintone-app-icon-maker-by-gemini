
import React from 'react';
import { Spinner } from './Spinner';

interface PromptInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="mt-8">
      <div className="relative">
        <i className="fa-solid fa-magic text-indigo-300 absolute top-1/2 left-4 -translate-y-1/2"></i>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={200}
          placeholder="Describe your icon..."
          disabled={isLoading}
          className="w-full bg-white/20 text-white placeholder-indigo-200/80 rounded-lg py-3 pr-4 pl-10 focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-300 resize-none h-24 text-base sm:text-lg"
          style={{fontSize: '16px'}} // for iOS zoom prevention
        />
        <div className="absolute bottom-2 right-2 text-xs text-indigo-200/70">
          {prompt.length} / 200
        </div>
      </div>
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="mt-4 w-full flex items-center justify-center gap-x-3 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg px-6 py-3 transform-gpu hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
      >
        {isLoading ? (
          <>
            <Spinner />
            生成中...
          </>
        ) : (
          <>
            <i className="fa-solid fa-sparkles"></i>
            Generate Magic
          </>
        )}
      </button>
    </div>
  );
};

export default PromptInput;
