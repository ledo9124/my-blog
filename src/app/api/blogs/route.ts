import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import { Blog as BlogType } from '../../../types';
import BlogModel from '@/models/blog';

// Hàm helper xử lý lỗi
const handleError = (error: unknown, status = 500) => {
  console.error('API Error:', error);
  const message = error instanceof Error ? error.message : 'Unknown error';
  return NextResponse.json({ error: message }, { status });
};

export async function GET(): Promise<NextResponse> {
  try {
    await dbConnect();
    const blogs: BlogType[] = await BlogModel.find({});
    return NextResponse.json(blogs);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await dbConnect();
    const data: Omit<BlogType, '_id' | 'createdAt'> = await request.json();
    const blog: BlogType = await BlogModel.create(data);
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return handleError(error, 400);
  }
}