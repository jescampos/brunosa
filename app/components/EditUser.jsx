import React, { Component } from 'react';
import { View, TextInput, Text, Button, TouchableHighlight } from 'react-native';
import { AuthContext, user } from '../context/AuthContext'; // Import Context
import styles from '../styles/main';
import apiConfig from '../config/api.config';

class EditUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            name: "",
            description: "",
            email: "",
            number: "",
            avatar: "",
            password: "",
            loggedUser: {}
        }
    }

    componentDidMount() {
        this.setStateFor("userId", this.context.user.Id);
        this.setStateFor("name", this.context.user.Name);
        this.setStateFor("description", this.context.user.Description);
        this.setStateFor("email", this.context.user.Email);
        this.setStateFor("number", this.context.user.Number);
        this.setStateFor("avatar", this.context.user.Avatar);
        this.setStateFor("password", this.context.user.Password);
    }

    // Update state key with value
    setStateFor = (key, val) => {
        // console.log(`Updating key [${key}] : ${val}`);
        this.setState({
            [key]: val
        });
    }

    goToProfile = () => {
        this.props.navigation.navigate("Profile"); // Navigate to Profile
    }

    // Save User Data
    saveUser = async () => {

        // Prevent Empty Fields
        if (this.state.name != undefined &&
            this.state.description != undefined &&
            this.state.email != undefined &&
            this.state.number != undefined &&
            this.state.avatar != undefined &&
            this.state.password != undefined) {

            // Update User in DB (with API)
            await this.updateUser(
                this.state.name,
                this.state.description,
                this.state.email,
                this.state.number,
                this.state.avatar,
                this.state.password);
        }

        // Return to Profile
        this.props.navigation.navigate("Profile");
    }

    updateUser = async (name, desc, email, num, avatar, password) => {
        // Create Post Body Request
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Name: name,
                Description: desc,
                Email: email,
                Number: num,
                Avatar: avatar,
                Password: password,
                loggedUser: []
            })
        };

        // Api call
        await fetch(`${apiConfig.URI}/users/${this.state.userId}`, requestOptions)
            .then((response) => response.json())
            .then((json) => this.setStateFor("loggedUser", json))
            .catch((error) => console.error(error));

        /*
         * Context Call Back Function 
         * to reload User Data from DB
         */
        this.context.updateUser();
    }

    render() {
        return (
            <View style={styles.layer6}>
                <Text style={styles.header}>Edit</Text>
                <Text>Name</Text>
                <TextInput
                    placeholder="Name"
                    style={styles.input}
                    onChangeText={(value) => this.setStateFor("name", value)}
                    defaultValue={this.state.name}
                />
                <Text>Description</Text>
                <TextInput
                    placeholder="Description"
                    style={styles.input}
                    onChangeText={(value) => this.setStateFor("description", value)}
                    defaultValue={this.state.description}
                />
                <Text>Email</Text>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    onChangeText={(value) => this.setStateFor("email", value)}
                    defaultValue={this.state.email}
                />
                <Text>Number</Text>
                <TextInput
                    placeholder="Number"
                    style={styles.input}
                    onChangeText={(value) => this.setStateFor("number", value)}
                    defaultValue={this.state.number}
                />
                <Text>Avatar</Text>
                <TextInput
                    placeholder="Avatar"
                    style={styles.input}
                    onChangeText={(value) => this.setStateFor("avatar", value)}
                    defaultValue={this.state.avatar}
                />
                <Text>Password</Text>
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    onChangeText={(value) => this.setStateFor("password", value)}
                    defaultValue={this.state.password}
                />
                <View style={styles.postButton2x}>
                    <TouchableHighlight onPress={this.goToProfile}>
                        <View style={styles.customButtonCancel}>
                            <Text style={styles.customButtonText}>Cancel</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.separatorH}></View>
                    <TouchableHighlight onPress={this.saveUser}>
                        <View style={styles.customButton}>
                            <Text style={styles.customButtonText}>Save</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>

        )
    }
}
EditUser.contextType = AuthContext;

export default EditUser;