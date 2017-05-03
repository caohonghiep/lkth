import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {DataAccessService} from "./data-access.service";

@Injectable()
export class UserDataAccessService extends DataAccessService<User>{

  constructor() {
    super(User);
  }

}
