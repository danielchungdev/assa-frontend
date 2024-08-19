
export const openModalAction = () => {
  return {
    type: 'OPENMODAL',
    payload: true
  }
}

export const closeModalAction = () => {
  return {
    type: 'CLOSEMODAL',
    payload: false
  }
}

export const addTaskAction = (task: string) => {
  if (!task || task.trim() === '') {
    throw new Error('Task no puede estar vacio');
  }
  return {
    type: 'ADDTASK',
    payload: task,
  };
};