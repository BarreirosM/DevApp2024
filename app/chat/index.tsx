import { StyleSheet, Text, View, Pressable, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { collection, getDocs, query, where, getDoc ,doc } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH} from "@/FirebaseConfig";
import MyContacts from "@/components/MyContacts";
import { useState, useEffect } from "react";

const windowWidth = Dimensions.get('window').width;

const db = FIREBASE_DB;

async function fetchDataChats(uid: string) {
  const data: { id: string }[] = [];
  const q = query(collection(db, "Chats"), where("donoDoAnimal", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}   

async function fetchDataChats2(uid: string) {
  const data: { id: string }[] = [];
  const q = query(collection(db, "Chats"), where("interessadoNoAnimal", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}   

async function fetchDataUsers(dataAux: any) {
  const data: { id: string }[] = [];
  for(let i = 0; i < dataAux.length; i++) {
    const user = await getDoc(doc(db, `Usuarios/${dataAux[i].interessadoNoAnimal}`))
    data.push({ id: user.id, ...user.data() });
  };
  return data;
}

async function fetchDataUsers2(dataAux: any) {
  const data: { id: string }[] = [];
  for(let i = 0; i < dataAux.length; i++) {
    const user = await getDoc(doc(db, `Usuarios/${dataAux[i].donoDoAnimal}`))
    data.push({ id: user.id, ...user.data() });
  };
  return data;
}

async function fetchDataPets(dataAux: any) {
  const data: { id: string }[] = [];
  for(let i = 0; i < dataAux.length; i++) {
    const user = await getDoc(doc(db, `Pets/${dataAux[i].animal}`))
    data.push({ id: user.id, ...user.data() });
  };
  return data;
}

export default function TelaMeusChats() {

  let id = 0;
  let chatID = '';
  const idPlus = () => id = id + 1;
  const [chatData, setChatData] = useState<any>([]);
  const [userData, setUserData] = useState<any>([]);
  const [petsData, setPetsData] = useState<any>([]);

  useEffect(() => {
    async function fetchChats() {
      const user = FIREBASE_AUTH.currentUser; 
      if (user) {
        const chatDataAux = await fetchDataChats(user.uid); 
        setChatData(chatDataAux)
        const userDataAux = await fetchDataUsers(chatDataAux);
        setUserData(userDataAux);
        const chatDataAux2 = await fetchDataChats2(user.uid); 
        setChatData(chatData => [...chatData, ...chatDataAux2])
        console.log(chatDataAux2)
        const userDataAux2 = await fetchDataUsers2(chatDataAux2);
        setUserData(userData => [...userData, ...userDataAux2]);
        const petsDataAux = await fetchDataPets(chatData);
        setPetsData(petsDataAux);
      }
    }
    fetchChats();
  }, []);

  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" backgroundColor="#88c9bf"></StatusBar>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      {userData.map((user, index) => (
        <MyContacts key={user.id} id={idPlus()} id_user={user.id} nome={user.nome} foto={user.foto} chatID={chatData[index].id}/>
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