import { Injectable } from '@angular/core';
import { QueryConfig, QueryEntity } from '@datorama/akita';
import { Product } from '../models/product.model';
import { ProductState, ProductStore } from './product.store';

@Injectable({ providedIn: 'root' })
@QueryConfig({ sortBy: 'price' })
export class ProductQuery extends QueryEntity<ProductState> {
  constructor(protected store: ProductStore) {
    super(store);
  }

  getProducts(term: string, sortBy: keyof Product) {
    return this.selectAll({
      sortBy,
      filterBy: (entity) =>
        entity.title.toLowerCase().includes(term) ||
        entity.description.toLowerCase().includes(term),
    });
  }
}
