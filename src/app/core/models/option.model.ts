import { Model } from './model';

export class Option extends Model {
  id: number;
  name: string;
  description: string;
  image: string;
  active?: boolean;
}