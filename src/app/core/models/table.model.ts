import { Model } from './model';

export class Table extends Model {
  id: number;
  name: string;
  active?: boolean;
}
