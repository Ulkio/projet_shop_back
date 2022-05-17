import express from "express";

const router = express.Router();

router.post("/", (req, res, next) => {
  const imageToSave = req.files.img;
  const filePath = "public/assets/product_images" + imageToSave.name;
  imageToSave.mv(filePath, (err) => {
    if (err) {
      return res.json({
        error: err.message,
      });
    }
    return res.json({
      result: "file uploaded",
    });
  });
});

export default router;
