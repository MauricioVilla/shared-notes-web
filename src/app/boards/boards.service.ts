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
    return this.http.post(`${routes.base}/`, boardModel);
  }

  getBoards(createdBy: string): Observable<any> {
    const data = {created_by: createdBy};
    return this.http.get(`${routes.base}/`, {params: data});
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
    return this.http.post(`${routes.base}/idea/`, ideaModel);
  }

  editIdea(id, ideasModel: IdeaModel): Observable<any> {
    return this.http.put(`${routes.base}/idea/${id}/`, ideasModel);
  }

  approveIdea(id): Observable<any> {
    return this.http.get(`${routes.base}/approve/${id}`);
  }

  deleteIdea(id): Observable<any> {
    return this.http.delete(`${routes.base}/idea/delete/${id}/`);
  }
}
