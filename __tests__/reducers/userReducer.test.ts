import userReducer from '@/reducers/userReducer';

describe('Reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: ''})).toEqual({
      tasks: [],
      modalOpen: false,
    });
  });

  it('should handle OPENMODAL action', () => {
    const initialState = {
      tasks: [],
      modalOpen: false,
    };
    const action = {
      type: 'OPENMODAL',
      payload: true,
    };
    expect(userReducer(initialState, action)).toEqual({
      tasks: [],
      modalOpen: true,
    });
  });

  it('should handle CLOSEMODAL action', () => {
    const initialState = {
      tasks: [],
      modalOpen: true,
    };
    const action = {
      type: 'CLOSEMODAL',
      payload: false,
    };
    expect(userReducer(initialState, action)).toEqual({
      tasks: [],
      modalOpen: false,
    });
  });

  it('should handle ADDTASK action', () => {
    const initialState = {
      tasks: [],
      modalOpen: false,
    };
    const action = {
      type: 'ADDTASK',
      payload: 'New Task',
    };
    expect(userReducer(initialState, action)).toEqual({
      tasks: [
        {
          id: 1,
          title: 'New Task',
          completed: false,
        },
      ],
      modalOpen: false,
    });
  });

  it('should handle ADDTASK action with existing tasks', () => {
    const initialState = {
      tasks: [
        {
          id: 1,
          title: 'Existing Task',
          completed: false,
        },
      ],
      modalOpen: false,
    };
    const action = {
      type: 'ADDTASK',
      payload: 'New Task',
    };
    expect(userReducer(initialState, action)).toEqual({
      tasks: [
        {
          id: 1,
          title: 'Existing Task',
          completed: false,
        },
        {
          id: 2,
          title: 'New Task',
          completed: false,
        },
      ],
      modalOpen: false,
    });
  });

  it('should return the current state for unknown action', () => {
    const initialState = {
      tasks: [],
      modalOpen: false,
    };
    const action = {
      type: 'UNKNOWN_ACTION',
    };
    expect(userReducer(initialState, action)).toEqual(initialState);
  });
});