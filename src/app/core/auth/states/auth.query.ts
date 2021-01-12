import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { filter, map } from 'rxjs/operators';
import { AuthState, AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  isLoggedIn$ = this.select(({ user }) => toBoolean(user));

  userFirstName$ = this.select().pipe(
    filter(({ user }) => toBoolean(user)),
    map(({ user }) => `${user?.firstName}`)
  );

  constructor(protected store: AuthStore) {
    super(store);
  }
}
