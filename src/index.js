import express from "express";
import cluster from "cluster"
import os from "os"
import cors from "cors"

import { uploadRouter } from "./routes/upload.routes.js";
import { updateRouter } from "./routes/update.routes.js";
import { retryRouter } from "./routes/retry.routes.js";

const numCPUs = os.cpus().length

if (cluster.isPrimary) {
      console.log(`Primary ${process.pid} is running`);

      for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
      }

      cluster.on("exit", (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died. Restarting...`)
            cluster.fork()
      })
} else {
      const app = express();

      const PORT = process.env.PORT || 4000

      app.use(cors({
            origin: ["http://localhost:5173", "https://pixel-pipe-frontend.vercel.app"],
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"]
      }));

      app.get("/", (req, res) => {
            res.json({ status: "ok" });
      });

      app.use(express.json())

      app.use("/api/image", uploadRouter)
      app.use("/api/updates", updateRouter)
      app.use("/api/image/retry", retryRouter)

      app.listen(PORT, () => console.log(`Worker ${process.pid} started on port ${PORT}`));
}
