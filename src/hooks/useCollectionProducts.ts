import { useQuery } from '@tanstack/react-query';
import { shopifyClient, GET_COLLECTION_PRODUCTS_QUERY, isShopifyConfigured } from '@/lib/shopify';
import { Product } from '@/components/ProductCard';

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

// Transform Shopify product data to our Product interface
const transformShopifyProduct = (shopifyProduct: ShopifyProduct): Product => {
  const price = shopifyProduct.priceRange.minVariantPrice;
  const compareAtPrice = shopifyProduct.compareAtPriceRange?.minVariantPrice;
  const images = shopifyProduct.images.edges.map(edge => edge.node.url);
  const firstVariant = shopifyProduct.variants.edges[0]?.node;

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
        console.warn('Shopify not configured, returning empty products array');
        return [];
      }

      console.log(`🛍️ Fetching products from collection: ${collectionHandle}`);

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
          console.warn(`⚠️ No products found in collection: ${collectionHandle}`);
          return [];
        }

        console.log(`✅ Successfully fetched ${data.collection.products.edges.length} products from collection: ${collectionHandle}`);

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

