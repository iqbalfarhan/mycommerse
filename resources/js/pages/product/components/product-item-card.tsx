import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatRupiah, numberTrim } from '@/lib/utils';
import { addToCart } from '@/pages/cart/actions/cart-actions';
import { Product } from '@/types/product';
import { Link } from '@inertiajs/react';
import { ImageOff, ShoppingCart } from 'lucide-react';
import { FC } from 'react';

type Props = {
  product: Product;
};

const ProductItemCard: FC<Props> = ({ product }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardContent>
        <Avatar className="aspect-square size-full rounded-lg">
          {product.media.length > 0 ? (
            <AvatarImage src={product.media[0].original_url} alt={product.name} className="object-cover" />
          ) : (
            <Skeleton className="flex size-full items-center justify-center">
              <ImageOff className="opacity-30" />
            </Skeleton>
          )}
        </Avatar>
      </CardContent>
      <CardHeader className="flex-1">
        <CardTitle className="leading-normal">
          <Link href={route('product.show', product.id)}>{product.name}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{formatRupiah(product.price)}</p>
          <Badge>{numberTrim(product.stock)}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => addToCart(product)}>
          <ShoppingCart />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductItemCard;
