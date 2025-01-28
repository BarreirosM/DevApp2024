import { StyleSheet, Text, View, Pressable, StatusBar } from "react-native";
import { Image } from 'expo-image';
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "@/FirebaseConfig";
import MyContacts from "@/components/MyContacts";
import { useState, useEffect } from "react";

const windowWidth = Dimensions.get('window').width;
const PlaceholderImage = require('@/assets/images/cachorro_placeholder.jpg');

const db = FIREBASE_DB;

async function fetchData() {
  const data: {id: string}[] = [];
  const querySnapshot = await getDocs(collection(db, "Usuarios"));
  querySnapshot.forEach((doc) => {
    data.push({id: doc.id, ...doc.data()});
  });
  return data;
}

export default function TelaMeusChats() {

  let id = 0;
  const idPlus = () => id = id + 1;
  const [userData, setUserData] = useState<any>([]);
  useEffect (() => {
    async function fetchPet() {
      const data = await fetchData();
      setUserData(data);
    }
    fetchPet();
  }, []);

  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" backgroundColor="#88c9bf"></StatusBar>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      {userData.map((user: any) => (
        <MyContacts key={user.id} id={idPlus()} id_user={user.id} nome={user.nome} foto={user.foto} />
      ))}

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