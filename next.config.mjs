import removeImports from 'next-remove-imports';
import withTM from 'next-transpile-modules';
// const removeImports = require('next-react-imports')();

/**  @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sylbkzvylrzgcuoyxqnj.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

const withRemoveImports = removeImports();

export default withRemoveImports(
  withTM(['react-dom', 'react-icons'])(nextConfig),
);
