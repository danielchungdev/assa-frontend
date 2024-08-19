import { Task } from '@/types/Task';

interface DataState {
  tasks: Task[];
  modalOpen: boolean
}

interface Action<T = any> {
  type: string;
  payload?: T;
}

const initialState: DataState = {
  tasks: [],
  modalOpen: false,
}

export default (state: DataState = initialState, { type, payload }: Action) => {

  switch (type) {
    case 'OPENMODAL':
      return { ...state, modalOpen: payload }
    case 'CLOSEMODAL':
      return { ...state, modalOpen: payload }
    case 'ADDTASK':
      return {...state, tasks: [...state.tasks, {id: state.tasks.length + 1, title: payload, completed: false}]}
  }

  return state
}