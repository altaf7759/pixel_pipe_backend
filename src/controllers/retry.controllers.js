import crypto from "crypto"

import { jobStore, runJob } from "../services/jobManager.js";


export function retryImageProcessing(req, res) {
      const { jobId } = req.body

      if (!jobId) {
            return res.status(400).json({ message: "jobId required" });
      }

      const originalJob = jobStore.get(jobId)

      if (!originalJob) {
            return res.status(404).json({ message: "Job not found" });
      }

      const retryJob = {
            ...originalJob,
            id: crypto.randomUUID()
      }

      jobStore.set(retryJob.id, retryJob)
      runJob(retryJob)

      res.json({
            message: "Retry started",
            jobId: retryJob.id
      });
}