import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { routesConfig } from "../../config/routes.config";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    private http = inject(HttpClient);
    private baseURL = routesConfig.baseURL;

    get<T>(endpoint: string, params?: HttpParams): Observable<T> {
        return this.http.get<T>(`${this.baseURL}/${endpoint}`, { params });
    }

    post<T>(endpoint: string, body: any): Observable<T> {
        return this.http.post<T>(`${this.baseURL}/${endpoint}`, body);
    }

    put<T>(endpoint: string, body: any): Observable<T> {
        return this.http.put<T>(`${this.baseURL}/${endpoint}`, body);
    }

    patch<T>(endpoint: string, body: any): Observable<T> {
        return this.http.patch<T>(`${this.baseURL}/${endpoint}`, body);
    }

    delete<T>(endpoint: string, params?: HttpParams): Observable<T> {
        return this.http.delete<T>(`${this.baseURL}/${endpoint}`, { params });
    }
}
