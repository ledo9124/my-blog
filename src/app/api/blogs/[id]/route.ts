import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import { Blog as BlogType } from '../../../../types';
import BlogModel from '@/models/blog';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await dbConnect();
    const blog: BlogType | null = await BlogModel.findById(params.id);
    if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}