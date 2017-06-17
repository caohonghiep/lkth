import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {DataAccessService} from "../data-access/data-access.service";
import {Tree} from "../models/Tree";
import {UserDataAccessService} from "../data-access/user-data-access.service";
import {TreeDataAccessService} from "../data-access/tree-data-access.service";
import {Queue} from "../models/Queue";
import {TreeService} from "./tree.service";

@Injectable()
export class UserService{

  private tree:Tree;
  constructor(private userDataAccess: UserDataAccessService, private treeDataAccess: TreeDataAccessService, private treeService: TreeService) {}

  async createUser(createUser: User, newUser:User){
    let activeTreeId = createUser.treeIds[createUser.treeIds.length-1];
    let newTreeResult = await this.treeService.createNextTree(activeTreeId);

    let newTree = newTreeResult.newNode;
    newUser.createBy = createUser._id;
    newUser.treeIds = [newTree._id];
    let createUserResult = await this.userDataAccess.post(newUser);
    await this.treeDataAccess.put(newTree._id, {'userId':createUserResult.id});
    newUser = await this.userDataAccess.get(createUserResult.id)
    return newUser;
  }
}
