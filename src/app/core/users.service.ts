import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import { Logger } from '@app/core/logger.service';
import { UserModel } from '@app/core/user.model';

const log = new Logger('UserService');

const routes = {
  get: `${env.apiUrl}/user/`
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUser(): Observable<any> {
    return this.httpClient.get(routes.get);
  }
}
