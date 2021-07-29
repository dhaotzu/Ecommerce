import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products = [];
  filteredProducts =[];
  category: string;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,) { 
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

}
