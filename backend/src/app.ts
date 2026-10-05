import express, { Request, Response, NextFunction} from "express";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Healthy"
    })
})

import videoRoute from "./routes/video.route.js";

app.use("/api/v1/videos", videoRoute);