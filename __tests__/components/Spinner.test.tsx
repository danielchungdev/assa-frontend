import React from 'react';
import { render } from '@testing-library/react-native';
import Spinner from '../../components/Spinner';

describe('Spinner component', () => {
  it('renders ActivityIndicator', () => {
    const { getByTestId } = render(<Spinner />);
    const activityIndicator = getByTestId('spinner');
    expect(activityIndicator).toBeTruthy();
  });

  it('Se genera el tamaño correcto del spinner', () => {
    const { getByTestId } = render(<Spinner />);
    const activityIndicator = getByTestId('spinner');
    expect(activityIndicator.props.size).toBe('large');
  });

  it('Se genera el color correcto para el spinner', () => {
    const { getByTestId } = render(<Spinner />);
    const activityIndicator = getByTestId('spinner');
    expect(activityIndicator.props.color).toBe('#0000ff');
  });

  it('Verifica que el contenedor esta en el centro', () => {
    const { getByTestId } = render(<Spinner />);
    const container = getByTestId('container');
    expect(container.props.style).toEqual({
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    });
  });
});