import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of as observableOf } from 'rxjs';

@Injectable()
export class TokenStorage {

  storage: Storage | any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
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
   * Get access token
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    const token: string = <string>this.storage.getItem('accessToken');
    return observableOf(token);
  }

  /**
   * Get refresh token
   * @returns {Observable<string>}
   */
  public getRefreshToken(): Observable<string> {
    const token: string = <string>this.storage.getItem('refreshToken');
    return observableOf(token);
  }

  /**
   * Set access token
   * @returns {TokenStorage}
   */
  public setAccessToken(token: string): TokenStorage {
    this.storage.setItem('accessToken', token);
    return this;
  }

  /**
   * Set refresh token
   * @returns {TokenStorage}
   */
  public setRefreshToken(token: string): TokenStorage {
    this.storage.setItem('refreshToken', token);
    return this;
  }

  /**
   * Remove tokens
   */
  public clear() {
    this.storage.removeItem('accessToken');
    this.storage.removeItem('refreshToken');
  }
}
