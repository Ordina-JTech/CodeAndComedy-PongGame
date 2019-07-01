import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ControllerComponent } from './controller/controller.component';
import { GameComponent } from './game/game.component';
import { LobbyComponent } from './lobby/lobby.component';
import { PongGameComponent } from './game/pong-game/pong-game.component';
import { MatButtonModule, MatGridListModule, MatIconModule } from '@angular/material';

@NgModule({
    declarations: [
        AppComponent,
        ControllerComponent,
        GameComponent,
        LobbyComponent,
        PongGameComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        MatGridListModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
