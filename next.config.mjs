/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  theme: {
    extend: {
      fontFamily: {
        nunito: ["var(--font-nunito-sans)", "sans-serif"],
      },
    },
  },
  images: {
    domains: [],
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // distDir: 'build',
//   reactStrictMode: false,
//   experimental: {
//     appDir: true,
//     missingSuspenseWithCSRBailout: false,
//   },
//   images: {
//     domains: ["localhost"],
//   },
// };

// export default nextConfig;
