import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Checkbox from 'expo-checkbox';

type Props = {
  label: string;
  value: boolean;
  handleState: (value: string) => void;
  disabled?: boolean;
};

export default function MyCheckBox({ label, value, handleState, disabled = false}: Props) {

  return(
    <View style={styles.checkContainer}>
      <Checkbox value={value} onValueChange={() => handleState(label)} disabled={disabled}/>

      <Text style={disabled ? styles.checkTextDisabled : styles.checkText}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({

  checkText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: "#757575",
    alignSelf: 'center',
    marginLeft: 8,
    width: 200,
  },

  checkTextDisabled: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: "#bdbdbd",
    alignSelf: 'center',
    marginLeft: 8,
    width: 200,
  },

  checkContainer: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
})