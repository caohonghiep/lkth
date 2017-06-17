import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {UserDataAccessService} from "../../data-access/user-data-access.service";
import {CommonService} from "../../services/common.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Tree} from "../../models/Tree";
import {TreeService} from "../../services/tree.service";
import {TreeDataAccessService} from "../../data-access/tree-data-access.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit {

  public topOfRoot: boolean= false;
  public user:User = new User();
  public loginUser:User = new User();
  constructor(private userDataAccess: UserDataAccessService,
              private treeService: TreeService,
              private commonService:CommonService,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  async ngOnInit() {
   this.loginUser = await this.authenticationService.getLoginUser();
  }

  async createUser(){

    this.user  = await this.userService.createUser(this.loginUser, this.user);
    let userId = this.user._id;
      let result = this.authenticationService.grantPermission(userId,'member');

    //Todo Renew

    this.user = new User;
    this.commonService.showNotification('Tài khoản mới đã tạo thành công.', 'top','right', 'success')


  // async create1023User(){
  //   let startTime = new Date().getMilliseconds();
  //   for(let i =8 ;i<1050; i++ ){
  //     this.user.username = "Name Name " +i
  //     this.user.phone = i+"" +i+""+i
  //     await this.createUser();
  //   }
  //
  //   console.log('Time 1111111:'+(new Date().getMilliseconds() - startTime));
  }


}
