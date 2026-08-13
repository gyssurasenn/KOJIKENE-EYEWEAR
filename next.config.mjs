/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hides the floating "N" dev-tools badge Next.js overlays in dev mode.
  devIndicators: true,
  images: {
    // Real photography will be dropped into /public/images later.
    // AVIF/WebP are generated automatically by next/image at request time.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1600, 1920, 2048],
    imageSizes: [64, 96, 128, 200, 256, 384, 512],
  },
  experimental: {
    optimizePackageImports: [],
  },
};

export default nextConfig;
