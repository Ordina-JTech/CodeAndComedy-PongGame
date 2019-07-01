import { Injectable } from '@angular/core';
import { Player } from '../shared/models/player';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LobbyService {

    private lobbyFull = new Subject<boolean>();
    private lobbyFull$ = this.lobbyFull.asObservable();
    private leftPlayer: Player;
    private rightPlayer: Player;

    constructor() { }

    getLobbyFull(): Observable<boolean> { return this.lobbyFull$; }
    setLobbyFull(lobbyState: boolean) { this.lobbyFull.next(lobbyState); }

    addPlayer(player: Player): string {
        if (!this.leftPlayer) {
            this.leftPlayer = player;
            return 'left';
        } else if (!this.rightPlayer) {
            this.rightPlayer = player;
            return 'right';
        }
        return null;
    }

    getPlayers(): Player[] {
        const players = [];
        if (this.leftPlayer) { players.push(this.leftPlayer); }
        if (this.rightPlayer) { players.push(this.rightPlayer); }
        if (this.leftPlayer && this.rightPlayer) {
            this.setLobbyFull(true);
        }
        return players;
    }

    clearPlayers(): void {
        this.leftPlayer = null;
        this.rightPlayer = null;
        this.setLobbyFull(false);
    }

    removePlayer(id: string): void {
        if (this.leftPlayer && this.leftPlayer.id === id) {
            this.leftPlayer = null;
        }
        if (this.rightPlayer && this.rightPlayer.id === id) {
            this.rightPlayer = null;
        }
        this.setLobbyFull(false);
    }
}
