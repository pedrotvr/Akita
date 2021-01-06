import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, timer } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthStore } from '../states/auth.store';

const user: User = {
  firstName: 'Pedro',
  lastName: 'Fernandes',
  token: 'xpto123otpx',
};

export type Credentials = {
  username: string;
  password: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authStore: AuthStore, private http: HttpClient) {}

  login(cred: Credentials) {
    return cred.username === 'admin' && cred.password === 'admin'
      ? timer(300).pipe(
          mapTo(user),
          tap((user: User) => this.authStore.login(user))
        )
      : throwError('Invalid username or password');
  }

  logout() {
    this.authStore.logout();
  }
}
