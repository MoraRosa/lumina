import { useQuery } from '@tanstack/react-query';
import { shopifyClient, GET_PRODUCTS_QUERY, isShopifyConfigured } from '@/lib/shopify';
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

interface ShopifyProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
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

export const useProducts = (limit: number = 20) => {
  return useQuery({
    queryKey: ['products', limit],
    queryFn: async () => {
      if (!isShopifyConfigured()) {
        console.warn('Shopify not configured, returning empty products array');
        return [];
      }

      console.log('🛍️ Fetching products from Shopify...');

      try {
        const { data, errors } = await shopifyClient.request<ShopifyProductsResponse>(
          GET_PRODUCTS_QUERY,
          {
            variables: { first: limit },
          }
        );

        console.log('📦 Raw Shopify response:', { data, errors });

        if (errors) {
          console.error('❌ Shopify API errors:', errors);
          throw new Error('Failed to fetch products from Shopify');
        }

        if (!data?.products?.edges) {
          console.warn('⚠️ No products found in Shopify response');
          console.log('Response data:', data);
          return [];
        }

        console.log(`✅ Successfully fetched ${data.products.edges.length} products from Shopify`);

        // Log first product to see what data we're getting
        if (data.products.edges.length > 0) {
          console.log('📝 Sample product data:', data.products.edges[0].node);
        }

        return data.products.edges.map(edge => transformShopifyProduct(edge.node));
      } catch (error) {
        console.error('❌ Error fetching products:', error);
        throw error;
      }
    },
    enabled: isShopifyConfigured(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};

