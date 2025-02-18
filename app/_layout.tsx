
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useFonts } from 'expo-font' 
import {Roboto_400Regular, Roboto_500Medium  } from '@expo-google-fonts/roboto';
import { Courgette_400Regular } from '@expo-google-fonts/courgette';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { Text, Pressable } from "react-native";
import { Link, useGlobalSearchParams } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { NotificationProvider } from '@/context/NotificationContext';
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [isAuth, setIsAuth] = useState(FIREBASE_AUTH.currentUser);

  const glob = useGlobalSearchParams();
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
    <NotificationProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer>
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
                <Pressable style={{padding: 12}} onPressIn={navigation.toggleDrawer} onPress={() => setIsAuth(FIREBASE_AUTH.currentUser)}>
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
              drawerItemStyle: { display: 'none' },
              headerStyle: {
                backgroundColor: '#cfe9e5',
              },

              headerTintColor: '#434343',

              headerLeft: () => 
                <Pressable style={{paddingRight: 16, paddingLeft: 12,}} onPress={navigation.toggleDrawer} onPressIn={() => setIsAuth(FIREBASE_AUTH.currentUser)}>
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
              drawerItemStyle: { display: 'none'},
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
              drawerItemStyle: { display: isAuth ? 'flex' : 'none' },
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
            name="detalhes-pet"
            options={({ navigation }) => ({
              title: "Pequi",
              drawerItemStyle: { display: isAuth ? 'flex' : 'none' },
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

          <Drawer.Screen
            name="pets-adocao" // This is the name of the page and must match the url from root
            options={glob["pets-adotar"] ? {headerShown: false}  :({ navigation }) => ({
              title: "Adotar",
              drawerItemStyle: { display: isAuth ? 'flex' : 'none' },
              headerStyle: {
                backgroundColor: '#fee29b',
              },
              headerTintColor: '#434343', 
              headerLeft: () => 
                <Pressable style={{paddingRight: 16, paddingLeft: 12,}} onPress={navigation.toggleDrawer}>
                  <Text>
                    <Entypo name="menu" size={24} color='#434343' />
                  </Text>
                </Pressable>,
              

            headerTitleStyle: {
              fontFamily: 'Roboto_500Medium',
              fontSize: 20,
            },
          })}
        />

        <Drawer.Screen 
          name="chat" 

          options={glob["conversas"] ? {headerShown: false}  : ({ navigation }) => ({ 
            title: 'Chat', 
            drawerItemStyle: { display: isAuth ? 'flex' : 'none' },
            headerStyle: {
              backgroundColor: '#cfe9e5',
            },

            headerTintColor: '#434343',

            headerLeft: () => 
              <Pressable style={{paddingRight: 16, paddingLeft: 12,}} onPress={navigation.toggleDrawer} onPressIn={() => setIsAuth(FIREBASE_AUTH.currentUser)}>
                <Text>
                  <Entypo name="menu" size={24} color='#434343' />
                </Text>
              </Pressable>,

            headerRight: () => 
              <Link href="/cadastro-animal" asChild>
                <Pressable style={{paddingRight: 16, paddingLeft: 12,}}>
                  <Text>
                    <Entypo name="menu" size={24} color='#434343' />
                  </Text>
                </Pressable>
              </Link>,
            headerTitleStyle: {
              fontFamily: 'Roboto_500Medium',
              fontSize: 20,
            },
          })}
        />

        <Drawer.Screen
          name="meus-pets"
          options={(glob["mine-pets"]||glob["id"]) ? {headerShown: false}  :({ navigation }) => ({
            title: "Meus Pets",
            drawerItemStyle: { display: isAuth ? 'flex' : 'none' },
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


              headerRight: () => 
                <Link href="/cadastro-animal" asChild>
                  <Pressable style={{paddingRight: 16, paddingLeft: 12,}}>
                    <Text>
                      <AntDesign name="search1" size={24} color="#434343" />
                    </Text>
                  </Pressable>
                </Link>,

              headerTitleStyle: {
                fontFamily: 'Roboto_500Medium',
                fontSize: 20,
              },
            })}
          />


        </Drawer>
      </GestureHandlerRootView>
    </NotificationProvider>
  );
}
