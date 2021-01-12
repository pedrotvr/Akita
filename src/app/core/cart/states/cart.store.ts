import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  EntityUIStore,
  StoreConfig,
} from '@datorama/akita';
import { Product } from '../../product/models/product.model';
import { Cart } from '../models/cart.model';

export type CartUI = {
  isLoading: boolean;
};

export interface CartState extends EntityState<Cart> {}
export interface CartUIState extends EntityState<CartUI> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'cart',
  idKey: 'productId',
  resettable: true,
})
export class CartStore extends EntityStore<CartState> {
  ui!: EntityUIStore<CartUIState>;

  constructor() {
    super();
    this.createUIStore();
  }

  updateQuantity(productId: Product['id'], operand = 1) {
    this.update(productId, (entity) => {
      const newQuantity = entity.quantity + operand;
      return {
        ...entity,
        quantity: newQuantity,
      };
    });
  }
}
