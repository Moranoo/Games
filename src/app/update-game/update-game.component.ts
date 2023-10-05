import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html',
  styleUrls: ['./update-game.component.css']
})
export class UpdateGameComponent {
  updateSuccess = false;
  games: any[] = [];
  selectedGameId: number;
  updateGameData = {
    popularite: null,
    note_utilisateur: '',
    titre: '',
    genre: '',
    nombre_vote: null,
    histoire: '',
    annee_sortie: ''
  };

  onGameChange() {
    const selectedGame = this.games.find(game => game.id === this.selectedGameId);
    if (selectedGame) {
      this.updateGameData = { ...selectedGame };
    } else {
      this.updateGameData = {
        popularite: null,
        note_utilisateur: '',
        titre: '',
        genre: '',
        nombre_vote: null,
        histoire: '',
        annee_sortie: ''
      };
    }
  }
  

  constructor(private gameService: GameService) {
    this.selectedGameId = 0;
  }

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.gameService.getGames().subscribe(
      data => this.games = data,
      error => console.error(error)
    );
  }

  updateGame() {
    this.gameService.updateGame(this.selectedGameId, this.updateGameData).subscribe(  // Et ici
      data => {
        console.log('Game updated!', data);
        this.loadGames();  // recharger la liste des jeux après la mise à jour
      },
      error => console.error(error)
    );
  }
}
