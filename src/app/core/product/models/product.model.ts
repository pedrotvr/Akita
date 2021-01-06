import { ID } from '@datorama/akita';

export interface Product {
  id: ID;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

export function createProduct(params: Partial<Product>) {
  return {} as Product;
}
