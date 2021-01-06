import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/guards/auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';

const routes: Routes = [{ path: '',
                          component: CartPageComponent,
                          canActivate: [AuthGuard]
                        }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
