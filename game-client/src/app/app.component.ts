import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import { ApiService } from './join/services/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ApiService]
})
export class AppComponent {
    title = 'frontend';

    socket = io.connect('http://localhost:5000/', {
        reconnection: false
    });

    leftClick() {
        this.socket.emit('left', 'User clicked left');
    }

    rightClick() {
        this.socket.emit('right', 'User clicked right');
    }

    constructor() { }

}
