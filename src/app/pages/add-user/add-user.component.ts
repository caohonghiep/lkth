import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {UserDataAccessService} from "../../services/user-data-access.service";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit {

  public user:User = new User();
  constructor(private userDataAccess: UserDataAccessService, private commonService:CommonService) { }

  ngOnInit() {
  }

  async createUser(){
    await this.userDataAccess.post(this.user);
    this.commonService.showNotification('Tài khoản mới đã tạo thành công.', 'top','right', 'success')
  }

}
