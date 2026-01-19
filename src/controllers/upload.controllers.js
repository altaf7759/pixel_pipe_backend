

export const handleImageUpload = (req, res) => {
      try {
            if (!req.file) {
                  return res.status(400).json({ error: "No image uploaded" });
            }
      } catch (error) {
            console.log(error)
            res.status(500).json({
                  success: false,
                  message: "Internal server error"
            })
      }
}