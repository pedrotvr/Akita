import { Injectable } from '@angular/core';
import { resetStores, Store, StoreConfig } from '@datorama/akita';
import { User } from '../models/user.model';

export interface AuthState {
  user: User | null;
}

export function createInitialState(): AuthState {
  return {
    user: null,
  };
}

export function createSession(user: User) {
  return { ...user };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }

  login(data: User) {
    const user = createSession(data);
    this.update({ user });
  }

  logout() {
    resetStores();
    this.update(createInitialState());
  }
}
