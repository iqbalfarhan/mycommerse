import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Review } from '@/types/review';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, FolderArchive, Image, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ReviewDeleteDialog from './components/review-delete-dialog';
import ReviewFilterSheet from './components/review-filter-sheet';
import ReviewFormSheet from './components/review-form-sheet';
import ReviewBulkEditSheet from './components/review-bulk-edit-sheet';
import ReviewBulkDeleteDialog from './components/review-bulk-delete-dialog';
import ReviewUploadMediaSheet from './components/review-upload-sheet';

type Props = {
  reviews: Review[];
  query: { [key: string]: string };
};

const ReviewList: FC<Props> = ({ reviews, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Reviews"
      description="Manage your reviews"
      actions={
        <>
          {permissions?.canAdd && (
            <ReviewFormSheet purpose="create">
              <Button>
                <Plus />
                Create new review
              </Button>
            </ReviewFormSheet>
          )}
          
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search reviews..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <ReviewFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </ReviewFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <ReviewBulkEditSheet reviewIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </ReviewBulkEditSheet>
            <ReviewBulkDeleteDialog reviewIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </ReviewBulkDeleteDialog>
          </>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={ids.length === reviews.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(reviews.map((review) => review.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews
            .filter((review) => JSON.stringify(review).toLowerCase().includes(cari.toLowerCase()))
            .map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(review.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, review.id]);
                          } else {
                            setIds(ids.filter((id) => id !== review.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{ review.name }</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('review.show', review.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <>
                      
                      <ReviewFormSheet purpose="edit" review={review}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Edit />
                        </Button>
                      </ReviewFormSheet>
                    </>
                  )}
                  {permissions?.canDelete && (
                    <ReviewDeleteDialog review={review}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </ReviewDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default ReviewList;
