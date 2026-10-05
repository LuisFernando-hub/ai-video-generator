import React, { useState } from 'react'
import type { AspectRatio, VideoResolution } from '../types/vide.type'
import { generateVideoApi } from "../api/video.api";

const ASPECT_RATIOS: AspectRatio[] = [
    "16:9",
    "4:3",
    "1:1",
    "9:16",
    "3:4"
];

const VIDEO_RESOLUTIONS: VideoResolution[] = [
    "480p",
    "720p",
    "1080p"
];

const VideoGenerator = () => {
 const [prompt, setPrompt] = useState<string>("");
 const [duration, setDuration] = useState<number>(5);
 const [resolution, setResolution] = useState<VideoResolution>("480p");
 const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
 const [generateAudio, setGenerateAudio] = useState<boolean>(true);
 const [enableThinking, setEnableThinking] = useState<boolean>(false);
 const [videoUrl, setVideoUrl] = useState<string | null>(null);
 const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<string | null>(null);

 const generateVideo = async() => {
    if (!prompt?.trim()) {
        setError("Please enter a prompt");
        return;
    }

    try {
        setLoading(true);
        setError(null);
        setVideoUrl(null);

        const response = await generateVideoApi({
            prompt: prompt.trim(),
            duration,
            aspectRatio,
            resolution,
            generateAudio,
            enableThinking,
        });

        if (!response.success || !response.data) {
            throw new Error("Something went wrong while generating this video");
        }

        setVideoUrl(response.data);

    } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        } else {
            setError("Something went wrong while creating the video");
        } 
    } finally {
        setLoading(false);
    }
 }

 const handleDownload = async () => {
    if (!videoUrl) {
        return;
    }

    try {
        const response = await fetch(videoUrl);

        if (!response.ok) {
            throw new Error("Failed to download the video");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");

        anchor.href = url;
        anchor.download = "generated_video.mp4";

        document.body.appendChild(anchor);

        anchor.click();
        anchor.remove();
        
    } catch(error) {
        window.open(videoUrl, "_blank");
    }
 }

  return (
    <div>
      <div className="generator-container">
        <div className="generator-header">
          <div>
            <p className="eyebrow">AI VIDEO GENERATOR</p>
            <h1>Create Videos From Text</h1>
            <p className="subtitle">
              Describe your idea and generate your video using AI
            </p>
          </div>
        </div>

        <div className="generator-grid">
          <section className="panel">
            <div className="field">
              <label htmlFor="prompt">Prompt</label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="A cinematic shot of a sunset by new york city"
                maxLength={2000}
                rows={8}
              />

              <div className="character-count">{prompt.length}/2000</div>
            </div>

            <div className="settings-grid">
              <div className="field">
                <label htmlFor="duration">Duration</label>
                <input
                  value={duration}
                  className="duration-input"
                  onChange={(event) => setDuration(Number(event.target.value))}
                />
              </div>

              <div className="field">
                <label htmlFor="resolution">Resolution</label>
                <select
                  id="resolution"
                  value={resolution}
                  onChange={(event) =>
                    setResolution(event.target.value as VideoResolution)
                  }
                >
                  {VIDEO_RESOLUTIONS.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="aspectRatio">Aspect Ratio</label>
                <select
                  id="aspectRatio"
                  value={aspectRatio}
                  onChange={(event) =>
                    setAspectRatio(event.target.value as AspectRatio)
                  }
                >
                  {ASPECT_RATIOS.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="toggle-group">
              <label className="toggle-row">
                <div>
                  <span>Generate Audio</span>
                  <small>Generate synchronized audio with video</small>
                </div>

                <input
                  type="checkbox"
                  checked={generateAudio}
                  onChange={(event) => setGenerateAudio(event.target.checked)}
                ></input>
              </label>

              <label className="toggle-row">
                <div>
                  <span>Enable thinking</span>
                  <small>Enable model spend more time in reasoning</small>
                </div>

                <input
                  type="checkbox"
                  checked={enableThinking}
                  onChange={(event) => setEnableThinking(event.target.checked)}
                ></input>
              </label>
            </div>

            <button
              className="generate-button"
              onClick={generateVideo}
              disabled={loading || !prompt.trim()}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Generating...
                </>
              ) : (
                "Generate Video"
              )}
            </button>
          </section>

          <section className="preview-panel">
            {!videoUrl && !loading && (
              <div className="empty-preview">
                <div className="empty-icon">✦</div>
                <h2>Your video will appear here</h2>
                <p>Enter a prompt and click generate to create your video</p>
              </div>
            )}

            {loading && (
              <div className="generating">
                <div className="loader"></div>
                <h2>Creating your video</h2>
                <p>This can take a while. Please keep this page open</p>
              </div>
            )}

            {videoUrl && !loading && (
              <div className="video-result">
                <video
                  src={videoUrl}
                  controls
                  playsInline
                  className="video-player"
                  crossOrigin="anonymous"
                  onLoadedMetadata={() => {
                    console.log("Video metadata loaded");
                  }}
                  onError={(event) => {
                    console.error("Video error:", event.currentTarget.error);
                  }}
                />
                <div className="video-actions">
                  <button className="download-button" onClick={handleDownload}>
                    Download video
                  </button>
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="open-button"
                  >
                    Open Video
                  </a>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default VideoGenerator