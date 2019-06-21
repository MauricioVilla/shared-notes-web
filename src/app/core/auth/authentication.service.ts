import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, of as observableOf, throwError} from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

import { environment as env } from '@env/environment';
import { AuthService } from './auth.service';
import { TokenStorage } from './token-storage.service';
import {isPlatformBrowser} from '@angular/common';

interface AccessData {
  access: string;
  refresh: string;
}

export interface LoginContext {
  username: string;
  password: string;
}

const routes = {
  login: `${env.apiUrl}/tokens/`,
  refresh: `${env.apiUrl}/tokens/refresh/`
};

@Injectable()
export class AuthenticationService implements AuthService {
  storage: Storage | any;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.storage = localStorage;
    } else {
      this.storage = {
        getItem: key => null,
        removeItem: key => {},
        setItem: (key, data) => {},
      };
    }
  }

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @returns {Observable<boolean>}
   * @memberOf AuthService
   */
  public isAuthorized(): Observable<boolean> {
    return this.tokenStorage
      .getAccessToken()
      .pipe(map(token => !!token));
  }

  /**
   * Get access token
   * @description Should return access token in Observable.
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    return this.tokenStorage.getAccessToken();
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   * @returns {Observable<any>}
   */
  public refreshToken(): Observable<AccessData> {
    return this.tokenStorage
      .getRefreshToken()
      .pipe(
        switchMap((refresh: string) =>
          this.http.post(routes.refresh, { refresh })
        ),
        tap((tokens: AccessData) => this.refreshAccessToken(tokens)),
        catchError((err) => {
          this.logout();

          return throwError(err);
        })
      );
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentialy checks status
   * @param {Response} response
   * @returns {boolean}
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 403;
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   * @param {string} url
   * @returns {boolean}
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/refresh/');
  }

  /**
   * Login
   * @param {LoginContext} context The login parameters.
   * @return {Observable<any>} The user credentials.
   */
  public login(context: LoginContext): Observable<any> {
    return this.http.post(routes.login, { username: context.username, password: context.password })
      .pipe(tap((tokens: AccessData) => this.saveAccessData(tokens)));
  }

  /**
   * Logout
   */
  public logout(): void {
    this.tokenStorage.clear();
    localStorage.clear();
    localStorage.removeItem('saveData');
    // location.reload(true);
  }

  /**
   * Get the current user logged
   */
  getCurrentUser(username: string): Observable<any> {
    return this.http.get(`${env.apiUrl}/users/get_user/${username}/`);
  }


  public getUsernameStorage(): Observable<string> {
    const username: string = <string>this.storage.getItem('username');
    return observableOf(username);
  }

  public getUserIdStorage(): Observable<string> {
    const userId: string = <string>this.storage.getItem('userId');
    return observableOf(userId);
  }

  /**
   * Save new access token to local storage.
   *
   * @private
   * @param {AccessData} data
   */
  private refreshAccessToken({ access }: AccessData) {
    this.tokenStorage
      .setAccessToken(access);
  }

  /**
   * Save access data in the storage
   *
   * @private
   * @param {AccessData} data
   */
  private saveAccessData({ access, refresh }: AccessData) {
    this.tokenStorage
      .setAccessToken(access)
      .setRefreshToken(refresh);
  }

}
