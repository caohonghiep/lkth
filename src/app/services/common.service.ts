import { Injectable } from '@angular/core';
declare var $:any;
@Injectable()
export class CommonService{

  constructor() {}

  showNotification(message, from, align, color){
    $.notify(
      {
        icon: "notifications",
        message: message

      },
      {
        type: color,
        timer: 4000,
        placement: {
          from: from,
          align: align
        }
      });
  }

  sendWelcomeEmail(){

  }
}
