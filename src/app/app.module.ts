import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import {APP_ROUTES, PAGE_COMPONENTS} from "./app.routes";

import { AppComponent } from './app.component';
 import { TreeDiagramComponent } from './components/tree-diagram/tree-diagram.component';
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {FooterComponent} from "./components/footer/footer.component";
import {UserDataAccessService} from "./data-access/user-data-access.service";
import {CommonService} from "./services/common.service";
import {LoginComponent} from './pages/login/login.component';
import {EventsService} from "./services/events.service";
import {AuthenticationService} from "./services/authentication.service";
import {TreeDataAccessService} from "./data-access/tree-data-access.service";
import {TreeService} from "./services/tree.service";
import {UserService} from "./services/user.service";
import {SyncService} from "./services/sync.service";
import {AuthGuard} from "./services/auth-guard.service";

const COMPONENTS = PAGE_COMPONENTS.concat([
  AppComponent,
  SidebarComponent,
  NavbarComponent,
  FooterComponent,
  TreeDiagramComponent
])

@NgModule({
  declarations: [
    COMPONENTS,
    LoginComponent
  ],
  imports: [
    APP_ROUTES,
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    //DataAccessService,
    UserDataAccessService,
    TreeDataAccessService,
    CommonService,
    EventsService,
    AuthenticationService,
    AuthGuard,
    TreeService,
    UserService,
    SyncService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
