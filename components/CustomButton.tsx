import { Link } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Href } from 'expo-router';
import { StyleSheet } from 'react-native';

interface CustomButtonProps {
  style?: {};
  text: string;
  pageName?: Href<string>;
  type: 'Link' | 'Action',
  onPress?: () => void,
}

const CustomButton: React.FC<CustomButtonProps> = ({ style, text, pageName, type, onPress }) => {

  const buttonContents = (
    <Text style={styles.text}>{text}</Text>
  );

  //Aqui para que no haya el error de un link sin href, pero no forzar a un boton de tipo action 
  //a requerir siempre el string.
  const defaultHref = '/defaultPage' as Href<string>; 
  const href = pageName || defaultHref;
  
  if (type === 'Link') {
    return (
      <Link href={href} style={[styles.buttonBackground, style]} asChild testID='link-component'>
        <TouchableOpacity>
          {buttonContents}
        </TouchableOpacity>
      </Link>
    );
  }
  else {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.buttonBackground, style]} testID='button-container'>
        <Text style={styles.text} testID='button-text'>{text}</Text>
      </TouchableOpacity>
    );
  }

}
export default CustomButton

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonBackground: {
    backgroundColor: '#2196F3',
    width: '50%',
    opacity: 1,
    padding: 20,
    margin: 5,
    borderRadius: 10,
  }
});
