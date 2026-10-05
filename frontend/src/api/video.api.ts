import axios from "axios";
import type { VideoGenerationInput, VideoGenerationResponse } from "../types/vide.type";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10 * 60 * 1000,
});

export const generateVideoApi = async(input: VideoGenerationInput): Promise<VideoGenerationResponse> => {
    const response = await api.post("/videos/generate", input);

    return response.data;
}