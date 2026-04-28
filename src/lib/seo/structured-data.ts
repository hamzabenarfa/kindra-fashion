import { applicationName } from '@/app-config'

export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kindra.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: applicationName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      // Add your social media links here
      // 'https://twitter.com/kindra',
      // 'https://facebook.com/kindra',
      // 'https://instagram.com/kindra',
    ],
  }
}

export function generateWebsiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kindra.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: applicationName,
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/store?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateProductSchema(product: {
  name: string
  description: string
  image: string
  price: number
  currency?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  brand?: string
  sku?: string
  rating?: {
    value: number
    count: number
  }
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kindra.com'
  
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image.startsWith('http') ? product.image : `${baseUrl}${product.image}`,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'USD',
      availability: `https://schema.org/${product.availability || 'InStock'}`,
    },
  }

  if (product.brand) {
    schema.brand = {
      '@type': 'Brand',
      name: product.brand,
    }
  }

  if (product.sku) {
    schema.sku = product.sku
  }

  if (product.rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating.value,
      reviewCount: product.rating.count,
    }
  }

  return schema
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kindra.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  }
}
