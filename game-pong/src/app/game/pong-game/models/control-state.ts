import { Subject } from 'rxjs';

export class ControlState {

    public playerLeft = '';
    public playerRight = '';

    private rightUpPressed = false;
    private rightDownPressed = false;
    private leftUpPressed = false;
    private leftDownPressed = false;
    // private winnerEventSubject = new Subject<any>();

    public getRightUpPressed(): boolean {
        return this.rightUpPressed;
    }

    public getRightDownPressed(): boolean {
        return this.rightDownPressed;
    }

    public getLeftUpPressed(): boolean {
        return this.leftUpPressed;
    }

    public getLeftDownPressed(): boolean {
        return this.leftDownPressed;
    }

    public setControlStateLeftPaddle(upPressed: boolean, downPressed: boolean) {
        this.leftUpPressed = upPressed;
        this.leftDownPressed = downPressed;
    }

    public setControlStateRightPaddle(upPressed: boolean, downPressed: boolean) {
        this.rightUpPressed = upPressed;
        this.rightDownPressed = downPressed;
    }
    //
    // public getWinnerEventSubject(): Subject<any> {
    //     console.log('get winner');
    //     return this.winnerEventSubject;
    // }
}

