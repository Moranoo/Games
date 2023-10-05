import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html',
  styleUrls: ['./update-game.component.css']
})
export class UpdateGameComponent implements OnInit {
  updateSuccess = false;
  games: any[] = [];
  selectedGameId!: number;
  updateGameData = {
    popularite: '',
    note_utilisateur: '',
    titre: '',
    genre: '',
    nombre_vote: '',
    histoire: '',
    annee_sortie: ''
  };

  onGameChange() {
    const selectedGame = this.games.find(game => game.id === this.selectedGameId);
    if (selectedGame) {
      this.updateGameData = { ...selectedGame };
    } else {
      this.updateGameData = {
        popularite: '',
        note_utilisateur: '',
        titre: '',
        genre: '',
        nombre_vote: '',
        histoire: '',
        annee_sortie: ''
      };
    }
  }
  

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedGameId = +params['id']; // + pour convertir en nombre
      this.loadGames(); // Chargez les jeux ici si nécessaire
    });
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
