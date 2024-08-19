import { openModalAction, closeModalAction, addTaskAction } from "../../actions/userActions";

describe('Actions', () => {
  it('should create an action to open the modal', () => {
    const expectedAction = {
      type: 'OPENMODAL',
      payload: true,
    };
    expect(openModalAction()).toEqual(expectedAction);
  });

  it('should create an action to close the modal', () => {
    const expectedAction = {
      type: 'CLOSEMODAL',
      payload: false,
    };
    expect(closeModalAction()).toEqual(expectedAction);
  });

  it('should create an action to add a task', () => {
    const task = 'New Task';
    const expectedAction = {
      type: 'ADDTASK',
      payload: task,
    };
    expect(addTaskAction(task)).toEqual(expectedAction);
  });

  it('should throw an error when creating an action with an empty string', () => {
    expect(() => addTaskAction('')).toThrowError('Task no puede estar vacio');
  });
  });