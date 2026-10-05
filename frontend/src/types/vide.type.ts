export type VideoResolution = "480p" | "720p" | "1080p";
export type AspectRatio = "16:9" | "4:3" | "1:1" | "9:16" | "3:4";

export interface VideoGenerationInput {
    prompt: string;
    duration?: number;
    resolution?: VideoResolution;
    aspectRatio?: AspectRatio;
    generateAudio?: boolean;
    enableThinking?: boolean;
}

export interface VideoGenerationResponse {
    success: boolean;
    message: string;
    data: string;
}