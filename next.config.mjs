/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/Home",
        permanent: false, // Use true if you want this redirect to be cached by browsers and search engines
      },
    ];
  },
};

export default nextConfig;
