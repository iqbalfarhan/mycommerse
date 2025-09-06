import MarkdownReader from '@/components/markdown-reader';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { em, formatRupiah } from '@/lib/utils';
import { Product } from '@/types/product';
import { router } from '@inertiajs/react';
import { Edit, Image, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import { addToCart } from '../cart/actions/cart-actions';
import ProductFormSheet from './components/product-form-sheet';
import ProductUploadMediaSheet from './components/product-upload-sheet';

type Props = {
  product: Product;
  permissions: Record<string, boolean>;
};

const ShowProduct: FC<Props> = ({ product, permissions }) => {
  const [qty, setQty] = useState(1);

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
                <CarouselItem key={media.id} className="relative">
                  <Avatar className="size-full rounded-lg">
                    <AvatarImage src={media.original_url} alt={media.name} className="object-cover" />
                  </Avatar>
                  <Button
                    variant={'destructive'}
                    className="absolute right-2 bottom-2"
                    onClick={() => {
                      router.delete(route('media-library.destroy', media.id), {
                        preserveScroll: true,
                        onSuccess: () => {
                          toast.success('Media deleted successfully');
                        },
                        onError: (e) => toast.error(em(e)),
                      });
                    }}
                  >
                    <Trash2 />
                    hapus
                  </Button>
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
          </Card>
          <Card>
            <CardContent>
              <MarkdownReader content={product.description} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Harga</CardDescription>
              <CardTitle>{formatRupiah(product.price)}</CardTitle>
            </CardHeader>
            <Separator />
            <CardFooter className="flex flex-row justify-between gap-4">
              <div className="flex items-center">
                <Button onClick={() => setQty(qty - 1)} disabled={qty === 1} variant={'outline'} size={'icon'} children={<Minus />} />
                <Button size={'icon'} disabled variant={'ghost'} children={qty} />
                <Button onClick={() => setQty(qty + 1)} disabled={qty === product.stock} variant={'outline'} size={'icon'} children={<Plus />} />
              </div>
              <Button onClick={() => addToCart(product, qty)}>
                <ShoppingCart />
                Add {qty} item to cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default ShowProduct;
