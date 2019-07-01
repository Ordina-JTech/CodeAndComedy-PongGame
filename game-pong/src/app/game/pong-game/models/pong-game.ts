import { Ball } from './ball';
import { ControlState } from './control-state';
import { Paddle } from './paddle';
import { Player } from '../../../shared/models/player';
import { PongGameService } from '../pong-game.service';

export class PongGame {

    public ball: Ball;

    private readonly height: number;
    private readonly width: number;
    private readonly leftPaddle: Paddle;
    private readonly rightPaddle: Paddle;

    private leftPaddleScore = 0;
    private rightPaddleScore = 0;
    private winnerScore = 1;

    constructor(
        height: number, width: number, leftPlayer: Player, rightPlayer: Player,
        private pongGameService: PongGameService
    ) {
        this.height = height;
        this.width = width;

        // Construct game objects
        this.ball = new Ball(15, 15, 2, { x: height / 2, y: width / 2 }, { x: 1, y: 1 });
        this.leftPaddle = new Paddle(100, 20, 3, { x: 50, y: height / 2 }, leftPlayer);
        this.rightPaddle = new Paddle(100, 20, 3, { x: width - 50, y: height / 2 }, rightPlayer);
    }

    getLeftPaddle(): Paddle {
        return this.leftPaddle;
    }

    getRightPaddle(): Paddle {
        return this.rightPaddle;
    }

    getLeftPaddleScore(): number {
        return this.leftPaddleScore;
    }

    getRightPaddleScore(): number {
        return this.rightPaddleScore;
    }

    tick(controlState: ControlState) {
        this.checkCollisions();
        this.ball.move();
        // Set acceleration, move player paddle based on input
        this.moveLeftPaddle(controlState, this.leftPaddle);
        this.moveRightPaddle(controlState, this.rightPaddle);
    }

    private moveLeftPaddle(controlState: ControlState, paddle: Paddle) {
        const paddleBounds = paddle.getCollisionBoundaries();
        if (controlState.getLeftUpPressed() && paddleBounds.top > 0) {
            paddle.accelerateUp(.03);
        } else if (controlState.getLeftDownPressed() && paddleBounds.bottom < this.height) {
            paddle.accelerateDown(.03);
        } else {
            paddle.decelerate(.05);
        }
        paddle.move();
    }

    private moveRightPaddle(controlState: ControlState, paddle: Paddle) {
        const paddleBounds = paddle.getCollisionBoundaries();
        if (controlState.getRightUpPressed() && paddleBounds.top > 0) {
            paddle.accelerateUp(.03);
        } else if (controlState.getRightDownPressed() && paddleBounds.bottom < this.height) {
            paddle.accelerateDown(.03);
        } else {
            paddle.decelerate(.05);
        }
        paddle.move();
    }

    private checkCollisions() {
        // Bounce off top/bottom
        const ballBounds = this.ball.getCollisionBoundaries();
        if (ballBounds.bottom >= this.height || ballBounds.top <= 0) {
            this.ball.reverseY();
        }

        const leftPaddleBounds = this.leftPaddle.getCollisionBoundaries();
        // Don't let paddle go past boundaries
        if (leftPaddleBounds.top <= 0 || leftPaddleBounds.bottom >= this.height) {
            this.leftPaddle.decelerate(1);
        }

        // Left paddle hit
        if (ballBounds.left <= leftPaddleBounds.right &&
            leftPaddleBounds.right - ballBounds.left <= 3 &&
            ballBounds.bottom >= leftPaddleBounds.top &&
            ballBounds.top <= leftPaddleBounds.bottom) {
            this.ball.reverseX();

            // Set vertical speed ratio by taking ratio of
            // dist(centerOfBall, centerOfPaddle) to dist(topOfPaddle, centerOfPaddle)
            // Negate because pixels go up as we go down :)
            let vsr = - (this.ball.getPosition().y - this.leftPaddle.getPosition().y)
                / (leftPaddleBounds.top - this.leftPaddle.getPosition().y);

            // Max vsr is 1
            vsr = Math.min(vsr, 1);
            this.ball.setVerticalSpeedRatio(vsr);
        }

        // Right paddle hit
        const rightPaddleBounds = this.rightPaddle.getCollisionBoundaries();

        if (rightPaddleBounds.top <= 0 || rightPaddleBounds.bottom >= this.height) {
            this.rightPaddle.decelerate(1);
        }
        if (ballBounds.right <= rightPaddleBounds.left &&
            rightPaddleBounds.left - ballBounds.right <= 3 &&
            ballBounds.bottom >= rightPaddleBounds.top &&
            ballBounds.top <= rightPaddleBounds.bottom) {
            this.ball.reverseX();

            // Set vertical speed ratio by taking ratio of
            // dist(centerOfBall, centerOfPaddle) to dist(topOfPaddle, centerOfPaddle)
            // Negate because pixels go up as we go down :)
            let vsr = - (this.ball.getPosition().y - this.rightPaddle.getPosition().y)
                / (rightPaddleBounds.top - this.rightPaddle.getPosition().y);

            // Max vsr is 1
            vsr = Math.min(vsr, 1);
            this.ball.setVerticalSpeedRatio(vsr);
        }

        if (this.hasScored()) {
            setTimeout(() => { this.resetBall(); }, 1000);
        }
    }

    hasScored(): boolean {
        if (this.ball.getCollisionBoundaries().left <= 0) {
            this.rightPaddleScore++;
            this.pauseGame();
            return true;
        } else if (this.ball.getCollisionBoundaries().right >= this.width) {
            this.leftPaddleScore++;
            this.pauseGame();
            return true;
        }
        return false;
    }

    pauseGame(): void {
        this.ball = new Ball(15, 15, 2, { x: this.height / 2, y: this.width / 2 }, { x: 0, y: 0 });
        this.leftPaddle.resetPosition({ x: 50, y: this.height / 2 });
        this.rightPaddle.resetPosition({ x: this.width - 50, y: this.height / 2 });
    }
    resetBall(): void {
        this.ball = new Ball(15, 15, 2, { x: this.height / 2, y: this.width / 2 }, { x: 1, y: 1 });
    }
    resetGame(): void {
        this.leftPaddleScore = 0;
        this.rightPaddleScore = 0;
        this.ball = new Ball(15, 15, 2, { x: this.height / 2, y: this.width / 2 }, { x: 1, y: 1 });
    }

    gameOver(): boolean {
        return (this.leftPaddleScore >= this.winnerScore || this.rightPaddleScore >= this.winnerScore);
    }

    getWinner(): Player {
        console.log('pong-game getWinner');
        if (this.leftPaddleScore >= this.winnerScore) {
            this.pongGameService.setWinner(this.leftPaddle.getPlayer());
            return this.leftPaddle.getPlayer();
        } else {
            this.pongGameService.setWinner(this.rightPaddle.getPlayer());
            return this.rightPaddle.getPlayer();
        }
    }
}
