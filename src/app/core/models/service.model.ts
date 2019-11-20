import { Model } from './model';
import { Table } from './table.model';

export class Service extends Model {
  id: number;
  start_at: Date;
  finish_at: Date;
  table: Table;
}
