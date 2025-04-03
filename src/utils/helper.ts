/* eslint-disable @typescript-eslint/no-explicit-any, react/jsx-key */
export const getImageUrl = (imageUrl: string) => {
    const url = process.env.NEXT_PUBLIC_URI_PATH || '';
    if (!url) return '';
    return url + imageUrl;
}

//Xử lý ảnh default
export const handleProcessImage = (files: any) => {// eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!files) {
        return [];
    }

    const img = files.split(',');

    return img.map((img: any, index: number) => {// eslint-disable-next-line @typescript-eslint/no-explicit-any
        return {
            uid: index + 1,
            name: `Ảnh ${index + 1}`,
            status: 'done',
            url: getImageUrl(img),
        }
    });
};