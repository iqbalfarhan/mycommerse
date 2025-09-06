import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Transaction } from '@/types/transaction';
import { Edit } from 'lucide-react';
import { FC } from 'react';
import TransactionBuyerInfoCard from './components/transaction-buyer-info-card';
import TransactionFormSheet from './components/transaction-form-sheet';
import TransactionItemCard from './components/transaction-item-card';
import TransactionPaymentCard from './components/transaction-payment.card';
import TransactionReviewCard from './components/transaction-review-card';
import TransactionStatusStep from './components/transaction-status-steps';

type Props = {
  transaction: Transaction;
};

const ShowTransaction: FC<Props> = ({ transaction }) => {
  return (
    <AppLayout
      title="Detail Transaction"
      description="Detail transaction"
      actions={
        <>
          <TransactionFormSheet purpose="edit" transaction={transaction}>
            <Button>
              <Edit />
              Edit transaction
            </Button>
          </TransactionFormSheet>
        </>
      }
    >
      <div className="columns-1 gap-6 space-y-6 lg:columns-2 xl:columns-3">
        <TransactionStatusStep status={transaction.status} />
        <TransactionItemCard items={transaction.items} />
        <TransactionBuyerInfoCard user={transaction.user} />
        <TransactionPaymentCard paid={transaction.paid} totalprice={transaction.total_price} />
        <TransactionReviewCard transaction={transaction} />
      </div>
    </AppLayout>
  );
};

export default ShowTransaction;
