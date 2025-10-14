import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { apiRoutes } from "../../config/routes.config";

@Injectable({ providedIn: "root" })
export class ApiService {
    private http = inject(HttpClient);
    private baseURL = apiRoutes.baseURL;
    private httpOptions(params?: HttpParams) {
        return {
            params,
            withCredentials: true,
        };
    }

    get<T>(endpoint: string, params?: HttpParams): Observable<T> {
        return this.http.get<T>(`${this.baseURL}/${endpoint}`, this.httpOptions(params));
    }

    post<T>(endpoint: string, body: any): Observable<T> {
        return this.http.post<T>(`${this.baseURL}/${endpoint}`, body, this.httpOptions());
    }

    put<T>(endpoint: string, body: any): Observable<T> {
        return this.http.put<T>(`${this.baseURL}/${endpoint}`, body, this.httpOptions());
    }

    patch<T>(endpoint: string, body: any): Observable<T> {
        return this.http.patch<T>(`${this.baseURL}/${endpoint}`, body, this.httpOptions());
    }

    delete<T>(endpoint: string, params?: HttpParams): Observable<T> {
        return this.http.delete<T>(`${this.baseURL}/${endpoint}`, this.httpOptions(params));
    }
}
