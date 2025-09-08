import { Badge } from '@/components/ui/badge';
import { Transaction } from '@/types/transaction';
import { FC } from 'react';

type Props = {
  status: Transaction['status'];
};

const TransactionStatusBadge: FC<Props> = ({ status }) => {
  return (
    <>
      {status === 'pending' && <Badge variant="warning">Menuggu pembayaran</Badge>}
      {status === 'shipping' && <Badge variant="info">Dalam pengiriman</Badge>}
      {status === 'delivered' && <Badge variant="success">Sudah diterima</Badge>}
      {status === 'cancelled' && <Badge variant="destructive">Dibatalkan</Badge>}
    </>
  );
};

export default TransactionStatusBadge;
