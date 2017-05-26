import {Model} from "./Model";
export class Tree extends Model{
  userId:string;
  childrenIds:Array<string>;
}
