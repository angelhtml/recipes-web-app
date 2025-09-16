import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   //only static build, post method not working in static mode
    //output: 'export', 
    env: {
    MONGODB_URI: process.env.MONGODB_URI,
    URL: process.env.URL,
    SECRET_JWT: process.env.SECRET_JWT,
    SOKET_URL: process.env.SOKET_URL,
  },
  experimental: {
    useCache: true,
    /*
        cacheLife: {
          liveQuote: {
            revalidate: 1, // Revalidate every 1 second
            expire: 60, // Expire after 1 minute
          },
        },
        */
      },
};

export default nextConfig;
