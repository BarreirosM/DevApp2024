import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

type Props = {
  label: string;
  value: string;
  handleValue: (value: string) => void;
  secret?: boolean;
};

export default function MyRadioButton({ label, value, handleValue, secret = false }: Props) {

  return(
    <View style={styles.radioContainer}>
      <RadioButton
        color="#f7a800"
        value={label}
        status={ label === value ? 'checked' : 'unchecked' }
        onPress={() => handleValue(label)}
      />

      <Text style={styles.radioText}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  radioText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: "#757575",
    alignSelf: 'center',
  },

  radioContainer: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
})