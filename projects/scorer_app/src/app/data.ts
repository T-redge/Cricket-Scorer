import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerInterface, TeamInterface } from './tauri-command-class/tauri-command-class';

@Injectable({
  providedIn: 'root',
})
export class Data {
  private apiUrl = 'http://localhost:8989'

  constructor(private http: HttpClient) { }

  get(): Observable<Array<TeamInterface>> {
    let params: HttpParams = new HttpParams({ fromString: 'teams' });
    return this.http.get<Array<TeamInterface>>(this.apiUrl, { responseType: 'json', params });
  }
  get_players(id: number): Observable<Array<PlayerInterface>> {
    let p = "?team=" + id.toString();
    let params: HttpParams = new HttpParams({ fromString: p });
    return this.http.get<Array<PlayerInterface>>(this.apiUrl, { responseType: 'json', params })
  }
}
