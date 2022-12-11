import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./shared/user/login/login.component";
import {LogoutComponent} from "./shared/user/logout/logout.component";
import {CartComponent} from "./cart/cart.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  { path: 'cart', component: CartComponent },
  {path: '', loadChildren: () =>
        import('./books/books.module').then((b) => b.BooksModule),},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
