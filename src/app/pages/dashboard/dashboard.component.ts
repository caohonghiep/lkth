import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import  '../../../assets/js/charts.js';
declare var $:any;
declare var initDemo:any;
@Component({
    selector: 'dashboard-cmp',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
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
