import express from "express";

import { uploadRouter } from "./routes/upload.routes.js";

const app = express();
app.get("/", (req, res) => {
      res.json({ status: "ok" });
});

app.use("/api/image", uploadRouter)

app.listen(4000, () => console.log("Server running"));
