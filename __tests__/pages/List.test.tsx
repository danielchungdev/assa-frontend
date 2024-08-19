import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { useQuery } from 'react-query';
import List from '@/app/List';  // Adjust this import path if necessary
import { ApiItem } from '@/types';
import { fetchLista } from '@/app/List';
import { enableFetchMocks } from 'jest-fetch-mock';


// Mock the react-query hook
jest.mock('react-query');
const mockedUseQuery = useQuery as jest.Mock;

jest.mock('@/components/Spinner', () => {
  const { View, ActivityIndicator } = require('react-native');
  return function MockSpinner() {
    return (
      <View testID='spinner'>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  };
});

jest.mock('@/components/ListItem', () => {
  const { View, Image, Text } = require('react-native');
  return function MockListItem({ item }: { item: ApiItem }) {
    return (
      <View testID={`list-item-${item.id}`} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: item.avatar }}
          style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
          testID={`avatar-${item.id}`}
        />
        <Text>{item.name}</Text>
      </View>
    );
  };
});

describe('Componente List', () => {

  const mockData: ApiItem[] = [
    {"createdAt":"2021-10-22T12:13:22.338Z","name":"Pauline Blanda","avatar":"https://cdn.fakercloud.com/avatars/mkginfo_128.jpg","id":"1"},
    {"createdAt":"2021-10-22T11:08:31.908Z","name":"Marguerite Turner","avatar":"https://cdn.fakercloud.com/avatars/alxndrustinov_128.jpg","id":"2"}
  ]


  it('Aprece el loading spinner', () => {
    mockedUseQuery.mockReturnValue({ isLoading: true });
    render(<List />);
    expect(screen.getByTestId('spinner')).toBeTruthy();
  });

  it('Muestra un error', () => {
    const errorMessage = 'An error occurred';
    mockedUseQuery.mockReturnValue({ isLoading: false, error: new Error(errorMessage) });
    render(<List />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeTruthy();
  });

  it('Muestra la lista', async () => {
    mockedUseQuery.mockReturnValue({ isLoading: false, data: mockData });
    render(<List />);

    await waitFor(() => {
      mockData.forEach((item) => {
        expect(screen.getByTestId(`list-item-${item.id}`)).toBeTruthy();
        expect(screen.getByText(item.name)).toBeTruthy();
        expect(screen.getByTestId(`avatar-${item.id}`)).toBeTruthy();
      });
    });
  });
});

enableFetchMocks();

describe('fetchLista', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('sdebe regresar esta lista si es un request exitoso.', async () => {
    const mockResponse: ApiItem[] = [
      {"createdAt":"2021-10-22T12:13:22.338Z","name":"Pauline Blanda","avatar":"https://cdn.fakercloud.com/avatars/mkginfo_128.jpg","id":"1"},
      {"createdAt":"2021-10-22T11:08:31.908Z","name":"Marguerite Turner","avatar":"https://cdn.fakercloud.com/avatars/alxndrustinov_128.jpg","id":"2"}
    ]
  

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const response = await fetchLista();

    expect(response).toEqual(mockResponse);
  });

  it('Debe tirar un error a cualquier error que no sea un ok (400s)', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });

    expect(fetchLista()).rejects.toThrow('Respuesta no es ok');
  });

  it('Debe pasar (200s) no debe haber error', async () => {
    fetchMock.mockResponseOnce('', { status: 206 });

    expect(fetchLista()).rejects.toThrow();
  });

  it('Debe tirar un error a cualquier error que no sea un ok (300s)', async () => {
    fetchMock.mockResponseOnce('', { status: 304 });

    expect(fetchLista()).rejects.toThrow('Respuesta no es ok');
  });

  it('Debe tirar un error a cualquier error que no sea un ok (500s)', async () => {
    fetchMock.mockResponseOnce('', { status: 500 });

    expect(fetchLista()).rejects.toThrow('Respuesta no es ok');
  });

  it('Debe tirar un error si el request el api falla', async () => {
    fetchMock.mockReject(new Error('API request failed'));

    expect(fetchLista()).rejects.toThrow('API request failed');
  });
});