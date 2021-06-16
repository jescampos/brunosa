import React, { Component } from 'react';
import { View, TextInput, Text, Button, TouchableHighlight } from 'react-native';
import styles from '../styles/main';
import apiConfig from '../config/api.config';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student_number: "",
            authentication_code: "",
            loggedUser: []
        }
    }

    // Update state key with value
    setStateFor = (key, val) => {
        this.setState({
            [key]: val
        });
    }

    // Verify existing user credentials
    verifyUser = async () => {

        // Prevent empty calls
        if (this.state.student_number !== undefined && this.state.authentication_code !== undefined) {

            // Find matching user
            await this.getUser(this.state.student_number, this.state.authentication_code);

            if (+this.state.loggedUser.student_number >= 0) {
                // When the student_number and pass matches to a known user
                // We send all the user data to que navigation screen
                // So then this method can catch the user object in 
                // props and update de Context provider with this info
                this.props.navigation.navigate("App", { user: this.state.loggedUser })
            }
            else {
                console.log("User not found.");
            }
        }
        else {
            console.log("Invalid student_number or authentication_code");
        }
    }

    getUser = async (u, p) => {
        // Create Post Body Request
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student_number: u, authentication_code: p })
        };

        // Api call
        await fetch(apiConfig.URI + '/students/signIn', requestOptions)
            .then((response) => response.json())
            .then((json) => { this.setStateFor("loggedUser", json); })
            .catch((error) => console.error(error));
    }

    registerUser = () => {
        // Navigate to Register
        this.props.navigation.navigate("Register")
    }

    render() {
        return (
            <View style={styles.layer2}>
                <Text style={styles.header}>Sign In</Text>
                <TextInput
                    placeholder="Student Number"
                    style={styles.input}
                    onChangeText={(value) => this.setStateFor("student_number", value)}
                />
                <TextInput
                    placeholder="Authentication code"
                    style={styles.input}
                    onChangeText={(value) => this.setStateFor("authentication_code", value)}
                    secureTextEntry
                />
                <Button
                    title="Sign in"
                    style={styles.input}
                    onPress={this.verifyUser}
                />
                <View style={styles.separator}></View>
                <Text style={styles.textSecundary}>Alternatively you can register</Text>
                <TouchableHighlight onPress={this.registerUser} underlayColor="white">
                    <View style={styles.customButton}>
                        <Text style={styles.customButtonText}>Register</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

export default SignIn;