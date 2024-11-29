import { StyleSheet, Text, View, Pressable, StatusBar } from "react-native";
import { Image } from 'expo-image';
import { Link } from 'expo-router';

const LogoImage = require('@/assets/images/meau-marca.png');

export default function TelaInicial() {
  return (
    
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa"></StatusBar>
      <Text style={styles.titleText}>
        Olá!
      </Text>

      <Text style={styles.introduction}>
        Bem vindo ao Meau!
      </Text>

      <Text style={styles.introduction}>
        Aqui você pode adotar, doar e ajudar
        cães e gatos com facilidade.
      </Text>

      <Text style={[styles.introduction, styles.textBottom]}>
        Qual o seu interesse?
      </Text>

      <View style={styles.buttonContainer}>
        <Link href={"/sem-cadastro"} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonLabel}>ADOTAR</Text>
          </Pressable>
          </Link>
      </View>
      <View style={styles.buttonContainer}>
        <Link href={"/sem-cadastro"} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonLabel}>AJUDAR</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.buttonContainer}>
        <Link href={"/cadastro-animal"} asChild>
          <Pressable style={styles.button} >
            <Text style={styles.buttonLabel}>CADASTRAR ANIMAL</Text>
          </Pressable>
        </Link>
      </View>
      

      <View style={styles.loginButton}>
        <Link href="/login" style={styles.loginText}>
          login
        </Link>
      </View>

      <View style={styles.imageContainer}>
        <Image source={LogoImage} style={styles.image} />
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
    color: "#ffd358",
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
    backgroundColor: '#ffd358',
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
  
  loginButton:{
    marginTop: 44,
  },

  loginText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    color: '#88c9bf',
  },

  imageContainer: {
    marginTop: 68,
    marginBottom: 32,
  },

  image: {
    width: 122,
    height: 44,
  },
})