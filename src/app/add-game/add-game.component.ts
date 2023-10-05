import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../../game.model';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent {
  newGame: Game = {
    popularite: 0,
    note_utilisateur: '',
    titre: '',
    genre: '',
    nombre_vote: 0,
    histoire: '',
    annee_sortie: ''
  };

  constructor(private gameService: GameService) {}

  createGame() {
    this.gameService.createGame(this.newGame).subscribe(
      data => {
        console.log('Game created!', data);
      },
      error => console.error(error)
    );
  }
}
