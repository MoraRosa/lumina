import { useQuery } from '@tanstack/react-query';
import { shopifyClient, GET_COLLECTION_PRODUCTS_QUERY, isShopifyConfigured } from '@/lib/shopify';
import { Product, MediaItem, MediaContentType } from '@/components/ProductCard';

interface ShopifyMediaNode {
  mediaContentType: string;
  alt?: string;
  id: string;
  image?: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  };
  sources?: Array<{
    url: string;
    mimeType: string;
    format: string;
    width?: number;
    height?: number;
  }>;
  previewImage?: {
    url: string;
  };
  embedUrl?: string;
  host?: string;
}

interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  handle: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        id: string;
        url: string;
        altText: string | null;
      };
    }>;
  };
  media?: {
    edges: Array<{
      node: ShopifyMediaNode;
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        priceV2: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
}

interface ShopifyCollectionProductsResponse {
  collection: {
    id: string;
    title: string;
    handle: string;
    products: {
      edges: Array<{
        node: ShopifyProduct;
      }>;
    };
  } | null;
}

// Transform Shopify media to our MediaItem interface
const transformMediaNode = (node: ShopifyMediaNode): MediaItem | null => {
  const type = node.mediaContentType as MediaContentType;

  switch (type) {
    case 'IMAGE':
      return {
        id: node.id,
        type: 'IMAGE',
        url: node.image?.url || '',
        altText: node.image?.altText || node.alt,
        width: node.image?.width,
        height: node.image?.height,
      };
    case 'VIDEO':
      return {
        id: node.id,
        type: 'VIDEO',
        url: node.sources?.[0]?.url || '',
        previewUrl: node.previewImage?.url,
        mimeType: node.sources?.[0]?.mimeType,
        format: node.sources?.[0]?.format,
        width: node.sources?.[0]?.width,
        height: node.sources?.[0]?.height,
        altText: node.alt,
      };
    case 'MODEL_3D':
      return {
        id: node.id,
        type: 'MODEL_3D',
        url: node.sources?.[0]?.url || '',
        previewUrl: node.previewImage?.url,
        mimeType: node.sources?.[0]?.mimeType,
        format: node.sources?.[0]?.format,
        altText: node.alt,
      };
    case 'EXTERNAL_VIDEO':
      return {
        id: node.id,
        type: 'EXTERNAL_VIDEO',
        url: node.embedUrl || '',
        embedUrl: node.embedUrl,
        host: node.host,
        previewUrl: node.previewImage?.url,
        altText: node.alt,
      };
    default:
      return null;
  }
};

// Transform Shopify product data to our Product interface
const transformShopifyProduct = (shopifyProduct: ShopifyProduct): Product => {
  const price = shopifyProduct.priceRange.minVariantPrice;
  const compareAtPrice = shopifyProduct.compareAtPriceRange?.minVariantPrice;
  const images = shopifyProduct.images.edges.map(edge => edge.node.url);
  const firstVariant = shopifyProduct.variants.edges[0]?.node;

  // Transform media items
  const media = shopifyProduct.media?.edges
    .map(edge => transformMediaNode(edge.node))
    .filter((item): item is MediaItem => item !== null) || [];

  return {
    id: shopifyProduct.id,
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    descriptionHtml: shopifyProduct.descriptionHtml,
    price: `$${parseFloat(price.amount).toFixed(2)}`,
    compareAtPrice: compareAtPrice
      ? `$${parseFloat(compareAtPrice.amount).toFixed(2)}`
      : undefined,
    image: images[0],
    images: images,
    media: media,
    variantId: firstVariant?.id || shopifyProduct.id,
    availableForSale: shopifyProduct.availableForSale,
    handle: shopifyProduct.handle,
  };
};

export const useCollectionProducts = (collectionHandle: string, limit: number = 100) => {
  return useQuery({
    queryKey: ['collection-products', collectionHandle, limit],
    queryFn: async () => {
      if (!isShopifyConfigured()) {
        if (import.meta.env.DEV) {
          console.warn('Shopify not configured, returning empty products array');
        }
        return [];
      }

      try {
        const { data, errors } = await shopifyClient.request<ShopifyCollectionProductsResponse>(
          GET_COLLECTION_PRODUCTS_QUERY,
          {
            variables: { handle: collectionHandle, first: limit },
          }
        );

        if (errors) {
          console.error('❌ Shopify API errors:', errors);
          throw new Error('Failed to fetch collection products from Shopify');
        }

        if (!data?.collection?.products?.edges) {
          if (import.meta.env.DEV) {
            console.warn(`⚠️ No products found in collection: ${collectionHandle}`);
          }
          return [];
        }

        return data.collection.products.edges.map(edge => transformShopifyProduct(edge.node));
      } catch (error) {
        console.error('❌ Error fetching collection products:', error);
        throw error;
      }
    },
    enabled: isShopifyConfigured() && !!collectionHandle,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};

