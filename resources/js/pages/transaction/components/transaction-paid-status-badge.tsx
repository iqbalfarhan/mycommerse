import { Badge } from '@/components/ui/badge';
import { Transaction } from '@/types/transaction';
import { FC } from 'react';

type Props = {
  paid: Transaction['paid'];
};

const TransactionPaidStatusBadge: FC<Props> = ({ paid }) => {
  return <>{paid ? <Badge variant="success">Sudah dibayar</Badge> : <Badge variant="warning">Belum dibayar</Badge>}</>;
};

export default TransactionPaidStatusBadge;
