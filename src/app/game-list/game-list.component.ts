import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: any[];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data: any[]) => {
      this.games = data;
    });
  }
}
