/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: [
        //     'i.ytimg.com',
        //     'administration.altitudeairnepal.com'
        // ],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost', //local
                port: '3000',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com', //local
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'administration.altitudeairnepal.com', //local
                port: '',
                pathname: '/**',
            }
        ],
    },
  };
  
  module.exports=nextConfig;
  