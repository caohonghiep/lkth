import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {debug} from "util";
import {MY_ROUTES} from "../../app.routes";
import {Location} from "@angular/common";
import {EventsService} from "../../services/events.service";

declare var $:any;
@Component({
    selector: 'sidebar-cmp',
    templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  private _ready:boolean;
  public menuItems: any[];
    constructor(private location: Location, private eventsService: EventsService){}
    ngOnInit() {
        $.getScript('../../assets/js/sidebar-moving-tab.js');
        this.menuItems = MY_ROUTES.filter(menuItem => menuItem);
    }
  isFocus(path){
    let p = this.location.path();
    p = p.slice( 1 );
    return path === p;
  }

  logout(){
    this.eventsService.logoutEvent.trigger();
  }
}
