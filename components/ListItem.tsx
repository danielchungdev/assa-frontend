import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ApiItem } from '@/types';

interface ListItemProps {
  item: ApiItem;
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {

  const [imageError, setImageError] = useState<boolean>(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <View style={styles.item}>
      <Image 
        source={imageError ? require('@/assets/images/pfp-placeholder.jpeg') : { uri: item.avatar }} // Muestra la imagen de placeholder, si hay un error de carga.
        style={styles.image}
        defaultSource={require('@/assets/images/pfp-placeholder.jpeg')}
        onError={handleImageError}
        testID='avatar-image'
      /> 
      <Text>{item.name}</Text>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});