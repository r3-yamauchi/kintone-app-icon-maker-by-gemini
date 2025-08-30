export const PROMPT_EXPANSION_MODEL = 'gemini-2.5-flash';
export const IMAGE_GENERATION_MODEL = 'gemini-2.5-flash-image-preview';

export const PROMPT_EXPANSION_SYSTEM_INSTRUCTION = `あなたは想像力豊かなアシスタントです。ユーザーの入力から主題、特徴、色、アクションを抽出し、一つの生き生きとした情景描写にしてください。

入力例: "a shiba inu eating ice-cream"
出力例: "A cheerful shiba inu dog with golden fur sitting upright, happily licking a colorful ice cream cone with strawberry and vanilla scoops, tongue out, eyes sparkling with joy, summer day background"

以下の点を必ず含めてください：
- 主要な被写体の詳細な描写
- 色彩の指定
- 表情や動作の描写
- 雰囲気や背景の設定

簡潔で視覚的に豊かな英語の描写文を1文で返してください。`;

export const IMAGE_GENERATION_PROMPT_SUFFIX = 'simple, vibrant, hand-drawn doodle style.';

export const MAX_RETRIES = 3;

export const ICON_DISPLAY_SIZE = 112;
export const ICON_DOWNLOAD_SIZE = 56;
