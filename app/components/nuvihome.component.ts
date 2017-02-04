import { Component } from '@angular/core';
import {UserActivitiesService} from '../services/userActivities.service';
import * as _ from 'underscore';
import {Message} from 'primeng/primeng';
import {UIChart} from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'nuvi-home',
  templateUrl: 'nuvihome.component.html',
  providers: [UserActivitiesService]
})

export class NuvihomeComponent  { 

  userActivities: userActivity[]; 
  currentUserActivity: userActivity;
  totalLikes: number = 0;
  totalShares: number = 0;
  totalComments: number = 0; 
  totalRecords: number = 0;
  providers: any;
  postWithAttachement: any;
  postsByProviders: any;
  msgs: Message[] = [];
  pieChartLabels:string[] = ['facebook', 'twitter', 'tumblr','instagram'];
  pieChartData:number[] = [300, 500, 100, 50];
  pieChartType:string = 'pie';

  constructor(private userActivitiesService: UserActivitiesService){
    this.userActivitiesService.getUserActivities().subscribe(userActivities => {
        this.userActivities = userActivities;  
        _.each(this.userActivities, function(activity) {
          var n = activity.actor_avator.indexOf('?');
          activity.actor_avator = activity.actor_avator.substring(0, n != -1 ? n : activity.actor_avator.length);
          activity.liked = false;
          activity.commented = false;
          activity.shared = false;
        });
        this.getActivitiesSummary();
    });
  };

  
  getActivitiesSummary(){

    this.postWithAttachement = _.countBy(this.userActivities, function(userActivity) {
        return userActivity.activity_attachment !== null ? 'hasAttachement': 'noAttachement';
    });
    
    this.postsByProviders =  _.countBy(this.userActivities, function(activity){
          return activity.provider.replace(" ", "_");
    }); 
    
    this.providers = _(this.userActivities).chain().flatten().pluck('provider').unique().value();
    this.totalRecords = this.userActivities.length;
    this.totalLikes = this.getTotal('activity_likes');
    this.totalShares = this.getTotal('activity_shares');
    this.totalComments = this.getTotal('activity_comments');
    this.pieChartData = _.values(this.postsByProviders).slice();
  };
  

  likeActivity(id: any){
    this.currentUserActivity = _.find(this.userActivities, function(userActivity) {return userActivity.id == id; });
    this.currentUserActivity.activity_likes = this.currentUserActivity.activity_likes + 1;
    this.totalLikes = this.getTotal('activity_likes');
    this.currentUserActivity.liked = true;
  };

  commentActivity(id: any){
    this.currentUserActivity = _.find(this.userActivities, function(userActivity) {return userActivity.id == id; });
    this.currentUserActivity.activity_comments = this.currentUserActivity.activity_comments + 1;
    this.currentUserActivity.commented = true;
    this.totalComments = this.getTotal('activity_comments');
    this.msgs.push({severity:'success', summary:'Commented on post success!'});  
  };
  
  shareActivity(id: any){
    this.currentUserActivity = _.find(this.userActivities, function(userActivity) {return userActivity.id == id; });
    this.currentUserActivity.activity_shares = this.currentUserActivity.activity_shares + 1;
    this.currentUserActivity.shared = true;
    this.totalShares = this.getTotal('activity_shares');
    this.msgs.push({severity:'success', summary:'Post shared !'});  
  };

  getTotal(type: any){
    return _(this.userActivities).chain().flatten().pluck(type).unique().value().reduce((a, b) => a + b);
  };
}


interface userActivity{
  activity_attachment : string;
  activity_attachment_type : string;
  activity_comments : number;
  activity_date : string;
  activity_latitude : string;
  activity_likes : number;
  activity_longitude : string;
  activity_message : string;
  activity_sentiment : number;
  activity_shares : number;
  activity_url : string;
  actor_avator : string;
  actor_description : string;
  actor_name : string;
  actor_url : string;
  actor_username : string;
  id : string;
  provider : string;
  liked: boolean;
  commented: boolean;
  shared: boolean;
}

