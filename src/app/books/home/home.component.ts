import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { invokeBooksAPI, invokeDeleteBookAPI } from '../store/books.action';
import { selectBooks } from '../store/books.selector';
import {CartService} from "../../services/cart.service";
import {Books} from "../store/books";

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store,
              private appStore: Store<Appstate>,
              private cartService: CartService) {}

  books$ = this.store.pipe(select(selectBooks));

  deleteModal: any;
  idToDelete: number = 0;

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );

    this.store.dispatch(invokeBooksAPI());
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  addToCart(product: Books) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  delete() {
    let val = localStorage.getItem('isUserLoggedIn');
    if (val == 'true') {
      this.store.dispatch(
          invokeDeleteBookAPI({
            id: this.idToDelete,
          })
      );
      let apiStatus$ = this.appStore.pipe(select(selectAppState));
      apiStatus$.subscribe((apState) => {
        if (apState.apiStatus == 'success') {
          this.deleteModal.hide();
          this.appStore.dispatch(
              setAPIStatus({apiStatus: {apiResponseMessage: '', apiStatus: ''}})
          );
        }
      });
    } else {
      this.deleteModal.hide();
      alert('Please login to delete the book');
    }
  }
}
