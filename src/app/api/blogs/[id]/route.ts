import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import { Blog as BlogType } from '../../../../types';
import BlogModel from '@/models/blog';

// Hàm helper xử lý lỗi
const handleError = (error: unknown, status = 500) => {
  console.error('API Error:', error);
  const message = error instanceof Error ? error.message : 'Unknown error';
  return NextResponse.json({ error: message }, { status });
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await dbConnect();
    const blog: BlogType | null = await BlogModel.findById(params.id);
    if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await dbConnect();
    const data: Partial<BlogType> = await request.json();
    const blog: BlogType | null = await BlogModel.findByIdAndUpdate(params.id, data, { new: true });
    if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error) {
    return handleError(error, 400);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await dbConnect();
    const blog: BlogType | null = await BlogModel.findByIdAndDelete(params.id);
    if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    return NextResponse.json({ message: 'Blog deleted' });
  } catch (error) {
    return handleError(error);
  }
}