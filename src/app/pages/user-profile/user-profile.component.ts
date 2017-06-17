import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {AuthenticationService} from "../../services/authentication.service";
import {CommonService} from "../../services/common.service";
import {TreeDataAccessService} from "../../data-access/tree-data-access.service";
import {UserDataAccessService} from "../../data-access/user-data-access.service";

@Component({
    selector: 'user-profile-cmp',
    templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})

export class UserProfileComponent implements OnInit{

  public selectedUser:User = new User();
  constructor(private userDataAccess: UserDataAccessService,
              private treeDataAccess: TreeDataAccessService,
              private commonService:CommonService,
              private authenticationService: AuthenticationService) {
  }

  async ngOnInit(){
    this.selectedUser = await this.authenticationService.getLoginUser();
    // $.getScript('../../../assets/js/material-dashboard.js');

  }

  async update(){
    await this.userDataAccess.put(this.selectedUser._id, this.selectedUser);
    this.commonService.showNotification('Đã Cập Nhật Xong!', 'top','right', 'success')
  }

}
