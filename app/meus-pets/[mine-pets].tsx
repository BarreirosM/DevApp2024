import { StyleSheet, Text, View, Pressable, StatusBar, ScrollView, Dimensions } from "react-native";
import { useEffect, useState } from 'react';
import MyPost from "@/components/MyPost";
import { collection, doc, getDoc, getDocFromServer, getDocs, getDocsFromServer } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from "@/FirebaseConfig";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Image } from 'expo-image';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from "expo-router";

const windowWidth = Dimensions.get('window').width;
const PlaceholderImage = require('@/assets/images/cachorro_placeholder.jpg');

const db = FIREBASE_DB;

export default function TelaDetalhesPet() {

  const local = useLocalSearchParams();
  const petId = String(local["mine-pets"]);
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
  
  useEffect (() => {
    async function fetchPet() {
      const docRef = doc(db, "Pets", petId)
      const docSnap = await getDoc(docRef);
      setPetData(docSnap.data());
    }
    fetchPet();
  }, []);

/*
  useEffect(() => {
    async function fetchPet() {
      const user = FIREBASE_AUTH.currentUser; 
      const docRef = doc(db, "Pets", petId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().donoDoAnimal === user?.uid) {
        setPetData(docSnap.data());
      } else {
        console.log("Pet não encontrado ou não pertence ao usuário");
      }
    }
    fetchPet();
  }, [petId]);
*/
/*useEffect(() => {
  async function fetchPet() {
    const user = FIREBASE_AUTH.currentUser; 
    if (user) {
      const docRef = doc(db, "Pets", petId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data().donoDoAnimal === user.uid) {
          setPetData(docSnap.data());
        } 
      } 
    } 
  }
  fetchPet();
}, [petId]);*/

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

  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" backgroundColor="#88c9bf"></StatusBar>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>

      <View style={styles.imageContainer}>
     
        <Image source={petData.fotoAnimal ? petData.fotoAnimal : PlaceholderImage} style={styles.image} contentFit="cover"/>
        
        <View style={[styles.editButton]}>
          <Link href={"/cadastro"} asChild>
            <Pressable style={styles.button} >
            <MaterialIcons name="edit" size={24} color="#434343" />
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

      <Text style={[styles.regularText, {marginHorizontal: 24}]}>
        {sobre}
      </Text>
      
      
      <View style={styles.rowButtons}>
        <View style={[styles.buttonContainer, ]}>
          <Link href={`/meus-pets/interessados?id=${petId}`} asChild>
            <Pressable style={styles.button} >
              <Text style={styles.buttonLabel}>
                VER INTERESSADOS
              </Text>
            </Pressable>
          </Link>
        </View>
        <View style={[styles.buttonContainer, ]}>
          <Pressable style={styles.button} >
            <Text style={styles.buttonLabel}>
              REMOVER PET
            </Text>
          </Pressable>
        </View>
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
    color: "#cfe9e5",
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
    marginRight:12,
    backgroundColor: "#88c9bf",
    width: 142,
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