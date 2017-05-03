import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit {

  public user:User = new User();
  constructor() { }

  ngOnInit() {
  }

}
