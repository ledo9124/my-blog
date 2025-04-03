import BlogModel from '@/models/blog';
import saveImage from '@/utils/saveImage';
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import { Blog as BlogType } from '../../../types';

// Helper function to handle errors
const handleError = (error: unknown, status = 500) => {
  console.error('API Error:', error);
  const message = error instanceof Error ? error.message : 'Unknown error';
  return NextResponse.json({ error: message }, { status });
};

export async function GET(request: Request): Promise<NextResponse> {
  try {
    await dbConnect();
    
    // Extract URL search parameters
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || '';
    const sort = searchParams.get('sort');
    
    // Build query
    let query = {};
    
    // Add title filter if provided
    if (title) {
      query = { 
        ...query, 
        title: { $regex: title, $options: 'i' } // Case-insensitive search
      };
    }
    
    // Get blogs with the query
    let blogs = BlogModel.find(query);
    
    // Apply sorting based on parameters
    if (sort === 'latest') {
      blogs = blogs.sort({ createdAt: -1 }); // Descending order (newest first)
    } else if (sort === 'old') {
      blogs = blogs.sort({ createdAt: 1 }); // Ascending order (oldest first)
    }
    
    // Execute the query
    const results: BlogType[] = await blogs.exec();
    
    return NextResponse.json(results);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await dbConnect();
    
    // Get form data instead of JSON
    const formData = await request.formData();
    
    // Handle image upload first
    const imagePath = await saveImage(formData);
    
    // Extract other blog data
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' }, 
        { status: 400 }
      );
    }
    
    // Create blog with image path
    const blog: BlogType = await BlogModel.create({
      title,
      content,
      image: imagePath
    });
    
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return handleError(error, 400);
  }
}