import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {DataAccessService} from "../data-access/data-access.service";
import {Tree} from "../models/Tree";
import {UserDataAccessService} from "../data-access/user-data-access.service";
import {TreeDataAccessService} from "../data-access/tree-data-access.service";
import {Queue} from "../models/Queue";
import {config} from '../config';

@Injectable()
export class TreeService{

  private tree:Tree;
  constructor(private userDataAccess: UserDataAccessService, private treeDataAccess: TreeDataAccessService) {}


  maximumNodesInLevel(level) {
    let count = 1; // root node
    for (let i = 1; i <= level; i++) {
      count += Math.pow(2, i);
    }
    return count;
  }

  async getRefund(rootId){
    let root = await this.treeDataAccess.get(rootId);
    let sumRefund = 0;
    let unitsRefund = config.refund;
    let maximumLevel = Object.keys(unitsRefund).length-1;
    let queue: Queue = new Queue();
    root.level=0;
    queue.push(root);

    do {
      let node = queue.pop();
      sumRefund+= unitsRefund['level_'+node.level];
      if(node.level < maximumLevel){
        if (Array.isArray(node.childrenIds)) {
          let loadChildrenProcess = node.childrenIds.map(childId => {
            return this.treeDataAccess.get(childId);
          });
          let children = await Promise.all(loadChildrenProcess);
          node.children = children.map(child=>{
            child['level'] = node.level+1;
            return child;
          });
          node.children.forEach(child => {
            queue.push(child);
          })

        }
      }

    } while (queue.count() > 0);

    return sumRefund;
  }

  async createNextTree(rootNodeId) {
    let queue: Queue = new Queue();
    let node;
    let newNode;
    let rootNode = await this.treeDataAccess.get(rootNodeId);
    queue.push(rootNode);

    let countNodes = 1;
    do {
      node = queue.pop();
      if (!(Array.isArray(node.childrenIds)) || (node.childrenIds.length < 2)) {
        let childResult = await this.treeDataAccess.post(new Tree());
        //add more children
        node.childrenIds = node.childrenIds || [];
        node.childrenIds.push(childResult.id);
        await this.treeDataAccess.put(node._id, node);
        //add more directChildren
        rootNode.directChildrenIds = rootNode.directChildrenIds || [];
        rootNode.directChildrenIds.push(childResult.id);
        await this.treeDataAccess.put(rootNode._id, rootNode);
        newNode = {_id: childResult.id, _rev: childResult.rev}
        countNodes++;
        break;
      } else {
        countNodes += 2;
        let child0 = await this.treeDataAccess.get(node.childrenIds[0]);
        let child1 = await this.treeDataAccess.get(node.childrenIds[1]);
        queue.push(child0);
        queue.push(child1);
      }
    } while (!newNode || queue.count() > 0);

    return {newNode: newNode, countNodes: countNodes};
  }

  async getDirectTree(rootId) {
    let root = await this.treeDataAccess.get(rootId);
    root.user = await this.userDataAccess.get(root.userId);
    if (Array.isArray(root.directChildrenIds)) {
      let loadDirectChildrenProcess = root.directChildrenIds.map(directChildId => {
        return new Promise((resolve, reject) => {
          this.treeDataAccess.get(directChildId).then(directChild => {
            this.userDataAccess.get(directChild.userId).then(user => {
              directChild.user = user;
              resolve(directChild);
            })
          })
        })
      });
      let directChildren = await Promise.all(loadDirectChildrenProcess);
      root.children = directChildren;
    }
    return root;

  }

  async getTree(rootId) {
    let root = await this.treeDataAccess.get(rootId);
    let unitsRefund = config.refund;
    let maximumLevel = Object.keys(unitsRefund).length-1;
    let queue: Queue = new Queue();
    root.level=0;
    queue.push(root);
    do {
      let node = queue.pop();
      if(node.level < maximumLevel) {
        node.user = await this.userDataAccess.get(node.userId);
        if (Array.isArray(node.childrenIds)) {
          let loadChildrenProcess = node.childrenIds.map(childrenId => {
            return this.treeDataAccess.get(childrenId);
          });
          let children = await Promise.all(loadChildrenProcess);
          node.children = children.map(child=>{
            child['level'] = node.level+1;
            return child;
          });
          node.children.forEach(child => {
            queue.push(child);
          })

        }
      }
    } while (queue.count() > 0);
    return root;
  }

  async countDirectChildren(rootId){
    let root = await this.treeDataAccess.get(rootId);
    return Array.isArray(root.directChildrenIds)?root.directChildrenIds.length: 0;
  }

  async countChildren(rootId) {
    let root = await this.treeDataAccess.get(rootId);
    let countNodes = 1;
    let queue: Queue = new Queue();

    queue.push(root);

    do {
      let node = queue.pop();
      node.user = await this.userDataAccess.get(node.userId);
      if (Array.isArray(node.childrenIds)) {
        let loadChildrenProcess = node.childrenIds.map(childrenId => {
          countNodes++;
          return this.treeDataAccess.get(childrenId);
        });
        let children = await Promise.all(loadChildrenProcess);
        node.children = children;
        node.children.forEach(child => {
          queue.push(child);
        })

      }
    } while (queue.count() > 0);

    return countNodes;
  }

}
