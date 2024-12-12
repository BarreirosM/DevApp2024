import { StyleSheet, Text, View, Pressable, StatusBar, ScrollView, Dimensions } from "react-native";
import React, {useState} from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import MyPost from "@/components/MyPost";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PlaceholderImage = require('@/assets/images/cachorro_placeholder.jpg');


export default function TelaCadastroAnimal() {

  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" backgroundColor="#ffd358"></StatusBar>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>

        <MyPost id=""/>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
    width: windowWidth,
  },

  scrollContainer: {
    alignItems: 'center',
  },

  postContainer: {
    height: (264 * windowWidth) / 360 ,
    width: (344 * windowWidth) / 360,
    marginHorizontal: 8,
    maxWidth: 1000,
    maxHeight: 511,
    boxShadow: "1 1 10 grey",
    borderRadius: 10,
    marginTop: 8,
  },

  postHeader: {
    flexDirection: 'row',
    height: 32,
    backgroundColor: "#fee29b",
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  nomeAnimal: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    marginLeft:12,
    color: "#434343",
  },

  image: {
    maxWidth: 1000,
    maxHeight: 511,
    width: (344 * windowWidth) / 360,
    height: (183 * windowWidth) / 360,
  },

  rowText: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  regularText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    color: "#434343",
  },

  favoriteIcon: {
    marginRight: 12,
  }
})