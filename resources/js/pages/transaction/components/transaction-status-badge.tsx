import { Badge } from '@/components/ui/badge';
import { Transaction } from '@/types/transaction';
import { FC } from 'react';

type Props = {
  status: Transaction['status'];
};

const TransactionStatusBadge: FC<Props> = ({ status }) => {
  return (
    <>
      {status === 'pending' && <Badge variant="outline">Waiting for payment</Badge>}
      {status === 'shipping' && <Badge variant="default">Shipped</Badge>}
      {status === 'delivered' && <Badge variant="default">Delivered</Badge>}
      {status === 'cancelled' && <Badge variant="destructive">Cancelled</Badge>}
    </>
  );
};

export default TransactionStatusBadge;
