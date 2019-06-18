import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AUTH_SERVICE, PUBLIC_FALLBACK_PAGE_URI, PROTECTED_FALLBACK_PAGE_URI } from './auth';
import { AuthModule, AuthenticationService, TokenStorage } from './auth';
import { CustomValidatorsModule } from './validators';

export function factory(authenticationService: AuthenticationService) {
  return authenticationService;
}

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    CustomValidatorsModule
  ],
  providers: [
    TokenStorage,
    AuthenticationService,
    { provide: PROTECTED_FALLBACK_PAGE_URI, useValue: '/boards' },
    { provide: PUBLIC_FALLBACK_PAGE_URI, useValue: '/login' },
    {
      provide: AUTH_SERVICE,
      deps: [ AuthenticationService ],
      useFactory: factory
    }
  ]
})
export class CoreModule { }
