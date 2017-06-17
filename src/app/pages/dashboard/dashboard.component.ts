import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import  '../../../assets/js/charts.js';
import {EventsService} from "../../services/events.service";
import {AuthenticationService} from "../../services/authentication.service";
import {TreeService} from "../../services/tree.service";
import {config} from '../../config';
declare var $:any;
declare var initDemo:any;
@Component({
    selector: 'dashboard-cmp',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  constructor(private eventsService: EventsService,
              private authenticationService: AuthenticationService,
              private treeService: TreeService){}
  public numberOfChildren;
  public numberOfDirectChildren
  public refund;
  public directRefund;
    async ngOnInit(){
      let loginUser = await this.authenticationService.getLoginUser();
      let activeTreeId = loginUser.treeIds[loginUser.treeIds.length-1];
      this.numberOfDirectChildren = await this.treeService.countDirectChildren(activeTreeId);
      this.numberOfChildren = await this.treeService.countChildren(activeTreeId);
      this.refund = await this.treeService.getRefund(activeTreeId);
      this.directRefund = this.numberOfDirectChildren*config.directRefund;
        // $('[data-toggle="checkbox"]').each(function () {
        //     if($(this).data('toggle') == 'switch') return;
        //
        //     var $checkbox = $(this);
        //     $checkbox.checkbox();
        // });
        initDemo();
    }
}
