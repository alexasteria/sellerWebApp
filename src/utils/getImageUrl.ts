/**
 * Формирует полный URL изображения из S3-пути.
 *
 * Бекенд при загрузке файла возвращает путь вида "product/<uuid>.jpg".
 * Nginx на проде проксирует /static/ → MinIO (порт 9000).
 *
 * Примеры:
 *   getImageUrl("product/abc.jpg")
 *     → dev:  "http://localhost:9000/product/abc.jpg"
 *     → prod: "/static/product/abc.jpg"
 *
 *   getImageUrl("https://example.com/img.jpg")
 *     → "https://example.com/img.jpg" (уже полный URL, не трогаем)
 */
export const getImageUrl = (path?: string | null): string => {
  if (!path) return '';

  // If already a full URL or data URI, return as-is
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }

  const baseUrl = import.meta.env.VITE_S3_BASE_URL || '/static';

  // Ensure no double slashes
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  return `${normalizedBase}/${normalizedPath}`;
};
