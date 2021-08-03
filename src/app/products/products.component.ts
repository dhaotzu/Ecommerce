import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products = [];
  filteredProducts =[];
  category: string;
  cart = [];
  subscription;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) { 
    this.productService.getAll().
    subscribe(products => {
      this.products = products;
    
      this.route.queryParamMap.subscribe(param => {
        this.category = param.get('category');
  
        this.filteredProducts = (this.category)? 
        this.products.filter(p => p.category === this.category) :
        this.products;
      })
    });
  }
  async ngOnInit(){
    let cart$ = (await this.shoppingCartService.getCartItems());
    this.subscription =  cart$.subscribe(cart => {
      cart.forEach(item => {
        this.cart[item.product.productId] = item;
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
