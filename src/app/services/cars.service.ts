import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICars} from "../interfaces";
import {urls} from "../constans";

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private httpClient: HttpClient) {
  }

  create(car: ICars): Observable<ICars> {
    return this.httpClient.post<ICars>(urls.cars, car);
  }

  getAll(): Observable<ICars[]> {
    return this.httpClient.get<ICars[]>(urls.cars);
  }

  getById(id: string): Observable<ICars> {
    return this.httpClient.get<ICars>(`${urls.cars}/${id}`);
  }

  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${urls.cars}/${id}`);
  }

  updateById(id: number, carForUpdate: Partial<ICars>): Observable<ICars> {
    return this.httpClient.patch<ICars>(`${urls.cars}/${id}`, carForUpdate);
  }
}
