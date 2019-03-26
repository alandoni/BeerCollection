import React from 'react';
import {
  ScrollView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './Styles';
import { connect } from 'react-redux';
import { login, loginWithFacebook, listenAuth } from './../redux/actions/LoginAction';
import { ProgressView } from './Utils';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  state = {
    email: '',
    password: '',
    error: null,
    isLoading: false,
  };

  componentDidMount() {
    isVisible = true;
    this.props.listenAuthChange();
  }

  attemptLogin = () => {
    const { email, password } = this.state;
    this.props.login(email, password);
  }

  loginWithFacebook = () => {
    this.props.loginWithFacebook();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isLoggedIn) {
      this.goToHomeScreen();
    }
  }
w
  goToHomeScreen = () => {
    const { navigate } = this.props.navigation;
    navigate('SignedIn');
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
      return <ProgressView />
    };
    return (
      <ScrollView style={[styles.container, styles.margin]}>
        <View>
          <View style={styles.centerContent}>
            <Image
              source={require('../assets/images/beer.jpg')}
              style={styles.loginImage}
            />
          </View>
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
            secureTextEntry={true}
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
    isLoggedIn: state.login.isLoggedIn,
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