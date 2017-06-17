import { Component, OnInit } from '@angular/core';
import {EventsService} from "../../services/events.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Location} from "@angular/common";
import {SyncService} from "../../services/sync.service";
import {Router} from "@angular/router";

@Component({
  selector: 'login-cmp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public memberOrEmail: string;
  public password: string;
  constructor(private router: Router, private location: Location, private eventsService: EventsService,
              private authService: AuthenticationService, private syncService: SyncService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  async login() {
    await this.authService.login(this.memberOrEmail, this.password);
    if (this.authService.isLoggedIn) {
      this.syncService.synchronize(true);
      let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
      // Redirect the user
      this.router.navigate([redirect]);


    }
  }

}
