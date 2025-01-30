import React, {useState} from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Dimensions } from "react-native";
import { Link } from 'expo-router';
import MyOptionsInterested from './MyOptionsInterested';


const windowWidth = Dimensions.get('window').width;
const PlaceholderImage = require('@/assets/images/cachorro_placeholder.jpg');

type Props = {
  id: number;
  userID: string;
  nome: string;
  idade: number;
  foto: string;
  petID: string;
};

export default function Interested({ id, userID, nome, idade, foto, petID}: Props) {

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const onModalOpen = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const nomePet = 'Pequi'
  return(
    <View style={[styles.perfil]}>
      <Pressable style={styles.perfilPressable} onPress={onModalOpen}>

        <Image source={{ uri: foto }} style={styles.fotoPerfil} contentFit="cover"/>
        
        <Text style={styles.texto}>
          {nome}
        </Text>
        
        <Text style={styles.texto}>
          {idade} anos
        </Text>
      </Pressable>
      <MyOptionsInterested isVisible={isModalVisible} onClose={onModalClose} nome={nome} nomePet={nomePet} userID={userID} petID={petID}>
      </MyOptionsInterested>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fafafa",
  },

  scrollContainer: {
    alignItems: 'center',
  },

  fotoPerfil: {
    maxWidth: 1000,
    maxHeight: 1000,
    borderRadius: 1000,
    width: (84 * windowWidth) / 360,
    height: (84 * windowWidth) / 360,
    marginBottom: (8 * windowWidth) / 360,
  },

  perfil: {
    width: (156 * windowWidth) / 360,
    borderBottomColor: "#e6e7e8",
  },

  perfilPressable: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: (12 * windowWidth) / 360,
  },

  texto: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: "#434343",
  },

  textoPrimeiraMensagem: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: "#757575",
  },

  textoOutrasMensagem: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: "#bdbdbd",
  },

  textoPerfil: {
    //backgroundColor: 'yellow',
    width: (240 * windowWidth) / 360,
    marginLeft: (8 * windowWidth) / 360,
  },
  hora: {
    //backgroundColor: 'green',
    paddingRight: (16 * windowWidth) / 360,
    alignSelf: 'flex-start',
  },
})