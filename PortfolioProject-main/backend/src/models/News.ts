import mongoose, { Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  content: string;
  image?: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
}

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  image: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model<INews>('News', newsSchema); 