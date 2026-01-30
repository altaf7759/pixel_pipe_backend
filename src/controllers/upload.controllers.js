import { createJobs } from "../services/jobManager.js";
import { jobTypes } from "../utils/jobTypes.js";

export const handleImageUpload = (req, res) => {
      try {
            if (!req.file) {
                  return res.status(400).json({ error: "No image uploaded" });
            }

            const parentJobId = createJobs(req.file.buffer)
            res.status(200).json({ parentJobId, jobCount: jobTypes.length })
      } catch (error) {
            console.log(error)
            res.status(500).json({
                  success: false,
                  message: "Internal server error"
            })
      }
}