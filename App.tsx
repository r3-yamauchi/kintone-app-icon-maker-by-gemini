
import React, { useState, useCallback, useEffect } from 'react';
import type { Status, GeneratedImage } from './types';
import { StatusType } from './types';
import { generateIcon } from './services/geminiService';
import { resizeImageAndGetBlob, downloadBlob } from './services/imageUtils';
import { ICON_DOWNLOAD_SIZE } from './constants';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import StatusDisplay from './components/StatusDisplay';
import ResultDisplay from './components/ResultDisplay';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>({
    text: 'アイコンの説明を入力して、魔法を始めましょう！',
    type: StatusType.Initial,
  });
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initial fade-in animation for the whole container
    setIsReady(true);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setStatus({ text: 'アイコンの説明を入力してください', type: StatusType.Error });
      return;
    }
    if (!process.env.API_KEY || process.env.API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
      setStatus({ text: 'APIキーが設定されていません。環境変数 API_KEY を設定してください。', type: StatusType.Error });
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);
    setStatus({ text: '準備中...', type: StatusType.Info });

    try {
      const base64Image = await generateIcon(prompt, setStatus);
      setGeneratedImage({ base64: base64Image });
      setStatus({ text: 'アイコンの生成が完了しました！', type: StatusType.Success });
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setStatus({ text: `エラー: ${errorMessage}`, type: StatusType.Error });
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  const handleDownload = useCallback(async () => {
    if (!generatedImage) {
      setStatus({ text: 'ダウンロードする画像がありません', type: StatusType.Error });
      return;
    }

    setStatus({ text: 'ダウンロード用に画像を準備中...', type: StatusType.Info });
    try {
      const blob = await resizeImageAndGetBlob(generatedImage.base64, ICON_DOWNLOAD_SIZE);
      const timestamp = new Date().getTime();
      downloadBlob(blob, `kintone-icon-${timestamp}.png`);
      setStatus({ text: 'ダウンロードを開始しました。', type: StatusType.Success });
    } catch (error) {
      console.error(error);
      setStatus({ text: 'ダウンロードに失敗しました。', type: StatusType.Error });
    }
  }, [generatedImage]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <main className={`w-full max-w-xl md:max-w-2xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 text-white transition-all duration-700 ease-out ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Header />
        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          onSubmit={handleGenerate}
          isLoading={isLoading}
        />
        <StatusDisplay status={status} />
        <ResultDisplay
          image={generatedImage}
          onDownload={handleDownload}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
