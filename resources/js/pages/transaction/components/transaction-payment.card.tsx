import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatRupiah } from '@/lib/utils';
import { Transaction } from '@/types/transaction';
import { Upload } from 'lucide-react';
import { FC } from 'react';
import TransactionUploadMediaSheet from './transaction-upload-media-sheet';

type Props = {
  transaction: Transaction;
};

const TransactionPaymentCard: FC<Props> = ({ transaction }) => {
  return (
    <Card className="break-inside-avoid">
      <CardHeader>
        <CardTitle>Pembayaran</CardTitle>
        <CardDescription>Informasi pembayaran</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <h1 className="text-xl font-semibold">{formatRupiah(transaction.total_price)}</h1>
      </CardContent>
      {transaction.paid === false && (
        <>
          <CardFooter>
            <TransactionUploadMediaSheet transaction={transaction}>
              <Button>
                <Upload />
                Upload Bukti Pembayaran
              </Button>
            </TransactionUploadMediaSheet>
          </CardFooter>
        </>
      )}
      <CardContent>
        <div className="grid grid-cols-3 gap-1">
          {transaction.media?.map((media) => (
            <img key={media.id} src={media.preview_url} alt={media.name} className="aspect-square w-full object-cover" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionPaymentCard;
