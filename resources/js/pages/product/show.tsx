import MarkdownReader from '@/components/markdown-reader';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';
import { Product } from '@/types/product';
import { Edit, Image, ShoppingCart } from 'lucide-react';
import { FC } from 'react';
import { addToCart } from '../cart/actions/cart-actions';
import ProductFormSheet from './components/product-form-sheet';
import ProductUploadMediaSheet from './components/product-upload-sheet';

type Props = {
  product: Product;
  permissions: Record<string, boolean>;
};

const ShowProduct: FC<Props> = ({ product, permissions }) => {
  return (
    <AppLayout
      title="Detail Product"
      description="Detail product"
      actions={
        <>
          {permissions?.canUpdate && (
            <>
              <ProductFormSheet purpose="edit" product={product}>
                <Button>
                  <Edit />
                  Edit
                </Button>
              </ProductFormSheet>
            </>
          )}
        </>
      }
    >
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-6">
          <Carousel>
            <CarouselContent>
              {(product.media ?? []).map((media) => (
                <CarouselItem key={media.id}>
                  <Avatar className="size-full rounded-lg">
                    <AvatarImage src={media.original_url} alt={media.name} className="object-cover" />
                  </Avatar>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {permissions?.canUpdate && (
            <ProductUploadMediaSheet product={product}>
              <Button>
                <Image />
                Upload media
              </Button>
            </ProductUploadMediaSheet>
          )}
        </div>
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardDescription>{product.category.name}</CardDescription>
              <CardTitle className="text-3xl leading-normal">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownReader content={product.description} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{formatRupiah(product.price)}</CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-row justify-between">
              <Button onClick={() => addToCart(product)}>
                <ShoppingCart />
                Add to cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default ShowProduct;
