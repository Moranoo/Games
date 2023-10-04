import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.http.get('http://localhost:5000/api/game').subscribe(
      (response: any) => {
        this.data = response;
        console.log(this.data);
      },
      (error: any) => {
        console.error('Erreur:', error);
      }
    );
  }
}
