import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Game } from '../shared/models/game';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    private apiUrl: string = environment.apiUrl + '/games';

    constructor(private http: HttpClient) { }

    getAllGames(): Observable<any> {
        return this.http.get<Game>(this.apiUrl + '/');
    }

    getGameById(gameId: string): Observable<Game> {
        return this.http.get<Game>(this.apiUrl + '/' + gameId);
    }

    postGameFull(game: Game): Observable<any> {
        return this.http.post(this.apiUrl + '/full', { gameId: game.gameId });
    }

    postGameFinished(game: Game, winner: string): Observable<any> {
        return this.http.post(this.apiUrl + '/finished', { gameId: game.gameId, userId: winner });
    }

    postGame(game: Game): Observable<any> {
        game.status = 'open';
        return this.http.post(this.apiUrl + '/register', game);
    }
}
