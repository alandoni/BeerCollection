import React from 'react';
import {
  ScrollView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './Styles';
import { connect } from 'react-redux';
import { login, loginWithFacebook, listenAuth } from './../redux/actions/LoginAction';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  state = {
    email: 'asd@asd.com',
    password: 'asd',
    error: null,
    isLoading: false,
  };

  componentDidMount() {
    this.props.listenAuthChange();
  }

  attemptLogin = async () => {
    const { email, password } = this.state;
    this.props.login(email, password);
  }

  loginWithFacebook = async () => {
    this.props.loginWithFacebook();
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    if (newProps.user) {
      this.goToHomeScreen();
    }
  }

  goToHomeScreen = () => {
    const { navigate } = this.props.navigation;
    navigate('Home');
  }

  goToCreateUserScreen = () => {
    const { navigate } = this.props.navigation;
    navigate('CreateUser');
  }

  changeLogin = (text) => {
    this.setState({email: text});
  }

  changePassword = (text) => {
    this.setState({password: text});
  }

  render() {
    if (this.props.isLoading) {
      return (
        <View><Text>Loading...</Text></View>
      )
    };
    return (
      <ScrollView style={[styles.container, styles.margin]}>
        <View>
          <Text>Login:</Text>
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

          { this.props.error ? 
            <Text style={[styles.error, styles.marginBottom]}>{this.props.error}</Text>
          : null }

          <Button
            onPress={this.attemptLogin}
            title="Login"
            buttonStyle={[styles.button, styles.marginBottom]}
            titleStyle={styles.buttonText}
          />

          <Button
            onPress={this.loginWithFacebook}
            title="Login With Facebook"
            buttonStyle={styles.marginBottom}
          />
        </View>
        
        <TouchableOpacity onPress={this.goToCreateUserScreen}>
          <Text style={styles.link}>Not registered yet? Click here to sign up!</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return { 
    error: state.general.error,
    isLoading: state.general.isLoading,
    user: state.login.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => {
      dispatch(login(email, password))
    },
    loginWithFacebook: () => {
      dispatch(loginWithFacebook())
    },
    listenAuthChange: () => {
      dispatch(listenAuth());
    }
  }
};

const LoginScreenContainer = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

export default LoginScreenContainer;