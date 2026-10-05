export interface VideoGenerationInput {
    prompt: string;
    duration?: number;
    resolution?: "480p" | "720p" | "1080p";
    aspectRatio?: "16:9" | "4:3" | "1:1" | "9:16" | "3:4";
    generateAudio?: boolean;
    enableThinking?: boolean;
}

export interface VideoGenerationResult {
    success: boolean;
    videoUrl?: string;
}