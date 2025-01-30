import React, {useState} from 'react';
import { StyleSheet, View, Text, Dimensions, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { Link, Redirect } from 'expo-router';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const PlaceholderImage = require('@/assets/images/cachorro_placeholder.jpg');

type Props = {
  isMine?:boolean;
  id: string;
  nome: string;
  idade: string;
  porte: string;
  sexo:string;
  foto: string;
};

export default function MyPost({ isMine , id, nome, idade, porte, sexo, foto }: Props) {
  
  return(
    <Link href={isMine ? `/meus-pets/${id}?nome=${nome}`:`/pets-adocao/${id}?nome=${nome}`} asChild>
      <Pressable style={styles.postContainer}>
        <View style={[styles.postHeader, {backgroundColor: isMine ? '#cfe9e5' : '#fee29b'}]}>
          <Text style={styles.nomeAnimal}>
            {nome}
          </Text>
          <Pressable onPress={() => alert('vc favoritou')}>
            <View style={styles.favoriteIcon}>
              <MaterialIcons name="favorite-border" size={24} color="#434343" />
            </View>
          </Pressable>
        </View>
        <Image source={{ uri: foto }} style={styles.image} contentFit="cover"/>
        
        <View style={styles.rowText}>

          <Text style={styles.regularText}>
            {sexo}
          </Text>

          <Text style={styles.regularText}>
            {idade}
          </Text>

          <Text style={styles.regularText}>
            {porte}
          </Text>

        </View>

        <View style={styles.rowText}>
          <Text style={styles.regularText}>
            SAMAMBAIA SUL - DISTRITO FEDERAL
          </Text>
        </View>

      </Pressable>
    </Link>
      )
}

const styles = StyleSheet.create({

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