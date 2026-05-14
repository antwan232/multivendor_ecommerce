import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
			{
				protocol: "https",
				hostname: "img.clerk.com",
			},
		],
	},
	reactCompiler: true,
};

export default nextConfig;
