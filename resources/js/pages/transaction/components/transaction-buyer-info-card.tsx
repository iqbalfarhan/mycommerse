import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User } from '@/types';
import { FC } from 'react';

type Props = {
  user: User;
};

const TransactionBuyerInfoCard: FC<Props> = ({ user }) => {
  return (
    <Card className="break-inside-avoid">
      <CardHeader>
        <CardTitle>Informasi pembeli</CardTitle>
        <CardDescription>informasi kontak pembeli</CardDescription>
      </CardHeader>
      <Separator />
      <CardHeader>
        <Avatar className="size-9 rounded-lg">
          <AvatarImage src={user.avatar} />
        </Avatar>
      </CardHeader>
      <CardHeader>
        <CardDescription>{user.email}</CardDescription>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardHeader>
        <CardDescription>Nomor telepon</CardDescription>
        <CardTitle>{user.phone ?? '-'}</CardTitle>
      </CardHeader>
      <CardHeader>
        <CardDescription>Alamat</CardDescription>
        <CardTitle className="leading-normal">{user.address ?? '-'}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default TransactionBuyerInfoCard;
