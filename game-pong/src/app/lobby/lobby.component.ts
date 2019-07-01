import { Component, OnInit } from '@angular/core';
import { GameService } from '../game/game.service';
import { Game } from '../shared/models/game';
import { LobbyService } from './lobby.service';
import { Router } from '@angular/router';
import { ServerService } from '../shared/services/server/server.service';
import { Player } from '../shared/models/player';
import { Subscription } from 'rxjs';

declare var ClientIP: string;

@Component({
    selector: 'app-start',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

    public currentGameId: string;
    public displayMessage: string;
    public lobbyIsFull: boolean;
    public players: Player[] = [];

    private readonly socketIo = this.serverService.getServer();
    private counter: number;
    private currentGame: Game;
    private location: string = window.location.href;
    private timer: number;
    private lobbySub: Subscription;
    private gameSub: Subscription;

    private gameStarted: boolean;

    static randomId(): string {
        const min = 10000;
        const max = 99999;
        return Math.floor(Math.random() * (max - min) + min).toString();
    }

    constructor(
        private router: Router,
        private gameService: GameService,
        private lobbyService: LobbyService,
        private playerService: LobbyService,
        private serverService: ServerService
    ) { }

    ngOnInit() {
        this.gameService.getAllGames().subscribe(result => {
            for (const game of result) {
                if (game.location.includes(ClientIP)) {
                    console.log(game.gameId, game.location);
                    this.gameService.postGameFull(game).subscribe();
                    this.gameService.postGameFinished(game, 'empty game').subscribe();
                }
            }
        });
        this.playerService.clearPlayers();
        this.players = this.playerService.getPlayers();
        this.displayMessage = 'No game is being hosted. Creating a new one.';
        this.currentGameId = LobbyComponent.randomId();

        this.currentGame = this.createGame(this.currentGameId);
        this.gameSub = this.gameService.postGame(this.currentGame).subscribe(() => {
            this.gameService.getGameById(this.currentGameId)
                .subscribe((result) => {
                this.currentGame = result;
            });
            this.setMessage();
            this.waitForPlayers();
        });
        this.lobbySub = this.lobbyService.getLobbyFull()
            .subscribe(data => {
                this.lobbyIsFull = data;
                this.socketIo.emit('readyToStart', this.lobbyIsFull);
                this.setMessage();
                if (data) {
                    this.counter = 60;
                    this.countdown();
                }
            });
        this.socketIo.on('startGame', (start) => {
            this.socketIo.emit('startGame', start);
            if (start && !this.gameStarted) { this.openGame(); }
        });
    }
    countdown(): void {
        this.timer = setInterval(() => {
            this.counter--;
            if (this.counter === 0) {
                clearInterval(this.timer);
                this.lobbyService.clearPlayers();
                this.players = this.lobbyService.getPlayers();
            }}, 1000);
    }

    waitForPlayers(): void {
        const socketIo = this.serverService.getServer();

        socketIo.on('player', (playerName, socketId) => {
            const joiningPlayer = new Player(socketId, playerName);
            const paddle = this.playerService.addPlayer(joiningPlayer);
            this.players = this.playerService.getPlayers();

            const success = paddle !== null;
            socketIo.emit('entered', socketId, success, paddle);
        });

        socketIo.on('leave', (socketId) => {
            this.playerService.removePlayer(socketId);
        });
    }

    openGame(): void {
        this.gameStarted = true;
        if (this.lobbyIsFull && this.currentGameId) {
            this.gameService.postGameFull(this.currentGame).subscribe(() => {
                this.router.navigate(['/game/' + this.currentGameId]);
            });
        }
    }
    setMessage(): void {
        this.displayMessage = !this.currentGame ?
            'No game is being hosted. Creating a new one.' :
            this.lobbyIsFull ? 'Game ready to start' : 'Game ready to join';
    }

    createGame(gameId: string): Game {
        const game = new Game();
        game.gameId = gameId;
        game.location = this.location;
        game.displayName = 'Pong';
        return game;
    }

}
