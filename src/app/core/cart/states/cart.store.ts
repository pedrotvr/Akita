import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Product } from '../../product/models/product.model';
import { Cart } from '../models/cart.model';

export interface CartState extends EntityState<Cart> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'cart',
  idKey: 'productId',
  resettable: true,
})
export class CartStore extends EntityStore<CartState> {
  constructor() {
    super();
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
