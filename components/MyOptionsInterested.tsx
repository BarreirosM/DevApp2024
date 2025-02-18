import { Modal, View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { PropsWithChildren } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/FirebaseConfig';
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { Link } from 'expo-router';

const db = FIREBASE_DB;

const windowWidth = Dimensions.get('window').width;

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
  nome: string;
  nomePet: string;
  userID: string;
  petID: string;
}>;

async function deleteData(petId: string) {
  const data: { id: string }[] = [];
  const q = query(collection(db, "Chats"), where("animal", "==", petId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((document) => async () => {
    const response = await deleteDoc(doc(db, "Chats", document.id))
  });
}     

export default function MyOptionsInterested({ isVisible,  onClose, nome, nomePet, userID, petID }: Props) {

  const chatID = FIREBASE_AUTH.currentUser ? `${FIREBASE_AUTH.currentUser.uid}${userID}${petID}` : 'error';
  const comecarChat = async () => {
    if (FIREBASE_AUTH.currentUser){
      try {
        const response = await setDoc(doc(db, "Chats", chatID), {
          donoDoAnimal: FIREBASE_AUTH.currentUser.uid,
          interessadoNoAnimal: userID,
          animal: petID,
          mensagens: [],
        })
        alert(`Salvar deu certo`);

      } catch (error: any) {
        console.log(error);
        alert(`Salvar falhou ${error.message}`);
      }
    }
    else {
      alert("Usuario não está logado.")
    }
  }

  const trocaAceita = async () => {
    if (FIREBASE_AUTH.currentUser){
      try {
        const docAux1 = doc(db, "Usuarios", FIREBASE_AUTH.currentUser.uid);
        const docAux2 = doc(db, "Usuarios", userID);
        const docAux3 = doc(db, 'Pets', petID);
        const response1 = await updateDoc(docAux2, {
          animais: arrayUnion(docAux3),
          adotar: arrayRemove(docAux3),
        });
        const response2 = await updateDoc(docAux1, {
          animais: petID,
        });
        const response3 = await updateDoc(docAux3, {
          donoDoAnimal: docAux2,
          adoção: false,
        });
        deleteData(petID);
        alert(`Atrualizar deu certo`);

      } catch (error: any) {
        console.log(error);
        alert(`Salvar falhou ${error.message}`);
      }
    }
    else {
      alert("Usuario não está logado.")
    }
  }

  const trocaNegada = async () => {
    if (FIREBASE_AUTH.currentUser){
      try {
        const docAux1 = doc(db, "Usuarios", FIREBASE_AUTH.currentUser.uid);
        const docAux2 = doc(db, "Usuarios", userID);
        const docAux3 = doc(db, 'Pets', petID);
        const response1 = await updateDoc(docAux2, {
          adotar: arrayRemove(docAux3),
        });
        //console.log(respons);
        alert(`Atrualizar deu certo`);

      } catch (error: any) {
        console.log(error);
        alert(`Salvar falhou ${error.message}`);
      }
    }
    else {
      alert("Usuario não está logado.")
    }
  }

  return (
    <Modal animationType='slide'
    transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.texto}>
              {nome} quer adotar {nomePet}
            </Text>
            <View style={styles.buttonsContainer}>
              <View style={[styles.buttonContainer, styles.vcButton]}>
                <Pressable style={styles.button} onPressIn={trocaAceita} onPress={onClose}>
                  <Text style={styles.buttonLabel}>
                    ACEITAR
                  </Text>
                </Pressable>
              </View>
              <View style={[styles.buttonContainer, styles.rmButton]}>
                <Pressable style={styles.button} onPress={onClose}onPressIn={trocaNegada}>
                  <Text style={styles.buttonLabel}>
                    RECUSAR
                  </Text>
                </Pressable>
              </View>
              <View style={[styles.buttonContainer, styles.vcButton]}>
                <Link href={`/chat/${userID}?nome=${nome}&&chatID?=${chatID}`} asChild>
                  <Pressable style={styles.button} onPressIn={comecarChat} onPress={onClose}>
                    <Text style={styles.buttonLabel}>
                      CHAT
                    </Text>
                  </Pressable>
                </Link>
              </View>
            </View>
            

            <View style={[styles.buttonContainer, styles.loginButton]}>
              <Pressable style={styles.button} onPress={onClose}>
                <Text style={styles.buttonLabel}>
                  CANCELAR
                </Text>
              </Pressable>
            </View>
          </View>
        
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    alignItems: 'flex-end',
    flexDirection: 'row',
    bottom: 0,
  },
  titleContainer: {
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    alignContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },

  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  buttonLabel: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    color: '#434343',
  },

  buttonContainer: {
    width: (232 * windowWidth) / 360,
    height: (40 * windowWidth) / 360,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  loginButton:{
    marginTop: (8 * windowWidth) / 360,
    backgroundColor: '#88c9bf',
    marginBottom: (80 * windowWidth) / 360,
    boxShadow: "0 1 4 grey",
    borderRadius: 10,
  },
  rmButton:{
    backgroundColor: '#f7f7f7',
    borderBottomColor: "#e6e7e8",
    borderBottomWidth: (0.8 * windowWidth) / 360,
    borderTopColor: "#e6e7e8",
    borderTopWidth: (0.8 * windowWidth) / 360,
    borderRadius: 0,
  },
  vcButton: {
    backgroundColor: '#f7f7f7',
  },

  buttonsContainer: {
    borderRadius: 10,
    boxShadow: "0 1 4 grey",
  },

  texto: {
    marginBottom: (8 * windowWidth) / 360,
    color: '#434343'
  }

});
