import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthQuery } from '../states/auth.query';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private authQuery: AuthQuery) {}

  canActivate(): Observable<boolean> {
    // For sync storage
    return this.authQuery.isLoggedIn$.pipe(
      map((isAuth) => {
        if (isAuth) {
          return true;
        }
        this.router.navigateByUrl('login');
        return false;
      }),
      take(1)
    );
  }
}
