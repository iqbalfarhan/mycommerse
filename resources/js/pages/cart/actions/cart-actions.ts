import { em } from '@/lib/utils';
import { Product } from '@/types/product';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

export const addToCart = (product: Product, qty: number = 1) => {
  router.post(
    route('cart.store'),
    {
      product_id: product.id,
      qty,
    },
    {
      preserveScroll: true,
      onSuccess: () =>
        toast.success('Product added to cart', {
          action: {
            label: 'Open cart',
            onClick: () => router.visit(route('cart.index')),
          },
        }),
      onError: (e) => toast.error(em(e)),
    },
  );
};
