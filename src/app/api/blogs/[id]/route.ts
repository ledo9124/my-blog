import BlogModel from '@/models/blog';
import { unlink } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import dbConnect from '../../../../lib/db';
import { Blog as BlogType } from '../../../../types';
import saveImage from '@/utils/saveImage';

// Helper function to handle errors
const handleError = (error: unknown, status = 500) => {
  console.error('API Error:', error);
  const message = error instanceof Error ? error.message : 'Unknown error';
  return NextResponse.json({ error: message }, { status });
};

// Helper function to delete old image
async function deleteImage(imagePath: string | null) {
  if (!imagePath) return;
  
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    await unlink(fullPath);
  } catch (error) {
    console.error('Failed to delete image:', error);
    // Continue execution even if image deletion fails
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    await dbConnect();
    const {id} = await params;
    const blog: BlogType | null = await BlogModel.findById(id);
    if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    await dbConnect();
    const {id} = await params;
    // Get the existing blog post to check for existing image
    const existingBlog = await BlogModel.findById(id);
    if (!existingBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    // Get form data instead of JSON
    const formData = await request.formData();
    
    // Extract blog data
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    
    // Process new image if provided
    const file = formData.get('image') as File | null;
    let imagePath = existingBlog.image; // Keep existing image by default
    
    // If there's a new image file, process it
    if (file && file.size > 0) {
      // Save the new image
      imagePath = await saveImage(formData);
      
      // Delete the old image if it exists
      if (existingBlog.image) {
        await deleteImage(existingBlog.image);
      }
    }
    
    // If the removeImage flag is set to "true", remove the image
    const removeImage = formData.get('removeImage');
    if (removeImage === 'true') {
      await deleteImage(existingBlog.image);
      imagePath = null;
    }
    
    // Update the blog post
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(content && { content }),
        image: imagePath
      },
      { new: true }
    );
    
    return NextResponse.json(updatedBlog);
  } catch (error) {
    return handleError(error, 400);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    await dbConnect();
    const {id} = await params;
    // Get the blog to access the image path before deletion
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    // Delete the associated image if it exists
    if (blog.image) {
      await deleteImage(blog.image);
    }
    
    // Delete the blog post
    await BlogModel.findByIdAndDelete(id);
    
    return NextResponse.json({ message: 'Blog deleted' });
  } catch (error) {
    return handleError(error);
  }
}