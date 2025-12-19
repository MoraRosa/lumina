import { createStorefrontClient } from '@shopify/hydrogen-react';

// Validate environment variables
const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION || '2025-07';

console.log('🔧 Shopify Config:', {
  storeDomain: storeDomain ? `${storeDomain.substring(0, 10)}...` : 'NOT SET',
  hasToken: !!storefrontAccessToken,
  tokenLength: storefrontAccessToken?.length || 0,
  apiVersion,
});

if (!storeDomain || !storefrontAccessToken) {
  console.warn(
    '⚠️ Shopify credentials not configured. Please set up your .env file with Shopify API credentials.'
  );
}

// Create Shopify Storefront API client
const client = createStorefrontClient({
  storeDomain: storeDomain || 'placeholder.myshopify.com',
  storefrontApiVersion: apiVersion,
  publicStorefrontToken: storefrontAccessToken || 'placeholder-token',
});

// Helper function to make GraphQL requests
export const shopifyClient = {
  async request<T>(query: string, options?: { variables?: Record<string, any> }): Promise<{ data: T | null; errors?: any[] }> {
    try {
      const response = await fetch(client.getStorefrontApiUrl(), {
        method: 'POST',
        headers: client.getPublicTokenHeaders(),
        body: JSON.stringify({
          query,
          variables: options?.variables || {},
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        data: result.data,
        errors: result.errors,
      };
    } catch (error) {
      console.error('Shopify API request failed:', error);
      throw error;
    }
  },
};

// Helper function to check if Shopify is configured
export const isShopifyConfigured = (): boolean => {
  return !!(storeDomain && storefrontAccessToken);
};

// GraphQL query fragments for reusability
export const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    title
    description
    descriptionHtml
    handle
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 5) {
      edges {
        node {
          id
          url
          altText
          width
          height
        }
      }
    }
  }
`;

export const PRODUCT_VARIANT_FRAGMENT = `
  fragment ProductVariantFragment on ProductVariant {
    id
    title
    availableForSale
    selectedOptions {
      name
      value
    }
    priceV2 {
      amount
      currencyCode
    }
    compareAtPriceV2 {
      amount
      currencyCode
    }
    image {
      id
      url
      altText
      width
      height
    }
  }
`;

// GraphQL Queries
export const GET_PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          ...ProductFragment
          variants(first: 1) {
            edges {
              node {
                id
                title
                availableForSale
                priceV2 {
                  amount
                  currencyCode
                }
                compareAtPriceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE_QUERY = `
  ${PRODUCT_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
      variants(first: 100) {
        edges {
          node {
            ...ProductVariantFragment
          }
        }
      }
    }
  }
`;

export const GET_COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            id
            url
            altText
          }
        }
      }
    }
  }
`;

export const GET_COLLECTION_PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetCollectionProducts($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      products(first: $first) {
        edges {
          node {
            ...ProductFragment
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  priceV2 {
                    amount
                    currencyCode
                  }
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_SHOP_POLICIES_QUERY = `
  query GetShopPolicies {
    shop {
      shippingPolicy {
        title
        body
      }
      refundPolicy {
        title
        body
      }
      privacyPolicy {
        title
        body
      }
      termsOfService {
        title
        body
      }
    }
  }
`;

export const CREATE_CART_MUTATION = `
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const ADD_TO_CART_MUTATION = `
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

