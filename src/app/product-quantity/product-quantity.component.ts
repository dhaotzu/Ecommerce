import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product: Product;
  @Input('quantity') quantity;
  
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }
}
