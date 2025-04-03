import { Blog } from '@/types';
import mongoose, { Schema, model, Model } from 'mongoose';

const blogSchema: Schema = new Schema<Blog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: {
    type: String,
    required: false,
    default: null
  }
}, { timestamps: true });

const BlogModel: Model<Blog> = mongoose.models.Blog || model<Blog>('Blog', blogSchema);

export default BlogModel;