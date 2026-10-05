import { config, higgsfield } from "@higgsfield/client/v2";
import { VideoGenerationInput } from "../types/video.type.js";

config({
    credentials: process.env.HF_CREDENTIALS
});

const MODEL_ID = "kling-video/v3.0/std/text-to-video";

export const generateVideo = async(input: VideoGenerationInput) => {
    const result = await higgsfield.subscribe(MODEL_ID, {
        input: {
            prompt: input.prompt,
            duration: input.duration ?? 5,
            resolution: input.resolution ?? "480p",
            aspect_ratio: input.aspectRatio ?? "16:9",
            generate_audio: input.generateAudio ?? false,
            enable_thinking: input.enableThinking ?? false
        },
        withPolling: true
    });

    if (!result.video) {
        throw new Error("Failed to generate video");
    }

    return result.video;
};