import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LobbyService } from '../lobby/lobby.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from './game.service';
import { Game } from '../shared/models/game';
import { ControlState } from './pong-game/models/control-state';
import { ServerService } from '../shared/services/server/server.service';
import { PongGameService } from './pong-game/pong-game.service';
import { Player } from '../shared/models/player';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

    public controlState: ControlState = new ControlState();
    public displayMessage: string;
    public players: any[];
    public height: number;
    public width: number;

    private gameId: string;
    private game: Game;

    private gameSub: Subscription;
    private pongSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private gameService: GameService,
        private lobbyService: LobbyService,
        private pongGameService: PongGameService,
        private serverService: ServerService
    ) {
        this.gameId = this.route.snapshot.paramMap.get('gameId');
        this.controlState.playerLeft = this.lobbyService.getPlayers[0];
        this.controlState.playerRight = this.lobbyService.getPlayers[1];
    }

    ngOnInit() {
        this.gameSub = this.gameService.getGameById(this.gameId).subscribe((game) => {
            this.game = game;
        });
        this.pongSub = this.pongGameService.getWinner().subscribe(winner => {
            console.log('ng onInit endgame');
            this.endGame(winner);
        });

        this.initGame();
    }

    initGame(): void {
        this.displayUsers();
        this.initControls();

        // this.controlState.getWinnerEventSubject().subscribe((winner) => {
        //     this.endGame(winner);
        // });
    }

    initControls(): void {
        const socketIo = this.serverService.getServer();

        socketIo.on('left', (up, down) => {
            this.controlState.setControlStateLeftPaddle(up, down);
        });

        socketIo.on('right', (up, down) => {
            this.controlState.setControlStateRightPaddle(up, down);
        });

        socketIo.on('leave', (socketId) => {
            this.lobbyService.removePlayer(socketId);
            this.displayUsers();
        });
    }

    displayUsers(): void {
        this.players = this.lobbyService.getPlayers();
        this.displayMessage = this.players.map((player) => {
            return `Player ${ player.name }`;
        }).join(' vs. ');
    }

    endGame(winner: Player): void {
        const socketIo = this.serverService.getServer();
        socketIo.emit('winner', winner.name);
        socketIo.emit('startGame', false);
        console.log('endGame');
        this.gameService.postGameFinished(this.game, winner.id).subscribe();
        // this.gameService.postGameFull(this.game).subscribe();
        this.lobbyService.clearPlayers();
        setTimeout(() => {
            this.router.navigate(['/']);
        }, 10000);
    }

}
