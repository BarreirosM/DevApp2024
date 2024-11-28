import { StyleSheet, Text, View, Pressable, StatusBar, ScrollView } from "react-native";
import React, {useState} from 'react';
import MyTextInput from "@/components/MyTextInput";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TelaCadastroPessoal() {

  const [isFocused, setIsFocused] = useState([false, false]); 

  const [name, setName] = useState('');

  const handleName = (newName: string) => {
    setName(newName);
  };

  const [age, setAge] = useState('');

  const handleAge = (newAge: string) => {
    setAge(newAge);
  };

  const [email, setEmail] = useState('');

  const handleEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  const [state, setState] = useState('');

  const handleState = (newState: string) => {
    setState(newState);
  };

  const [city, setCity] = useState('');

  const handleCity = (newCity: string) => {
    setCity(newCity);
  };

  const [address, setAddress] = useState('');

  const handleAddress = (newAddress: string) => {
    setAddress(newAddress);
  };

  const [tele, setTele] = useState('');

  const handleTele = (newTele: string) => {
    setTele(newTele);
  };

  const [userName, setUserName] = useState('');

  const handleUserName = (newUserName: string) => {
    setUserName(newUserName);
  };

  const [pass, setPass] = useState('');

  const handlePass = (newPass: string) => {
    setPass(newPass);
  };

  const [sndPass, setSndPass] = useState('');

  const handleSndPass = (newPass: string) => {
    setSndPass(newPass);
  };

  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" backgroundColor="#88c9bf"></StatusBar>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>
            As informações preenchidas serão divulgadas
            apenas para a pessoa com a qual você realizar
            o processo de adoção e/ou apadrinhamento,
            após a formalização do processo.
          </Text>
        </View>

        <Text style={styles.subHeader}>
          INFORMAÇÕES PESSOAIS
        </Text>

        <View style={styles.formContainer}>
          <MyTextInput text={'Nome Completo'} handleValue={handleName}/>
        </View>
        <View style={styles.formContainer}>
          <MyTextInput text={'Idade'} handleValue={handleAge}/>
        </View>
        <View style={styles.formContainer}>
          <MyTextInput text={'E-mail'} handleValue={handleEmail}/>
        </View>
        <View style={styles.formContainer}>
          <MyTextInput text={'Estado'} handleValue={handleState}/>
        </View>
        <View style={styles.formContainer}>
          <MyTextInput text={'Cidade'} handleValue={handleCity}/>
        </View>
        <View style={styles.formContainer}>
          <MyTextInput text={'Endereço'} handleValue={handleAddress}/>
        </View>
        <View>
          <MyTextInput text={'Telefone'} handleValue={handleTele}/>
        </View>

        <Text style={styles.subHeader}>
          INFORMAÇÕES DE PERFIL
        </Text>

        <View style={styles.formContainer}>
          <MyTextInput text={'Nome de usuário'} handleValue={handleUserName}/>
        </View>
        <View style={styles.formContainer}>
          <MyTextInput text={'Senha'} handleValue={handlePass} secret={true}/>
        </View>
        <View>
          <MyTextInput text={'Confirmação de senha'} handleValue={handleSndPass} secret={true}/>
        </View>

        <Text style={styles.subHeader}>
          FOTO DE PERFIL
        </Text>
        
        <View style={[styles.addPhoto, styles.photoButton]}>
          <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
            <MaterialIcons name="control-point" size={24} color="757575" />
            <Text style={styles.buttonLabel}>adicionar foto</Text>
          </Pressable>
        </View>

        <View style={[styles.buttonContainer, styles.loginButton]}>
          <Pressable style={styles.button} onPress={() => alert(`${name} ${age} ${email} ${state} ${city} ${address} ${tele} ${userName} ${pass} ${sndPass}`)}>
            <Text style={styles.buttonLabel}>FAZER CADASTRO</Text>
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

  textContainer: {
    width: 328,
    height: 80,
    alignItems: 'center',
    backgroundColor: "#cfe9e5",
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 16,
    paddingHorizontal: 10,
  },

  textStyle: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    textAlign: 'center',
    color: '#434343',
  },

  subHeader: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: "#88c9bf",
    marginTop: 28,
    marginBottom: 32,
    alignSelf: 'baseline',
    marginLeft: 13,
  },

  buttonContainer: {
    width: 232,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },

  addPhoto: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
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

  otherLabel: {
    marginLeft: 8,
    color: '#f7f7f7',
  },

  loginButton:{
    marginTop: 52,
    backgroundColor: '#88c9bf',
  },

  photoButton:{
    borderRadius: 10,
    backgroundColor: '#e6e7e7',
  },

  facebookButton: {
    marginTop: 72,
    backgroundColor: '#194f7c',
  },

  googleButton: {
    marginTop: 8,
    backgroundColor: '#f15f5c',
  },

  textInput: {
    width: 312,
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    paddingBottom: 8,
  },

  textBlur: {
    borderBottomColor: '#e6e7e8',
    borderBottomWidth: 0.8,
  },

  textFocus: {
    borderBottomColor: '#88c9bf',
    borderBottomWidth: 2,
  },

  textLogin: {
    marginTop: 32,
    marginBottom: 24,
  },

  textPass: {
    marginTop: 20,
  },

  scrollContainer: {
    alignItems: 'center',
  },

  formContainer: {
    marginBottom: 36,
  },
})