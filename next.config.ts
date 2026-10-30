import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/', destination: '/pt', permanent: false },
      // A página Sobre saiu (a equipe não aparece mais no site): 308 para a home do idioma
      { source: '/:locale(pt|en)/sobre', destination: '/:locale', permanent: true },
    ]
  },
}

export default nextConfig
