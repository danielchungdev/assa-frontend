import React from 'react';
import { render } from '@testing-library/react-native';
import TaskCard from '../../components/TaskCard';
import { Task } from '@/types/Task';

describe('TaskCard component', () => {
  const task: Task = {
    id: 1,
    title: 'Test Task',
    completed: false
  };

  it('Se genera el titulo del task', () => {
    const { getByText } = render(<TaskCard task={task} />);
    expect(getByText(task.title)).toBeTruthy();
  });

  it('Verifica que se genera con el tamaño correcto', () => {
    const { getByText } = render(<TaskCard task={task} />);
    const text = getByText(task.title);
    expect(text.props.style).toEqual({
      fontSize: 20,
    });
  });

});