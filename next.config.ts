import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   //only static build, post method not working in static mode
    //output: 'export', 
    env: {
    MONGODB_URI: process.env.MONGODB_URI,
    URL: process.env.URL
  },
};

export default nextConfig;
