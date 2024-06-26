import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap } from "rxjs/operators";

import { User } from "../models/User"; 
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "https://backend-vmew.onrender.com/auth";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: Pick<User, "aid"> | undefined;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient, 
    private errorHandlerService: ErrorHandlerService,
    private router: Router) {}

    signup(user: Omit<User, "aid">): Observable<User> {
      return this.http
        .post<User>(`${this.url}/signup`, user, this.httpOptions)
        .pipe(
          first(),
          tap(() => {
            this.router.navigate(['login']);
          }),
          catchError(this.errorHandlerService.handlerError<User>("signup"))
        );
    }
    


    login(
      email: Pick<User, "email">,
      password: Pick<User, "password">
    ): Observable<{
      token: string;
      userId: Pick<User, "aid">;
    }> {
      return this.http
        .post<{ token: string; userId: Pick<User, "aid"> }>(`${this.url}/login`, { email, password }, this.httpOptions)
        .pipe(
          first(),
          tap((tokenObject) => {
            this.userId = tokenObject.userId;
            localStorage.setItem("token", tokenObject.token);
            this.isUserLoggedIn$.next(true);
            this.router.navigate(["user"]);
          }),
          catchError(
            this.errorHandlerService.handlerError<{
              token: string;
              userId: Pick<User, "aid">;
            }>("login")
          )
        );
    }


    getCurrentUser(): Observable<any[]> {
      return this.http.get<any[]>(this.url);
    }
  
    getUsedetail(userId: any): Observable<any> {
      const geturl = `${this.url}/getUsedetail`;
      return this.http.post<any>(geturl, { userId });
    }
  
    getaccount(): Observable<any[]> {
      const url = `${this.url}/getaccount`;
      return this.http.get<any[]>(url);
    }
}