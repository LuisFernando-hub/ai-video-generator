import express, { Request, Response, NextFunction} from "express";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Healthy"
    })
})

import videoRoute from "./routes/video.route.js";

app.use("/api/v1/videos", videoRoute);