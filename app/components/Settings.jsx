import React, { useState } from "react";
import { Text, Button, View, TextInput, TouchableHighlight } from "react-native";
import styles from "../styles/main";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = ({ navigation }) => {
    // To get the value from TextInput
    const [textInputName, setTextInputName] = useState("");
    const [textInputCity, setTextInputCity] = useState("");

    const storeData = async () => {
        // function to save the value in AsyncStorage
        if (textInputName && textInputCity) {
            // To check the input is not empty

            await AsyncStorage.setItem("name", textInputName);
            await AsyncStorage.setItem("city", textInputCity);

            alert("Settings Saved!");
        } else {
            alert("Please fill the data");
        }
    };

    const goToSignIn = () => {
        // Navigate to SignIn
        navigation.navigate("SignIn");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Settings</Text>
            <TextInput
                placeholder={"Name"}
                value={textInputName}
                onChangeText={(data) => setTextInputName(data)}
                style={styles.input}
            />
            <TextInput
                placeholder={"City"}
                value={textInputCity}
                onChangeText={(data) => setTextInputCity(data)}
                style={styles.input}
            />
            <Button title={"Save"} onPress={storeData} style={styles.input} />
            <View style={styles.separator}></View>
            <TouchableHighlight onPress={goToSignIn} underlayColor="white">
                <View style={styles.customButtonCancel}>
                    <Text style={styles.customButtonText}>Logout</Text>
                </View>
            </TouchableHighlight>

        </View>
    );
};
export default Settings;
