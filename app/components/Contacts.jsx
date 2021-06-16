import React, { Component } from 'react';
import { Text, Button, TextInput, View } from 'react-native';
import styles from '../styles/main';

export default class Contact extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <View style={styles.layer2}>
        <Text style={styles.header}>Contact Form</Text>
        <TextInput
          placeholder={'Name'}
          style={styles.input}
        />
        <TextInput
          placeholder={'Email'}
          style={styles.input}
        />
        <TextInput
          placeholder={'Message'}
          style={styles.input_large}
        />
        <Button
          title={'Submit'}
          style={styles.input}
        />
      </View>
    );
  }
}
