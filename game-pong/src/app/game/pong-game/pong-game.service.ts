import { Injectable } from '@angular/core';
import { Player } from '../../shared/models/player';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PongGameService {

    private winner = new Subject<Player>();
    private winner$ = this.winner.asObservable();

    constructor() { }

    getWinner(): Observable<Player> { return this.winner$; }
    setWinner(winner: Player): void { this.winner.next(winner); }
}
