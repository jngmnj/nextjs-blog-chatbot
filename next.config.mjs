import removeImports from 'next-remove-imports';
import withTM from 'next-transpile-modules';
// const removeImports = require('next-react-imports')();

/**  @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withRemoveImports = removeImports();

export default withRemoveImports(
  withTM(['react-dom', 'react-icons'])(nextConfig),
);
