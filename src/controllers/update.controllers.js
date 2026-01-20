import { jobResults, jobEvents, jobStore } from "../services/jobManager.js"

export function handleSSEUpdate(req, res) {
      const { parentJobId } = req.params

      console.log("SSE connected: ", parentJobId)

      res.setHeader("Content-Type", "text/event-stream")
      res.setHeader("Cache-Control", "no-cache")
      res.setHeader("Connection", "keep-alive")
      res.flushHeaders()

      const existing = jobResults.get(parentJobId)
      if (existing) {
            existing.forEach(event => {
                  res.write(`data: ${JSON.stringify(event)}\n\n`)
            });
      }

      const sendUpdate = (data) => {
            if (data.parentJobId === parentJobId) {
                  res.write(`data: ${JSON.stringify(data)}\n\n`)
            }
      }

      jobEvents.on("update", sendUpdate)

      req.on("close", () => {
            console.log("SSE closed: ", parentJobId)

            jobEvents.off("update", sendUpdate)

            cleanupJob(parentJobId)
      })
}

function cleanupJob(parentJobId) {
      jobResults.delete(parentJobId)

      for (const [jobId, job] of jobStore.entries()) {
            if (job.parentJobId === parentJobId) {
                  jobStore.delete(jobId)
            }
      }

      console.log("Cleaned up job:", parentJobId)
}