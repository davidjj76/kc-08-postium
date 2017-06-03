import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

import { BackendUri } from './settings';
import { Category } from './category';

@Injectable()
export class CategoryService {

  constructor(
    private _http: Http,
    @Inject(BackendUri) private _backendUri) { }

  private handleError(error: Response | any): Observable<any> {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getCategories(): Observable<Category[]> {
    return this._http
      .get(`${this._backendUri}/categories`)
      .map((response: Response): Category[] => Category.fromJsonToList(response.json()))
      .catch(this.handleError);
  }

  getCategory(id: number): Observable<Category> {
    return this._http
      .get(`${this._backendUri}/categories/${id}`)
      .map((response: Response): Category => Category.fromJson(response.json()))
      .catch(this.handleError);
  }

  createCategory(category: Category): Observable<Category> {
    return this._http
      .post(`${this._backendUri}/categories`, category)
      .map((response: Response): Category => Category.fromJson(response.json))
      .catch(this.handleError);
  }

}
