// pages/api/upload.js
import nextConnect from 'next-connect';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer();

const handler = nextConnect();
handler.use(upload.fields([{ name: 'photo' }, { name: 'doc' }]));

handler.post(async (req, res) => {
  const files = req.files;
  const results = {};
  if (files.photo && files.photo[0]) {
    const data = files.photo[0].buffer.toString('base64');
    const bufferStream = new Readable();
    bufferStream.push(files.photo[0].buffer);
    bufferStream.push(null);
    const streamUpload = () => new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'ftu/photos' }, (error, result) => {
        if (result) resolve(result);
        else reject(error);
      });
      bufferStream.pipe(stream);
    });
    const r = await streamUpload();
    results.photo = { url: r.secure_url, filename: r.public_id, type: 'photo' };
  }

  if (files.doc && files.doc[0]) {
    const bufferStream = new Readable();
    bufferStream.push(files.doc[0].buffer); bufferStream.push(null);
    const streamUpload = () => new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'ftu/docs', resource_type: 'raw' }, (error, result) => {
        if (result) resolve(result);
        else reject(error);
      });
      bufferStream.pipe(stream);
    });
    const r = await streamUpload();
    results.doc = { url: r.secure_url, filename: r.public_id, type: 'document' };
  }

  res.json(results);
});

export const config = { api: { bodyParser: false } };
export default handler;
