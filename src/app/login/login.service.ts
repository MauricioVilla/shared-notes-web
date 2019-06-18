import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '@env/environment';
import {Observable} from 'rxjs';
import {LoginContext} from '@app/core/auth/authentication.service';

const routes = {
  base: `${env.apiUrl}`,
};

export interface LoginContext {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {}

  getCurrentUser() {
    return this.httpClient.get(`${routes.base}/user/`);
  }

  public logIn(context: LoginContext): Observable<any> {
    return this.httpClient.post(`${routes.base}/tokens/`, context);
  }
}
