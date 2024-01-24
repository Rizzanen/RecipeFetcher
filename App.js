import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";

export default function App() {
  const [searchWord, setSearchWord] = useState();
  const [fetchResult, setFetchResult] = useState([]);

  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchWord}`)
      .then((response) => response.json())
      .then((data) => setFetchResult(data.meals))
      .catch((error) => Alert.alert("Error", error));

    setSearchWord("");
    Keyboard.dismiss();
  };

  const handleInputChange = (text) => {
    setSearchWord(text);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Find recipes with main ingredient</Text>
      <TextInput
        value={searchWord}
        type="text"
        keyboardType="default"
        style={styles.input}
        onChangeText={(text) => handleInputChange(text)}
      />
      <Pressable style={styles.button} onPress={getRecipes}>
        <Text style={{ color: "white" }}>Search</Text>
      </Pressable>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 100,
        }}
      >
        <FlatList
          style={{ width: "100%" }}
          data={fetchResult}
          renderItem={({ item }) => (
            <View
              style={{
                marginTop: 20,
                borderWidth: 1,
                borderColor: "black",
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                padding: 10,
              }}
            >
              <Text style={{ paddingBottom: 10 }}>{item.strMeal}</Text>
              <Image
                source={{ uri: `${item.strMealThumb}` }}
                style={{ width: 100, height: 100 }}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    width: "60%",
    height: 30,
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "blue",
    padding: 10,
    marginTop: 10,
  },
});
