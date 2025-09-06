import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Transaction } from '@/types/transaction';
import { CheckCheck, CopySlash, LogIn, LucideIcon, Pickaxe, Sailboat } from 'lucide-react';
import { FC } from 'react';

type Props = {
  status: Transaction['status'];
};

const statusSteps: {
  status: Transaction['status'];
  icon: LucideIcon;
  label: string;
}[] = [
  {
    status: 'pending',
    icon: LogIn,
    label: 'Pesanan telah dibuat',
  },
  {
    status: 'pending',
    icon: CopySlash,
    label: 'Menunggu pembayaran',
  },
  {
    status: 'shipping',
    icon: CheckCheck,
    label: 'Pembayaran diverifikasi',
  },
  {
    status: 'shipping',
    icon: Sailboat,
    label: 'Pesanan dalam pengiriman',
  },
  {
    status: 'delivered',
    icon: Pickaxe,
    label: 'Pesanan diterima',
  },
];

// definisi urutan status
const statusOrder: Transaction['status'][] = ['pending', 'shipping', 'delivered'];

const TransactionStatusStep: FC<Props> = ({ status }) => {
  // cari index status sekarang
  const currentIndex = statusOrder.indexOf(status);

  return (
    <Card className="break-inside-avoid">
      <CardHeader>
        <CardTitle>Cek status pengiriman</CardTitle>
        <CardDescription>Log status pengiriman</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col">
        {statusSteps.map((step, idx) => {
          const stepIndex = statusOrder.indexOf(step.status);
          const isActive = stepIndex <= currentIndex;

          return (
            <Button key={idx} variant={'ghost'} className={`justify-start ${isActive ? '' : 'text-primary'}`} disabled={!isActive}>
              <step.icon className="mr-2 h-4 w-4" />
              {step.label}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TransactionStatusStep;
