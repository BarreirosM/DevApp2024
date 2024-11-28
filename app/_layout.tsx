import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useFonts } from 'expo-font' 
import { Roboto_100Thin, Roboto_100Thin_Italic, Roboto_300Light, Roboto_300Light_Italic, Roboto_400Regular, Roboto_400Regular_Italic, Roboto_500Medium, Roboto_500Medium_Italic, Roboto_700Bold, Roboto_700Bold_Italic, Roboto_900Black, Roboto_900Black_Italic } from '@expo-google-fonts/roboto';
import { Courgette_400Regular } from '@expo-google-fonts/courgette';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack } from 'expo-router';

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
      <Stack screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#fafafa',
        },
        headerTintColor: '#88c9bf',
        headerShadowVisible: false, 
        headerLeft: () => 
          <Pressable style={{padding: 12}}>
            <Text>
              <Entypo name="menu" size={30} color='#88c9bf' />
            </Text>
         </Pressable >
        ,
      })} >
        <Stack.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            title: '',
            
          }}
        />
        <Stack.Screen
          name="(login)" // This is the name of the page and must match the url from root
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="(sem-cadastro)" // This is the name of the page and must match the url from root
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="(cadastro)" // This is the name of the page and must match the url from root
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
