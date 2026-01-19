import { parentPort, workerData } from "worker_threads"
import sharp from "sharp"


async function processImage() {
      try {
            let output

            if (workerData.type === "resize") {
                  output = await sharp(workerData.buffer).resize(300, 300).toBuffer()
            }

            if (workerData.type === "bw") {
                  output = await sharp(workerData.buffer).grayscale().toBuffer()
            }

            if (workerData.type === "blur") {
                  output = await sharp(workerData.buffer).blur(5).toBuffer()
            }

            parentPort.postMessage({
                  status: "completed",
                  image: `data:image/png;base64,${output.toString("base64")}`
            })
      } catch (error) {
            parentPort.postMessage({ status: "failed" })
      }
}

processImage()