import { StyleSheet, Text, View, Pressable, StatusBar, ScrollView, Dimensions } from "react-native";
import { useEffect, useState } from 'react';
import MyPost from "@/components/MyPost";
import { collection, getDocs, query, where, collectionGroup,doc } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH} from "@/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const windowWidth = Dimensions.get('window').width;

const db = FIREBASE_DB;
const auth = FIREBASE_AUTH;

/*async function fetchData() {
  const data: {id: string}[] = [];
  const querySnapshot = await getDocs(collection(db, "Pets"));
  querySnapshot.forEach((doc) => {
    data.push({id: doc.id, ...doc.data()});
  });
  return data;
}*/

async function fetchData(uid: string) {
  const data: { id: string }[] = [];
  const donoDoAnimalRef = doc(db, `Usuarios/${uid}`);
  const q = query(collection(db, "Pets"), where("donoDoAnimal", "==", donoDoAnimalRef));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}     


export default function TelaAdotarAnimal() {

  /*const [userData, setUserData] = useState<any>([]);
  useEffect (() => {
    async function fetchPet() {
      const data = await fetchData();
      setUserData(data);
    }
    fetchPet();
  }, []);*/

  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    async function fetchPet() {
      const user = FIREBASE_AUTH.currentUser; 
      if (user) {
        const data = await fetchData(user.uid); 
        setUserData(data);
      }
    }
    fetchPet();
  }, []);

  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" backgroundColor="#88c9bf"></StatusBar>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {userData.map((user: any) => (
          <MyPost isMine={true} key={user.id} id={user.id} nome={user.nome} idade={user.idade} sexo={user.sexo} porte={user.porte} foto={user.fotoAnimal} />
      ))}
    </ScrollView>
  </View>
  );
  }

  /**
export default function Route() {
  const glob = useGlobalSearchParams();
  const local = useLocalSearchParams();

  console.log("Local:", local["pets-adocao"], "Global:", glob["pets-adocao"]);

  return (
    <View>
      <Text>User: {local.pets}</Text>
      {friends.map(friend => (
        <Link key={friend} href={`/${friend}`}>
          Visit {friend}
        </Link>
      ))}
    </View>
  );
}
*/

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
    backgroundColor: "#cfe9e5",
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