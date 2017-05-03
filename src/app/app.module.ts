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
import {UserDataAccessService} from "./services/user-data-access.service";
import {CommunityDataAccessService} from "./services/community-data-access.service";
import {CommonService} from "./services/common.service";

const COMPONENTS = PAGE_COMPONENTS.concat([
  AppComponent,
  SidebarComponent,
  NavbarComponent,
  FooterComponent,
  TreeDiagramComponent
])

@NgModule({
  declarations: [
    COMPONENTS
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
    CommunityDataAccessService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
