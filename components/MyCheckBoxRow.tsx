import { StyleSheet, View } from 'react-native';
import MyCheckBox from './MyCheckBox';

type Props = {
  id: number;
  labels: string[];
  values: boolean[];
  handleState: (value: string) => void;
  disabled?: boolean;
};

export default function MyCheckBoxRow({ id, labels, values, handleState, disabled = false}: Props) {

  const checkBoxes = labels.map((label, index) => {
  //console.log(`${label} ${values[index+id]} ${id} ${index}`)
  return <MyCheckBox key={id+index} label={label} value={values[index+id]} disabled={disabled} handleState={handleState}/>}
  );

  return(
  <View style={styles.checkBoxesRow}>
    {checkBoxes}
  </View>
  );
}

const styles = StyleSheet.create({

  checkBoxesRow:{
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 16,
  },
})