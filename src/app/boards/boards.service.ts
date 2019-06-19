import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BoardModel, IdeaModel } from './boards.model';
import { Observable } from 'rxjs';
import { environment as env } from '@env/environment';

const routes = {
  base: `${env.apiUrl}/boards`,
};

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  private httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  /*
  **********
   *  Boards
   **********
   */

  createBoard(boardModel: BoardModel): Observable<any> {
    return this.http.post(`${routes.base}/create/`, boardModel);
  }

  getBoards(createdBy: string): Observable<any> {
    const data = {created_by: createdBy};
    console.log(`${routes.base}/list/`);
    return this.http.get(`${routes.base}/list/`, {params: data});
  }

  getBoard(title: string): Observable<any> {
    return this.http.get(`${routes.base}/${title}/`);
  }

  deleteBoard(id): Observable<any> {
    return this.http.delete(`${routes.base}/delete/${id}/`);
  }

  /*
  **********
   *  Ideas
   **********
   */
  createIdea(ideaModel: IdeaModel): Observable<any> {
    return this.http.post(`${routes.base}/ideas/create/`, ideaModel);
  }

  editIdea(id, ideasModel: IdeaModel): Observable<any> {
    return this.http.put(`${routes.base}/ideas/update/${id}/`, ideasModel);
  }

  deleteIdea(id): Observable<any> {
    return this.http.delete(`${routes.base}/ideas/delete/${id}/`);
  }

  approveIdea(id): Observable<any> {
    return this.http.get(`${routes.base}/ideas/approve/${id}/`);
  }
}
