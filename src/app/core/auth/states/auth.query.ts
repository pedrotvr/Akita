import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { filter, map } from 'rxjs/operators';
import { AuthStore, AuthState } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {

  isLoggedIn$ = this.select(({ user }) => toBoolean(user));

  loggedInUser$ = this.select().pipe(
      filter(({ user }) => toBoolean(user)),
      map(({ user }) => `${user?.firstName} ${user?.lastName}`)
  );

  constructor(protected store: AuthStore) {
    super(store);
  }

}
