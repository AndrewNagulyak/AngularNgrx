import { Action } from '@ngrx/store';

export enum HomeActionTypes {
  InitHomeTasksAction = '[InitTasks] Action',
  InitHomeCardsAction = '[InitCards] Action',


}

export class InitHomeTasksAction {
  readonly type = HomeActionTypes.InitHomeTasksAction;
}

export class InitHomeCardsAction {
  readonly type = HomeActionTypes.InitHomeCardsAction;
}



export type HomeActions = InitHomeTasksAction | InitHomeCardsAction;
