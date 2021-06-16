import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View, Image } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {

  const [getValueName, setGetName] = useState("");
  const [getValueCity, setGetCity] = useState("");

  const getData = async () => {
    //function to get the value from AsyncStorage

    AsyncStorage.getItem("name").then(
      (value) =>
        //AsyncStorage returns a promise, so adding a callback to get the value
        setGetName(value)
    );
    AsyncStorage.getItem("city").then(
      (value) =>
        //AsyncStorage returns a promise, so adding a callback to get the value
        setGetCity(value)
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Hi {getValueName} from {getValueCity}
      </Text>
      <View style={styles.container}>
        <Image style={styles.img_logo} source={require("../assets/logo.png")} />
      </View>
    </View>
  );
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  img: {
    width: 262,
    height: 48

  },
});