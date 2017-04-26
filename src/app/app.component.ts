import { Component, OnInit } from '@angular/core';
import {LocationStrategy, PlatformLocation, Location} from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  location: Location;
  treeData=
    {
      text: {
        name: 'Mark Hill',
        title: 'Chief executive officer',
        contact: 'Tel: 01 213 123 134',
      },
      image: './assets/headshots/2.jpg',
      children: [
        {
          text: {
            name: 'Joe Linux',
            title: 'Chief Technology Officer',
          },
          image: './assets/headshots/1.jpg',
          HTMLclass: 'light-gray',
          children: [
            {
              text: {
                name: 'Ron Blomquist',
                title: 'Chief Information Security Officer'
              },
              HTMLclass: 'light-gray',
              image: './assets/headshots/8.jpg',
              collapsed: true,
              children: [
                {
                  text: {
                    name: 'Ron Blomquist',
                    title: 'Chief Information Security Officer'
                  },
                  HTMLclass: 'light-gray',
                  image: './assets/headshots/8.jpg'
                },
                {
                  text: {
                    name: 'Michael Rubin',
                    title: 'Chief Innovation Officer',
                    contact: 'we@aregreat.com'
                  },
                  HTMLclass: 'light-gray',
                  image: './assets/headshots/9.jpg'
                }
              ]
            },
            {
              text: {
                name: 'Michael Rubin',
                title: 'Chief Innovation Officer',
                contact: 'we@aregreat.com'
              },
              HTMLclass: 'light-gray',
              image: './assets/headshots/9.jpg',
              collapsed: true,
              children: [
                {
                  text: {
                    name: 'Ron Blomquist',
                    title: 'Chief Information Security Officer'
                  },
                  HTMLclass: 'light-gray',
                  image: './assets/headshots/8.jpg'
                },
                {
                  text: {
                    name: 'Michael Rubin',
                    title: 'Chief Innovation Officer',
                    contact: 'we@aregreat.com'
                  },
                  HTMLclass: 'light-gray',
                  image: './assets/headshots/9.jpg'
                }
              ]
            }
          ]
        },
        {
          text: {
            name: 'John Green',
            title: 'Chief accounting officer',
            contact: 'Tel: 01 213 123 134',
          },
          HTMLclass: 'gray',
          image: './assets/headshots/6.jpg',
          children: [
            {
              text: {
                name: 'Erica Reel',
                title: 'Chief Customer Officer'
              },
              link: {
                href: 'http://www.google.com'
              },
              HTMLclass: 'gray',
              image: './assets/headshots/10.jpg',
              collapsed: true,
              children: [
                {
                  text: {
                    name: 'Ron Blomquist',
                    title: 'Chief Information Security Officer'
                  },
                  HTMLclass: 'light-gray',
                  image: './assets/headshots/8.jpg'
                },
                {
                  text: {
                    name: 'Michael Rubin',
                    title: 'Chief Innovation Officer',
                    contact: 'we@aregreat.com'
                  },
                  HTMLclass: 'light-gray',
                  image: './assets/headshots/9.jpg'
                }
              ]
            },
            {
              text: {
                name: 'Kirk Douglas',
                title: 'Chief Business Development Officer'
              },
              HTMLclass: 'blue',
              image: './assets/headshots/11.jpg',
              collapsed: true,
              children: [
                {
                  text: {
                    name: 'Ron Blomquist',
                    title: 'Chief Information Security Officer'
                  },
                  HTMLclass: 'light-gray',
                  image: './assets/headshots/8.jpg'
                },
                {
                  text: {
                    name: 'Michael Rubin',
                    title: 'Chief Innovation Officer',
                    contact: 'we@aregreat.com'
                  },
                  HTMLclass: 'light-gray',
                  image: './assets/headshots/9.jpg'
                }
              ]
            }
          ]
        }
      ]
    }
  constructor(location: Location) {
    this.location = location;
  }
  ngOnInit() {
    $.getScript('../assets/js/material-dashboard.js');
    $.getScript('../assets/js/initMenu.js');
  }
  public isMaps(path) {
    let title = this.location.prepareExternalUrl(this.location.path());
    title = title.slice( 1 );
    if (path === title) {
      return false;
    } else {
      return true;
    }
  }
}
