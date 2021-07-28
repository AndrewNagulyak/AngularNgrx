import {TaskModel} from './task.model';

export class CardModel {
  id?: number;
  title: string;
  boardId: number;
  tasks?: TaskModel[];
}
