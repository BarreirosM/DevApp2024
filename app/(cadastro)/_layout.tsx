import { Stack } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { StyleSheet, Text, View, Pressable } from "react-native";


export default function TabLayout() {
  return (
    <Stack screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#cfe9e5',
      },
      headerTintColor: '#434343', 
      headerLeft: () => 
        <Pressable style={{paddingRight: 16}}>
          <Text>
            <Entypo name="menu" size={24} color='#434343' />
          </Text>
       </Pressable >,
      headerTitleStyle: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 20,
      },
    })} >
      <Stack.Screen name="cadastro" options={{ title: 'Cadastro Pessoal' }} />
    </Stack>
  );
}
