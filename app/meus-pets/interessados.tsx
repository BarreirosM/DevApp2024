import { StyleSheet, View, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { addDoc, arrayUnion, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/FirebaseConfig";
import { useState, useEffect } from "react";
import Interested from "@/components/Interested";
import { useLocalSearchParams } from "expo-router";

const windowWidth = Dimensions.get('window').width;

const db = FIREBASE_DB;

async function fetchData(localId: string) {
  const data: {id: string}[] = [];
  const querySnapshot = await getDocs(collection(db, "Usuarios"));
  querySnapshot.forEach((doc) => {
    const auxArray = doc.data().adotar
    if(auxArray) {
      for(let i in auxArray){
        if(auxArray[i] === localId){
          
          data.push({id: doc.id, ...doc.data()});
        }
      }
    }
  });
  return data;
}

export default function TelaInteressados() {

  let id = 0;
  const idPlus = () => id = id + 1;
  const local = useLocalSearchParams();
  const petId = String(local["id"]);
  const [userData, setUserData] = useState<any>([]);
  useEffect (() => {
    async function fetchPet() {
      const data = await fetchData(petId);
      setUserData(data);
    }
    fetchPet();
  }, []);
  const db = FIREBASE_DB;



  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" backgroundColor="#88c9bf"></StatusBar>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.perfis}>
          {userData.map((user: any,) => {
            return (
                <Interested key={user.id} id={idPlus()} userID={user.id} nome={user.nome} foto={user.foto} idade={user.idade} petID={petId} />
              
          )})}
        </View>
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

  perfis: {
    //backgroundColor: 'green',
    flexDirection: 'row',
    maxWidth: (156 * 2 * windowWidth) / 360,
    flexWrap: 'wrap',
    marginHorizontal: ( 24 * windowWidth) / 360,
  },

})