import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import { Blog as BlogType } from '../../../types';
import BlogModel from '@/models/blog';

export async function GET(): Promise<NextResponse> {
  try {
    await dbConnect();
    const blogs: BlogType[] = await BlogModel.find({});
    return NextResponse.json(blogs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await dbConnect();
    const data: Omit<BlogType, '_id' | 'createdAt'> = await request.json();
    const blog: BlogType = await BlogModel.create(data);
    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}