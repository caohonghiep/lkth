import { Injectable } from '@angular/core';
import {DataAccessService} from "./data-access.service";
import {Community} from "../models/Community";

@Injectable()
export class CommunityDataAccessService extends DataAccessService<Community>{
  constructor() {
    super(Community);
  }

}
