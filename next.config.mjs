import withPlaiceholder from '@plaiceholder/next'

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: ['./src'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [],
  },
  experimental: {
    serverComponentsExternalPackages: ['fetch-site-metadata'],
  },
}

export default withPlaiceholder(config)
