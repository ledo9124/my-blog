import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * Lưu ảnh từ FormData và trả về đường dẫn tương đối
 * @param formData FormData chứa file ảnh
 * @returns Promise<string | null> Đường dẫn ảnh hoặc null nếu thất bại
 * @throws Error nếu có lỗi trong quá trình xử lý
 */
async function saveImage(formData: FormData): Promise<string | null> {
  const file = formData.get('image') as File | null;

  // Kiểm tra file tồn tại
  if (!file || file.size === 0) {
    return null;
  }

  try {
    // Danh sách các loại file được phép
    const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
    
    // Validate loại file
    if (!allowedTypes.has(file.type)) {
      throw new Error('Chỉ hỗ trợ các định dạng JPG, PNG, GIF và WebP');
    }

    // Validate kích thước file (5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new Error('Kích thước file phải nhỏ hơn 5MB');
    }

    // Đọc file thành buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Tạo tên file duy nhất
    const extension = file.type.split('/')[1];
    const fileName = `${uuidv4()}.${extension}`;
    
    // Đường dẫn lưu trữ
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Đảm bảo thư mục uploads tồn tại
    await fs.mkdir(uploadDir, { recursive: true });
    
    // Đường dẫn đầy đủ của file
    const filePath = path.join(uploadDir, fileName);
    
    // Lưu file
    await fs.writeFile(filePath, buffer);
    
    // Trả về đường dẫn tương đối
    return `/uploads/${fileName}`;
    
  } catch (error) {
    console.error('Lỗi khi lưu ảnh:', error);
    
    // Xử lý lỗi cụ thể
    if (error instanceof Error) {
      throw error; // Ném lại lỗi gốc nếu đã có message
    }
    throw new Error('Không thể lưu ảnh');
  }
}

export default saveImage;