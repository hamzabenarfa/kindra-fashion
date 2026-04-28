import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://benarfa.kindra.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/account/', '/checkout/', '/cart/', '/orders/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
