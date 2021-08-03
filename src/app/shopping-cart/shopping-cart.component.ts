import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  shoppingCartItemCount: number;
  totalPrice: number;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit(): Promise<void> {
    //get total item count in cart
    this.cart$ = (await this.shoppingCartService.getCartItems());
    this.cart$.subscribe(cart => {
      this.shoppingCartItemCount = this.shoppingCartService.getCartItemCount(cart);
      this.totalPrice = this.shoppingCartService.getTotalPrice(cart);
    })
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }
}
