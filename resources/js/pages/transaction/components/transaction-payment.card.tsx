import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatRupiah } from '@/lib/utils';
import { Transaction } from '@/types/transaction';
import { AlertCircleIcon } from 'lucide-react';
import { FC } from 'react';

type Props = {
  totalprice: Transaction['total_price'];
  paid: Transaction['paid'];
};

const TransactionPaymentCard: FC<Props> = ({ totalprice, paid }) => {
  return (
    <Card className="break-inside-avoid">
      <CardHeader>
        <CardTitle>Pembayaran</CardTitle>
        <CardDescription>Informasi pembayaran</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <h1 className="text-xl font-semibold">{formatRupiah(totalprice)}</h1>
      </CardContent>
      {paid === false && (
        <CardContent>
          <Alert variant={'destructive'}>
            <AlertCircleIcon />
            <AlertTitle>Belum melakukan pembayaran</AlertTitle>
            <AlertDescription>
              <p>
                Lakukan pembayaran sebesar {formatRupiah(Number(totalprice))} ke nomor rekening 0891032005 Bank BNI Atas nama iqbal farhan syuhada.
              </p>
              <p>
                dan upload bukti pembayaran, pada form berikut ini, admin akan memproses pembelian kamu apabila informasi pembayaran sudah sesuai.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      )}
    </Card>
  );
};

export default TransactionPaymentCard;
