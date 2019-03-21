import React from 'react';
import {
  ScrollView,
  TextInput,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';
import firebase from './../firebase';
import { styles, colors } from './Styles';

const PASSWORD_WEAK = 'This Password is too weak!';
const PASSWORD_STRONG = 'Strong!';
const PASSWORD_MEDIUM = 'Medium!';

export default class CreateUserScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      retypePassword: '',
    };
  }

  createNewUser = async () => {
    this.validatePassword();
    if (this.state.error || this.state.passwordStrength === PASSWORD_WEAK) {
      return;
    }
    const { email, password } = this.state;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      this.goToHomeScreen();
    } catch (e) {
      this.setState({error: e.message});
    }
  }

  goToHomeScreen() {
    const { navigate } = this.props.navigation;
    navigate('HomeScreen');
  }

  changeLogin = (text) => {
    this.setState({email: text});
  }

  changePassword = (text) => {
    this.setState({password: text});

    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

    if (text.length === 0) {
      this.setState({passwordStrength: null})
      return;
    }
    if (strongRegex.test(text)) {
      this.setState({passwordStrength: PASSWORD_STRONG, error: null});
    } else if (mediumRegex.test(text)) {
      this.setState({passwordStrength: PASSWORD_MEDIUM, error: null});
    } else {
      this.setState({passwordStrength: PASSWORD_WEAK})
    }
  }

  getStyleBasedOnStrength = () => {
    if (this.state.passwordStrength === PASSWORD_WEAK) {
      return styles.error;
    } else if (this.state.passwordStrength === PASSWORD_MEDIUM) {
      return styles.colorOrange;
    } else {
      return styles.colorOkGreen;
    }
  }

  changeRetypePassword = (text) => {
    this.setState({retypePassword: text});
  }

  validatePassword = () => {
    if (this.state.retypePassword.length === 0 || this.state.password.length === 0) {
      this.setState({error: 'Type a valid password'});
    }
    if (this.state.password !== this.state.retypePassword) {
      this.setState({error: 'The passwords don\'t match'});
    }
  }

  render() {
    return (
      <ScrollView style={[styles.container, styles.margin]}>
        <View>
          <Text>Email:</Text>
          <TextInput
            onChangeText={this.changeLogin}
            value={this.state.email}
            style={[styles.textInput, styles.marginBottom]}
          />

          <Text>Password:</Text>
          <TextInput 
            onChangeText={this.changePassword}
            value={this.state.password}
            style={[styles.textInput, styles.marginBottom]}
          />

          { this.state.passwordStrength ?
            <Text style={[styles.marginBottom, this.getStyleBasedOnStrength()]}>{this.state.passwordStrength}</Text>
          : null }

          <Text>Confirm Password:</Text>
          <TextInput
            onSubmitEditing={this.validatePassword}
            onBlur={this.validatePassword}
            onChangeText={this.changeRetypePassword}
            value={this.state.retypePassword}
            style={[styles.textInput, styles.marginBottom]}
          />

          { this.state.error ? 
            <Text style={[styles.error, styles.marginBottom]}>{this.state.error}</Text>
          : null }

          <Button
            onPress={this.createNewUser}
            title="Register"
            buttonStyle={[styles.button]}
            titleStyle={styles.buttonText}
          />
        </View>
      </ScrollView>
    );
  }
}
