
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Source, Message } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const summarizeSource = async (sourceContent: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Summarize the following source material concisely for a notebook overview:\n\n${sourceContent}`,
  });
  return response.text || 'Summary unavailable.';
};

export const chatWithSources = async (
  query: string, 
  sources: Source[], 
  history: Message[]
): Promise<string> => {
  const ai = getAI();
  const context = sources.map(s => `[Source: ${s.title}]\n${s.content}`).join('\n\n');
  
  const systemInstruction = `
    You are an intelligent notebook assistant. 
    Use the provided sources to answer the user's questions. 
    Always cite your sources using bracketed numbers like [1], [2] corresponding to the source index or title. 
    If the answer isn't in the sources, say so, but offer general knowledge if appropriate while clearly distinguishing it.
    Current Sources:
    ${context}
  `;

  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
    },
  });

  // Re-map history to Gemini format if needed, for now simple send
  const response = await chat.sendMessage({ message: query });
  return response.text || 'I encountered an error processing that.';
};

export const generateGuideContent = async (
  type: string, 
  sources: Source[]
): Promise<any> => {
  const ai = getAI();
  const context = sources.map(s => s.content).join('\n\n');
  
  const prompt = `Generate a structured ${type} based on these sources. 
  Return the output in a clean JSON format that can be rendered visually. 
  Sources:\n${context}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return { error: 'Failed to parse guide content', raw: response.text };
  }
};

export const generateAudioOverview = async (text: string): Promise<Uint8Array> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Provide a professional summary of this content: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("Audio generation failed");
  
  const binaryString = atob(base64Audio);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// Helper for PCM Decoding as per guidelines
export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
