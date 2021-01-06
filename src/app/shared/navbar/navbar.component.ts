import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { AuthQuery } from 'src/app/core/auth/states/auth.query';
import { CartQuery } from 'src/app/core/cart/states/cart.query';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  navItems = [
    'Todos',
    'Contacts',
    'Stories',
    'Movies',
    'Widgets',
    'Posts',
    'FormsManager',
  ];
  count$: Observable<number>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private cartQuery: CartQuery,
    private authService: AuthService,
    private authQuery: AuthQuery,
    private router: Router
  ) {
    this.count$ = this.cartQuery.selectTotalQuantity$; //selectCount();
    this.isLoggedIn$ = this.authQuery.isLoggedIn$;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

  resetStores() {
    this.router.navigateByUrl('login');
  }
}
