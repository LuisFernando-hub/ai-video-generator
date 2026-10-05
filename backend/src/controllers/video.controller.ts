import { NextFunction, Request, Response } from "express";
import { videoInputSchema } from "../validators/video.validator.js";
import { z } from "zod";
import { generateVideo } from "../services/higgsfield.video.service.js";

export const videoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedData = videoInputSchema.safeParse(req.body);

        if(!parsedData.success) {
            res.status(400).json({
                success: false,
                message: "Invalid request data",
                error: z.treeifyError(parsedData.error).properties,
            });
            return;
        }

        const result = await generateVideo(parsedData.data);

        res.status(201).json({
            success: true,
            message: "Video generated successfully",
            data: result,
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            error,
        })
    }
};