import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';
import { Game } from '../../game.model';
import {ToastrService} from "ngx-toastr";

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

  constructor(private gameService: GameService, private router: Router, private toastrService: ToastrService) {}

  createGame() {
    this.gameService.createGame(this.newGame).subscribe(
      data => {
        console.log('Game created!', data);
        this.router.navigate(['/games']);
        this.toastrService.success('Le jeu a bien été ajouté !', 'Succès !', {timeOut: 3000, progressBar: true});
      },
      error => {
        console.log('Erreur', error);
        this.toastrService.error('Le jeu n\'a pas pu être ajouté !', 'Erreur !', {timeOut: 3000, progressBar: true});
      }
    );
  }
}
