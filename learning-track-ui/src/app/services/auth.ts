import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { LoginRequest } from '../models/login-request.model';

import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(user:any):Observable<any>{

    return this.http.post(this.api + '/auth/register',user);

  }

  login(request:LoginRequest):Observable<LoginResponse>{

    return this.http.post<LoginResponse>(
      this.api + '/auth/login',
      request
    );

  }

  isLoggedIn(): boolean {

  return localStorage.getItem("token") != null;

}

logout() {

  localStorage.clear();

}
}