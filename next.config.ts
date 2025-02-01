import type { NextConfig } from "next";
import withVideos from "next-videos";
import { WebpackConfigContext } from "next/dist/server/config-shared";

const nextConfig: NextConfig = withVideos({
    output: 'standalone',  
    trailingSlash: true,
    productionBrowserSourceMaps: true,  // ✅ Enables detailed error messages in production builds
    reactStrictMode: true,  // ✅ Optional, but helps catch more errors during development
    webpack: (config: any, { isServer }: WebpackConfigContext) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false
            };
        }
        return config;
    }
});

export default nextConfig;