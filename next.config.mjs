/** @type {import('next').NextConfig} */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  env: {
    WEB_URL: process.env.WEB_URL,
    API_URL: process.env.API_URL,
  },
  sassOptions: {
    includePaths: [path.resolve(__dirname, 'src')],
    prependData: `@import "@/styles/_commons.scss";`,
  },
};

export default nextConfig;
