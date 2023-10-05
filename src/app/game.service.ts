import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://localhost:5000/api/games';

  constructor(private http: HttpClient) {
  }

  getGames(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createGame(gameData: any): Observable<any> {
    return this.http.post(this.apiUrl, gameData);
  }

  updateGame(gameId: number, gameData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${gameId}`, gameData);
  }
}
