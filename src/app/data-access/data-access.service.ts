import {EventEmitter, Injectable} from '@angular/core';
import * as PouchDB from 'pouchdb';
import * as pouchDBFind from 'pouchdb-find';
import {Model} from "../models/Model";
//https://blog.couchbase.com/using-couchbase-mobile-in-a-web-application-with-only-angular-2-and-pouchdb/
//@Injectable()
PouchDB.plugin(pouchDBFind);
export class DataAccessService<T extends Model> {
  private databaseName: string;
  private db:any;
  private serverDB:any;
  private sync:any;
  private repl:any;
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
    this.serverDB = new PouchDB('http://localhost:5984/' + this.databaseName);
    //this.synchronize(true);
  }

  public synchronize(on){
    if(on) {
      debugger
      let changeListener = this.changeListener;
      this.sync = PouchDB.sync(this.serverDB, this.db, {
        live: true,
        retry: true
      }).on('change', function (data) {
        console.log('%s change: %s', this.databaseName, JSON.stringify(data));
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
    }else{
      this.sync.cancel();
    }
  }

  public replicate(on){
    if(on) {
      let changeListener = this.changeListener;
      this.repl = PouchDB.replicate(this.serverDB, this.db, {
        live: true,
        retry: true
      }).on('change', function (data) {
        console.log('%s change: %s',this.databaseName, JSON.stringify(data));
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
    }else{
      this.repl.cancel();
    }

  }
  public getChangeListener() {
    return this.changeListener;
  }

  async getInfo(){
    let info = await this.db.info();
    console.log(info);
  }

  async get(_id){
    try {
      let doc = await this.db.get(_id);
      return doc;
    } catch (err) {
      console.log(err);
      return null;
    }
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


  async post(doc: T){
    let result;
    doc.createDate = doc.createDate || new Date();
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

  async put(_id, obj:any){
    obj.updateDate = obj.updateDate || new Date();
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

  //https://pouchdb.com/guides/mango-queries.html#more-than-one-field
  async createIndex(fields:Array<string>){
    await this.db.createIndex({
      index: {
        fields:fields
      }
    })
  }
/*
 selector: {
 name: {$eq: 'mario'}
 }
 */

  async find(selector:Object) {
    return await this.db.find({
      selector: selector
    });
  }

}
