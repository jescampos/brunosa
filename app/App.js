import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import apiConfig from './config/api.config';
import { HeaderBackButton } from '@react-navigation/stack';

// Import libray Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles/main';

// Custom Components
import PostsComponent from './components/Posts';
import PostComponent from './components/Post';
import CommentsComponent from './components/Comments';
import HomeComponent from './components/Home';
import ProfileComponent from './components/Profile';
import EditUserComponent from './components/EditUser';
import ContactsComponent from './components/Contacts';
import SignInComponent from './components/SignIn';
import RegisterComponent from './components/Register';
import SettingsComponent from './components/Settings';

// Import Context
import { AuthContext } from './context/AuthContext';

// Screen Methods
function HomeScreen({ navigation }) {
  return (
    <HomeComponent navigation={navigation} />
  );
}

function PostsScreen({ navigation, route }) {
  return (
    <PostsComponent navigation={navigation} route={route} />
  );
}

function PostScreen({ navigation, route }) {
  return (
    <PostComponent navigation={navigation} route={route} />
  );
}

function CommentsScreen({ navigation, route }) {
  return (
    <CommentsComponent navigation={navigation} route={route} />
  );
}

function ProfileScreen({ navigation }) {
  return (
    <ProfileComponent navigation={navigation} />
  );
}

function EditUserScreen({ navigation }) {
  return (
    <EditUserComponent navigation={navigation} />
  );
}

function ContactsScreen({ navigation }) {
  return (
    <ContactsComponent navigation={navigation} />
  );
}

function SignInScreen({ navigation }) {
  return (
    <SignInComponent navigation={navigation} />
  );
}

function RegisterScreen({ navigation }) {
  return (
    <RegisterComponent navigation={navigation} />
  );
}

function SettingsScreen({ navigation }) {
  return (
    <SettingsComponent navigation={navigation} />
  );
}

// Blog Stack Navigation
const StackAuth = createStackNavigator();
function NavAuth(logged) {

  return (
    <StackAuth.Navigator
      initialRouteName={logged ? "App" : "SignIn"} // Set Initial screen
      headerMode="none" // Hide top nav bar
      screenOptions={{
        headerStyle: styles.headerBG,
        headerTintColor: '#eee',
        headerTitleStyle: styles.headerBold
      }}>
      <StackAuth.Screen name="SignIn" component={SignInScreen} />
      <StackAuth.Screen name="Register" component={RegisterScreen} />
      <StackAuth.Screen name="App" component={NavTab} />
    </StackAuth.Navigator>
  );
}

// User Stack Navigation
const StackUser = createStackNavigator();
function NavUser(props) {
  return (
    <StackUser.Navigator
      initialRouteName="Profile" // Set Initial screen
      headerMode="none" // Hide top nav bar
      screenOptions={{
        headerStyle: styles.headerBG,
        headerTintColor: '#eee',
        headerTitleStyle: styles.headerBold
      }}>
      <StackUser.Screen name="Profile" component={ProfileScreen} />
      <StackUser.Screen name="EditUser" component={EditUserScreen} />
    </StackUser.Navigator>
  );
}

// App Tab Navigation
const Tab = createBottomTabNavigator();
function NavTab(props) {
  const [user, setUser] = useState(props.route.params.user);
  const [currentContext, setCurrentContext] = useState({
    user: user,
    updateUser: async () => {
      await getUserById(user.Id);
    }
  });

  // Get User By Id From DB
  const getUserById = async (id) => {
    await fetch(apiConfig.URI + '/users/' + id)
      .then((response) => response.json())
      .then((json) => updateProvider(json))
      .catch((error) => console.error(error));

  }

  // Update Context Provider Value
  const updateProvider = (newUserData) => {
    setUser(newUserData);
    setCurrentContext({
      user: newUserData,
      updateUser: async () => {
        await getUserById(user.Id);
      }
    });
  }

  return (
    <AuthContext.Provider value={currentContext}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') { iconName = 'ios-home'; }
            else if (route.name === 'Posts') { iconName = 'md-list'; }
            else if (route.name === 'Profile') { iconName = 'ios-person'; }
            else if (route.name === 'Contacts') { iconName = 'ios-send'; }
            else if (route.name === 'Settings') { iconName = 'settings'; }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{ activeTintColor: 'steelblue', inactiveTintColor: 'gray' }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Posts" component={NavBlog} />
        <Tab.Screen name="Profile" component={NavUser} />
        <Tab.Screen name="Contacts" component={ContactsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />

      </Tab.Navigator>
    </AuthContext.Provider>
  );
}

// Blog Stack Navigation
const Stack = createStackNavigator();
function NavBlog() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: styles.headerBG,
      headerTintColor: '#eee',
      headerTitleStyle: styles.headerBold,
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            // props.navigation.navigate("Home");
          }}
        />
      )
    }}>
      <Stack.Screen name="Home" component={PostsScreen} options={{ title: 'Blog' }} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
    </Stack.Navigator>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <NavigationContainer style={styles.mainContainer} >
        { NavAuth(this.context.isLogged)}
      </NavigationContainer>
    );
  }
}
App.contextType = AuthContext;

export default App;
