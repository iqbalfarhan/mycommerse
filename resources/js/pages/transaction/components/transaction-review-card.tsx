import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Transaction } from '@/types/transaction';
import { useForm } from '@inertiajs/react';
import { Send, Star } from 'lucide-react';
import { FC } from 'react';

type Props = {
  transaction: Transaction;
};

const TransactionReviewCard: FC<Props> = ({ transaction }) => {
  const { data, setData } = useForm({
    rating: 0,
    review: '',
  });

  if (transaction.status !== 'delivered') return null;

  return (
    <Card className="break-inside-avoid">
      <CardHeader>
        <CardTitle>Review</CardTitle>
        <CardDescription>Review kamu tentang barang kami</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-6">
        {/* Review Text */}
        <FormControl label="Review">
          <Textarea placeholder="Tulis review anda..." value={data.review} onChange={(e) => setData('review', e.target.value)} />
        </FormControl>

        {/* Rating */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => {
            const value = index + 1;
            return (
              <label key={value} className="cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  checked={data.rating === value}
                  onChange={() => setData('rating', value)}
                  className="hidden"
                />
                <Star className={`text-lg ${data.rating >= value ? 'fill-yellow-500 stroke-yellow-500' : 'text-yellow-500'}`} />
              </label>
            );
          })}
        </div>
      </CardContent>
      <Separator />
      <CardFooter>
        <SubmitButton label="Kirim review" icon={Send} />
      </CardFooter>
    </Card>
  );
};

export default TransactionReviewCard;
