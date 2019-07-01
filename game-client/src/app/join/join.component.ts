import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ApiService } from './services/api.service';
import { Game } from './models/game';
import { User } from './models/user';

@Component({
    selector: 'app-join',
    templateUrl: './join.component.html',
    styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

    user = new User();
    angForm: FormGroup;

    subscription: Subscription;
    games: Game[];
    url: string;
    message: string;

    constructor(private apiService: ApiService, private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
        this.getGames();
    }

    registerUser(username, gamepin) {
        const gameId = this.games.find(game => gamepin === game.gameId);
        if (gameId) {
            this.apiService.storeUsername(username, 'test@test.nl');
            for (const game of this.games) {
                if (game.gameId === gamepin) {
                    this.url = game.location + '/join/' + username;
                    window.location.href = this.url;
                }
            }
        } else {
            this.message = `Game PIN "${gamepin}" doesn't exist`;
        }
    }

    createForm() {
        this.angForm = this.fb.group({
            username: ['', Validators.required],
            gamepin: ['', Validators.required]
        });
    }

    getGames() {
        this.subscription = timer(0, 5000).pipe(
            switchMap(() => this.apiService.getGames())
        ).subscribe(games => this.games = games);
    }


}
