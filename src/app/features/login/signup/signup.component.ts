import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthService,
  Credentials,
} from './../../../core/auth/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  login!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.login = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control(''),
    });
  }

  submit() {
    console.log(this.login.value as Credentials);
    this.authService.login(this.login.value as Credentials).subscribe(() => {
      this.router.navigateByUrl('product');
    });
  }
}
