import { parentPort, workerData } from "worker_threads";
import sharp from "sharp";
import { IMAGE_PRESETS } from "../utils/jobTypes.js";

async function processImage() {
      try {
            const preset = IMAGE_PRESETS[workerData.type];
            let image = sharp(workerData.buffer);

            // Resize (platform presets)
            if (preset?.resize) {
                  image = image.resize({
                        width: preset.resize.width,
                        height: preset.resize.height,
                        fit: "cover",
                        withoutEnlargement: true
                  });
            }

            // Effects
            if (preset?.grayscale) {
                  image = image.grayscale();
            }

            if (preset?.blur) {
                  image = image.blur(preset.blur);
            }

            const output = await image
                  .jpeg({ quality: 85 })
                  .toBuffer();

            parentPort.postMessage({
                  status: "completed",
                  image: `data:image/jpeg;base64,${output.toString("base64")}`
            });
      } catch (error) {
            parentPort.postMessage({
                  status: "failed",
                  error: error.message
            });
      }
}

processImage();
