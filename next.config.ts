import type { NextConfig } from "next";

// 外部のドメインから画像を読み込む場合、そのドメインを明示的に許可する必要があります。
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qiita-user-contents.imgix.net",
      },
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
  },
};

export default nextConfig;
