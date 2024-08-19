import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '@/components/CustomButton';

function Index() {
  return (
    <View style={styles.container}>
      <CustomButton text='Tasks' pageName='/Tasks' type='Link' />
      <CustomButton text='List' pageName='/List' type='Link'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Index