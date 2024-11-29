import { StyleSheet, Text, View, Pressable, StatusBar } from "react-native";
import { Link } from 'expo-router';

export default function TelaCadastroEba() {

  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" backgroundColor="#ffd358"></StatusBar>

      <Text style={styles.titleText}>
        Eba!
      </Text>

      <Text style={[styles.introduction]}>
        O cadastro do seu pet foi realizado com sucesso!
      </Text>

      <Text style={[styles.introduction]}>
        Certifique-se que permitiu o envio de
        notificações por push no campo
        privacidade do menu configurações do
        aplicativo. Assim, poderemos te avisar
        assim que alguém interessado entrar
        em contato!
      </Text>

      <View style={[styles.buttonContainer]}>
        <Link href={"/login"} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonLabel}>MEUS PETS</Text>
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
    color: "#ffd358",
    marginTop: 52,
    marginBottom: 52,
  },

  introduction: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    marginBottom: 16,
    marginHorizontal: 52,
    textAlign: 'center',
    color: '#757575'
  },

  buttonContainer: {
    width: 232,
    height: 40,
    backgroundColor: '#ffd358',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    position: 'absolute',
    bottom: 24,
    borderRadius: 10,
    boxShadow: "0 1 4 grey",
    marginBottom: 76,
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