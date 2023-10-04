import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { AddGameComponent } from './add-game/add-game.component';
import { UpdateGameComponent } from './update-game/update-game.component';

const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' }, // Redirige la racine vers la liste des jeux
  { path: 'games', component: GameListComponent }, // Route pour la liste des jeux
  { path: 'add-game', component: AddGameComponent }, // Route pour ajouter un jeu
  { path: 'update-game/:id', component: UpdateGameComponent }, // Route pour mettre à jour un jeu par ID
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
