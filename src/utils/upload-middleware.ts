import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { File as MulterFile } from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user?.id;
    const dir = path.join(__dirname, "../../../data/pictures", userId || "unknown");
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, "profile" + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Solo i file immagine sono accettati"), false);
    }
    cb(null, true);
  },
});

export interface RequestWithFile extends Request {
  file: MulterFile;
}
