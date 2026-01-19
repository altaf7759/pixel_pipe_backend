import express from "express";

const app = express();
app.get("/", (req, res) => {
      res.json({ status: "ok" });
});

app.listen(4000, () => console.log("Server running"));
