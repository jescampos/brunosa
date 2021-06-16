import React from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';
import { AuthContext } from '../context/AuthContext'; // Import Context
import styles from '../styles/main';
import Ionicons from 'react-native-vector-icons/Ionicons';

const avatars = [
  { key: 'sj', path: require('../assets/users/sj.jpg') },
  { key: 'bg', path: require('../assets/users/bg.jpg') },
  { key: 'em', path: require('../assets/users/em.jpg') }
];

const Profile = (props) => {

  function getAvatar(username) {
    const userAvatar = avatars.find(x => x.key == username);

    if (userAvatar) {
      return userAvatar.path;
    }
    else {
      return require('../assets/users/other.jpg')
    }
  }

  function gotoEditUser() {
    props.navigation.navigate("EditUser");
  }

  return (
    <AuthContext.Consumer>
      {(context) => (
        <View style={styles.main}>
          <View style={styles.layerTop}>
            <TouchableHighlight onPress={gotoEditUser}>
              <View style={styles.customButtonEdit}>
                <Text style={styles.customButtonEditText}>
                  <Ionicons name='create-outline' style={styles.customButtonEditIcon} /> Edit
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.layer1}>
            <Image style={styles.img} source={getAvatar(context.user.student_number)} />
          </View>
          <View style={styles.layer2}>
            <Text style={styles.header}> {context.user.name} </Text>
            <Text style={styles.body}> {context.user.student_number} </Text>
          </View>
          <View style={styles.layer3}>
            <View style={styles.layer4}>
              <Text style={styles.footer}>{context.user.email}</Text>
            </View>
            <View style={styles.layer5}>
              <Text style={styles.footer}>{context.user.mobile_phone}</Text>
            </View>
          </View>
        </View>
      )}
    </AuthContext.Consumer >
  );
}

export default Profile;
