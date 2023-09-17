const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden'
export const DEFAULT_OPTION = 'Default Title'
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json'
export const TAGS = {
  collections: 'collections',
  products: 'products'
}

export const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : ''
export const ENDPOINT = `${DOMAIN}${SHOPIFY_GRAPHQL_API_ENDPOINT}`
export const KEY = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!
