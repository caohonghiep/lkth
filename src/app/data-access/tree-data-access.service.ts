import { Injectable } from '@angular/core';
import {DataAccessService} from "./data-access.service";
import {Tree} from "../models/Tree";
import {UserDataAccessService} from "./user-data-access.service";
import {Queue} from "../models/Queue";
import {queue} from "rxjs/scheduler/queue";

@Injectable()
export class TreeDataAccessService extends DataAccessService<Tree> {

  constructor() {
    super(Tree);
  }
}
