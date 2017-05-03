import {EventEmitter, Injectable} from '@angular/core';
import * as PouchDB from 'pouchdb';
import {Model} from "../models/Model";
//https://blog.couchbase.com/using-couchbase-mobile-in-a-web-application-with-only-angular-2-and-pouchdb/
//@Injectable()

export class DataAccessService<T extends Model> {
  private databaseName: string;
  private db:any;
  private sync:any;
  private changeListener: EventEmitter<any> = new EventEmitter();
  //private isInstantiated:boolean = false;

  constructor(clazz: Function){
    //if(!this.isInstantiated) {
    // this.isInstantiated = true;
    this.databaseName =
      clazz.name.replace(/[A-Z]/g, (match, offset, string)=> {
        return (offset ? '_' : '') + match.toLowerCase();
      });
    console.log('init data: %s', this.databaseName);

    PouchDB.debug.enable('*');
    this.db = new PouchDB(this.databaseName);

    let changeListener = this.changeListener;
    this.sync = PouchDB.sync(this.databaseName, 'http://localhost:5984/' + this.databaseName, {
      live: true,
      retry: true
    }).on('change', function (data) {
      console.log('%s change: %s', clazz.name, JSON.stringify(data));
      changeListener.emit(data);
      // handle change
    }).on('paused', function (err) {
      // replication paused (e.g. replication up to date, user went offline)
      console.log('replicate paused: %s', JSON.stringify(err));
    }).on('active', function () {
      // replicate resumed (e.g. new changes replicating, user went back online)
      console.log('replicate active');
    }).on('denied', function (err) {
      // a document failed to replicate (e.g. due to permissions)
      console.log('replicate denied: %s', JSON.stringify(err));
    }).on('complete', function (info) {
      // handle complete
      console.log('replicate complete: %s', JSON.stringify(info));
    }).on('error', function (err) {
      // handle error
      console.log('replicate error: %s', JSON.stringify(err));
    });
    //}

  }

  public getChangeListener() {
    return this.changeListener;
  }

  async getInfo(){
    let info = await this.db.info();
    console.log(info);
  }

  async get(_id){
    let doc = await this.db.get(_id);
    return doc;
  }

  async getAll(){
    let docs ={};
    try {
      docs = await this.db.allDocs({
        include_docs: true,
        attachments: true
      });
    } catch (err) {
      console.log(err);
    }
    return docs;
  }


  async post(doc){
    let result;
    if(doc._id){
      result = await this.put(doc._id, doc);
    }else{
      result = await this.db.post(doc);
    }
    // {
    //   "ok": true,
    //   "id": "mydoc",
    //   "rev": "2-9AF304BE281790604D1D8A4B0F4C9ADB"
    // }
    return result;
  }

  async put(_id, obj:T){
    let doc;
    try{
      doc = await this.get(_id);
      Object.keys(obj).forEach(key=>{
        if(key!=='_id' && key !=='_rev'){
          doc[key] = obj[key];
        }
      });
    }catch (err){
      if(err.name === 'not_found'){
        doc = obj;
        doc.id = _id;
      }else{
        throw err;
      }

    }
    let result;
    try {
      result = await this.db.put(doc);
      // doc._id = result.id;
      // doc._rev = result.rev;
    }catch (err){
      if(err.name === 'conflict'){
        result = await this.put(_id, obj);
      }else{
        throw err;
      }
    }
    return result;
  }

  async delete(_id){
    let doc = await this.db.get(_id);
    let result = await this.db.remove(doc._id, doc._rev);
    return result;
  }
}
