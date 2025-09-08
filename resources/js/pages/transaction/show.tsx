import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';
import { SharedData } from '@/types';
import { Transaction } from '@/types/transaction';
import { usePage } from '@inertiajs/react';
import { Edit, Upload } from 'lucide-react';
import { FC } from 'react';
import TransactionBuyerInfoCard from './components/transaction-buyer-info-card';
import TransactionDeliveredAction from './components/transaction-delivered-action';
import TransactionFormSheet from './components/transaction-form-sheet';
import TransactionItemCard from './components/transaction-item-card';
import TransactionPaymentCard from './components/transaction-payment.card';
import TransactionReviewCard from './components/transaction-review-card';
import TransactionStatusStep from './components/transaction-status-steps';
import TransactionUploadMediaSheet from './components/transaction-upload-media-sheet';

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
      <Dialog
        open={transaction.media?.length === 0}
        onOpenChange={(open) => {
          if (open === false) window.history.back();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Belum melakukan pembayaran</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <p>
            Lakukan pembayaran sebesar {formatRupiah(Number(transaction.total_price))} ke nomor rekening 0891032005 Bank BNI Atas nama iqbal farhan
            syuhada.
          </p>
          <p>dan upload bukti pembayaran, pada form berikut ini, admin akan memproses pembelian kamu apabila informasi pembayaran sudah sesuai.</p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'outline'}>Close</Button>
            </DialogClose>
            <TransactionUploadMediaSheet transaction={transaction}>
              <Button>
                <Upload />
                Upload bukti pembayaran
              </Button>
            </TransactionUploadMediaSheet>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="columns-1 gap-6 space-y-6 lg:columns-2 xl:columns-3">
        <TransactionStatusStep status={transaction.status} />
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
