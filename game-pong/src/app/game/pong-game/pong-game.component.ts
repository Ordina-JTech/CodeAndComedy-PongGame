import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PongGame } from './models/pong-game';
import { ControlState } from './models/control-state';
import { LobbyService } from '../../lobby/lobby.service';
import { Boundaries } from './models/boundaries';
import { PongGameService } from './pong-game.service';

@Component({
    selector: 'app-pong-game',
    templateUrl: './pong-game.component.html',
    styleUrls: ['./pong-game.component.scss']
})
export class PongGameComponent implements OnInit {

    @ViewChild('PongCanvas', { static: true }) canvasElement: ElementRef;
    @ViewChild('GameContainer', { static: true }) container: ElementRef;
    @Input() controlState: ControlState;

    public height = 600;
    public width = 800;
    public pongGame: PongGame;
    public message: string;
    public winner: string;

    private stopRendering: boolean;
    private context: CanvasRenderingContext2D;
    private ticksPerSecond = 60;

    constructor(
        private lobbyService: LobbyService,
        private pongGameService: PongGameService
    ) { }

    ngOnInit() {
        const players = this.lobbyService.getPlayers();
        this.pongGame = new PongGame(this.height, this.width, players[0], players[1], this.pongGameService);

        this.context = this.canvasElement.nativeElement.getContext('2d');
        this.renderFrame();

        // Game model ticks 60 times per second. Doing this keeps same game speed
        // on higher FPS environments.
        setInterval(() => this.pongGame.tick(this.controlState), 1 / this.ticksPerSecond);
    }

    renderFrame(): void {
        // Only run if game still going
        if (!this.stopRendering) {
            if (this.pongGame.gameOver()) {
                this.stopRendering = true;
                this.pongGame.pauseGame();
                this.context.font = '30px Neutraface';
                console.log('in gameOver');
                if (this.pongGame.getWinner()) {
                    console.log('in getWinner');
                    this.context.textAlign = 'center';
                    this.message = `Game Over!`;
                    this.winner = ` Winner is: ${this.pongGame.getWinner().name}`;
                }
                setTimeout(() => {
                    this.pongGame.resetGame();
                    location.reload();
                }, 10000);
            }
            // Draw background
            this.context.fillStyle = 'rgb(0,0,0)';
            this.context.fillRect(0, 0, this.width, this.height);

            // Set to white for game objects
            this.context.fillStyle = 'rgb(255,255,255)';
            let bounds: Boundaries;

            // Draw left paddle
            this.context.fillStyle = 'rgb(0,0,255)';
            const leftPaddleObj = this.pongGame.getLeftPaddle();
            bounds = leftPaddleObj.getCollisionBoundaries();
            this.context.fillRect(bounds.left, bounds.top, leftPaddleObj.getWidth(), leftPaddleObj.getHeight());

            // Draw right paddle
            this.context.fillStyle = 'rgb(255,0,0)';
            const rightPaddleObj = this.pongGame.getRightPaddle();
            bounds = rightPaddleObj.getCollisionBoundaries();
            this.context.fillRect(bounds.left, bounds.top, rightPaddleObj.getWidth(), rightPaddleObj.getHeight());

            // Draw ball
            this.context.fillStyle = 'rgb(255,255,255)';
            const ballObj = this.pongGame.ball;
            bounds = ballObj.getCollisionBoundaries();
            this.context.fillRect(bounds.left, bounds.top, ballObj.getWidth(), ballObj.getHeight());

            // Render next frame
            window.requestAnimationFrame(() => this.renderFrame());
        }
    }

}
