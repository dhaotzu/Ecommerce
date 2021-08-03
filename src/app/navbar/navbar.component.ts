import { Component, OnInit } from '@angular/core';
import { AdminAuthGuardService } from '../admin-auth-guard.service';
import { AuthService } from '../auth.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isAdmin: boolean;
  faShoppingCart = faShoppingCart;
  shoppingCartItemCount: number;

  constructor(
    public auth: AuthService, 
    private adminAuthGuardService: AdminAuthGuardService,
    private shoppingCartService: ShoppingCartService
    ) {}

  async ngOnInit(){
    this.adminAuthGuardService.canActivate().subscribe(data => {
      this.isAdmin = data;
    })
    //get total item count in cart
    // let cart$ = (await this.shoppingCartService.getCartItems());
    // cart$.subscribe(cart => {
    //   this.shoppingCartItemCount = this.shoppingCartService.getCartItemCount(cart);
    // })
  }

  logout() {
    this.auth.logout();
  }

}
