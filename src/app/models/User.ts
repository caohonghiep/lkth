import {Model} from "./Model";
export class User extends Model{
  createBy:string;

  //profile information
  username: string;
  memberId: string;
  birthday: Date;

  //identity information
  identityNumber: string;
  identityIssueDate: Date;
  identityIssuedBy: string;

  //contract information
  phone: string;
  email: string;
  permanentAddress: string;
  temporaryAddress: string;

  treeIds: Array<string>//id in tree

}
