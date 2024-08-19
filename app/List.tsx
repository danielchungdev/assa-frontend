// List.tsx
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import Spinner from '@/components/Spinner';
import { ApiItem } from '@/types';
import ListItem from '@/components/ListItem';

const API_URL = 'https://6172cfe5110a740017222e2b.mockapi.io/elements';

export const fetchLista = async (): Promise<ApiItem[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Respuesta no es ok');
  }
  return response.json();
};

const List: React.FC = () => {
  const { data, isLoading, error } = useQuery<ApiItem[], Error>('lista', fetchLista);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default List;