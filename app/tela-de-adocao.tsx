import { StyleSheet, Text, View, Pressable, StatusBar, ScrollView, Dimensions } from "react-native";
import { useEffect, useState } from 'react';
import MyPost from "@/components/MyPost";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "@/FirebaseConfig";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PlaceholderImage = require('@/assets/images/cachorro_placeholder.jpg');

const db = FIREBASE_DB;

async function fetchData() {
  const data: any[] = [];
  const querySnapshot = await getDocs(collection(db, "Pets"));
  querySnapshot.forEach((doc) => {
    data.push({id: doc.id, ...doc.data()});
  });
  return data;
}

export default function TelaCadastroAnimal() {
  const [userData, setUserData] = useState([]);
  useEffect (() => {
    async function fetchPet() {
      const data = await fetchData();
      setUserData(data);
    }
    fetchPet();
  }, []);

  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" backgroundColor="#ffd358"></StatusBar>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {userData.map((user) => (
          <MyPost key={user.id} id={user.id} nome={user.nome} idade={user.idade} sexo={user.sexo} porte={user.porte} foto={user.fotoAnimal}/>
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