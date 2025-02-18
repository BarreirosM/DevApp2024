import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Dimensions } from "react-native";
import { Link } from 'expo-router';
import { getDoc, doc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/FirebaseConfig';

const windowWidth = Dimensions.get('window').width;
const PlaceholderImage = require('@/assets/images/cachorro_placeholder.jpg');

const db = FIREBASE_DB;

type Props = {
  id: number;
  id_user: string;
  nome: string;
  mensagem?: string;
  foto: string;
  chatID: string;
  petID: string;
};

export default function MyContacts({ id, id_user, nome, mensagem='oi', foto, chatID, petID}: Props) {
  const [nomePet, setPetData] = useState("Pequi");
  const [chatData, setChatData] = useState<any>();
  const [mensagemAux, setMensagem] = useState<any>("...");

  useEffect(() => {
    async function fetchChats() {
      const chat = await getDoc(doc(db, `Chats/${chatID}`))
      const chatDataAux = { id: chat.id, ...chat.data() };
      setChatData(chatDataAux)
      const pet = await getDoc(doc(db, `Pets/${petID}`))
      const petNome = pet.data().nome;
      console.log(petNome)
      setPetData(petNome)
    }
    fetchChats();
  }, []);
  return(
    <View style={[styles.perfil]}>
      <Link href={`/chat/${id_user}?nome=${nome}&&chatID?=${chatID}`} asChild>
        <Pressable style={styles.perfilPressable}>

          <Image source={{ uri: foto }} style={styles.fotoPerfil} contentFit="cover"/>

          <View style={styles.textoPerfil}>
          
              <Text style={styles.textoNome}>
              {nome.toUpperCase()} | {nomePet.toUpperCase()}
              </Text>
              <Text style={id === 1 ? styles.textoPrimeiraMensagem : styles.textoOutrasMensagem}>
              {mensagemAux}
              </Text>
          </View>

          <Text style={styles.hora}>
              00:00
          </Text>

        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },

  scrollContainer: {
    alignItems: 'center',
  },

  fotoPerfil: {
    maxWidth: 1000,
    maxHeight: 511,
    borderRadius: 200,
    width: (48 * windowWidth) / 360,
    height: (48 * windowWidth) / 360,
  },

  perfil: {
    width: windowWidth,
    borderBottomColor: "#e6e7e8",
    borderBottomWidth: (0.8 * windowWidth) / 360,
  },

  perfilPressable: {
    width: '100%',
    height: (80 * windowWidth) / 360,
    //backgroundColor: 'red',
    alignItems: 'center',
    flexDirection: 'row',
    padding: (16 * windowWidth) / 360,
  },

  textoNome: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    color: "#88c9bf",
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