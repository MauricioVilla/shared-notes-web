import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { AUTH_SERVICE, PUBLIC_FALLBACK_PAGE_URI } from './tokens';

/**
 * Guard, checks access token availability and allows or disallows access to page,
 * and redirects out
 *
 * usage: { path: 'test', component: TestComponent, canActivate: [ AuthGuard ] }
 *
 * @export
 */
@Injectable()
export class ProtectedGuard implements CanActivate, CanActivateChild {

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              @Inject(AUTH_SERVICE)private authService: AuthService,
              @Inject(PUBLIC_FALLBACK_PAGE_URI) private publicFallbackPageUri: string,
              private router: Router) { }

  /**
   * CanActivate handler
   */
  public canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthorized()
      .pipe(map((isAuthorized: boolean) => {
        if (!isAuthorized && !this.isPublicPage(state)) {
          this.navigate(this.publicFallbackPageUri, state);

          return false;
        }

        return true;
      }));
  }

  /**
   * CanActivateChild handler
   */
  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  /**
   * Check, if current page is public fallback page
   */
  private isPublicPage(state: RouterStateSnapshot): boolean {
    return state.url === this.publicFallbackPageUri;
  }

  /**
   * Navigate away from the app / path
   */
  private navigate(url: string, state: RouterStateSnapshot): void {
    if (url.startsWith('http') && isPlatformBrowser(this.platformId)) {
      window.location.href = url;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    }
  }
}