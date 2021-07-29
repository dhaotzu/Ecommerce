import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }
  
  create(product) {
    return this.db.collection('products').add(product)
  }

  getAll() {
    return this.db.collection('products', ref => 
    ref.orderBy('title')) //sort the order of product list
    .valueChanges({idField: 'productId'}); 
  }

  getProduct(productId: string) {
    return this.db.collection('products').doc(productId).valueChanges();
  }

  update(productId, product) {
    return this.db.collection('products').doc(productId).update(product);
  }

  delete(productId) {
    return this.db.collection('products').doc(productId).delete();
  }
}
