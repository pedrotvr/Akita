import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { persistState } from '@datorama/akita';

const akitaLocalStorage = persistState({
  key: 'akitaLocalStorage',
  include: ['auth'],
});

const akitaSessionStorage = persistState({
  key: 'akitaSessionStorage',
  storage: sessionStorage, // Default is localStorage
  include: ['cart'],
});

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: 'persistStorage', useValue: akitaLocalStorage },
    { provide: 'persistStorage', useValue: akitaSessionStorage },
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: 'persistStorage', useValue: akitaLocalStorage },
        { provide: 'persistStorage', useValue: akitaSessionStorage },
      ],
    };
  }
}
