// ✅ Next.js config — static export compatible con Next.js 14+
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
