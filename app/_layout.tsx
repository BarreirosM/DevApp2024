
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useFonts } from 'expo-font' 
import {Roboto_400Regular, Roboto_500Medium  } from '@expo-google-fonts/roboto';
import { Courgette_400Regular } from '@expo-google-fonts/courgette';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { Text, Pressable } from "react-native";
import { Link } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    Roboto_500Medium, Roboto_400Regular, Courgette_400Regular
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer >
        <Drawer.Screen 
          name="index" 
          
          options={({ navigation }) => ({ 
            title: 'Home',
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#fafafa',
            },
            
            headerTintColor: '#88c9bf',
            headerShadowVisible: false,

            headerLeft: () => 
              <Pressable style={{padding: 12}}onPress={navigation.toggleDrawer}>
                <Text>
                  <Entypo name="menu" size={30} color='#88c9bf' />
                </Text>
              </Pressable>
            ,
          })}
        />

        <Drawer.Screen 
          name="login" 

          options={({ navigation }) => ({ 
            title: 'Login', 
            headerStyle: {
              backgroundColor: '#cfe9e5',
            },

            headerTintColor: '#434343',

            headerLeft: () => 
              <Pressable style={{paddingRight: 16, paddingLeft: 12,}} onPress={navigation.toggleDrawer}>
                <Text>
                  <Entypo name="menu" size={24} color='#434343' />
                </Text>
              </Pressable>
            ,
            headerTitleStyle: {
              fontFamily: 'Roboto_500Medium',
              fontSize: 20,
            },
          })}
        />
        
        <Drawer.Screen
          name="cadastro" // This is the name of the page and must match the url from root
          options={({ navigation }) => ({
            title: "Cadastro",
            headerStyle: {
              backgroundColor: '#cfe9e5',
            },
            headerTintColor: '#434343', 
            headerLeft: () => 
              <Pressable style={{paddingRight: 16, paddingLeft: 12,}} onPress={navigation.toggleDrawer}>
                <Text>
                  <Entypo name="menu" size={24} color='#434343' />
                </Text>
             </Pressable >,
            headerTitleStyle: {
              fontFamily: 'Roboto_500Medium',
              fontSize: 20,
            },
          })}
        />

        <Drawer.Screen
          name="cadastro-animal" // This is the name of the page and must match the url from root
          options={({ navigation }) => ({
            title: "Cadastro Animal",
            headerStyle: {
              backgroundColor: '#fee29b',
            },
            headerTintColor: '#434343', 
            headerLeft: () => 
              <Pressable style={{paddingRight: 16, paddingLeft: 12,}} onPress={navigation.toggleDrawer}>
                <Text>
                  <Entypo name="menu" size={24} color='#434343' />
                </Text>
             </Pressable >,
            headerTitleStyle: {
              fontFamily: 'Roboto_500Medium',
              fontSize: 20,
            },
          })}
        />

        <Drawer.Screen
          name="sem-cadastro" // This is the name of the page and must match the url from root
          options={({ navigation }) => ({
            title: "Cadastro",
            headerShown: true,
            drawerItemStyle: { display: 'none' },
            headerStyle: {
              backgroundColor: '#cfe9e5',
            },
            headerLeft: () => 
              <Link href="/" asChild>
                <Pressable style={{paddingRight: 16, paddingLeft: 12,}}>
                  <Text>
                    <AntDesign name="arrowleft" size={24} color="#434343" />
                  </Text>
                </Pressable>
              </Link>,
      
            headerTintColor: '#434343', 
            headerTitleStyle: {
              fontFamily: 'Roboto_500Medium',
              fontSize: 20,
            },
          })}
        />

        <Drawer.Screen
          name="cadastro-eba" // This is the name of the page and must match the url from root
          
          options={({ navigation }) => ({
            title: "Cadastro do Animal",
            drawerItemStyle: { display: 'none' },
            headerStyle: {
              backgroundColor: '#fee29b',
            },
            headerLeft: () => 
              <Link href="/cadastro-animal" asChild>
                <Pressable style={{paddingRight: 16, paddingLeft: 12,}}>
                  <Text>
                    <AntDesign name="arrowleft" size={24} color="#434343" />
                  </Text>
                </Pressable>
              </Link>,

            headerTintColor: '#434343', 
            headerTitleStyle: {
              fontFamily: 'Roboto_500Medium',
              fontSize: 20,
            },
          })}
        />

        <Drawer.Screen
          name="detalhes-pet" // This is the name of the page and must match the url from root
          options={({ navigation }) => ({
            title: "Pequi",
            //drawerItemStyle: { display: 'none' },
            headerStyle: {
              backgroundColor: '#cfe9e5',
            },
            headerLeft: () => 
              <Link href="/" asChild>
                <Pressable style={{paddingRight: 16, paddingLeft: 12,}}>
                  <Text>
                    <AntDesign name="arrowleft" size={24} color="#434343" />
                  </Text>
                </Pressable>
              </Link>,

            headerRight: () => 
              <Link href="/cadastro-animal" asChild>
                <Pressable style={{paddingRight: 16, paddingLeft: 12,}}>
                  <Text>
                    <Entypo name="share" size={24} color="#434343" />
                  </Text>
                </Pressable>
              </Link>,

            headerTintColor: '#434343', 
            headerTitleStyle: {
              fontFamily: 'Roboto_500Medium',
              fontSize: 20,
            },
          })}
        />

      </Drawer>
    </GestureHandlerRootView>
  );
}
