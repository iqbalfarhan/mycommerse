import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Transaction } from '@/types/transaction';
import { usePage } from '@inertiajs/react';
import { Edit } from 'lucide-react';
import { FC } from 'react';
import TransactionBuyerInfoCard from './components/transaction-buyer-info-card';
import TransactionDeliveredAction from './components/transaction-delivered-action';
import TransactionFormSheet from './components/transaction-form-sheet';
import TransactionItemCard from './components/transaction-item-card';
import TransactionPaymentCard from './components/transaction-payment.card';
import TransactionReviewCard from './components/transaction-review-card';
import TransactionStatusStep from './components/transaction-status-steps';

type Props = {
  transaction: Transaction;
};

const ShowTransaction: FC<Props> = ({ transaction }) => {
  const { permissions } = usePage<SharedData>().props;
  return (
    <AppLayout
      title="Detail Transaction"
      description="Detail transaction"
      actions={
        <>
          {permissions?.canUpdate && (
            <TransactionFormSheet purpose="edit" transaction={transaction}>
              <Button>
                <Edit />
                Edit transaction
              </Button>
            </TransactionFormSheet>
          )}
        </>
      }
    >
      <div className="columns-1 gap-6 space-y-6 lg:columns-2 xl:columns-3">
        <TransactionStatusStep status={transaction.status} />
        <TransactionDeliveredAction transaction={transaction} />
        <TransactionItemCard items={transaction.items} />
        <TransactionBuyerInfoCard user={transaction.user} />
        <TransactionPaymentCard paid={transaction.paid} totalprice={transaction.total_price} />
        <TransactionReviewCard review={transaction.review} purpose={transaction.review ? 'edit' : 'create'} />
      </div>
    </AppLayout>
  );
};

export default ShowTransaction;
