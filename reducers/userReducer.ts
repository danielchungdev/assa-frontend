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
      // payload es un boolean
      return { ...state, modalOpen: payload }
    case 'CLOSEMODAL':
      // payload es un boolean
      return { ...state, modalOpen: payload }
    case 'ADDTASK':
      // Copiar el estado actual, y despues agregar el current tasks, con el id del numero de items en la lista + 1
      // y el atributo de completed como falso. Payload es el titulo.
      return {...state, tasks: [...state.tasks, {id: state.tasks.length + 1, title: payload, completed: false}]}
  }

  return state
}