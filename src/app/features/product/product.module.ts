import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductElementComponent } from './product-element/product-element.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [ProductPageComponent, ProductElementComponent],
  imports: [
    ProductRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ProductModule {}
