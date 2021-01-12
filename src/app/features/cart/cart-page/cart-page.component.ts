import { Component, OnInit } from '@angular/core';
import { DirtyCheckPlugin, EntityDirtyCheckPlugin, ID } from '@datorama/akita';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  cartCollection!: DirtyCheckPlugin;
  cartSpecific!: EntityDirtyCheckPlugin;
  ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private cartQuery: CartQuery,
    private productQuery: ProductQuery,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.cartItems$ = this.cartQuery.selectAll();
    this.productItems$ = this.productQuery.selectAll();

    combineLatest([this.cartItems$, this.productItems$])
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(([carts, products]) => {
        //Podia ter feito um switchMap em cima
        carts.forEach((cart) => {
          const currentProduct = !products.find(
            (product) => product.id == cart.productId
          );
          if (currentProduct) {
            this.productService.getProduct(cart.productId).subscribe();
          }
        });
      });

    this.items$ = this.cartQuery.selectItems$;

    this.total$ = this.cartQuery.selectTotal$;

    this.cartSpecific = new EntityDirtyCheckPlugin(this.cartQuery).setHead();

    this.cartCollection = new DirtyCheckPlugin(this.cartQuery).setHead();
  }

  revert(productId: ID) {
    this.cartSpecific.reset(productId);
  }

  revertStore() {
    this.cartCollection.reset();
  }

  remove({ productId }: Cart) {
    this.cartService.remove(productId);
  }

  addProduct(productId: ID) {
    this.cartService.addProductToCart(productId);
  }

  subtractProduct(productId: ID) {
    this.cartService.subtract(productId);
  }

  ngOnDestroy() {
    this.cartCollection.destroy();
    this.cartSpecific.destroy();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
