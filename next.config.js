/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,

  // Uncoment to add domain whitelist
  images: {
    domains: [
      'picsum.photos',
      'www.rsswholesale.com',
      'cdn-icons-png.flaticon.com',
      'https://fanstime.s3.ap-southeast-2.amazonaws.com',
      'fanstime.s3.ap-southeast-2.amazonaws.com',
      'ohm.s3.amazonaws.com',
    ],
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};
