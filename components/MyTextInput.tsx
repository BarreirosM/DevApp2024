import React, {useState} from 'react';
import { StyleSheet, TextInput } from 'react-native';

type Props = {
  text: string;
  handleValue: (value: string) => void;
  secret?: boolean;
};

export default function MyTextInput({ text, handleValue, secret = false }: Props) {

  const [isFocused, setIsFocused] = useState(false); 

  const handleOnFocus = () => { 
    setIsFocused(prev => true); 
  }; 

  const handleBlur = () => { 
    setIsFocused(prev => false); 
  }; 

  return(
    <TextInput style={[styles.textInput, isFocused ? styles.textFocus : styles.textBlur]}
      placeholder={text}
      placeholderTextColor="#bdbdbd"
      onChangeText={newValue => handleValue(newValue)}
      onFocus={handleOnFocus}
      onBlur={handleBlur}
      secureTextEntry={secret}>
      </TextInput>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: 312,
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    paddingBottom: 8,
  },

  textBlur: {
    borderBottomColor: '#e6e7e8',
    borderBottomWidth: 0.8,
  },

  textFocus: {
    borderBottomColor: '#88c9bf',
    borderBottomWidth: 2,
  },
})