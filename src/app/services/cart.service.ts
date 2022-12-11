import { Injectable } from '@angular/core';
import {Books} from "../books/store/books";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Books[] = [];
  constructor() { }

  addToCart(product: Books) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
