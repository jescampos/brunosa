import React, { Component } from 'react';
import { View, TextInput, Text, Button, TouchableHighlight } from 'react-native';
import styles from '../styles/main';
import apiConfig from '../config/api.config';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student_number: 0,
            name: "",
            mobile_phone: "",
            email: "",
            authentication_code: "",
            confirmed: "",
            photo: "",
            agenda: []
        }
    }

    // Update state key with value
    setStateFor = (key, val) => {
        this.setState({
            [key]: val
        });
    }

    // Register new User
    registerUser = async () => {

        // Prevent empty fields
        if (this.state.student_number !== undefined &&
            this.state.name !== undefined &&
            this.state.mobile_phone !== undefined &&
            this.state.email !== undefined &&
            this.state.photo !== undefined) {

            // Create User in DB
            await this.createUser(this.state.student_number, this.state.name,
                this.state.mobile_phone, this.state.email, this.state.photo);

            if (this.state.loggedUser.student_number) {
                // When the username and pass matches to a known user
                // We send all the user data to que navigation screen
                // So then this method can catch the user object in 
                // props and update de Context provider with this info
                this.props.navigation.navigate("App", { user: this.state.loggedUser })
            }
            else {
                console.log("Error creating User");
            }
        }
        else {
            console.log("Invalid User");
        }
    }

    signInUser = () => {
        // Navigate to SignIn
        this.props.navigation.navigate("SignIn")
    }

    createUser = async (student_number, name, mobile_phone, email, photo) => {
        // Create Post Body Request
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                student_number: +student_number,
                name: name,
                mobile_phone: mobile_phone,
                email: email,
                photo: photo,
                loggedUser: []
            })
        };

        // Api call
        await fetch(apiConfig.URI + '/students', requestOptions)
            .then((response) => response.json())
            .then((json) => this.setStateFor("loggedUser", json))
            .catch((error) => console.error(error));
    }

    render() {
        return (
            <View style={styles.layer2}>
                <Text style={styles.header}>Register</Text>
                <TextInput
                    placeholder="Student Number"
                    style={styles.input}
                    onChangeText={(value) => this.setStateFor("student_number", value)}
                />
                <TextInput
                    placeholder="Name"
                    style={styles.input}
                    onChangeText={(value) => this.setStateFor("name", value)}
                />
                <TextInput
                    placeholder="Mobile phone"
                    style={styles.input}
                    onChangeText={(value) => this.setStateFor("mobile_phone", value)}
                />
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    onChangeText={(value) => this.setStateFor("email", value)}
                />
                <TextInput
                    placeholder="Photo"
                    style={styles.input}
                    onChangeText={(value) => this.setStateFor("photo", value)}
                />
                <Button
                    title="Register"
                    style={styles.input}
                    onPress={this.registerUser}
                />
                <View style={styles.separator}></View>
                <Text style={styles.textSecundary}>Allready registered? Go to Sign In</Text>
                <TouchableHighlight onPress={this.signInUser} underlayColor="white">
                    <View style={styles.customButton}>
                        <Text style={styles.customButtonText}>Sign In</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

export default Register;