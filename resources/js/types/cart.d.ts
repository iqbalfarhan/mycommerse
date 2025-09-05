import { User } from '.';
import { Product } from './product';

export type Cart = {
  id: number;
  user_id: User['id'];
  user: User;
  product_id: Product['id'];
  product: Product;
  qty: number;
  created_at: string;
  updated_at: string;
};
