import { Injectable } from '@angular/core';
import { cacheable, ID } from '@datorama/akita';
import { Observable, timer } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';
import { products } from '../mocks/product.mocks';
import { Product } from '../models/product.model';
import { ProductStore } from '../states/product.store';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private productStore: ProductStore) {}

  get(): Observable<void> {
    const request = timer(500).pipe(
      mapTo(products),
      map((response) => {
        this.productStore.set(response);
      })
    );

    return cacheable(this.productStore, request);
  }

  getProduct(id: ID) {
    const product = products.find((current) => current.id === +id);

    return timer(500).pipe(
      mapTo(product),
      tap((product) => this.productStore.add(product as Product))
    );
  }
}
