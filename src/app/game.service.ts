import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://localhost:5000/api/games';

  constructor(private http: HttpClient) {
  }

  getGames() {
    return this.http.get(this.apiUrl);
  }
}
