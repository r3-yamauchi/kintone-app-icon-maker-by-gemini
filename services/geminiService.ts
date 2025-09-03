import { GoogleGenAI, Modality } from "@google/genai";
import { IMAGE_GENERATION_MODEL, IMAGE_GENERATION_STYLES, MAX_RETRIES } from '../constants';
import type { Status } from '../types';
import { StatusType } from '../types';

if (!process.env.API_KEY) {
  console.error("APIキーが設定されていません。環境変数 API_KEY を設定してください。");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateIcons = async (
  prompt: string,
  setStatus: (status: Status) => void
): Promise<string[]> => {
  let lastError: any = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      setStatus({ text: '4つのバリエーションを生成中...', type: StatusType.Info });

      const imageGenerationPromises = IMAGE_GENERATION_STYLES.map(style => {
        const finalImagePrompt = `App icon of "${prompt}". Simple, iconic, clean design, bold outlines, plain background. ${style}. No text.`;
        return ai.models.generateContent({
          model: IMAGE_GENERATION_MODEL,
          contents: {
            parts: [{ text: finalImagePrompt }],
          },
          config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
          },
        });
      });

      const responses = await Promise.all(imageGenerationPromises);

      const base64Images = responses.map(imageResponse => {
        const imagePart = imageResponse.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
        if (imagePart && imagePart.inlineData) {
          return imagePart.inlineData.data;
        } else {
          throw new Error('AIから画像が返されませんでした。');
        }
      });
      
      return base64Images;

    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt} failed:`, error);
      setStatus({ text: `エラーが発生しました。再試行中... (${attempt}/${MAX_RETRIES})`, type: StatusType.Error });
      if (attempt < MAX_RETRIES) {
        await delay(attempt * 1000); // Exponential backoff
      }
    }
  }

  throw new Error(`画像の生成に失敗しました: ${lastError?.message || lastError}`);
};