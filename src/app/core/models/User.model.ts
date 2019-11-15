import { Model } from './model';

export class User extends Model {
  id: number;
  name: string;
  email: string;
  password?: string;
}
