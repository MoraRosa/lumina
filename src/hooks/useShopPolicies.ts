import { useQuery } from '@tanstack/react-query';
import { shopifyClient, GET_SHOP_POLICIES_QUERY, isShopifyConfigured } from '@/lib/shopify';

export interface ShopPolicy {
  title: string;
  body: string;
}

interface ShopPoliciesResponse {
  shop: {
    shippingPolicy: ShopPolicy | null;
    refundPolicy: ShopPolicy | null;
    privacyPolicy: ShopPolicy | null;
    termsOfService: ShopPolicy | null;
  };
}

export const useShopPolicies = () => {
  return useQuery({
    queryKey: ['shop-policies'],
    queryFn: async () => {
      if (!isShopifyConfigured()) {
        console.warn('Shopify not configured');
        return null;
      }

      const { data, errors } = await shopifyClient.request<ShopPoliciesResponse>(
        GET_SHOP_POLICIES_QUERY
      );

      if (errors) {
        console.error('Shopify API errors:', errors);
        throw new Error('Failed to fetch shop policies from Shopify');
      }

      return data?.shop || null;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour (policies don't change often)
  });
};

