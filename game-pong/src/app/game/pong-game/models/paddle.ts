import { Position } from './position';
import { MovableObject } from './movable-object';
import { SpeedRatio } from './speed-ratio';
import { Player } from '../../../shared/models/player';

export class Paddle extends MovableObject {

    private readonly player: Player;
    private readonly speedRatio: SpeedRatio;

    constructor(height: number, width: number, maxSpeed: number, position: Position, player: Player) {
        super(height, width, maxSpeed, position);
        this.speedRatio = { x: 0, y: 0 };
        this.player = player;
    }

    /**
     * Accelerates towards the max speed in the down direction
     * @param ratioChange - the percentage of the max speed that the paddle should accelerate to
     */
    accelerateDown(ratioChange: number) {
        if (ratioChange < 0 || ratioChange > 1) { return; }
        this.speedRatio.y = Math.min(1, this.speedRatio.y + ratioChange);
    }

    /**
     * Accelerates towards the max speed in the up direction
     * @param ratioChange - the percentage of the max speed that the paddle should accelerate to
     */
    accelerateUp(ratioChange: number) {
        if (ratioChange < 0 || ratioChange > 1) { return; }
        this.speedRatio.y = Math.max(-1, this.speedRatio.y - ratioChange);
    }

    /**
     * Decelerate the object towards zero
     * @param ratioChange - the percentage of the max speed that the paddle should decelerate
     */
    decelerate(ratioChange: number) {
        if (this.speedRatio.y < 0) {
            this.speedRatio.y = Math.min(this.speedRatio.y + ratioChange, 0);
        }
        if (this.speedRatio.y > 0) {
            this.speedRatio.y = Math.max(this.speedRatio.y - ratioChange, 0);
        }
    }

    resetPosition(position: Position): void {
        this.setPosition(position);
    }

    move(): void {
        super.move(this.speedRatio);
    }

    getPlayer(): Player {
        return this.player;
    }
}
