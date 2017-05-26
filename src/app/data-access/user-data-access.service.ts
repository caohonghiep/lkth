import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {DataAccessService} from "./data-access.service";
import {subscriptionLogsToBeFn} from "rxjs/testing/TestScheduler";

function randomMemberId(){
  let memberId = Math.floor(Math.random()*10)+'';
  while (memberId === '0'){
    memberId = Math.floor(Math.random()*10)+'';
  }
  for(let i = 1 ; i<=10; i++){
    memberId+=Math.floor(Math.random()*10);
  }
  return memberId;
}
@Injectable()
export class UserDataAccessService extends DataAccessService<User>{

  constructor() {
    super(User);

    super.createIndex(['memberId', 'username', 'identityNumber'])
  }

  async post(doc){
    let memberId = randomMemberId();
    let docs = await this.find({memberId:{$eq: memberId}});
    while (docs.length>0){
      memberId = randomMemberId();
      docs = await this.find({memberId:{$eq: memberId}});
      docs = docs.docs;
    }
    doc.memberId = memberId
    return super.post(doc);
  }
}
