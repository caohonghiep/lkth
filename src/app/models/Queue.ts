export class Queue{
  private data:Array<any>;
  constructor() {
    this.data = [];
  }

  push(item){
    this.data.push(item);
  }

  pop(){
    return this.data.shift();
  }

  count(){
    return this.data.length;
  }

}
