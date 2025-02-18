import { Entypo } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import { Pressable, Text } from 'react-native';

export default function Layout() {
  const glob = useGlobalSearchParams();
  const local = useLocalSearchParams();
  const nome = String(glob["nome"]);
  
  return <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }}/>
    <Stack.Screen name ="[mine-pets]" options={({ navigation }) => ({
            title: nome,
            headerStyle: {
              backgroundColor: '#cfe9e5',
            },
            headerTintColor: '#434343',
            
            headerRight: () => 
              <Pressable style={{paddingRight: 16, paddingLeft: 12,}}>
                <Text>
                  <Entypo name="share" size={24} color="#434343" />
                </Text>
              </Pressable>,

            headerTitleStyle: {
              fontFamily: 'Roboto_500Medium',
              fontSize: 20,
            },
          })}/>
    <Stack.Screen name ="interessados" options={({ navigation }) => ({
            title: "Interessados",
            headerStyle: {
              backgroundColor: '#cfe9e5',
            },
            headerTintColor: '#434343',
            
            headerRight: () => 
              <Pressable style={{paddingRight: 16, paddingLeft: 12,}}>
                <Text>
                  <Entypo name="share" size={24} color="#434343" />
                </Text>
              </Pressable>,

            headerTitleStyle: {
              fontFamily: 'Roboto_500Medium',
              fontSize: 20,
            },
          })}/>
  </Stack>;
}