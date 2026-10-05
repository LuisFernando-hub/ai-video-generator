import express from "express";
import { videoController } from "../controllers/video.controller.js";

const router = express.Router();

router.route("/generate-video").post(videoController);

export default router;