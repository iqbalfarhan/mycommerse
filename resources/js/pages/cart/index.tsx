import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah, strLimit } from '@/lib/utils';
import { SharedData } from '@/types';
import { Cart } from '@/types/cart';
import { router, usePage } from '@inertiajs/react';
import { LogIn, Minus, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import CartBulkDeleteDialog from './components/cart-bulk-delete-dialog';
import CartDeleteDialog from './components/cart-delete-dialog';
import CartFormSheet from './components/cart-form-sheet';

type Props = {
  carts: Cart[];
  query: { [key: string]: string };
};

const CartList: FC<Props> = ({ carts }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  const handleUpdateQty = (cart: Cart, newqty: number) => {
    router.put(route('cart.update', cart.id), { qty: cart.qty + newqty });
  };

  const totalHarga = carts
    .filter((cart) => ids.includes(cart.id))
    .reduce((total, cart) => {
      return total + cart.product.price * cart.qty;
    }, 0);

  return (
    <AppLayout
      title="Carts"
      description="Manage your carts"
      actions={
        <>
          {permissions?.canAdd && (
            <CartFormSheet purpose="create">
              <Button>
                <Plus />
                Create new cart
              </Button>
            </CartFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search carts..." value={cari} onChange={(e) => setCari(e.target.value)} />
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <CartBulkDeleteDialog cartIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </CartBulkDeleteDialog>
          </>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={ids.length === carts.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(carts.map((cart) => cart.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Produk</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carts
            .filter((cart) => JSON.stringify(cart).toLowerCase().includes(cari.toLowerCase()))
            .map((cart) => (
              <TableRow key={cart.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(cart.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, cart.id]);
                          } else {
                            setIds(ids.filter((id) => id !== cart.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar className="my-4 size-20 rounded-lg">
                      <AvatarImage src={cart.product.thumbnail} alt={cart.product.name} className="object-cover" />
                    </Avatar>
                    <div className="flex flex-col">
                      <div>{strLimit(cart.product.name)}</div>
                      <div className="text-sm text-muted-foreground">{cart.product.category.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{formatRupiah(cart.product.price)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Button
                      onClick={() => handleUpdateQty(cart, -1)}
                      disabled={cart.qty === 1}
                      variant={'outline'}
                      size={'icon'}
                      children={<Minus />}
                    />
                    <Button size={'icon'} disabled variant={'ghost'} children={cart.qty} />
                    <Button
                      onClick={() => handleUpdateQty(cart, 1)}
                      disabled={cart.qty === cart.product.stock}
                      variant={'outline'}
                      size={'icon'}
                      children={<Plus />}
                    />
                  </div>
                </TableCell>
                <TableCell>{formatRupiah(cart.product.price * cart.qty)}</TableCell>
                <TableCell>
                  {permissions?.canDelete && (
                    <CartDeleteDialog cart={cart}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </CartDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Card>
        <CardHeader>
          <CardTitle>Lanjutkan ke pembelian</CardTitle>
          <CardDescription>Harap pilih item yang ingin dibeli</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardDescription>Total yang harus dibayar :</CardDescription>
            <h1 className="text-2xl font-bold">{formatRupiah(totalHarga)}</h1>
          </div>
          <div>
            <Button disabled={ids.length === 0}>
              <LogIn />
              Checkout
            </Button>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default CartList;
