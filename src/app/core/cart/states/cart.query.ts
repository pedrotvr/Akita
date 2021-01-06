import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ProductQuery } from 'src/app/core/product/states/product.query';
import { Product } from '../../product/models/product.model';
import { Cart } from './../models/cart.model';
import { CartState, CartStore } from './cart.store';

@Injectable({ providedIn: 'root' })
export class CartQuery extends QueryEntity<CartState> {
  constructor(protected store: CartStore, private productQuery: ProductQuery) {
    super(store);
  }

  selectItems$ = combineLatest([
    this.selectAll(),
    this.productQuery.selectAll({ asObject: true }),
  ]).pipe(map(this.joinItems), shareReplay({ bufferSize: 1, refCount: true }));

  selectTotal$ = this.selectItems$.pipe(
    map((items) =>
      items.reduce(
        (acc: number, item: { total: number }) => acc + item.total,
        0
      )
    )
  );

  selectTotalQuantity$ = this.selectItems$.pipe(
    map((items) => {
      return items.reduce(
        (acc: number, item: { quantity: number }) => acc + item.quantity,
        0
      );
    })
  );

  joinItems([cartItems, products]: any): (Cart & Product)[] {
    return cartItems.map((cart: Cart) => {
      const product = products[cart.productId];
      return {
        ...cart,
        ...product,
        total: cart.quantity * product?.price,
      };
    });
  }
}
