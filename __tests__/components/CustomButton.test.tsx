import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../../components/CustomButton';
import { StyleSheet, Touchable } from 'react-native';

describe('CustomButton component', () => {
  it('Se comprueba el texto del boton', () => {
    const { getByText } = render(<CustomButton text="Button Text" type="Action" />);
    expect(getByText('Button Text')).toBeTruthy();
  });

  it('Se comprueba el el button tiene los estilos correctos', () => {
    const { getByTestId } = render(<CustomButton text="Button Text" type="Action" />);
    const button = getByTestId('button-container');
    const styles = StyleSheet.flatten(button.props.style);
    expect(styles).toEqual(
      expect.objectContaining({
        backgroundColor: '#2196F3',
        width: '50%',
        padding: 20,
        margin: 5,
        borderRadius: 10,
      })
    );
  });

  it('llama la funcion onPress when cuando el es presionado y el tipo es "Action"', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<CustomButton text="Button Text" type="Action" onPress={onPress} />);
    const button = getByTestId('button-container');
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});