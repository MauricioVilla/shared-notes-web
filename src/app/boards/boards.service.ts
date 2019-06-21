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

  /**
   * Function for creation of boards
   * @param boardModel
   */
  createBoard(boardModel: BoardModel): Observable<any> {
    return this.http.post(`${routes.base}/create/`, boardModel);
  }

  /**
   * Get an list of board filtering by author
   * @param author
   */
  getBoardsByUser(author: string): Observable<any> {
    const data = {author: author};
    return this.http.get(`${routes.base}/list/`, {params: data});
  }

  /**
   * Get board filtering by title or author
   * @param params
   */
  getBoardsSearcher(params: string): Observable<any> {
    return this.http.get(`${routes.base}/${params}/`);
  }

  /**
   * Function for delete board by its respective id
   * @param id
   */
  deleteBoard(id): Observable<any> {
    return this.http.delete(`${routes.base}/delete/${id}/`);
  }

  /*
  **********
   *  Ideas
   **********
   */

  /**
   * Function for creation of ideas with objects of type IdeaModel
   * @param ideaModel
   */
  createIdea(ideaModel: IdeaModel): Observable<any> {
    return this.http.post(`${routes.base}/ideas/create/`, ideaModel);
  }

  /**
   * Function for edit of ideas sending objects of type IdeaModel with
   * its respective ID
   * @param id
   * @param ideasModel
   */
  editIdea(id, ideasModel: IdeaModel): Observable<any> {
    return this.http.put(`${routes.base}/ideas/update/${id}/`, ideasModel);
  }

  /**
   * Function for delete of ideas sending its respective ID
   * @param id
   */
  deleteIdea(id): Observable<any> {
    return this.http.delete(`${routes.base}/ideas/delete/${id}/`);
  }

  /**
   * Function that consume a service of approve of ideas its respective ID
   * @param id
   */
  approveIdea(id): Observable<any> {
    return this.http.get(`${routes.base}/ideas/approve/${id}/`);
  }
}
