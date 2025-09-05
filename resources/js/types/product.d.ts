import { Media } from '.';
import { Category } from './category';

export type Product = {
  id: number;
  name: string;
  description: string;
  category_id: Category['id'];
  category: Category;
  price: number;
  thumbnail: string;
  media: Media[];
  stock: number;
  created_at: string;
  updated_at: string;
};
