import express from "express";

import { uploadRouter } from "./routes/upload.routes.js";
import { updateRouter } from "./routes/update.routes.js";

const app = express();
app.get("/", (req, res) => {
      res.json({ status: "ok" });
});

app.use("/api/image", uploadRouter)
app.use("/api/updates", updateRouter)

app.listen(4000, () => console.log("Server running"));
