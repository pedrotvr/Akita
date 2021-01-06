import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  MultiActiveState,
  StoreConfig,
} from '@datorama/akita';
import { Product } from '../models/product.model';

export interface ProductState extends EntityState<Product>, MultiActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'product',
  resettable: true,
})
export class ProductStore extends EntityStore<ProductState> {
  constructor() {
    super({ active: [] });
  }
}
