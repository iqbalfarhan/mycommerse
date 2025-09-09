import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Order } from '@/types/order';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import OrderDeleteDialog from './order-delete-dialog';
import OrderFormSheet from './order-form-sheet';

type Props = {
  order: Order;
};

const OrderItemCard: FC<Props> = ({ order }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{order.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {order.id}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('order.show', order.id)}>
            <Folder />
          </Link>
        </Button>
        <OrderFormSheet purpose="edit" order={order}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </OrderFormSheet>
        <OrderDeleteDialog order={order}>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </OrderDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default OrderItemCard;
