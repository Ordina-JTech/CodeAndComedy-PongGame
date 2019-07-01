import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as socketIo from 'socket.io-client';
import { DomSanitizer } from '@angular/platform-browser';

declare var ClientIP: string;

@Component({
    selector: 'app-controller',
    templateUrl: './controller.component.html',
    styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

    @ViewChild('container', { static: true }) container: ElementRef;

    public message = '';
    public subMessage = '';
    public paddle: string;
    public gameIsStarted: boolean;
    public gameIsReady: boolean;
    public winner: string;
    public cols: number;
    public imageUrl;

    private readonly playerName: string;
    private socketIo: any;
    private socketIoUrl: string;

    constructor(
        private domSanitizer: DomSanitizer,
        private route: ActivatedRoute
    ) {
        this.playerName = this.route.snapshot.paramMap.get('userId');
    }

    ngOnInit() {
        this.message = 'Waiting to connect to game.';
        this.socketIoUrl = `ws://${ ClientIP }:5000/`;
        this.joinGame();
    }

    calcCols(): number {
        return this.cols = (this.container.nativeElement.offsetWidth > this.container.nativeElement.offsetHeight) ? 2 : 1;
    }

    joinGame(): void {
        this.socketIo = socketIo.connect(this.socketIoUrl);
        this.socketIo.on('connect', () => {
            this.message = 'Connected to game. Waiting to join game.';
            this.subMessage = '';
        });

        // call to join the game lobby
        this.socketIo.emit('join', this.playerName);

        this.socketIo.on('joined', (success, paddle) => {
            if (success) {
                this.paddle = paddle;
                this.message = `Joined the game as the ${ this.paddle } paddle.`;
            } else {
                this.message = 'Game is full.';
            }
        });

        this.socketIo.on('readyToStart', (ready) => {
            if (ready !== this.gameIsReady) {
                this.gameIsReady = ready;
                if (this.gameIsReady) {
                    setTimeout(() => { this.gameReady(); });
                }
            }
        });

        this.socketIo.on('startGame', (start) => {
            this.gameIsStarted = start;
        });

        this.socketIo.on('winner', (winner) => {
            if (winner) { this.stopGame(winner); }
        });
    }

    gameReady(): void {
        this.subMessage = (this.paddle === 'left') ?
            'Press start button to start the game.' :
            (this.paddle === 'right') ?
                'Wait for the game to start.' : ' ';
    }

    getBackground() {
        if (this.paddle === 'left') {
            return this.imageUrl = `url('../../assets/images/mobile/background_Sonic.png')`;
        } else if (this.paddle === 'right') {
            return this.imageUrl = `url('../../assets/images/mobile/background_Mario.png')`;
        } else {
            return this.imageUrl = `url('../../assets/images/mobile/background_PacMan.png')`;
        }
    }

    startGame(): void {
        this.socketIo.emit('startGame', true);
    }

    stopGame(winner): void {
        this.gameIsReady = false;
        this.winner = winner;
        this.socketIo.emit('startGame', false);
        this.message = 'Game Over!';
        if (this.playerName === winner) {
            this.subMessage = 'You won!!';
        } else {
            this.subMessage = 'You lost!!';
        }
    }

    pressUp(up: boolean): void {
        this.socketIo.emit(this.paddle, up, false);
    }

    pressDown(down: boolean): void {
        this.socketIo.emit(this.paddle, false, down);
    }
}
