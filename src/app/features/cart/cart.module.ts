import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CartRoutingModule } from './cart-routing.module';



@NgModule({
  declarations: [CartPageComponent],
  imports: [
    CartRoutingModule,
    CommonModule
  ]
})
export class CartModule { }
