import { Worker } from "worker_threads"
import EventEmitter from "events"
import crypto from "crypto"
import path from "path"
import { fileURLToPath } from "url"

import { jobTypes } from "../utils/jobTypes.js"

export const jobEvents = new EventEmitter()

export const jobResults = new Map()

export const jobStore = new Map()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function uuid() {
      return crypto.randomUUID()
}

export function createJobs(buffer) {
      if (!Buffer.isBuffer(buffer)) {
            throw new Error("createJobs expects a Buffer")
      }

      const parentJobId = uuid()

      jobResults.set(parentJobId, [])

      jobTypes.forEach((type) => {
            const job = {
                  id: uuid(),
                  parentJobId,
                  type,
                  buffer
            }

            jobStore.set(job.id, job)

            runJob(job)
      })

      return parentJobId
}

export function runJob(job) {
      const worker = new Worker(
            path.join(__dirname, "../workers/imageWorker.js"),
            {
                  workerData: {
                        ...job,
                        buffer: Buffer.from(job.buffer)
                  }
            }
      )

      worker.on("message", (data) => {
            const payload = {
                  jobId: job.id,
                  parentJobId: job.parentJobId,
                  status: data.status ?? "completed",
                  image: data.image ?? null
            }

            jobResults.get(job.parentJobId)?.push(payload)
            jobEvents.emit("update", payload)
      })

      worker.on("error", (err) => {
            const payload = {
                  jobId: job.id,
                  parentJobId: job.parentJobId,
                  status: "failed",
                  error: err.message
            }

            jobResults.get(job.parentJobId)?.push(payload)
            jobEvents.emit("update", payload)
      })

      worker.on("exit", (code) => {
            if (code !== 0) {
                  const payload = {
                        jobId: job.id,
                        parentJobId: job.parentJobId,
                        status: "failed",
                        error: `Worker exited with code ${code}`
                  }

                  jobResults.get(job.parentJobId)?.push(payload)
                  jobEvents.emit("update", payload)
            }
      })
}