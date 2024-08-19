import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Tasks from '../../app/Tasks';

describe('Tasks component', () => {
  it('renders a list of tasks', () => {
    store.getState().currentData.tasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: false },
    ];
    const { getByText } = render(
      <Provider store={store}>
        <Tasks />
      </Provider>
    );
    expect(getByText('Task 1')).toBeTruthy();
    expect(getByText('Task 2')).toBeTruthy();
  });

  it('renders a message when there are no tasks', () => {
    store.getState().currentData.tasks = [];
    const { getByText } = render(
      <Provider store={store}>
        <Tasks />
      </Provider>
    );
    expect(getByText('No tienes tasks. Agrega una para verla!')).toBeTruthy();
  });

  it('opens the modal when the "New Task" button is pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Tasks />
      </Provider>
    );
    const button = getByText('New Task');
    fireEvent.press(button);
    expect(store.getState().currentData.modalOpen).toBe(true);
  });

  it('renders the AgregarModal component', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Tasks />
      </Provider>
    );
    expect(getByTestId('background-close')).toBeTruthy();
  });
});