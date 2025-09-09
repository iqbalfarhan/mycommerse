import AppLayout from '@/layouts/app-layout';
import { Transaction } from '@/types/transaction';
import { FC } from 'react';
import TransactionBuyerInfoCard from './components/transaction-buyer-info-card';
import TransactionDeliveredAction from './components/transaction-delivered-action';
import TransactionItemCard from './components/transaction-item-card';
import TransactionPaymentCard from './components/transaction-payment.card';
import TransactionReviewCard from './components/transaction-review-card';
import TransactionStatusStep from './components/transaction-status-steps';

type Props = {
  transaction: Transaction;
};

const ShowTransaction: FC<Props> = ({ transaction }) => {
  return (
    <AppLayout title="Detail Transaction" description="Detail transaction">
      <div className="columns-1 gap-6 space-y-6 lg:columns-2 xl:columns-3">
        <TransactionStatusStep transaction={transaction} />
        <TransactionDeliveredAction transaction={transaction} />
        <TransactionItemCard items={transaction.items} />
        <TransactionBuyerInfoCard user={transaction.user} />
        <TransactionPaymentCard transaction={transaction} />
        <TransactionReviewCard review={transaction.review} purpose={transaction.review ? 'edit' : 'create'} />
      </div>
    </AppLayout>
  );
};

export default ShowTransaction;
