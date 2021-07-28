import {CardModel} from './card.model';

export class BoardModel {
  title: string;
  imgUrl?: string;
  id?: number;
  color?: string;
  cards: CardModel[]
  viewedDate: string;
}
