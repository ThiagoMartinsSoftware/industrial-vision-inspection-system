import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, "src/uploads");
  },

  filename: (_req, file, callback) => {
    const uniqueName =
      Date.now() + path.extname(file.originalname);

    callback(null, uniqueName);
  }
});

export const upload = multer({
  storage
});