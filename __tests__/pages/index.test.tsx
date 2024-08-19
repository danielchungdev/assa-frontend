import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Index from '../../app/index';

describe('Verificar que los dos botones exiten y tienen el texto esperado', () => {
  it('Verifica que los dos botones tengan el texto correcto', () => {
    render(<Index />);

    const tasksButton = screen.getByText('Tasks');
    const listButton = screen.getByText('List');

    expect(tasksButton).toBeTruthy();
    expect(listButton).toBeTruthy();
  });
});