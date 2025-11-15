import { useQuery } from '@tanstack/react-query';
import { shopifyClient, GET_PRODUCT_BY_HANDLE_QUERY, isShopifyConfigured } from '@/lib/shopify';
import { Product } from '@/components/ProductCard';

interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  priceV2: {
    amount: string;
    currencyCode: string;
  };
  compareAtPriceV2?: {
    amount: string;
    currencyCode: string;
  };
  image?: {
    url: string;
    altText: string | null;
  };
}

interface ShopifyProductDetail {
  id: string;
  title: string;
  description: string;
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
      node: ShopifyProductVariant;
    }>;
  };
}

interface ShopifyProductResponse {
  product: ShopifyProductDetail | null;
}

export interface ProductWithVariants extends Product {
  variants?: Array<{
    id: string;
    title: string;
    availableForSale: boolean;
    price: string;
    compareAtPrice?: string;
    options: Array<{
      name: string;
      value: string;
    }>;
  }>;
}

// Transform Shopify product detail to our Product interface with variants
const transformShopifyProductDetail = (shopifyProduct: ShopifyProductDetail): ProductWithVariants => {
  const price = shopifyProduct.priceRange.minVariantPrice;
  const compareAtPrice = shopifyProduct.compareAtPriceRange?.minVariantPrice;
  const images = shopifyProduct.images.edges.map(edge => edge.node.url);
  const firstVariant = shopifyProduct.variants.edges[0]?.node;

  const variants = shopifyProduct.variants.edges.map(edge => ({
    id: edge.node.id,
    title: edge.node.title,
    availableForSale: edge.node.availableForSale,
    price: `$${parseFloat(edge.node.priceV2.amount).toFixed(2)}`,
    compareAtPrice: edge.node.compareAtPriceV2
      ? `$${parseFloat(edge.node.compareAtPriceV2.amount).toFixed(2)}`
      : undefined,
    options: edge.node.selectedOptions,
  }));

  return {
    id: shopifyProduct.id,
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    price: `$${parseFloat(price.amount).toFixed(2)}`,
    compareAtPrice: compareAtPrice 
      ? `$${parseFloat(compareAtPrice.amount).toFixed(2)}` 
      : undefined,
    image: images[0],
    images: images,
    variantId: firstVariant?.id || shopifyProduct.id,
    availableForSale: shopifyProduct.availableForSale,
    handle: shopifyProduct.handle,
    variants: variants,
  };
};

export const useProduct = (handle: string | undefined) => {
  return useQuery({
    queryKey: ['product', handle],
    queryFn: async () => {
      if (!handle) {
        throw new Error('Product handle is required');
      }

      if (!isShopifyConfigured()) {
        console.warn('Shopify not configured');
        return null;
      }

      const { data, errors } = await shopifyClient.request<ShopifyProductResponse>(
        GET_PRODUCT_BY_HANDLE_QUERY,
        {
          variables: { handle },
        }
      );

      if (errors) {
        console.error('Shopify API errors:', errors);
        console.error('Full error details:', JSON.stringify(errors, null, 2));
        throw new Error('Failed to fetch product from Shopify');
      }

      if (!data?.product) {
        return null;
      }

      return transformShopifyProductDetail(data.product);
    },
    enabled: !!handle && isShopifyConfigured(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};

