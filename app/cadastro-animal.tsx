import { StyleSheet, Text, View, Pressable, StatusBar, ScrollView } from "react-native";
import React, {useState} from 'react';
import MyTextInput from "@/components/MyTextInput";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MyCheckBox from "@/components/MyCheckBox";
import { Link } from "expo-router";
import MyRadioButtonRow from "@/components/MyRadioButtonRow";
import MyCheckBoxRow from "@/components/MyCheckBoxRow";
import { FIREBASE_DB, FIREBASE_AUTH } from "../FirebaseConfig";
import { collection, addDoc, doc, DocumentReference, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import {Image} from "expo-image"
import * as FileSystem from 'expo-file-system';



export default function TelaCadastroAnimal() {

  const [nome, setNome] = useState('');

  const handleNome = (newNome: string) => {
    setNome(newNome);
  };

  let idAux: number = 0;

  const especies: string[] = ['Cachorro', 'Gato'];
  const sexos: string[] = ['Macho', 'Fêmea'];
  const portes: string[] = ['Pequeno', 'Médio', 'Grande'];
  const idades: string[] = ['Filhote', 'Adulto', 'Idoso'];

  const [especie, setEspecie] = useState('');
  const [sexo, setSexo] = useState('');
  const [porte, setPorte] = useState('');
  const [idade, setIdade] = useState('');

  const handleEspecie = (newEspecie: string) => {
    setEspecie(newEspecie);
  }

  const handleSexo = (newSexo: string) => {
    setSexo(newSexo);
  }

  const handlePorte = (newPorte: string) => {
    setPorte(newPorte);
  }

  const handleIdade = (newIdade: string) => {
    setIdade(newIdade);
  }

  const temperamentos1: string[] = ['Brincalhão', 'Tímido', 'Calmo']
  const temperamentos2: string[] = ['Guarda', 'Amoroso', 'Preguiçoso'];
  const saudeAux1: string[] = ['Vacinado', 'Vermifugado'];
  const saudeAux2: string[] = ['Castrado', 'Doente'];

  const [temperamento, setTemperamento] = useState([false, false, false, false, false, false]);
  const [saude, setSaude] = useState([false, false, false, false]);

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

  const [doencas, setDoencas] = useState('');

  const handleDoencas= (newDoencas: string) => {
    setDoencas(newDoencas);
  }

  const [texto, setTexto] = useState('');

  const handleTexto= (newTexto: string) => {
    setTexto(newTexto);
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

  let acompanhamento: number = 0;

  const [tempoAcompanhamento, setTempoAcompanhamento] = useState([false, false, false]);

  const handleTempoAcompanhamento= (myString: string) => {
    switch (myString) {

      case "1 mês":
        if (!tempoAcompanhamento[0]) acompanhamento = 1;
        else acompanhamento = 0;
        setTempoAcompanhamento(prev => [!prev[0], false, false]);
        break;

      case "3 meses":
        if (!tempoAcompanhamento[1]) acompanhamento = 3;
        else acompanhamento = 0;
        setTempoAcompanhamento(prev => [false, !prev[1], false]);
        break;

      case "6 meses":
        if (!tempoAcompanhamento[2]) acompanhamento = 6;
        else acompanhamento = 0;
        setTempoAcompanhamento(prev => [false, false, !prev[2]]);
        break;

    }
  }

  const db = FIREBASE_DB;
  let petId = '';

  const salvarNuvem = async () => {
    if (FIREBASE_AUTH.currentUser){
      try {
        const response = await addDoc(collection(db, "Pets"), {
          nome: nome,
          espécie: especie,
          fotoAnimal: imagemBase64,
          sexo: sexo,
          porte: porte,
          idade: idade,
          temperamento: {
            brincalhão: temperamento[0],
            tímido: temperamento[1],
            calmo: temperamento[2],
            guarda: temperamento[3],
            amoroso: temperamento[4],
            preguiçoso: temperamento[5],
          },
          saude: {
            vacinado: saude[0],
            vermifugado: saude[1],
            castrado: saude[2],
            doente: saude[3],
            doenças: doencas,
          },
          exigencias: {
            termosDeAdoção: exigencias[0],
            fotosDeCasa: exigencias[1],
            visitaPrévia: exigencias[2],
            acompanhamentoPósAdoção: exigencias[3],
            tempoDeAcompanhamento: acompanhamento,
          },
          sobreAnimal: texto,
          donoDoAnimal: doc(db, 'Usuarios', FIREBASE_AUTH.currentUser.uid),
        })
        petId = response.id,
        //console.log(response);
        alert(`Salvar deu certo`);

        const docAux = doc(db, "Usuarios", FIREBASE_AUTH.currentUser.uid);
        const respons = await updateDoc(docAux, {
          animais: arrayUnion(doc(db, 'Pets', petId)),
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

  const [selectedImage, setSelectedImage] = useState< string | undefined > (
    undefined
  );


  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      setImagemBase64(`data:image/jpeg;base64,${base64}`);
    } else {
      alert("Imagem Não Selecionada");
    }
  };

  const [imagemBase64, setImagemBase64] = useState<string | null>(null);


  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" backgroundColor="#ffd358"></StatusBar>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>

        <Text style={styles.regularText}>
          Tenho interesse em cadastrar o animal para:
        </Text>

        <View style={styles.threeButtons}>
          <View style={[styles.buttonContainer, styles.smallButton, {backgroundColor: '#ffd358'}]}>
            <Pressable style={styles.button}>
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
          <MyTextInput text={'Nome do animal'} handleValue={handleNome}/>
        </View>

        <Text style={styles.subSubHeader}>
          FOTOS DO ANIMAL
        </Text>

        <View style={styles.imageConteiner}>
          {imagemBase64 ? (
            <Pressable style={styles.button} onPress={pickImageAsync}>
              <Image source={{ uri: imagemBase64 }} style={styles.addPhoto} />
            </Pressable>
          ) : (
            <View style={[styles.addPhoto, styles.photoButton, {marginTop: 16}]}>
              <Pressable style={styles.button} onPress={pickImageAsync}>
                <MaterialIcons name="control-point" size={24} color="#757575" />
                <Text style={[styles.buttonLabel, { color: '#757575'}]}>adicionar foto</Text>
              </Pressable>
            </View>
          )}
        </View>

        <Text style={styles.subSubHeader}>
          ESPÉCIE
        </Text>

        <MyRadioButtonRow id={idAux++} labels={especies} value={especie} handleValue={handleEspecie}/>

        <Text style={styles.subSubHeader}>
          SEXO
        </Text>

        <MyRadioButtonRow id={idAux++} labels={sexos} value={sexo} handleValue={handleSexo}/>

        <Text style={styles.subSubHeader}>
          PORTE
        </Text>

        <MyRadioButtonRow id={idAux++} labels={portes} value={porte} handleValue={handlePorte}/>

        <Text style={styles.subSubHeader}>
          IDADE
        </Text>

        <MyRadioButtonRow id={idAux++} labels={idades} value={idade} handleValue={handleIdade}/>

        <Text style={styles.subSubHeader}>
          TEMPERAMENTO
        </Text>
        <MyCheckBoxRow id={0} labels={temperamentos1} values={temperamento} handleState={handleTemperamento}/>
        <MyCheckBoxRow id={3} labels={temperamentos2} values={temperamento} handleState={handleTemperamento}/>

        <Text style={styles.subSubHeader}>
          SAÚDE
        </Text>

        <MyCheckBoxRow id={0} labels={saudeAux1} values={saude} handleState={handleSaude}/>

        <MyCheckBoxRow id={2} labels={saudeAux2} values={saude} handleState={handleSaude}/>

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
            <MyTextInput text={'Compartilhe a história do animal'} handleValue={handleTexto}/>
          </View>

          <View style={[styles.buttonContainer, {backgroundColor: '#ffd358', alignSelf: "center", marginBottom: 46,}]}>
            <Link href={"/cadastro-eba"}  asChild>
              <Pressable style={styles.button} onPressIn={salvarNuvem}>
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
    boxShadow: "0 1 4 grey",
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

  imageConteiner:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})