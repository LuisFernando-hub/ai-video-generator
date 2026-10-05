import { z } from 'zod';

export const videoInputSchema = z.object({
    prompt: z.string()
        .min(1, "Prompt cannot be empty")
        .max(2000, "Prompt cannot contain more than 2000 characters")
        .trim(),
    
    duration: z.int().optional(),
    aspectRatio: z.enum([
        "16:9",
        "4:3",
        "1:1",
        "3:4",
        "9:16"
    ]).optional(),
    resolution: z.enum([
        "480p",
        "720p",
        "1080p"
    ]).optional(),
    generateAudio: z.boolean().default(true).optional(),
    enableThinking: z.boolean().default(false).optional(),
})
.strict();

export type VideoInput = z.infer<typeof videoInputSchema>;