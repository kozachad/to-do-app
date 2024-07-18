import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/login-request';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../interfaces/register-request';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = environment.apiUrl;
  private tokenKey = 'token';
  private realId = 'RealId';

  constructor(private http:HttpClient) { }


  login(data:LoginRequest):Observable<AuthResponse>{
    const url = `${this.apiUrl}/tokens`; 
    return this.http.post<AuthResponse>(url,data).pipe(
      map((response)=>{
        localStorage.setItem(this.tokenKey,response.token);
        localStorage.setItem(this.realId,response.realId.toString());
        return response;
      })
    );
  }

  register(data: RegisterRequest): Observable<any> {
    const url = `${this.apiUrl}/signup`; 
    return this.http.post(url, data);
  }

  getUserRealId(): number | null {
    const RealId = localStorage.getItem(this.realId);
    return RealId ? parseInt(RealId,10) : null;
  }


  getUserDetail=()=>{
    const token = this.getToken();
    if(!token) return null;
    const decodedToken:any = jwtDecode(token);
    const userDetail = {
      id:decodedToken.unique_name,
      role:decodedToken.role
    };
    return userDetail;
  }

  isLoggedIn=():boolean=>{
    const token = this.getToken();
    if(!token) return false;

    return !this.isTokenExpired();
  }

  private isTokenExpired() {
    const token = this.getToken();
    if(!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() > decoded['exp']! * 1000;
    if(isTokenExpired) this.logout();
    return isTokenExpired;
  }

  

  logout=():void=>{
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.realId);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  private GetRealId = ():string |null => localStorage.getItem(this.realId) || '';

}
