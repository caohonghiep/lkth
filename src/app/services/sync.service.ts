import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {DataAccessService} from "../data-access/data-access.service";
import {Tree} from "../models/Tree";
import {UserDataAccessService} from "../data-access/user-data-access.service";
import {TreeDataAccessService} from "../data-access/tree-data-access.service";
import {Queue} from "../models/Queue";

@Injectable()
export class SyncService{

  private dataAccesses;
  constructor(private userDataAccess: UserDataAccessService, private treeDataAccess: TreeDataAccessService) {
    this.dataAccesses = [userDataAccess, treeDataAccess];
  }

  replicate(on){
    this.dataAccesses.forEach(dataAccess=>{
      dataAccess.replicate(on);
    })
  }

  synchronize(on){
    this.dataAccesses.forEach(dataAccess=>{
      dataAccess.synchronize(on);
    })
  }
}
