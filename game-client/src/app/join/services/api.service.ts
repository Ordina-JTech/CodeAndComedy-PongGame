import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../../../environments/environment';
import { Game } from '../models/game';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor( private http: HttpClient ) { }

  username;
  private hostUrl = Environment.apiHost;
  private gamesEndpoint = Environment.gamesEndpoint;
  private leadersEndpoint = Environment.scoresEndpoint;
  private userEndpoint = Environment.userEndpoint;

  storeUsername(username, emailaddress) {
    /* fill object for API call */
    const requestObject = {
      userId: username,
      email: emailaddress
    };

    /* transform object to JSON object for API call */
    const requestData = JSON.stringify(requestObject);

    /* actual API call here */
    this.http.post<any>(this.hostUrl + this.userEndpoint, requestData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), observe: 'response'
    }).subscribe(function(response) {
      if(response.status === 200) {
        this.username = localStorage.setItem('username', username);
        return this.username;
      } else {
        // todo: error handling
        console.log('error', response.status);
      }
    });
  };

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.hostUrl + this.gamesEndpoint);
  }

  // Should there be filtering in order to show the user with the highest score on top or does the backend take care of that?
  getLeaders(): Observable<User[]> {
    return this.http.get<User[]>(this.hostUrl + this.leadersEndpoint);
  }
}
