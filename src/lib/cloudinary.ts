// Image uploads are handled server-side via /api/upload.
// This file is kept for any future server-side utilities only.
export {};

/* export const getCloudinaryImageUrl = (publicId: string, options: Record<string, any> = {}) => {
  const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`;
  const queryParams = new URLSearchParams(options).toString();
  return `${baseUrl}/${publicId}${queryParams ? `?${queryParams}` : ''}`;
};
 */