/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 dias
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.matterport.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.blogger.com',
      },
    ],
  },
  compress: true,
  async redirects() {
    return [
      // Sem www → com www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'museudepescasantos.com.br' }],
        destination: 'https://www.museudepescasantos.com.br/:path*',
        permanent: true,
      },
      // Domínio técnico Vercel → domínio canônico
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'museu-pesca-santos.vercel.app' }],
        destination: 'https://www.museudepescasantos.com.br/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Força HTTPS por 1 ano e inclui subdomínios
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // Previne clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Previne MIME sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Controla informações do referrer
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Bloqueia recursos mistos (HTTP em página HTTPS)
          {
            key: 'Content-Security-Policy',
            value: "upgrade-insecure-requests",
          },
          {
            key: 'Permissions-Policy',
            value: 'xr-spatial-tracking=()',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig

