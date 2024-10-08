import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
  {
    title: { type: String, requred: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    contents: String,
    tags: [String],
  },
  { timestamps: true },
);

export const Post = mongoose.model('post', postSchema);
