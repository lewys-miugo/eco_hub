/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static HTML export
  images: { unoptimized: true }, // optional if using <Image />
}

export default nextConfig
