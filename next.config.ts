import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "eda.rambler.ru",
			},
			{
				protocol: "https",
				hostname: "img.iamcook.ru",
			},
			{
				protocol: "https",
				hostname: "cdn.example.com",
			},
		],
	},
};

export default nextConfig;
