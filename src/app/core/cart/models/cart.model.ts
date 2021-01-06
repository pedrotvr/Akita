import { Product } from '../../product/models/product.model';

export interface Cart {
  productId: Product['id'];
  quantity: number;
  total: number;
}

export function createCart(params: Partial<Cart>) {
  return {
    total: 0,
    quantity: 1,
    ...params,
  } as Cart;
}
