import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { Product } from 'src/app/core/product/models/product.model';
import { ProductService } from 'src/app/core/product/services/product.service';
import { ProductQuery } from 'src/app/core/product/states/product.query';

@Component({
  selector: 'app-products-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  loading$: Observable<boolean> | undefined;
  search = new FormControl();
  sortControl = new FormControl('price');

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private productQuery: ProductQuery
  ) {}

  ngOnInit() {
    this.productService.get().subscribe();
    this.loading$ = this.productQuery.selectLoading();

    this.products$ = combineLatest([
      this.search.valueChanges.pipe(startWith('')),
      this.sortControl.valueChanges.pipe(startWith('price')),
    ]).pipe(
      switchMap(([term, sortBy]) =>
        this.productQuery.getProducts(term, sortBy as keyof Product)
      )
    );
  }

  addProductToCart({ id }: Product) {
    this.cartService.addProductToCart(id);
  }

  subtract({ id }: Product) {
    this.cartService.subtract(id);
  }
}
