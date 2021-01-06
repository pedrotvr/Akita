import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { Product } from '../../product/models/product.model';
import { createCart } from '../models/cart.model';
import { CartQuery } from '../states/cart.query';
import { CartStore } from '../states/cart.store';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private cartStore: CartStore, private cartQuery: CartQuery) {}

  addProductToCart(productId: Product['id']) {
    const findItem = this.cartQuery.getEntity(productId);
    if (!!findItem) {
      return this.cartStore.updateQuantity(productId);
    }

    const item = createCart({
      productId,
    });

    return this.cartStore.add(item);
  }

  subtract(productId: Product['id']) {
    const findItem = this.cartQuery.getEntity(productId);
    if (!!findItem) {
      if (findItem.quantity === 1) {
        return this.cartStore.remove(productId);
      }

      return this.cartStore.updateQuantity(findItem.productId, -1);
    }
  }

  remove(productId: ID) {
    this.cartStore.remove(productId);
  }
}
