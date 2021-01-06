import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { CartQuery } from 'src/app/core/cart/states/cart.query';
import { Product } from 'src/app/core/product/models/product.model';
import { ProductService } from 'src/app/core/product/services/product.service';
import { ProductQuery } from 'src/app/core/product/states/product.query';
import { Cart } from './../../../core/cart/models/cart.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  items$: Observable<(Cart & Product)[]> | undefined;
  total$: Observable<number> | undefined;
  cartItems$: Observable<Cart[]> | undefined;
  productItems$: Observable<Product[]> | undefined;

  constructor(
    private cartQuery: CartQuery,
    private productQuery: ProductQuery,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.cartItems$ = this.cartQuery.selectAll();
    this.productItems$ = this.productQuery.selectAll();

    // this.cartItems$.subscribe((data) => console.log(data));

    // this.productItems$.subscribe((data) => console.log(data));

    combineLatest([this.cartItems$, this.productItems$]).subscribe(
      ([carts, products]) => {
        carts.forEach((cart) => {
          if (!products.find((product) => product.id == cart.productId)) {
            this.productService.getProduct(cart.productId).subscribe();
          }
        });
      }
    );

    this.items$ = this.cartQuery.selectItems$;

    this.total$ = this.cartQuery.selectTotal$;
  }

  remove({ productId }: Cart) {
    this.cartService.remove(productId);
  }
}
