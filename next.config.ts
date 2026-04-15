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
		],
	},
	reactCompiler: true,
};

export default nextConfig;
