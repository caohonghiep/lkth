import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import  '../../../assets/js/charts.js';
import {EventsService} from "../../services/events.service";
declare var $:any;
declare var initDemo:any;
@Component({
    selector: 'dashboard-cmp',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  constructor(private eventsService: EventsService){}
    ngOnInit(){
        // $('[data-toggle="checkbox"]').each(function () {
        //     if($(this).data('toggle') == 'switch') return;
        //
        //     var $checkbox = $(this);
        //     $checkbox.checkbox();
        // });
        initDemo();
    }
}
