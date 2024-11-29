import { StyleSheet, Text, View, Pressable, StatusBar } from "react-native";
import { Link } from 'expo-router';

export default function TelaSemCadastro() {

  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" backgroundColor="#88c9bf"></StatusBar>

      <Text style={styles.titleText}>
        Ops!
      </Text>

      <Text style={[styles.introduction]}>
        Você não pode realizar esta ação sem possuir um cadastro.
      </Text>

      <View style={[styles.buttonContainer, styles.loginButton]}>
        <Link href={"/cadastro"} asChild>
          <Pressable style={styles.button} >
            <Text style={styles.buttonLabel}>
              FAZER CADASTRO
            </Text>
          </Pressable>
        </Link>
      </View>

      <Text style={[styles.introduction, {marginTop: 44}]}>
        Já possui cadastro?
      </Text>

      <View style={[styles.buttonContainer, styles.loginButton]}>
        <Link href={"/login"} asChild>
          <Pressable style={styles.button} onPress={() => alert("apertou")}>
            <Text style={styles.buttonLabel}>FAZER LOGIN</Text>
          </Pressable>
        </Link>
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
    fontSize: 53,
    color: "#88c9bf",
    marginTop: 52,
    marginBottom: 52,
  },

  textBottom: {
    marginBottom: 48,
  },

  introduction: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    marginBottom: 16,
    marginHorizontal: 50,
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
    marginTop: 16,
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