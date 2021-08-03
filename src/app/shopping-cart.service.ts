import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cartId: string;

  constructor(private db: AngularFirestore) {  }

  private create() {
    return this.db.collection('shopping-cart').add({
      dateCreated: new Date().getTime()
    })
  }

  async addToCart(product: Product) {
    this.updateQuantity(product, +1);
  }

  async removeFromCart(product: Product) {
    this.updateQuantity(product, -1);
  }

  async clearCart() {
    let cart$ = await this.getCartItems();
    cart$.subscribe(cart => {
      cart.forEach(item => {
        this.db.collection('shopping-cart').doc(this.cartId).collection('items').doc(item.product.productId).delete();
      });

    })
  }

  async getCartItems() {
    this.cartId? this.cartId : await this.getOrCreateACart();
    return this.db.collection('shopping-cart').doc(this.cartId).collection('items').valueChanges();
  }

  getCartItemCount(cart): number {
    let cartItemCount = 0;
    cart.forEach(item => {
      cartItemCount += item.quantity;
    });
    return cartItemCount;
  }

  getTotalPrice(cart): number {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.product.price * item.quantity;
    });
    return totalPrice;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.collection('shopping-cart').doc(cartId).collection('items').doc(productId);
  }

  private async getOrCreateACart(): Promise<string> {
    this.cartId = localStorage.getItem('cartId');
    if (this.cartId) return this.cartId;

    let result = await this.create()
    this.cartId = result.id
    localStorage.setItem('cartId', result.id);
    return this.cartId;
  }

  private deleteFromCart(cartId, productId) {
    return this.db.collection('shopping-cart').doc(cartId).collection('items').doc(productId).delete();
  }

  private async updateQuantity(product: Product, change: number) {
    this.cartId? this.cartId : await this.getOrCreateACart();
    let item$ = this.getItem(this.cartId, product.productId);
    let that = this;
    item$.valueChanges().pipe(
      take(1)
    ).subscribe((item: any) => {
      let quantity = (item ? item.quantity : 0);
      item$.set({ product: product, quantity: quantity + change });
      if (quantity === 1 && change === -1) that.deleteFromCart(this.cartId, product.productId);
    });
  }
}
