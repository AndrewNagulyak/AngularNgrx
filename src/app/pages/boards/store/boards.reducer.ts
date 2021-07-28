import {BoardModel} from '../../../shared/models/board.model';
import {BoardsActions, BoardsActionTypes} from './boards.actions';


export const boardsFeatureKey = 'boards';

export interface BoardsState {
  data: BoardModel[];
  lastData: BoardModel[];
  selected: BoardModel;
  action: string;
  done: boolean;
  totalPage: number;
  page: number;
  selectedBoard: number;
  cachePage: number[];
  error?: Error;
}

export const initialState: BoardsState = {
  data: [],
  lastData: null,
  totalPage: 0,
  cachePage: [],
  page: 1,
  selectedBoard: 0,
  selected: null,
  action: null,
  done: false,
  error: null
};

export function boardsReducer(state = initialState, action: BoardsActions): BoardsState {
  switch (action.type) {
    case BoardsActionTypes.PageChange :
      return {
        ...state,
        page: action.payload.page,
        action: BoardsActionTypes.PageChange,
        done: true,
        selected: null,
        error: null
      };
    case BoardsActionTypes.GetBoardsSuccess :
      const cachePage = [...state.cachePage];
      if (!cachePage.includes(action.payload.page.page)) {
        cachePage.push(action.payload.page.page);
      }
      let beforeData = [];
      if (action.payload.page.page > 1) {
        beforeData = state.data.slice(0, (action.payload.page.page - 1) * action.payload.page.limit);
        if (beforeData.length < (action.payload.page.page - 1) * action.payload.page.limit) {
          const missingElements = (action.payload.page.page - 1) * action.payload.page.limit - beforeData.length;
          for (let step = 0; step < missingElements; step++) {
            beforeData.push(null);
          }
        }
      }
      // const prevData = state.data.slice(0, action.payload.page.limit * action.payload.page.page - 1);
      const afterData = state.data.slice(action.payload.page.limit * action.payload.page.page, state.data.length);
      const finalData = [...beforeData, ...action.payload.boards.results, ...afterData];
      return {
        ...state,
        data: finalData,
        totalPage: action.payload.boards.total,
        cachePage: cachePage,
        done: true,
        selected: null,
        error: null
      };
    case BoardsActionTypes.GetBoardsError :
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload,
      };


    case BoardsActionTypes.GetLastBoards :
      return {
        ...state,
        action: BoardsActionTypes.GetLastBoards,
        done: false,
        selected: null,
        error: null
      };
    case BoardsActionTypes.GetLastBoardsSuccess :
      return {
        ...state,
        lastData: action.payload,
        done: true,
        action: BoardsActionTypes.GetLastBoardsSuccess,
        selected: null,
        error: null
      };
    case BoardsActionTypes.GetLastBoardsError :
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload,
      };

    case BoardsActionTypes.GetBoard :
      return {
        ...state,
        action: BoardsActionTypes.GetBoard,
        done: false,
        selected: null,
        error: null
      };
    case BoardsActionTypes.GetBoardSuccess :
      const replaceBoardIndex = state.data.findIndex((board: BoardModel) => board.id === action.payload.id);
      let newData;
      if (replaceBoardIndex > -1) {
        newData = [...state.data];
        newData[replaceBoardIndex] = action.payload;
      } else {
        newData = [...state.data, action.payload];
      }
      return {
        ...state,
        data: newData,
        selected: action.payload,
        done: true,
        error: null
      };
    case BoardsActionTypes.GetBoardError :
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

    case BoardsActionTypes.CreateBoard :
      return {
        ...state,
        selected: action.payload,
        action: BoardsActionTypes.CreateBoard,
        done: false,
        error: null
      };
    case BoardsActionTypes.CreateBoardSuccess : {
      const newBoard = {
        ...state.selected,
        ...action.payload
      };
      const data = [
        ...state.data,
        newBoard
      ];
      const lastData = [
        ...state.lastData,
        newBoard
      ];
      return {
        ...state,
        data,
        lastData,
        selected: null,
        error: null,
        done: true
      };
    }
    case BoardsActionTypes.CreateCard :
      return {
        ...state,
        action: BoardsActionTypes.CreateCard,
        done: false,
        error: null
      };
    case BoardsActionTypes.CreateCardSuccess : {
      const newCard = action.payload;
      const data = [...state.data];
      const index = state.data.findIndex(board => board.id === newCard.boardId);
      const cards = [...data[index].cards, newCard];
      const newBoard = {...data[index], cards: cards};
      data[index] = newBoard;
      return {
        ...state,
        data,
        selected: null,
        error: null,
        done: true
      };
    }
    case BoardsActionTypes.CreateTask :
      return {
        ...state,
        action: BoardsActionTypes.CreateCard,
        selectedBoard: action.borderId,
        done: false,
        error: null
      };
    case BoardsActionTypes.CreateTaskSuccess : {
      const newTask = action.payload;
      const data = [...state.data];
      const index = state.data.findIndex(board => board.id === state.selectedBoard);
      const cardIndex = data[index].cards.findIndex(card => card.id === newTask.cardId);
      const tasks = [...data[index].cards[cardIndex].tasks, newTask];
      const newCard = {...data[index].cards[cardIndex], tasks: tasks};
      // const newCard = {...data[index].cards[cardIndex]}
      const cards = [...data[index].cards.slice(0, cardIndex),
        {...data[index].cards.slice(cardIndex, 1), ...newCard},
        ...data[index].cards.slice(cardIndex + 1)];
      const newBoard = {...data[index], cards: cards};
      data[index] = newBoard;
      return {
        ...state,
        data,
        selected: null,
        error: null,
        done: true
      };
    }
    case BoardsActionTypes.UpdateCardSuccess : {
      const card = action.payload;
      const data = [...state.data];
      const boardIndex = data.findIndex(board => board.id === card.boardId);
      const currentBoard = data[boardIndex];
      const cardIndex = currentBoard.cards.findIndex(findCard => findCard.id === card.id);
      const cards = [...currentBoard.cards.slice(0, cardIndex),
        {...currentBoard.cards.slice(cardIndex, 1), ...card},
        ...currentBoard.cards.slice(cardIndex + 1)];
      data[boardIndex] = {...currentBoard, cards: cards};
      return {
        ...state,
        data,
        selected: null,
        error: null,
        done: true
      };
    }
    case BoardsActionTypes.CreateBoardError :
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

    default:
      return state;
  }
}
