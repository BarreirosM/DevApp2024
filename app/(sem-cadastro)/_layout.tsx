import { Stack, Link } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#cfe9e5',
      },
      headerTintColor: '#434343', 
      headerTitleStyle: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 20,
      },
    })} >
      <Stack.Screen name="sem-cadastro" options={{ 
        title: 'Cadastro' }} />
    </Stack>
  );
}