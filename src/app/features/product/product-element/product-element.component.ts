import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/product/models/product.model';
import { CartQuery } from './../../../core/cart/states/cart.query';

@Component({
  selector: 'app-product-element',
  templateUrl: './product-element.component.html',
  styleUrls: ['./product-element.component.scss'],
})
export class ProductElementComponent implements OnInit {
  @Input() product: Product | undefined;
  @Output() add = new EventEmitter<Product>();
  @Output() subtract = new EventEmitter<Product>();
  cartLoading$: Observable<boolean> | undefined;

  constructor(private cartQuery: CartQuery) {}

  ngOnInit(): void {
    this.cartLoading$ = this.cartQuery.selectLoadingEntity(this.product?.id);
  }

  isLoading(id: ID | undefined) {
    return this.cartQuery.selectLoadingEntity(id);
  }
}
