import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Product } from '@/types/product';
import { usePage } from '@inertiajs/react';
import { FC } from 'react';
import ProductItemCard from '../product/components/product-item-card';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

type Props = {
  products: Product[];
};

const Dashboard: FC<Props> = ({ products = [] }) => {
  const {
    auth: { roles },
  } = usePage<SharedData>().props;

  return (
    <AppLayout title="Katalog produk" description={`Selamat datang, kamu masuk sebagai ${roles.join(', ')}`} breadcrumbs={breadcrumbs}>
      <div className="grid-responsive grid gap-6">
        {products.map((p) => (
          <ProductItemCard product={p} key={p.id} />
        ))}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
