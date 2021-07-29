import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category;
  categories$;

  constructor(private categoriesService: CategoriesService) { 
    this.categories$ = this.categoriesService.getAll();
  }

  ngOnInit(): void {
  }

}
