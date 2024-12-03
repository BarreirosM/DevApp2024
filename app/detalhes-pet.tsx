import { StyleSheet, Text, View, Pressable, StatusBar, ScrollView, Dimensions } from "react-native";
import React, {useState} from 'react';
import { Image } from 'expo-image';
import MyTextInput from "@/components/MyTextInput";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MyCheckBox from "@/components/MyCheckBox";
import { Link } from "expo-router";
import MyRadioButtonRow from "@/components/MyRadioButtonRow";
import MyCheckBoxRow from "@/components/MyCheckBoxRow";
import { FIREBASE_DB } from "../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Subheader } from "react-native-paper/lib/typescript/components/List/List";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const PlaceholderImage = require('@/assets/images/cachorro_placeholder.jpg');

export default function TelaCadastroAnimal() {

  const nome: string = "Pequi";
  const sexo: string = "Macho";
  const porte: string = "Pequeno";
  const idade: string = "Adulto";
  const localizacao: string = "Planaltina – Brasília";
  const castrado: boolean = false;
  const vermifugado: boolean = true;
  const vacinado: boolean = false;
  const doente: boolean = false;
  const doencas: string = "Alguma Coisa";
  const temperamento: boolean[] = [true, false, true, false, false, false];
  const ajuda: string = "Ajufa financeira e alimento";
  const exigencias: string = "Termo de apadrinhamento, auxílio financeiro com alimentação";
  const sobre: string = "Pequi é um cão muito dócil e de fácil convivência. Adora caminhadas e se dá muito bem com crianças. Tem muito medo de raios e chuva. Está disponível para adoção pois eu e minha família o encontramos na rua e não podemos mantê-lo em nossa casa.";
  const temperamentoAux: string[] = ["Brincalhão" , "Tímdo", "Calmo", "Guarda", "Amoroso", "Preguiçoso"]

  let temperamentoString: string = '';

  for (let i = 0; i < 6; i++) {
    temperamentoString = temperamento[i] ? (temperamentoString +`${temperamentoAux[i]} `) : (temperamentoString + '');
  }


  return (
    <View style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
      <StatusBar barStyle="light-content" backgroundColor="#88c9bf"></StatusBar>

      <View style={styles.imageContainer}>
     
        <Image source={PlaceholderImage} style={styles.image} contentFit="cover"/>
        
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
        O PEQUI PRECISA DE
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
      
      <View style={styles.rowButtons}>
        <View style={[styles.buttonContainer, ]}>
          <Pressable style={styles.button} >
            <Text style={styles.buttonLabel}>
              VER INTERESSADOS
            </Text>
          </Pressable>
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
    color: "#589b9b",
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