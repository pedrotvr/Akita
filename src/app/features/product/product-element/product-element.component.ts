import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/core/product/models/product.model';

@Component({
  selector: 'app-product-element',
  templateUrl: './product-element.component.html',
  styleUrls: ['./product-element.component.scss'],
})
export class ProductElementComponent implements OnInit {
  @Input() product: Product | undefined;
  @Output() add = new EventEmitter<Product>();
  @Output() subtract = new EventEmitter<Product>();

  constructor() {}

  ngOnInit(): void {}
}
