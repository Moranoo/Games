import {Component, OnInit} from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: 'game-list.component.html',
  styleUrls: ['game-list.component.css'],
  providers: [ GameService ]
})
export class GameListComponent implements OnInit {

  games: any = [];

    constructor(private gameService: GameService) { }

    ngOnInit() {
      this.gameService.getGames().subscribe(
        (data) => {
          this.games = data;
          this.games.data.map((game: any) => {
            game.annee_sortie = Number(game.annee_sortie)
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
}
