import express from "express";
import multer from "multer";

import { upload } from "../services/multer.js";
import { handleImageUpload } from "../controllers/upload.controllers.js";

export const uploadRouter = express.Router();

uploadRouter.post("/upload", (req, res) => {
      upload.single("image")(req, res, (err) => {
            if (err) {
                  if (err instanceof multer.MulterError) {
                        switch (err.code) {
                              case "LIMIT_FILE_SIZE":
                                    return res.status(413).json({
                                          error: "File size exceeds 5MB limit"
                                    });

                              case "LIMIT_UNEXPECTED_FILE":
                                    return res.status(400).json({
                                          error: "Invalid file type. Only image files are allowed."
                                    });

                              default:
                                    return res.status(400).json({
                                          error: err.message
                                    });
                        }
                  }

                  return res.status(400).json({
                        error: err.message || "Upload failed"
                  });
            }

            handleImageUpload(req, res);
      });
});
