import { Injectable } from '@angular/core';
/**
 * Created by AAAA on 3/21/2017.
 */
//http://stackoverflow.com/questions/9671995/javascript-custom-event-listener
  //http://www.typescriptlang.org/play/

class MyEvent{
  private context:Object;
  private cbs: Function[] = [];

  constructor(context: Object){
    this.context = context;
  }

  public addListener(cb: Function){
    this.cbs.push(cb);
  }

  public removeListener(cb: Function){
    let i = this.cbs.indexOf(cb);
    if (i >-1) {
      this.cbs.splice(i, 1);
    }
  }

  public removeAllListeners(){
    this.cbs=[];
  }

  public trigger(...args){
    this.cbs.forEach(cb => cb.apply(this.context, args))
  };
}

class EventContainer{
  private  events: MyEvent[]= [];

  public  createEvent(context:Object):MyEvent{
    let myEvent = new MyEvent(context);
    this.events.push(myEvent);
    return myEvent;
  }

  public  removeEvent(myEvent:MyEvent):void{
    let i = this.events.indexOf(myEvent);
    if (i >-1) {
      this.events.splice(i, 1);
    }
  };

  public  trigger(...args):void{
    this.events.forEach(event => event.trigger(args));
  };
}

class LoginEvent extends EventContainer{}
class LogoutEvent extends EventContainer{}

@Injectable()
export class EventsService {

  private _loginEvent:LoginEvent;
  private _logoutEvent:LogoutEvent;

  constructor() {}

  get loginEvent():LoginEvent{
    if(!this._loginEvent) {
      this._loginEvent = new LoginEvent();
    }
    return this._loginEvent;
  }

  get logoutEvent():LogoutEvent{
    if(!this._logoutEvent) {
      this._logoutEvent = new LogoutEvent();
    }
    return this._logoutEvent;
  }

}
