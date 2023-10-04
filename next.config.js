/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/movies",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["images-na.ssl-images-amazon.com", "ia.media-imdb.com"],
  },
};

module.exports = nextConfig;
