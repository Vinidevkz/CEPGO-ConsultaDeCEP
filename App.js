import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function App() {
  const [data, setData] = useState(null);
  const [cep, setCEP] = useState("");

  const getCEP = async (cep) => {
    if (!cep || cep.length !== 8) {
      alert("Por favor, insira um CEP válido.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const json = await response.json();
      if (json.erro) {
        alert("CEP não encontrado.");
        setData(null);
      } else {
        setData(json);
      }
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao buscar o CEP.");
    }
  };

  const delCEP = async (cep) => {
    setCEP("");
    setData(null);
  };

  function sobreAlert() {
    Alert.alert(
      "Sobre o App", // Título do alerta
      "Esta aplicação permite que você digite um CEP e descubra informações sobre ele, como o endereço, bairro, cidade e estado. Se o CEP for válido, essas informações são exibidas na tela. Caso o CEP não seja encontrado ou seja inválido, a aplicação avisa o usuário. Também há a opção de limpar os dados inseridos e os resultados mostrados.", // Mensagem do alerta
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }


  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.topbar}>
          <TouchableOpacity>
            <AntDesign name="questioncircle" size={24} color="#00BF63" onPress={sobreAlert}/>
          </TouchableOpacity>
        </View>
        <Image source={require("./assets/CEPG2.png")} style={styles.image} />
        <Text style={{ fontSize: 18, color: "#fff" }}>Consulta de CEP</Text>
        <Text style={{ fontSize: 18, color: "#fff" }}>
          Insira o CEP desejado:
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={8}
          value={cep}
          onChangeText={setCEP}
        />

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => getCEP(cep)}>
            <Text
              style={{ fontSize: 20, color: "#f4f4f4", fontWeight: "bold" }}
            >
              Confirmar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttondelete}
            onPress={() => delCEP(cep)}
          >
            <Text style={{ fontSize: 20, color: "#ff483b" }}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.resultcont}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Resultado:</Text>
        <ScrollView>
          {data ? (
            <Text style={styles.resulttext}>
              <Text style={styles.bold}>CEP: </Text>
              {data.cep}
              {"\n"}
              <Text style={styles.bold}>Endereço: </Text>
              {data.logradouro}
              {"\n"}
              <Text style={styles.bold}>Bairro: </Text>
              {data.bairro}
              {"\n"}
              <Text style={styles.bold}>Complemento: </Text>
              {data.complemento}
              {"\n"}
              <Text style={styles.bold}>Localidade: </Text>
              {data.localidade}
              {"\n"}
              <Text style={styles.bold}>UF: </Text>
              {data.uf}
              {"\n"}
              <Text style={styles.bold}>DDD: </Text>
              {data.ddd}
            </Text>
          ) : (
            <Text></Text>
          )}
        </ScrollView>
      </View>

      <StatusBar style="light" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0c0c",
  },

  topbar: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 30,

    width: "100%",
  },

  image: {
    width: 200,
    height: 50,
  },

  form: {
    width: "100%",
    height: "65%",
    paddingHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  input: {
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: "80%",
    height: 40,
    fontSize: 18,
    backgroundColor: "#1b1b1b",
    elevation: 5,
    color: "#f4f4f4",
  },

  row: {
    flexDirection: "row",
    gap: 15,
  },

  button: {
    backgroundColor: "#00BF63",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginTop: 20,
    elevation: 5,
  },

  buttondelete: {
    borderWidth: 2,
    borderColor: "#ff483b",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginTop: 20,
  },

  resultcont: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
  },

  resulttext: {
    fontSize: 20,
  },

  bold: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
