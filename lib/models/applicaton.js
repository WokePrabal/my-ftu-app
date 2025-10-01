// lib/models/Application.js
import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  url: String,
  filename: String,
  type: String, // 'photo'|'document'
});

const ApplicationSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // from login or UID
  fullName: String,
  email: String,
  stream: { type: String }, // Bachelor's | Master's | PhD
  degree: { type: String }, // selected program
  photo: FileSchema,
  documents: [FileSchema],
  stepsCompleted: {
    selectStream: { type: Boolean, default: false },
    programOfStudy: { type: Boolean, default: false },
    uploadDocuments: { type: Boolean, default: false },
    review: { type: Boolean, default: false },
  },
  status: { type: String, default: 'Pending' }, // Pending | Submitted
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
