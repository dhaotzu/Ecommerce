import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/categories.service';
import { ProductService } from 'src/app/product.service';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product = {
    title: null,
    price: null,
    category: null,
    imageFile: null
  };
  id;
  constructor(
    private categoriesService: CategoriesService, 
    private productService: ProductService, 
    private route: ActivatedRoute,
    private router: Router) { 
    this.categories$ = this.categoriesService.getCategories();
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.id) this.productService.getProduct(this.id).pipe(
      take(1)
    ).subscribe((p: Product) => this.product = p);
  }


  ngOnInit(): void {}

  save(product) {
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(confirm('Delete ' + this.product.title +'?')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }
}
