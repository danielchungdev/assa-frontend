import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Tasks from '../../app/Tasks';

describe('Tasks component', () => {
  it('Carga una lista de tasks', () => {
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

  it('Muestra el mensaje cuando no hay tasks', () => {
    store.getState().currentData.tasks = [];
    const { getByText } = render(
      <Provider store={store}>
        <Tasks />
      </Provider>
    );
    expect(getByText('No tienes tasks. Agrega una para verla!')).toBeTruthy();
  });

  it('Se abre el modal cuando se presiona el boton de New Task', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Tasks />
      </Provider>
    );
    const button = getByText('New Task');
    fireEvent.press(button);
    expect(store.getState().currentData.modalOpen).toBe(true);
  });

  it('Se le hace render al componente de modal.', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Tasks />
      </Provider>
    );
    expect(getByTestId('background-close')).toBeTruthy();
  });
});