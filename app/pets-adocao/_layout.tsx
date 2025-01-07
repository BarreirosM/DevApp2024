import { Stack, useLocalSearchParams, useGlobalSearchParams } from 'expo-router';

export default function Layout() {
  const glob = useGlobalSearchParams();
  const local = useLocalSearchParams();
  const nome = String(glob["nome"]);
  
  return <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }}/>
    <Stack.Screen name ="[pets-adotar]" options={({ navigation }) => ({
            title: nome,
            headerStyle: {
              backgroundColor: '#fee29b',
            },
            headerTintColor: '#434343',

            headerTitleStyle: {
              fontFamily: 'Roboto_500Medium',
              fontSize: 20,
            },
          })}/>
  </Stack>;
}