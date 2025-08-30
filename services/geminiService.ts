import { GoogleGenAI, Modality } from "@google/genai";
import { PROMPT_EXPANSION_MODEL, IMAGE_GENERATION_MODEL, PROMPT_EXPANSION_SYSTEM_INSTRUCTION, IMAGE_GENERATION_PROMPT_SUFFIX, MAX_RETRIES } from '../constants';
import type { Status } from '../types';
import { StatusType } from '../types';

if (!process.env.API_KEY) {
  console.error("APIキーが設定されていません。環境変数 API_KEY を設定してください。");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateIcon = async (
  prompt: string,
  setStatus: (status: Status) => void
): Promise<string> => {
  let lastError: any = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      // Step 1: Prompt Expansion
      setStatus({ text: 'プロンプトを拡張中...', type: StatusType.Info });
      
      const expansionResponse = await ai.models.generateContent({
        model: PROMPT_EXPANSION_MODEL,
        contents: prompt,
        config: {
          systemInstruction: PROMPT_EXPANSION_SYSTEM_INSTRUCTION,
        },
      });
      const expandedPrompt = expansionResponse.text;
      
      const finalImagePrompt = `${expandedPrompt}, ${IMAGE_GENERATION_PROMPT_SUFFIX}`;
      
      // Step 2: Image Generation
      setStatus({ text: 'AIが画像を生成中...', type: StatusType.Info });

      const imageResponse = await ai.models.generateContent({
        model: IMAGE_GENERATION_MODEL,
        contents: {
          parts: [{ text: finalImagePrompt }],
        },
        config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
      });

      const imagePart = imageResponse.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

      if (imagePart && imagePart.inlineData) {
        return imagePart.inlineData.data;
      } else {
        throw new Error('AIから画像が返されませんでした。');
      }

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
