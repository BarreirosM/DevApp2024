import { StyleSheet, Text, View, Pressable, StatusBar, ScrollView, Dimensions } from "react-native";
import { useEffect, useState } from 'react';

import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

import { FIREBASE_DB, FIREBASE_AUTH } from "@/FirebaseConfig";
import { useLocalSearchParams } from "expo-router";
import { Image } from 'expo-image';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from "expo-router";
import { sendPushNotification } from "@/utils/sendPushNotifications";

const windowWidth = Dimensions.get('window').width;
const PlaceholderImage = require('@/assets/images/cachorro_placeholder.jpg');

const db = FIREBASE_DB;

interface Usuario {
  nome: string;
  email: string;
  expoPushToken?: string; 
}

export default function TelaDetalhesPet() {

  const local = useLocalSearchParams();
  const petId = String(local["pets-adotar"]);
  const [petData, setPetData] = useState<any>({
    nome: 'Erro',
    sexo: 'Erro',
    porte: 'Erro',
    idade: 'Erro',
    saude: {
      castrado: 'Erro',
      vermifugado: 'Erro',
      vacinado: 'Erro',
      doente: 'Erro',
      doenças: 'Erro',
    },
    temperamento: {
      amoroso: 'Erro',
      brincalhão: 'Erro',
      calmo: 'Erro',
      guarda: 'Erro',
      preguiçoso: 'Erro',
      tímido: 'Erro',
    },
    sobreAnimal: 'Erro',
    fotoAnimal: '',
    exigencias: {
      acompanhamentoPósAdoção: false,
      fotosDeCasa: false,
      tempoDeAcompanhamento: 0,
      termosDeAdoção: false,
      visitaPrévia: false,
    }
  });
  
  useEffect(() => {
    async function fetchPet() {
      const user = FIREBASE_AUTH.currentUser; 
      if (user) {
        const docRef = doc(db, "Pets", petId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          if (docSnap.data().adoção === true) {
            setPetData(docSnap.data());
          }
        } 
      } 
    }
    fetchPet();
  }, [petId]);


  const nome: string = petData.nome || 'Erro';
  const sexo: string = petData.sexo;
  const porte: string = petData.porte;
  const idade: string = petData.idade;
  const localizacao: string = "Planaltina – Brasília";
  const castrado: boolean = petData.saude.castrado;
  const vermifugado: boolean = petData.saude.vermifugado;
  const vacinado: boolean = petData.saude.vacinado;
  const doente: boolean = petData.saude.doente;
  const doencas: string = petData.saude.doenças;
  const temperamento: boolean[] = [petData.temperamento.amoroso, petData.temperamento.brincalhão, petData.temperamento.calmo, petData.temperamento.guarda, petData.temperamento.preguiçoso, petData.temperamento.tímido];
  const ajuda: string = "Ajuda financeira e alimento";
  let exigencias: string = ``;
  const sobre: string = petData.sobreAnimal;
  const temperamentoAux: string[] = ["Amoroso", "Brincalhão", "Calmo", "Guarda", "Preguiçoso", "Tímdo"]
  const exigenciasAux: string[] = ["Acompanhamento pós adoção", "Fotos de casa", "Tempo de acompanhamento", "Termos de Adoção", "Visita prévia"]

  let temperamentoString: string = '';

  for (let i = 0; i < 6; i++) {
    temperamentoString = temperamento[i] ? (temperamentoString +`${temperamentoAux[i]} `) : (temperamentoString + '');
  }

  let exigenciasString: string = '';

  exigencias += petData.exigencias.acompanhamentoPósAdoção ? `Acompanhamento pós adoção por ${petData.exigencias.tempoDeAcompanhamento}. ` : '';
  exigencias += petData.exigencias.fotosDeCasa ? 'Fotos de casa. ' : '';
  exigencias += petData.exigencias.termosDeAdoção ? 'Termos de adoção. ' : '';
  exigencias += petData.exigencias.visitaPrévia ? 'Visita prévia. ' : '';


  /*const pretendoAdotar = async () => {
    if (FIREBASE_AUTH.currentUser){
      try {
        const docAux = doc(db, "Usuarios", FIREBASE_AUTH.currentUser.uid);
        const respons = await updateDoc(docAux, {
          adotar: arrayUnion(petId),
        });
        alert(`Atrualizar deu certo`);

      } catch (error: any) {
        console.log(error);
        alert(`Salvar falhou ${error.message}`);
      }
    }
    else {
      alert("Usuario não está logado.")
    }
  }*/

  const pretendoAdotar = async () => {
    if (FIREBASE_AUTH.currentUser) {
      try {
        // 1. Atualizar o Firestore com o interesse na adoção
        const userRef = doc(FIREBASE_DB, "Usuarios", FIREBASE_AUTH.currentUser.uid);
        await updateDoc(userRef, {
          adotar: arrayUnion(petId),
        });
  
        // 2. Obter o documento do pet
        const petDocRef = doc(FIREBASE_DB, "Pets", petId);
        const petDocSnap = await getDoc(petDocRef);
  
        if (petDocSnap.exists()) {
          // 3. Verificar se o donoDoAnimal é uma referência
          const donoRef = petDocSnap.data().donoDoAnimal;
  
          if (donoRef) {
            // 4. Acessar o documento do dono
            const donoDocSnap = await getDoc(donoRef);
  
            if (donoDocSnap.exists()) {
              // 5. Usar a interface Usuario para tipar os dados
              const donoData = donoDocSnap.data() as Usuario;
              const donoToken = donoData.expoPushToken;
              console.log(donoToken)
  
              // 6. Enviar a notificação push 
              if (donoToken) {
                await sendPushNotification(donoToken, {
                  title: "Meau App",
                  body: `${FIREBASE_AUTH.currentUser.email} está interessado em adotar ${petData.nome}.`,
                });
              }
            }
          }
        }
  
        alert("Interesse em adoção registrado com sucesso!");
      } catch (error: any) {
        console.log(error);
        alert(`Erro ao salvar interesse: ${error.message}`);
      }
    } else {
      alert("Usuário não está logado.");
    }
  };

  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" backgroundColor="#ffd358"></StatusBar>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
      <StatusBar barStyle="light-content" backgroundColor="ffee29b"></StatusBar>

      <View style={styles.imageContainer}>
     
        <Image source={petData.fotoAnimal ? petData.fotoAnimal : PlaceholderImage} style={styles.image} contentFit="cover"/>
        
        <View style={[styles.editButton]}>
          <Link href={"/cadastro"} asChild>
            <Pressable style={styles.button} >
            <MaterialIcons name="favorite-border" size={24} color="#434343" />
            </Pressable>
          </Link>
        </View>
      </View>

      <Text style={styles.subHeader}>
        {nome}
      </Text>
    
      <View style={styles.rowText}>

        <View style={styles.rowTextItem}>
          <Text style={styles.subSubHeader}>
            SEXO
          </Text>
          <Text style={styles.regularText}>
            {sexo}
          </Text>
        </View>

        <View style={styles.rowTextItem}>
          <Text style={styles.subSubHeader}>
            PORTE
          </Text>
          <Text style={styles.regularText}>
            {porte}
          </Text>
        </View>

        <View style={styles.rowTextItem}>
          <Text style={styles.subSubHeader}>
            IDADE
          </Text>
          <Text style={styles.regularText}>
            {idade}
          </Text>
        </View>

      </View>

      <Text style={styles.subSubHeader}>
        LOCALIZAÇÃO
      </Text>

      <Text style={styles.regularText}>
        {localizacao}
      </Text>

      <View style={{
        marginTop: 16,
        marginHorizontal: 16,
        alignSelf: 'stretch',
        borderColor: '#e0e0e0',
        borderTopWidth: 0.8,}}/>
      
      <View style={styles.rowText}>

      <View style={[styles.rowTextItem, {width: (windowWidth- 32) / 2, maxWidth: 500-16}]}>
          <Text style={styles.subSubHeader}>
            CASTRADO
          </Text>
          <Text style={styles.regularText}>
            { castrado ? "Sim" : "Não" }
          </Text>
        </View>

        <View style={[styles.rowTextItem, {width: (windowWidth- 32) / 2, maxWidth: 500-16}]}>
          <Text style={styles.subSubHeader}>
            VERMIFUGADO
          </Text>
          <Text style={styles.regularText}>
            { vermifugado ? "Sim" : "Não" }
          </Text>
        </View>

      </View>

      <View style={styles.rowText}>

        <View style={[styles.rowTextItem, {width: (windowWidth- 32) / 2, maxWidth: 500-16}]}>
          <Text style={styles.subSubHeader}>
            VACINADO
          </Text>
          <Text style={styles.regularText}>
            { vacinado ? "Sim" : "Não" }
          </Text>
        </View>

        <View style={[styles.rowTextItem, {width: (windowWidth- 32) / 2, maxWidth: 500-16}]}>
          <Text style={styles.subSubHeader}>
            DOENCAS
          </Text>
          <Text style={styles.regularText}>
            { doente ? doencas : "Nenhuma" }
          </Text>
        </View>

      </View>

      <View style={{
        marginTop: 16,
        marginHorizontal: 16,
        alignSelf: 'stretch',
        borderColor: '#e0e0e0',
        borderTopWidth: 0.8,}}/>
      
      <Text style={styles.subSubHeader}>
        TEMPERAMENTO
      </Text>

      <Text style={styles.regularText}>
        {temperamentoString}
      </Text>

      <View style={{
        marginTop: 16,
        marginHorizontal: 16,
        alignSelf: 'stretch',
        borderColor: '#e0e0e0',
        borderTopWidth: 0.8,}}/>

      <Text style={styles.subSubHeader}>
        O {nome.toUpperCase()} PRECISA DE
      </Text>

      <Text style={styles.regularText}>
        {ajuda}
      </Text>

      <View style={{
        marginTop: 16,
        marginHorizontal: 16,
        alignSelf: 'stretch',
        borderColor: '#e0e0e0',
        borderTopWidth: 0.8,}}/>

      <Text style={styles.subSubHeader}>
        EXIGÊNCIAS DO DOADOR
      </Text>

      <Text style={styles.regularText}>
        {exigencias}
      </Text>

      <View style={{
        marginTop: 16,
        marginHorizontal: 16,
        alignSelf: 'stretch',
        borderColor: '#e0e0e0',
        borderTopWidth: 0.8,}}/>

      <Text style={styles.subSubHeader}>
        MAIS SOBRE PEQUI
      </Text>

      <Text style={[styles.regularText, {marginHorizontal: 24}]}>
        {sobre}
      </Text>
      
      <View style={[styles.buttonContainer, ]}>
        <Pressable style={styles.button} onPress={pretendoAdotar}>
          <Text style={styles.buttonLabel}>
            PRETENDO ADOTAR
          </Text>
        </Pressable>
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
  
  imageContainer: {
    width: "100%",
    maxWidth: 1000,
    maxHeight: 511,
    height: (184 * windowWidth) / 360,
    boxShadow: "0 1 4 grey",
  },

  image: {
    maxWidth: 1000,
    maxHeight: 511,
    width: windowWidth,
    height: (184 * windowWidth) / 360,
  },

  editButton:{
    height: 56,
    width: 56,
    position: 'absolute',
    top: (184 * windowWidth) / 360 - 28,
    left: windowWidth - 56 - 16,
    bottom: 0,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 56,
    boxShadow: "0 1 4 grey",
  },

  subHeader: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
    marginLeft: 16,
    color: "#434343",
    marginTop: 16,
    marginBottom: 0,
    alignSelf: 'baseline',
  },

  subSubHeader: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    color: "#f7a800",
    marginTop: 16,
    marginLeft: 16,
    //marginBottom: 16,
    alignSelf: 'baseline',
  },

  rowText: {
    flexDirection: 'row',
    alignItems: 'baseline',
    alignSelf: 'baseline',
  },

  rowTextItem: {
    width: 100.
  },

  regularText: {
    marginHorizontal: 16,
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    marginTop: 8,
    color: "#757575",
    alignSelf: 'baseline',
  },

  rowButtons: {
    width: 312,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonContainer: {
    marginVertical: 28,
    backgroundColor: "#FDCF58",
    width: 232,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 10,
    boxShadow: "0 1 4 grey",
    flexDirection: 'row',
  },

  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonLabel: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    color: '#434343',
  },

  scrollContainer: {
    alignItems: 'center',
  },

  formContainer: {
    marginTop: 20,
  },
})