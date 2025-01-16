import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MyRadioButton from './MyRadioButton';

type Props = {
  id: number;
  labels: string[];
  value: string;
  handleValue: (value: string) => void;
};

export default function MyRadioButtonRow({ id, labels, value, handleValue}: Props) {

  const radioButtons = labels.map((label) => <MyRadioButton key={id++} label={label} value={value} handleValue={handleValue}/>);

  return(
    <View style={styles.radioOptionContainer}>
      {radioButtons}
    </View>
  );
}

const styles = StyleSheet.create({
    radioOptionContainer:{
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 16,
  },
})