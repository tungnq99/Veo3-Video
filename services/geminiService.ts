import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    // In a real app, you'd want to handle this more gracefully.
    // For this environment, we assume the key is present.
    console.warn("API_KEY environment variable not set. API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });
};

export const generateVideo = async (prompt: string, imageFile?: File, aspectRatio: string = '9:16', quality: string = 'high'): Promise<string> => {
  // TODO: Update to use different models once a future version (e.g., VEO-3) is available.
  // For now, use veo-2.0 for all quality settings.
  const modelName = 'veo-2.0-generate-001';
  console.log(`Generating video with quality: ${quality}, model: ${modelName}`);

  // The 'includeAudio' parameter is forward-compatible for future models like VEO-3.
  // The current VEO-2 model does not generate audio and will ignore this parameter.
  const includeAudio = quality === 'high';

  const config: {
    numberOfVideos: number;
    aspectRatio: string;
    includeAudio?: boolean;
  } = {
    numberOfVideos: 1,
    aspectRatio: aspectRatio,
  };

  if (includeAudio) {
    config.includeAudio = true;
  }
  
  // The type for 'operation' will be inferred from the return value of 'ai.models.generateVideos'.
  let operation;

  if (imageFile) {
    const base64Image = await fileToBase64(imageFile);
    operation = await ai.models.generateVideos({
      model: modelName,
      prompt: prompt || 'Animate this image.', // Prompt is required
      image: {
        imageBytes: base64Image,
        mimeType: imageFile.type,
      },
      config,
    });
  } else {
    operation = await ai.models.generateVideos({
      model: modelName,
      prompt: prompt,
      config,
    });
  }

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

  if (!downloadLink) {
    throw new Error('Could not retrieve video URL from the generation result.');
  }

  const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  if (!videoResponse.ok) {
    const errorBody = await videoResponse.text();
    throw new Error(`Failed to download the generated video. Status: ${videoResponse.status}. Body: ${errorBody}`);
  }

  const videoBlob = await videoResponse.blob();
  return URL.createObjectURL(videoBlob);
};
