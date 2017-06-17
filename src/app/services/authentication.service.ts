import { Injectable } from '@angular/core';
import {EventsService} from "./events.service";
import {User} from "../models/User";
import {UserDataAccessService} from "../data-access/user-data-access.service";
import {Router} from "@angular/router";
import {SyncService} from "./sync.service";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import {config} from '../config';
import {unescape} from "querystring";
import {isUndefined} from "util";

@Injectable()
export class AuthenticationService {
  private loginUser;
  public redirectUrl:string;
  constructor(private http: Http, private router: Router, private userDataAccess: UserDataAccessService, private eventsService: EventsService,  private syncService: SyncService) { }

  async login(memberId, password){
    //https://labs.encoded.io/2016/12/08/asyncawait-with-angular/
    //https://github.csc.com/hcao7/OmniChannel-QuestionnairePOC/blob/master/OmniChannel-QuestionnairePOC-UI/src/app/components/questionnaire-detail/questionnaire-detail.component.ts

    let url = config.authentication.server+config.authentication.login;
    console.log('request url: '+url);
    let body = JSON.stringify({memberId: memberId, password: password});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let response:Response = await this.http.post(url, body, {headers:headers}).toPromise();
    let result =  response.json();
    if(result.error){
      window.alert(result.error)
    }else {
      window.sessionStorage.setItem('memberId', result.memberId);
      window.sessionStorage.setItem('token', result.token);
      window.sessionStorage.setItem('role', result.role);
      this.eventsService.loginEvent.trigger();
      let redirectUrl = this.redirectUrl || '/dashboard';
      this.router.navigate([redirectUrl]);
    }
  }

  async logout(){
    let url = config.authentication.server+config.authentication.logout;
    console.log('request url: '+url);
    let memberId = window.sessionStorage.getItem('memberId');
    let token = window.sessionStorage.getItem('token');
    let body = JSON.stringify({memberId: memberId, token: token});
    this.loginUser = undefined;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let response:Response = await this.http.post(url, body, {headers:headers}).toPromise();
    let result =  response.json();

    window.sessionStorage.removeItem('memberId');
    window.sessionStorage.removeItem('token');
    this.eventsService.logoutEvent.trigger();
    this.syncService.synchronize(false);
    this.router.navigate(['/login']);


  }

  isLoggedIn(){
    return (window.sessionStorage.getItem('memberId') != null)
  }

  async getLoginUser(){
    if(!this.loginUser){
      let memberId =window.sessionStorage.getItem('memberId');
      let docs = await this.userDataAccess.find({memberId:{$eq: memberId}});
      this.loginUser = docs.docs[0];
      this.loginUser.role = window.sessionStorage.getItem('role');

    }
    return  this.loginUser;
  }

  async grantPermission(userId, role){
    let url = config.authentication.server+config.authentication.grantPermission;
    console.log('request url: '+url);
    let body = JSON.stringify({userId: userId, role: role});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let response:Response = await this.http.post(url, body, {headers:headers}).toPromise();
    let result =  response.json();
  }

}
