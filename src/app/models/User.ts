import {Model} from "./Model";
export class User extends Model{
  patron:string
  identityNumber: string;
  issue_date: Date;
  issued_by: string;
  username: string;
  birthday: Date;
  phone: string;
  email: string;
  permanent_address: string;
  temporary_address: string;
  communityIds: Array<string>

}
