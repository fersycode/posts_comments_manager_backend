import { diskStorage } from 'multer';
import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// Max file size (5MB)
const maxFileSize = 5 * 1024 * 1024;

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads/posts',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename = `post-${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  }),
  fileFilter: (req, file, callback) => {
    const ext = extname(file.originalname).toLowerCase();
    
    if (!allowedExtensions.includes(ext)) {
      return callback(
        new HttpException(
          'Only image files are allowed (jpg, jpeg, png, gif, webp)',
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
    
    callback(null, true);
  },
  limits: {
    fileSize: maxFileSize,
  },
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};