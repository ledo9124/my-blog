export const getImageUrl = (imageUrl: string) => {
    const url = process.env.NEXT_PUBLIC_URI_PATH || '';
    if (!url) return '';
    return url + imageUrl;
}

//Xử lý ảnh default
export const handleProcessImage = (files: string | undefined) => {
    if (!files) {
        return [];
    }

    const img = files.split(',');

    return img.map((img: string, index: number) => {
        return {
            uid: index + 1,
            name: `Ảnh ${index + 1}`,
            status: 'done',
            url: getImageUrl(img),
        }
    });
};

export function getTimeSincePosted(postTime: string): string {
    // Lấy thời gian hiện tại
    const now: Date = new Date();
    // Chuyển thời gian đăng bài thành đối tượng Date
    const posted: Date = new Date(postTime);

    // Tính khoảng cách thời gian (miligiây)
    const diffMs: number = now.getTime() - posted.getTime();

    // Chuyển đổi sang giây, phút, giờ, ngày
    const diffSeconds: number = Math.floor(diffMs / 1000);
    const diffMinutes: number = Math.floor(diffSeconds / 60);
    const diffHours: number = Math.floor(diffMinutes / 60);
    const diffDays: number = Math.floor(diffHours / 24);

    // Trả về chuỗi thời gian phù hợp
    if (diffSeconds < 60) {
        return `${diffSeconds} giây trước`;
    } else if (diffMinutes < 60) {
        return `${diffMinutes} phút trước`;
    } else if (diffHours < 24) {
        return `${diffHours} tiếng trước`;
    } else {
        return `${diffDays} ngày trước`;
    }
}

export function isImageUrl(url: string): boolean {
    // Danh sách các phần mở rộng ảnh phổ biến
    const imageExtensions = [
        '.jpg', 
        '.jpeg', 
        '.png', 
        '.gif', 
        '.bmp', 
        '.webp',
        '.tiff',
        '.svg'
    ];
    
    try {
        // Chuyển URL thành chữ thường để kiểm tra không phân biệt hoa thường
        const lowercaseUrl = url.toLowerCase();
        
        // Kiểm tra xem URL có kết thúc bằng một trong các phần mở rộng ảnh không
        return imageExtensions.some(ext => lowercaseUrl.endsWith(ext));
    } catch (error) {
        console.error('Error checking image URL:', error);
        return false;
    }
}