import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Review } from '@/types/review';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import ReviewDeleteDialog from './review-delete-dialog';
import ReviewFormSheet from './review-form-sheet';

type Props = {
  review: Review;
};

const ReviewItemCard: FC<Props> = ({ review }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{review.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {review.id}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('review.show', review.id)}>
            <Folder />
          </Link>
        </Button>
        <ReviewFormSheet purpose="edit" review={review}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </ReviewFormSheet>
        <ReviewDeleteDialog review={review}>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </ReviewDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default ReviewItemCard;
