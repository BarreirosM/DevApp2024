import { StyleSheet, Text, View, Pressable, StatusBar, ScrollView } from "react-native";
import React, {useState} from 'react';
import MyTextInput from "@/components/MyTextInput";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MyCheckBox from "@/components/MyCheckBox";
import MyRadioButton from "@/components/MyRadioButton";
import { Link } from "expo-router";


export default function TelaCadastroAnimal() {

  const [doencas, setDoencas] = useState('');

  const handleDoencas= (newDoencas: string) => {
    setSpecies(newDoencas);
  }

  const [text, setText] = useState('');

  const handleText= (newText: string) => {
    setSpecies(newText);
  }

  const [species, setSpecies] = useState('');

  const handleSpecies = (newSpecies: string) => {
    setSpecies(newSpecies)
  }

  const [sex, setSex] = useState('');

  const handleSex = (newSex: string) => {
    setSex(newSex)
  }

  const [size, setSize] = useState('');

  const handleSize = (newSize: string) => {
    setSize(newSize)
  }

  const [age, setAge] = useState('');

  const handleAge = (newAge: string) => {
    setAge(newAge)
  }

  const [name, setName] = useState('');

  const handleName = (newName: string) => {
    setName(newName);
  };

  const [userName, setUserName] = useState('');

  const handleUserName = (newUserName: string) => {
    setUserName(newUserName);
  };

  const [temperamento, setTemperamento] = useState([false, false, false, false, false, false]);

  const handleTemperamento = (myString: string) => {
    switch (myString) {

      case "Brincalhão":
        setTemperamento(prev => [!prev[0], prev[1], prev[2], prev[3], prev[4], prev[5]]);
        break;

      case "Tímido":
        setTemperamento(prev => [prev[0], !prev[1], prev[2], prev[3], prev[4], prev[5]]);
        break;

      case "Calmo":
        setTemperamento(prev => [prev[0], prev[1], !prev[2], prev[3], prev[4], prev[5]]);
        break;

      case "Guarda":
        setTemperamento(prev => [prev[0], prev[1], prev[2], !prev[3], prev[4], prev[5]]);
        break;

      case "Amoroso":
        setTemperamento(prev => [prev[0], prev[1], prev[2], prev[3], !prev[4], prev[5]]);
        break;

      case "Preguiçoso":
        setTemperamento(prev => [prev[0], prev[1], prev[2], prev[3], prev[4], !prev[5]]);
        break;

    }
  }

  const [saude, setSaude] = useState([false, false, false, false]);

  const handleSaude = (myString: string) => {
    switch (myString) {

      case "Vacinado":
        setSaude(prev => [!prev[0], prev[1], prev[2], prev[3]]);
        break;

      case "Vermifugado":
        setSaude(prev => [prev[0], !prev[1], prev[2], prev[3]]);
        break;

      case "Castrado":
        setSaude(prev => [prev[0], prev[1], !prev[2], prev[3]]);
        break;

      case "Doente":
        setSaude(prev => [prev[0], prev[1], prev[2], !prev[3]]);
        break;

    }
  }

  const [exigencias, setExigencias] = useState([false, false, false, false]);

  const handleExigencias= (myString: string) => {
    switch (myString) {

      case "Termos de adoção":
        setExigencias(prev => [!prev[0], prev[1], prev[2], prev[3]]);
        break;

      case "Fotos da casa":
        setExigencias(prev => [prev[0], !prev[1], prev[2], prev[3]]);
        break;

      case "Visita prévia ao animal":
        setExigencias(prev => [prev[0], prev[1], !prev[2], prev[3]]);
        break;

      case "Acompanhamento pós adoção":
        setExigencias(prev => [prev[0], prev[1], prev[2], !prev[3]]);
        break;

    }
  }

  const [tempoAcompanhamento, setTempoAcompanhamento] = useState([false, false, false]);

  const handleTempoAcompanhamento= (myString: string) => {
    switch (myString) {

      case "1 mês":
        setTempoAcompanhamento(prev => [!prev[0], false, false]);
        break;

      case "3 meses":
        setTempoAcompanhamento(prev => [false, !prev[1], false]);
        break;

      case "6 meses":
        setTempoAcompanhamento(prev => [false, false, !prev[2]]);
        break;

    }
  }

  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" backgroundColor="#ffd358"></StatusBar>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>

        <Text style={styles.regularText}>
          Tenho interesse em cadastrar o animal para:
        </Text>

        <View style={styles.threeButtons}>
          <View style={[styles.buttonContainer, styles.smallButton, {backgroundColor: '#ffd358'}]}>
            <Pressable style={styles.button} >
              <Text style={styles.buttonLabel}>
                ADOÇÃO
              </Text>
            </Pressable>
          </View>
          <View style={[styles.buttonContainer, styles.smallButton, {backgroundColor: '#f1f2f2'}]}>
            <Pressable style={styles.button} >
              <Text style={[styles.buttonLabel, {color: '#bdbdbd'}]}>
                APADRINHAR
              </Text>
            </Pressable>
          </View>
          <View style={[styles.buttonContainer, styles.smallButton, {backgroundColor: '#f1f2f2'}]}>
            <Pressable style={styles.button} >
              <Text style={styles.buttonLabel}>
                AJUDA
              </Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.subHeader}>
          Adoção
        </Text>

        <Text style={styles.subSubHeader}>
          NOME DO ANIMAL
        </Text>

        <View style={styles.formContainer}>
          <MyTextInput text={'Nome do animal'} handleValue={handleName}/>
        </View>

        <Text style={styles.subSubHeader}>
          FOTOS DO ANIMAL
        </Text>

        <View style={[styles.addPhoto, styles.photoButton, { marginTop: 16}]}>
          <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
            <MaterialIcons name="control-point" size={24} color="#757575" />
            <Text style={[styles.buttonLabel, { color: '#757575'}]}>adicionar foto</Text>
          </Pressable>
        </View>

        <Text style={styles.subSubHeader}>
          ESPÉCIE
        </Text>

        <View style={styles.radioOptionContainer}>

          <MyRadioButton label='Cachorro' value={species} handleValue={handleSpecies}/>
          
          <MyRadioButton label='Gato' value={species} handleValue={handleSpecies}/>
        </View>

        <Text style={styles.subSubHeader}>
          SEXO
        </Text>

        <View style={styles.radioOptionContainer}>
          <MyRadioButton label='Macho' value={sex} handleValue={handleSex}/>

          <MyRadioButton label='Fêmea' value={sex} handleValue={handleSex}/>
        </View>

        <Text style={styles.subSubHeader}>
          PORTE
        </Text>

        <View style={styles.radioOptionContainer}>
          <MyRadioButton label='Pequeno' value={size} handleValue={handleSize}/>

          <MyRadioButton label='Médio' value={size} handleValue={handleSize}/>

          <MyRadioButton label='Grande' value={size} handleValue={handleSize}/>
        </View>

        <Text style={styles.subSubHeader}>
          IDADE
        </Text>

        <View style={styles.radioOptionContainer}>
          <MyRadioButton label='Filhote' value={age} handleValue={handleAge}/>

          <MyRadioButton label='Adulto' value={age} handleValue={handleAge}/>

          <MyRadioButton label='Idoso' value={age} handleValue={handleAge}/>
        </View>

        <Text style={styles.subSubHeader}>
          TEMPERAMENTO
        </Text>

        <View style={styles.radioOptionContainer}>
            <MyCheckBox label="Brincalhão" value={temperamento[0]} handleState={handleTemperamento}/>
            <MyCheckBox label="Tímido" value={temperamento[1]} handleState={handleTemperamento}/>
            <MyCheckBox label="Calmo" value={temperamento[2]} handleState={handleTemperamento}/>
        </View>

        <View style={[styles.radioOptionContainer, {marginTop: 24}]}>
            <MyCheckBox label="Guarda" value={temperamento[3]} handleState={handleTemperamento}/>
            <MyCheckBox label="Amoroso" value={temperamento[4]} handleState={handleTemperamento}/>
            <MyCheckBox label="Preguiçoso" value={temperamento[5]} handleState={handleTemperamento}/>
        </View>

        <Text style={styles.subSubHeader}>
          SAÚDE
        </Text>

        <View style={styles.radioOptionContainer}>
            <MyCheckBox label="Vacinado" value={saude[0]} handleState={handleSaude}/>
            <MyCheckBox label="Vermifugado" value={saude[1]} handleState={handleSaude}/>
        </View>

        <View style={[styles.radioOptionContainer, {marginTop: 24}]}>
          <MyCheckBox label="Castrado" value={saude[2]} handleState={handleSaude}/>
          <MyCheckBox label="Doente" value={saude[3]} handleState={handleSaude}/>
        </View>

        <View style={styles.formContainer}>
          <MyTextInput text={'Doenças do animal'} handleValue={handleDoencas}/>
        </View>

        <Text style={styles.subSubHeader}>
          EXIGÊNCIAS PARA ADOÇÃO
        </Text>

        <View style={[styles.radioOptionContainer, {flexDirection: 'column', alignItems: 'baseline', rowGap: 28,}]}>
          <MyCheckBox label="Termos de adoção" value={exigencias[0]} handleState={handleExigencias}/>
          <MyCheckBox label="Fotos da casa" value={exigencias[1]} handleState={handleExigencias}/>
          <MyCheckBox label="Visita prévia ao animal" value={exigencias[2]} handleState={handleExigencias}/>
          <MyCheckBox label="Acompanhamento pós adoção" value={exigencias[3]} handleState={handleExigencias}/>

          <View style={[styles.radioOptionContainer, {flexDirection: 'column', alignItems: 'baseline', rowGap: 28, marginTop: 0, marginLeft: 36}]}>
            <MyCheckBox label="1 mês" value={tempoAcompanhamento[0]} handleState={handleTempoAcompanhamento} disabled={!exigencias[3]}/>
            <MyCheckBox label="3 meses" value={tempoAcompanhamento[1]} handleState={handleTempoAcompanhamento} disabled={!exigencias[3]}/>
            <MyCheckBox label="6 meses" value={tempoAcompanhamento[2]} handleState={handleTempoAcompanhamento} disabled={!exigencias[3]}/>
          </View>

          <Text style={styles.subSubHeader}>
            SOBRE O ANIMAL
          </Text>

          <View style={[styles.formContainer, {marginTop: 0, marginBottom: 24,}]}>
            <MyTextInput text={'Compartilhe a história do animal'} handleValue={handleText}/>
          </View>

          <View style={[styles.buttonContainer, {backgroundColor: '#ffd358', alignSelf: "center", marginBottom: 46,}]}>
            <Link href={"/cadastro-eba"}  asChild>
              <Pressable style={styles.button} >
                <Text style={styles.buttonLabel}>
                  COLOCAR PARA ADOÇÃO
                </Text>
              </Pressable>
            </Link>
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

  subHeader: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
    //fontWeight: 'bold',
    color: "#434343",
    marginTop: 16,
    marginBottom: 0,
    alignSelf: 'baseline',
  },

  subSubHeader: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    color: "#f7a800",
    marginTop: 20,
    //marginBottom: 16,
    alignSelf: 'baseline',
  },

  regularText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    marginVertical: 10,
    color: "#757575",
    alignSelf: 'baseline',
  },

  threeButtons: {
    width: 312,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  smallButton: {
    width: 100,
    height: 40,
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
    flexDirection: 'row',
  },

  addPhoto: {
    width: 312,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },

  radioOptionContainer:{
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 16,
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

  photoButton:{
    borderRadius: 10,
    backgroundColor: '#e6e7e7',
  },

  scrollContainer: {
    alignItems: 'center',
  },

  formContainer: {
    marginTop: 20,
  },
})