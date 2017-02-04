import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class UserActivitiesService {
 
  constructor(private http:Http) { 
    console.log('UserActivitiesService intialized...');
  }
 
  getUserActivities() {
     return this.http.get('https://nuvi-challenge.herokuapp.com/activities')
            .map(res => res.json());
  }
 
}
