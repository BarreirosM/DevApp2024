import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#fee29b',
      },
      headerTintColor: '#434343', 
      headerTitleStyle: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 20,
      },
    })} >
      <Stack.Screen name="cadastro-animal" options={{ 
        title: 'Cadastro do Animal' }} />
    </Stack>
  );
}