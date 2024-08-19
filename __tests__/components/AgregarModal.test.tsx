import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AgregarModal from '../../components/AgregarModal';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../../store/store';
import { addTaskAction, closeModalAction } from '@/actions/userActions';

describe('AgregarModal component', () => {
  const store = createStore(rootReducer);
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.spyOn(store, 'dispatch').mockImplementation(dispatch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Se encuentra el titulo del modal', () => {
    store.getState().currentData.modalOpen = true; // Settear el estado de modal a open
    const { getByText } = render(
      <Provider store={store}>
        <AgregarModal />
      </Provider>
    );
    expect(getByText('Agregar nuevo Task')).toBeTruthy();
  });

  it('Se encuentra el input field con el placeholder', () => {
    store.getState().currentData.modalOpen = true; // Settear el estado de modal a open
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <AgregarModal />
      </Provider>
    );
    expect(getByPlaceholderText('Inserte el task')).toBeTruthy();
  });

  it('Se encuentra el boton de agregar cuando el input no esta vacio', () => {
    store.getState().currentData.modalOpen = true; // Settear el estado de modal a open
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <AgregarModal />
      </Provider>
    );
    const input = getByPlaceholderText('Inserte el task'); //Conseguir el input.
    fireEvent.changeText(input, 'Test Task'); //Cambiar el texto
    expect(getByText('Agregar task')).toBeTruthy();
  });

  it('Nos se encuentra el boton de agregar cunado el input esta vacio', () => {
    store.getState().currentData.modalOpen = true; // Settear el estado de modal a open
    const { queryByText } = render(
      <Provider store={store}>
        <AgregarModal />
      </Provider>
    );
    expect(queryByText('Agregar task')).toBeNull();
  });

  it('Llamar a la funcion handleAddTask cuando el boton de agregar es presionado', () => {
    store.getState().currentData.modalOpen = true; // Settear el estado de modal a open
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <AgregarModal />
      </Provider>
    );
    const input = getByPlaceholderText('Inserte el task'); //Conseguir input por placeholder
    fireEvent.changeText(input, 'Test Task'); //Cambiar el valor del input
    const addButton = getByText('Agregar task'); //Conseguir el botton de agregar task
    fireEvent.press(addButton); //Presionar el botton
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(addTaskAction('Test Task'));
    expect(dispatch).toHaveBeenCalledWith(closeModalAction());
  });

  it('llama handleCloseModal cuando se presiona el backdrop del modal', () => {
    store.getState().currentData.modalOpen = true; // Settear el estado de modal a open
    const { getByTestId } = render(
      <Provider store={store}>
        <AgregarModal />
      </Provider>
    );
    const modalBackground = getByTestId('background-close'); //Conseguir el background
    fireEvent.press(modalBackground); //Press button
    /**
     * triggered 3 veces
     */
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith(closeModalAction());
  });
});