import { useMutation } from '@tanstack/react-query';
import { shopifyClient, CREATE_CART_MUTATION, ADD_TO_CART_MUTATION, isShopifyConfigured } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

interface CartLine {
  merchandiseId: string;
  quantity: number;
}

interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          priceV2: {
            amount: string;
            currencyCode: string;
          };
          product: {
            id: string;
            title: string;
            handle: string;
          };
        };
      };
    }>;
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface CreateCartResponse {
  cartCreate: {
    cart: ShopifyCart;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

interface AddToCartResponse {
  cartLinesAdd: {
    cart: ShopifyCart;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

// Store Shopify cart ID in localStorage
const SHOPIFY_CART_ID_KEY = 'lumina-shopify-cart-id';

const getStoredCartId = (): string | null => {
  return localStorage.getItem(SHOPIFY_CART_ID_KEY);
};

const setStoredCartId = (cartId: string) => {
  localStorage.setItem(SHOPIFY_CART_ID_KEY, cartId);
};

export const useCreateShopifyCart = () => {
  const setCheckoutUrl = useCartStore((state) => state.setCheckoutUrl);

  return useMutation({
    mutationFn: async (lines: CartLine[]) => {
      if (!isShopifyConfigured()) {
        throw new Error('Shopify is not configured');
      }

      const { data, errors } = await shopifyClient.request<CreateCartResponse>(
        CREATE_CART_MUTATION,
        {
          variables: {
            input: {
              lines: lines,
            },
          },
        }
      );

      if (errors || data?.cartCreate?.userErrors?.length) {
        const errorMessage = errors?.[0]?.message || data?.cartCreate?.userErrors?.[0]?.message;
        throw new Error(errorMessage || 'Failed to create cart');
      }

      const cart = data?.cartCreate?.cart;
      if (!cart) {
        throw new Error('No cart returned from Shopify');
      }

      // Store cart ID and checkout URL
      setStoredCartId(cart.id);
      setCheckoutUrl(cart.checkoutUrl);

      return cart;
    },
    onError: (error) => {
      console.error('Failed to create Shopify cart:', error);
      toast.error('Failed to create cart. Please try again.');
    },
  });
};

export const useAddToShopifyCart = () => {
  const setCheckoutUrl = useCartStore((state) => state.setCheckoutUrl);

  return useMutation({
    mutationFn: async (lines: CartLine[]) => {
      if (!isShopifyConfigured()) {
        throw new Error('Shopify is not configured');
      }

      let cartId = getStoredCartId();

      // If no cart exists, create one first
      if (!cartId) {
        const { data: createData, errors: createErrors } = await shopifyClient.request<CreateCartResponse>(
          CREATE_CART_MUTATION,
          {
            variables: {
              input: { lines },
            },
          }
        );

        if (createErrors || createData?.cartCreate?.userErrors?.length) {
          throw new Error('Failed to create cart');
        }

        const cart = createData?.cartCreate?.cart;
        if (!cart) {
          throw new Error('No cart returned');
        }

        setStoredCartId(cart.id);
        setCheckoutUrl(cart.checkoutUrl);
        return cart;
      }

      // Add to existing cart
      const { data, errors } = await shopifyClient.request<AddToCartResponse>(
        ADD_TO_CART_MUTATION,
        {
          variables: {
            cartId,
            lines,
          },
        }
      );

      if (errors || data?.cartLinesAdd?.userErrors?.length) {
        const errorMessage = errors?.[0]?.message || data?.cartLinesAdd?.userErrors?.[0]?.message;
        throw new Error(errorMessage || 'Failed to add to cart');
      }

      const cart = data?.cartLinesAdd?.cart;
      if (!cart) {
        throw new Error('No cart returned from Shopify');
      }

      setCheckoutUrl(cart.checkoutUrl);
      return cart;
    },
    onError: (error) => {
      console.error('Failed to add to Shopify cart:', error);
      toast.error('Failed to add to cart. Please try again.');
    },
  });
};

// Helper hook to sync local cart with Shopify and get checkout URL
export const useSyncCartWithShopify = () => {
  const items = useCartStore((state) => state.items);
  const { mutateAsync: createCart } = useCreateShopifyCart();

  const syncAndCheckout = async () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return null;
    }

    try {
      // Always create a fresh cart for checkout
      // Clear any old Shopify cart ID first
      localStorage.removeItem(SHOPIFY_CART_ID_KEY);

      const lines = items.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
      }));

      const cart = await createCart(lines);
      return cart.checkoutUrl;
    } catch (error) {
      console.error('Failed to sync cart:', error);
      return null;
    }
  };

  return { syncAndCheckout };
};

