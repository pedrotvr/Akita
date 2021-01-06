import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthQuery } from './core/auth/states/auth.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'akita-project';

  isLoggedIn$: Observable<boolean>;

  constructor(private authQuery: AuthQuery) {
    this.isLoggedIn$ = this.authQuery.isLoggedIn$;
  }
}
