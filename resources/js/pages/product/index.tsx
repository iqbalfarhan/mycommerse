import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';
import { SharedData } from '@/types';
import { Product } from '@/types/product';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, FolderArchive, Grid, Image, List, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ProductBulkDeleteDialog from './components/product-bulk-delete-dialog';
import ProductBulkEditSheet from './components/product-bulk-edit-sheet';
import ProductDeleteDialog from './components/product-delete-dialog';
import ProductFilterSheet from './components/product-filter-sheet';
import ProductFormSheet from './components/product-form-sheet';
import ProductItemCard from './components/product-item-card';
import ProductUploadMediaSheet from './components/product-upload-sheet';

type Props = {
  products: Product[];
  query: { [key: string]: string };
};

const ProductList: FC<Props> = ({ products, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');
  const [view, setView] = useState<'grid' | 'table'>('grid');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Products"
      description="Manage your products"
      actions={
        <>
          {permissions?.canAdd && (
            <ProductFormSheet purpose="create">
              <Button>
                <Plus />
                Create new product
              </Button>
            </ProductFormSheet>
          )}
          <Button variant={'destructive'} size={'icon'} asChild>
            <Link href={route('product.archived')}>
              <FolderArchive />
            </Link>
          </Button>
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search products..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <ProductFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </ProductFilterSheet>
        <Button size={'icon'} onClick={() => setView(view === 'grid' ? 'table' : 'grid')}>
          {view === 'grid' ? <List /> : <Grid />}
        </Button>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <ProductBulkEditSheet productIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </ProductBulkEditSheet>
            <ProductBulkDeleteDialog productIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </ProductBulkDeleteDialog>
          </>
        )}
      </div>

      {view === 'grid' ? (
        <div className="grid-responsive grid gap-6">
          {products.map((product) => (
            <ProductItemCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant={'ghost'} size={'icon'} asChild>
                  <Label>
                    <Checkbox
                      checked={ids.length === products.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setIds(products.map((product) => product.id));
                        } else {
                          setIds([]);
                        }
                      }}
                    />
                  </Label>
                </Button>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products
              .filter((product) => JSON.stringify(product).toLowerCase().includes(cari.toLowerCase()))
              .map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Button variant={'ghost'} size={'icon'} asChild>
                      <Label>
                        <Checkbox
                          checked={ids.includes(product.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setIds([...ids, product.id]);
                            } else {
                              setIds(ids.filter((id) => id !== product.id));
                            }
                          }}
                        />
                      </Label>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={product.thumbnail} />
                      </Avatar>
                      <div>{product.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>{formatRupiah(product.price)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    {permissions?.canShow && (
                      <Button variant={'ghost'} size={'icon'}>
                        <Link href={route('product.show', product.id)}>
                          <Folder />
                        </Link>
                      </Button>
                    )}
                    {permissions?.canUpdate && (
                      <>
                        <ProductUploadMediaSheet product={product}>
                          <Button variant={'ghost'} size={'icon'}>
                            <Image />
                          </Button>
                        </ProductUploadMediaSheet>
                        <ProductFormSheet purpose="edit" product={product}>
                          <Button variant={'ghost'} size={'icon'}>
                            <Edit />
                          </Button>
                        </ProductFormSheet>
                      </>
                    )}
                    {permissions?.canDelete && (
                      <ProductDeleteDialog product={product}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Trash2 />
                        </Button>
                      </ProductDeleteDialog>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </AppLayout>
  );
};

export default ProductList;
