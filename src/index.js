import express from "express";

import { uploadRouter } from "./routes/upload.routes.js";
import { updateRouter } from "./routes/update.routes.js";
import { retryRouter } from "./routes/retry.routes.js";

const app = express();
app.get("/", (req, res) => {
      res.json({ status: "ok" });
});

app.use(express.json())

app.use("/api/image", uploadRouter)
app.use("/api/updates", updateRouter)
app.use("/api/image/retry", retryRouter)

app.listen(4000, () => console.log("Server running"));
