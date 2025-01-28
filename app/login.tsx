import { StyleSheet, Text, View, Pressable, StatusBar, TextInput } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import {useState} from 'react';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from '../FirebaseConfig'
import { Link

 } from "expo-router";
export default function TelaLogin() {

  const auth = FIREBASE_AUTH;

  const [isFocused, setIsFocused] = useState([false, false]); 


  const [login, setLogin] = useState('');

  const [pass, setPass] = useState('');

  const handleUserOnFocus = () => { 
    setIsFocused(prev => [true, prev[1]]); 
  }; 

  const handleUserBlur = () => { 
    setIsFocused(prev => [false, prev[1]]); 
  }; 

  const handlePassOnFocus = () => { 
    setIsFocused(prev => [prev[0], true]); 
  }; 

  const handlePassBlur = () => { 
    setIsFocused(prev => [prev[0], false]); 
  }; 

  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, login, pass);
      alert(`Login deu certo ${login} ${pass}`);
    } catch (error: any) {
      console.log(error);
      alert(`Login falhou ${login} ${pass} ${error.message}`);
    }
  }

  const logout = async () => {
    try {
      const response = await signOut(auth);
      alert(`Loginout deu certo`);
    } catch (error: any) {
      console.log(error);
      alert(`Loginout falhou: ${error.message}`);
    }
  }

  if (auth.currentUser) {
    return (
      <View style={styles.container}>

      <StatusBar barStyle="light-content" backgroundColor="#88c9bf"></StatusBar>

      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.titleText}>
          Opa!
        </Text>

        <Text style={[styles.introduction]}>
          Você já está logado no app.
        </Text>
      </View>

      <View style={[styles.buttonContainer, styles.loginButton]}>
        <Link href={"/"} asChild>
          <Pressable style={styles.button} onPress={logout} >
            <Text style={styles.buttonLabel}>SAIR</Text>
          </Pressable>
        </Link>
      </View>

      </View>
    )
  }
  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" backgroundColor="#88c9bf"></StatusBar>

      <TextInput style={[styles.textInput, styles.textLogin, isFocused[0] ? styles.textFocus : styles.textBlur]}
      placeholder="Nome de usuário" placeholderTextColor="#bdbdbd"
      onChangeText={newText => setLogin(newText)}
      onFocus={handleUserOnFocus}
      onBlur={handleUserBlur}>
      </TextInput>

      <TextInput style={[styles.textInput, styles.textPass, isFocused[1] ? styles.textFocus : styles.textBlur]}
      placeholder="Senha" 
      placeholderTextColor="#bdbdbd"
      secureTextEntry={true}
      onChangeText={newText => setPass(newText)}
      onFocus={handlePassOnFocus}
      onBlur={handlePassBlur}>
      </TextInput>

      <View style={[styles.buttonContainer, styles.loginButton]}>
        <Link href={"/"} asChild>
          <Pressable style={styles.button} onPress={signIn}>
            <Text style={styles.buttonLabel}>ENTRAR</Text>
          </Pressable>
        </Link>
      </View>

      <View style={[styles.buttonContainer, styles.facebookButton]}>
        <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
          <FontAwesome5 name="facebook-square" size={12} color="#f7f7f7" />
          <Text style={[styles.buttonLabel, styles.otherLabel]}>ENTRAR COM FACEBOOK</Text>
        </Pressable>
      </View>

      <View style={[styles.buttonContainer, styles.googleButton]}>
        <Pressable style={styles.button} onPress={() => alert(`${login} ${pass}`)}>
          <Entypo name="google-" size={12} color="#f7f7f7" />
          <Text style={[styles.buttonLabel, styles.otherLabel]}>ENTRAR COM GOOGLE</Text>
        </Pressable>
      </View>

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

  titleText: {
    fontFamily: 'Courgette_400Regular',
    fontSize: 72,
    color: "#88c9bf",
    marginTop: 18,
    marginBottom: 52,
  },

  textBottom: {
    marginBottom: 48,
  },

  introduction: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    marginHorizontal: 48,
    textAlign: 'center',
    color: '#757575'
  },

  buttonContainer: {
    width: 232,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 10,
    marginBottom: 12,
    boxShadow: "0 1 4 grey",
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

  otherLabel: {
    marginLeft: 8,
    color: '#f7f7f7',
  },

  loginButton:{
    marginTop: 52,
    backgroundColor: '#88c9bf',
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
    marginTop: 64,
  },

  textPass: {
    marginTop: 20,
  },
})