import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {MY_ROUTES} from "../../app.routes";

@Component({
    selector: 'navbar-cmp',
    templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    constructor(location:Location) {
        this.location = location;
    }
    ngOnInit(){
        this.listTitles = MY_ROUTES.filter(listTitle => listTitle);
    }
    getTitle(){
        var title = this.location.prepareExternalUrl(this.location.path());
        if(title.charAt(0) === '#'){
            title = title.slice( 2 );
        }
        for(var item = 0; item < this.listTitles.length; item++){
            if(this.listTitles[item].path === title){
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
}
