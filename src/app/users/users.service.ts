import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../users/users.model';
import { Observable } from 'rxjs';
import { environment as env} from '@env/environment';

const routes = {
  base: `${env.apiUrl}/`,
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  createUser(userModel: UserModel): Observable<any> {
    return this.httpClient.post(`${routes.base}users/`, userModel);
  }
}
