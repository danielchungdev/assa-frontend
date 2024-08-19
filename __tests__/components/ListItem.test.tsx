import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ListItem from '../../components/ListItem'
import { ApiItem } from '@/types';

describe('ListItem component', () => {
  const item: ApiItem = {"createdAt":"2021-10-22T12:13:22.338Z","name":"Pauline Blanda","avatar":"https://cdn.fakercloud.com/avatars/mkginfo_128.jpg","id":"1"}

  it('Se genera el nombre del item', () => {
    const { getByText } = render(<ListItem item={item} />);
    expect(getByText(item.name)).toBeTruthy();
  });

  it('Se genera el avatar', () => {
    const { getByTestId } = render(<ListItem item={item} />);
    const image = getByTestId('avatar-image');
    expect(image).toBeTruthy();
    expect(image.props.source).toEqual({ uri: item.avatar });
  });

  it('Se genera el avatar placeholder en caso del failure', () => {
    const { getByTestId } = render(<ListItem item={item} />);
    const image = getByTestId('avatar-image');
    fireEvent(image, 'error');
    expect(image.props.source).toEqual(require('@/assets/images/pfp-placeholder.jpeg'));
  });

  it('Se general el avatar placeholder mientras se carga', () => {
    const { getByTestId } = render(<ListItem item={item} />);
    const image = getByTestId('avatar-image');
    expect(image.props.defaultSource).toEqual(require('@/assets/images/pfp-placeholder.jpeg'));
  });
});