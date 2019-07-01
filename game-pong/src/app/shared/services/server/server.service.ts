import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class ServerService {

    private readonly socketIo: any;
    private socketIoUrl = 'http://localhost:5000/';

    constructor() {
        this.socketIo = socketIo(this.socketIoUrl);

        this.socketIo.on('connect', () => {
            console.log('Connected to server');
        });
    }

    getServer(): any {
        return this.socketIo;
    }
}
