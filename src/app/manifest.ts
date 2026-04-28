import { MetadataRoute } from 'next'
import { applicationName } from '@/app-config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: applicationName,
    short_name: applicationName,
    description: 'The code kit to help you quickly setup an online store and sell your digital assets without a middleman skipping off the top of your profits.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
