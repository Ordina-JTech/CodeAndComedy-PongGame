import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
import { GameComponent } from './game/game.component';
import { ControllerComponent } from './controller/controller.component';

const routes: Routes = [
    { path: '', component: LobbyComponent },
    { path: 'game/:gameId', component: GameComponent },
    { path: 'join/:userId', component: ControllerComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
