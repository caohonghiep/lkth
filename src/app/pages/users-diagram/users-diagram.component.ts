import { Component, OnInit } from '@angular/core';
import {UserDataAccessService} from "../../data-access/user-data-access.service";
import {TreeDataAccessService} from "../../data-access/tree-data-access.service";
import {CommonService} from "../../services/common.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Queue} from "../../models/Queue";
import {isUndefined} from "util";
import {TreeService} from "../../services/tree.service";

@Component({
  selector: 'app-users-tree-diagram',
  templateUrl: './users-diagram.component.html',
  styleUrls: ['./users-diagram.component.scss']
})
export class UsersDiagramComponent implements OnInit {

  treeData1:Object
    /*
    = {
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
  };
*/
  treeData2:Object
    /*
    = {
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
  };
*/

  constructor(private userDataAccess: UserDataAccessService,
              private treeService: TreeService,
              private commonService:CommonService,
              private authenticationService: AuthenticationService) { }

  async ngOnInit() {
    let loginUser = await this.authenticationService.getLoginUser();
    let activeTreeId = loginUser.treeIds[loginUser.treeIds.length-1];

    if(!this.treeData1){
      let tree = await this.treeService.getTree(activeTreeId);
      this.treeData1 = await this.customDiagramData(tree);
    }


    if(!this.treeData2){
      let directTree = await this.treeService.getDirectTree(activeTreeId);
      this.treeData2 = await this.customDiagramData(directTree);
    }

  }

  async customDiagramData(root){
    let queue: Queue = new Queue();
    queue.push(root);

    let node;
    do{
      node = queue.pop();
      node.user = await this.userDataAccess.get(node.userId);
      node.text = {
        name: node.user.memberId?'Mã số: ' + node.user.memberId :'',
        title: node.user.username?'Tên: ' + node.user.username:'',
        contact: node.user.phone?'Số ĐT: ' + node.user.phone:''
      }

      Object.keys(node).forEach(key=>{
        if(!['text','children'].includes(key)){
          delete node[key];
        }
      })

      node.image= './assets/headshots/2.jpg';
      node.HTMLclass= 'light-gray';

      if(Array.isArray(node.children)){
        node.collapsed = true;
        node.children.forEach(child=>{
          queue.push(child);
        })
      }

    }while(queue.count()>0)

    return root;
  }

}
