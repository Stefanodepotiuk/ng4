import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IToken, IUser} from "../interfaces";
import {Observable} from "rxjs";
import {urls} from "../constans";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessTokenKey = 'access'
  private refreshTokenKey = 'refresh'

  constructor(private httpClient: HttpClient) {
  }

  register(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(urls.users, user);
  }

  login(user: IUser): Observable<IToken> {
    return this.httpClient.post<IToken>(urls.auth, user);
  }

  refresh(): Observable<IToken> {
    const refresh = this.getRefreshToken();
    return this.httpClient.post<IToken>(`${urls.auth}/refresh`,{refresh});
  }

  setToken(token: IToken): void {
    localStorage.setItem(this.accessTokenKey, token.access);
    localStorage.setItem(this.refreshTokenKey, token.refresh);
  }

  isAuthorization(): boolean {
    return !!localStorage.getItem(this.accessTokenKey)
  }

  getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey) as string;
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey) as string;
  }

  deleteToken(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }
}
